<template>
  <div>
    <h1>{{$t('clientarea.my_bookings')}}</h1>
    <div class="order-list-loading" v-if="ordersLoading">
      <client-only>
        <div class="inner loading">
          <vk-spinner ratio="3.5"></vk-spinner>
        </div>
      </client-only>
    </div>
    <div class="order-list" v-else>
      <div v-if="bookings.length==0" class="no-orders">
        {{$t('clientarea.currently_no_orders')}}
        <nuxt-link
          :to="localePath('clientarea') + '/upcoming-camps?a=camps'"
          @click.native="$emit('onClickSideLink',false)"
        >{{$t('clientarea.upcoming_camps')}}</nuxt-link>
      </div>
      <div class="order-list-item" v-for="(order, index) in bookings" :key="index">
        <!-- IMAGE -->
        <div
          v-if="order.participant.avatar"
          class="order-list-item__img"
          :style="{ backgroundImage: 'url(' + $store.state.imgURL + order.participant.avatar + ')' }"
        ></div>
        <div v-else class="order-list-item__img-generic">
          <button class="btn2 btn2-form-xs" @click="uploadAvatarForm(order.id)">Upload image</button>
        </div>
        <!-- /IMAGE -->
        <div class="order-list-item__info">
          <div class="order-list-item__info-text-bar">
            <div class="dotted-menu">
              <client-only>
                <vk-button-group :ref="'group-'+order.id">
                  <div>
                    <vk-button class="btn-dots">&#8226;</vk-button>
                    <vk-dropdown mode="click" :boundary="'group-'+order.id" position="bottom-right">
                      <vk-nav-dropdown>
                        <!--<vk-nav-item title="Active" active></vk-nav-item>-->
                        <li>
                          <NuxtLink
                            :to="{path: '/clientarea/order/'+order.id}"
                          >{{$t('clientarea.view_order')}}</NuxtLink>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            v-if="!order.paid"
                            @click="openPaymentModal(order.id)"
                          >{{$t('clientarea.order_make_payment')}}</a>
                        </li>
                        <vk-nav-item-divider v-if="!order.paid"></vk-nav-item-divider>
                        <li>
                          <a
                            href="javascript:void(0)"
                            v-if="!order.paid"
                            @click="deleteOrder(order.id)"
                          >{{$t('clientarea.delete_order')}}</a>
                        </li>
                      </vk-nav-dropdown>
                    </vk-dropdown>
                  </div>
                </vk-button-group>
              </client-only>
            </div>
            <div class="order-list-item__info-text">
              <div class="order-list-item__info-text-1">
                <h2 v-if="order.participant" style="margin-bottom: 10px;">
                  <NuxtLink
                    :to="{path: '/clientarea/order/'+order.id}"
                  >{{order.participant.last_name}} {{order.participant.first_name}}</NuxtLink>
                </h2>
                <div class="order-list-item__info-text-campinfo">
                  <span>{{order.variation.product.name}}</span>
                  <span>{{order.variation.product.starts_at}} - {{order.variation.product.ends_at}}</span>
                </div>
                <span class="payment-status">
                  {{$t('clientarea.order_status')}}:
                  <span
                    v-if="order.paid"
                    class="paid"
                  >{{$t('clientarea.order_paid')}}</span>
                  <span v-else class="unpaid">
                    <a
                      href="javascript:void(0)"
                      @click="openPaymentModal(order.id)"
                    >{{$t('clientarea.order_make_payment')}}</a>
                  </span>
                </span>
              </div>
              <div
                class="order-list-item__info-text-2"
                :class="{'progress-complete': order.progress>99}"
              >{{Math.floor(order.progress*1)}} %</div>
            </div>

            <div class="order-list-item__info-bar">
              <div :class="{'r-complete': order.complete,'d-list-p':true}">
                <NuxtLink
                  v-if="!order.complete"
                  class="upload-document-link"
                  :to="{path: '/clientarea/order/'+order.id}"
                >{{$t('clientarea.registration')}}</NuxtLink>
                <span v-else>{{$t('clientarea.registration')}}</span>
              </div>
              <div :class="{'r-complete': order.participant.documents.photo,'d-list-p':true }">
                <a
                  href="javascript:void(0)"
                  class="upload-document-link"
                  v-if="!order.participant.documents.photo"
                  @click="uploadStuff(order.id, 'photo')"
                >{{$t('clientarea.photo')}}</a>
                <span v-else>{{$t('clientarea.photo')}}</span>
                <div
                  class="popover-tips"
                  v-if="!order.participant.documents.photo"
                >{{$t('clientarea.upload_image_tip')}}</div>
              </div>

              <div :class="{'r-complete': order.participant.documents.passport,'d-list-p':true }">
                <a
                  href="javascript:void(0)"
                  class="upload-document-link"
                  v-if="!order.participant.documents.passport"
                  @click="uploadStuff(order.id, 'passport')"
                >{{$t('clientarea.passport')}}</a>
                <span v-else>{{$t('clientarea.passport')}}</span>
                <div
                  class="popover-tips"
                  v-if="!order.participant.documents.passport"
                >{{$t('clientarea.upload_image_pdf_tip')}}</div>
              </div>

              <div
                :class="{'r-complete': order.participant.documents.parent_approval,'d-list-p':true }"
              >
                <a
                  href="javascript:void(0)"
                  class="upload-document-link"
                  v-if="!order.participant.documents.parent_approval"
                  @click="uploadStuff(order.id, 'parent_approval')"
                >{{$t('clientarea.agreement')}}</a>
                <span v-else>{{$t('clientarea.agreement')}}</span>
                <div
                  class="popover-tips"
                  v-if="!order.participant.documents.parent_approval"
                >{{$t('clientarea.upload_image_pdf_tip')}}</div>
              </div>

              <div :class="{'r-complete': order.participant.documents.rules,'d-list-p':true }">
                <a
                  href="javascript:void(0)"
                  class="upload-document-link"
                  v-if="!order.participant.documents.rules"
                  @click="uploadStuff(order.id, 'rules')"
                >{{$t('clientarea.rules')}}</a>
                <span v-else>{{$t('clientarea.rules')}}</span>
                <div
                  class="popover-tips"
                  v-if="!order.participant.documents.rules"
                >{{$t('clientarea.upload_image_pdf_tip')}}</div>
              </div>

              <div
                :class="{'r-complete': order.participant.documents.medical_form,'d-list-p':true }"
              >
                <a
                  href="javascript:void(0)"
                  class="upload-document-link"
                  v-if="!order.participant.documents.medical_form"
                  @click="uploadStuff(order.id, 'medical_form')"
                >{{$t('clientarea.medical')}}</a>
                <span v-else>{{$t('clientarea.medical')}}</span>
                <div
                  class="popover-tips"
                  v-if="!order.participant.documents.medical_form"
                >{{$t('clientarea.upload_image_pdf_tip')}}</div>
              </div>

              <div
                :class="{'r-complete': order.participant.documents.parent_passport,'d-list-p':true }"
              >
                <a
                  href="javascript:void(0)"
                  class="upload-document-link"
                  v-if="!order.participant.documents.parent_passport"
                  @click="uploadStuff(order.id, 'parent_passport')"
                >{{$t('clientarea.parent_passport')}}</a>
                <span v-else>{{$t('clientarea.parent_passport')}}</span>
                <div
                  class="popover-tips"
                  v-if="!order.participant.documents.parent_passport"
                >{{$t('clientarea.upload_image_pdf_tip')}}</div>
              </div>
            </div>
          </div>
          <!--<div class="order-list-item__info-labels">-->
          <!-- progress bar -->
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="lower-buttons">
      <button class="btn1 btn1-form-md" @click="modals.makeOrder=true">{{$t('form.new_order')}}</button>
    </div>

    <!--<a class="">
              {{ $store.state.auth.user.email }}
            </a>
    <NuxtLink to="/">
      Back home
    </NuxtLink>
    <a href="javascript:void(0)" @click="logout">Log out</a>-->

    <!------ @@@@@@@@@@@@@@@@@@@@    MODALS     @@@@@@@@@@@@@@@@@@@@@@@@@@ ------->
    <client-only>
      <!-- USER PIC -->
      <vk-modal :show.sync="modals.upload">
        <vk-modal-title>{{$t('clientarea.upload_avatar')}}</vk-modal-title>
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="modal-uploading" v-if="isSaving">
            <div class="inner loading">
              <vk-spinner ratio="2.5"></vk-spinner>
            </div>
          </div>
          <div class="dropbox" v-else>
            <input
              type="file"
              :name="form.avatar"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files, 'avatar'); fileCount = $event.target.files.length"
              accept="image/*"
              class="input-file"
            />
            <p>{{$t('drag_files_here')}}</p>
          </div>
        </form>
        <div class="mt-sm mb-xs flex-center">
          <button
            class="btn2 btn2-form-md"
            type="button"
            @click="modals.upload = false"
          >{{$t('form.cancel')}}</button>
          <!--<vk-button type="primary" >{{$t('form.upload')}}</vk-button>-->
        </div>
      </vk-modal>
      <!-- /USER PIC -->

      <!-- UPLOADING DOCS,PHOTOS, PDF -->
      <vk-modal :show.sync="modals.uploadStuff">
        <vk-modal-title
          :class="{'modal-small-header': true}"
        >{{$t('clientarea.d_'+uploadFieldName)}}</vk-modal-title>
        <div>
          {{$t('clientarea.dp_'+uploadFieldName)}}
          <a
            target="_blank"
            :href="$store.state.dwnFiles[$i18n.locale].medical_form"
            v-if="uploadFieldName==='medical_form'"
          >{{$t('download_form')}}</a>
          <a
            target="_blank"
            :href="$store.state.dwnFiles[$i18n.locale].rules"
            v-if="uploadFieldName==='rules'"
          >{{$t('download_rules')}}</a>
        </div>
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="modal-uploading" v-if="isSaving">
            <div class="inner loading">
              <vk-spinner ratio="2.5"></vk-spinner>
            </div>
          </div>
          <div class="dropbox" v-else>
            <input
              type="file"
              :name="uploadFieldName"
              :disabled="isSaving"
              @change="filesChange($event.target.name, $event.target.files, uploadFieldName); fileCount = $event.target.files.length"
              accept="image/*, application/pdf"
              class="input-file"
            />
            <p>{{$t('drag_files_here')}}</p>
          </div>
        </form>
        <div class="mt-sm mb-xs flex-center">
          <button
            class="btn2 btn2-form-md"
            type="button"
            @click="modals.uploadStuff = false"
          >{{$t('form.cancel')}}</button>
        </div>
      </vk-modal>
      <!-- /UPLOADING DOCS,PHOTOS, PDF -->

      <!-- PAYMENT -->
      <vk-modal center :show.sync="modals.pay4TheOrder">
        <vk-modal-title :class="{'modal-small-header': true}">{{$t('clientarea.pay_4the_order')}}</vk-modal-title>
        <p v-if="invoices.length>0">{{$t('clientarea.pay_4the_order_desc')}}</p>
        <p v-else>{{$t('clientarea.no_invoices')}}</p>
        <form enctype="multipart/form-data">
          <div class="modal-uploading" v-if="invoicesLoading">
            <div class="inner loading">
              <vk-spinner ratio="2.5"></vk-spinner>
            </div>
          </div>
          <div class="payment" v-else>
            <!--<p>
                {{$t('clientarea.do_payment')}}
            </p>-->
            <div class="invoice-list">
              <label v-for="(invoice, index) in invoices" :key="index">
                <input
                  class="uk-checkbox"
                  type="checkbox"
                  :value="invoice.id"
                  :disabled="false"
                  v-model="selectedInvoices"
                />
                <div class="invoice-list_div">
                  <span>{{$t('invoice.invoiceid')}} {{invoice.id}}</span>
                  <span>${{invoice.amount}}</span>
                </div>
              </label>
            </div>
          </div>
        </form>
        <div class="mt-md mb-xs flex-spread">
          <button
            class="btn2 btn2-form-md"
            type="button"
            @click="modals.pay4TheOrder = false"
          >{{$t('form.cancel')}}</button>
          <button
            class="btn1 btn1-form-md"
            type="button"
            :disabled="selectedInvoices.length==0"
            @click="selectedInvoices.length>0?PreparePaymentLink():null"
          >{{$t('form.pay')}}</button>
        </div>
      </vk-modal>
      <!-- PAYMENT -->

      <!--------------- @@@@ MAKE AN ORDER @@@ ---------------->
      <vk-modal-full center :show="modals.makeOrder" class="order-modal-wrapper">
        <vk-grid
          collapse
          class="uk-grid-collapse uk-child-width-expand@s uk-flex-middle order-modal-body order-modal"
        >
          <div>
            <div class="uk-width-auto@m"></div>
          </div>
          <div
            class="uk-width-2-3@m uk-padding-large order"
            style="background: #fff;
             box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px !important;
             align-self: start;
             min-height: 100vh;
             position: relative;"
          >
            <vk-modal-full-close large @click="modals.makeOrder = false"></vk-modal-full-close>
            <div class="modal-logo">
              <img src="/img/logo.png" alt />
            </div>
            <div>
              <OrderStepper :stepper="stepper" />
              <div class="order-form">
                <div class="uk-margin uk-margin2">
                  <div class="uk-form-controls" v-show="stepper==1">
                    <div class="uk-form-label">{{$t('form.select_product')}}</div>

                    <label>{{null}}</label>
                    <select
                      class="uk-select"
                      v-model="newOrder.productIndex"
                      name="product_id"
                      @change="newOrder.variationIndex=0"
                    >
                      <option
                        v-for="(product, index) in products"
                        :key="index"
                        :value="index"
                      >{{product.name}}</option>
                    </select>

                    <div v-if="products[newOrder.productIndex]" class="variations">
                      <div class="variation-select-flex">
                        <div class="left">
                          <label
                            class="r_f"
                            v-for="(variation, index2) in products[newOrder.productIndex].variations"
                            :key="index2"
                          >
                            <input
                              class="uk-radio"
                              :value="index2"
                              type="radio"
                              name="radio1"
                              v-model="newOrder.variationIndex"
                            />
                            {{variation.name}}
                            <span
                              class="a-price"
                            >$ {{(variation.price*1)}}</span>
                          </label>
                        </div>
                        <div
                          class="picture"
                          :style="{'background-image': 'url(' + products[newOrder.productIndex].image + ')'}"
                        ></div>
                      </div>
                      <div
                        class="uk-form-label2 mb-md mt-md plus-prepend"
                      >{{$t('form.select_addons')}}</div>

                      <div class="uk-form-controls d_f">
                        <label v-for="(addon, index) in availableAddons" :key="index">
                          <input
                            class="uk-checkbox"
                            :value="addon.id"
                            v-model="newOrder.addons"
                            type="checkbox"
                          />
                          {{addon.name}} ( $ {{addon.price}} )
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- // STEP 1 ---->

                  <!--- STEP 2 ---->
                  <div class="uk-form-controls" v-show="stepper==2">
                    <div class="uk-form-label">{{$t('form.add_participant')}}</div>
                    <form data-vv-scope="new0Participant">
                      <div class="edit-data-form form-verification">
                        <div v-for="(p, label, index) in newOrder.participant" :key="index">
                          <div class="uk-margin" v-if="label=='country'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <select
                              class="uk-select"
                              v-model="newOrder.participant.country_id"
                              name="country_id"
                            >
                              <option
                                v-for="(country, index) in countries"
                                :value="country.id"
                                :key="index"
                              >{{country.name}}</option>
                            </select>
                          </div>

                          <div class="uk-margin" v-else-if="label=='birth_date'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <datepicker
                              :input-class="{ 'uk-input': true, 'input-area-invalid': errors.has('new0Participant.birth_date') }"
                              :value="newOrder.participant[label]"
                              v-model.lazy="newOrder.participant[label]"
                              :format="customDateFormatter"
                              @input="forceFormatDateNewOrder('participant',label)"
                            ></datepicker>
                            <span
                              v-show="errors.has('new0Participant.birth_date')"
                              class="input-invalid"
                            >{{ errors.first('new0Participant.birth_date') }}</span>
                            <input
                              v-model="newOrder.participant[label]"
                              v-show="false"
                              :data-vv-as="$t('clientarea.db.'+label)"
                              name="birth_date"
                              v-validate="'required'"
                            />
                          </div>

                          <div class="uk-margin" v-else-if="label=='passport_expire'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <datepicker
                              :name="label"
                              :value="newOrder.participant[label]"
                              v-model.lazy="newOrder.participant[label]"
                              :input-class="'uk-input'"
                              :format="customDateFormatter"
                              @input="forceFormatDateNewOrder('participant',label)"
                            ></datepicker>
                          </div>

                          <div class="uk-margin" v-else-if="label=='email'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <input
                              class="uk-input"
                              :name="label"
                              :data-vv-as="$t('clientarea.db.'+label)"
                              v-model.lazy="newOrder.participant[label]"
                              v-validate="'required|email'"
                              type="text"
                              :placeholder="$t('clientarea.db.'+label)"
                            />
                            <span
                              v-if="errors.has('new0Participant.'+label)"
                              class="input-invalid"
                            >{{ errors.first('new0Participant.'+label) }}</span>
                          </div>

                          <div class="uk-margin" v-else-if="label!='country_id'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <input
                              class="uk-input"
                              :name="label"
                              :data-vv-as="$t('clientarea.db.'+label)"
                              v-model.lazy="newOrder.participant[label]"
                              v-validate="'required'"
                              type="text"
                              :placeholder="$t('clientarea.db.'+label)"
                            />
                            <span
                              v-if="errors.has('new0Participant.'+label)"
                              class="input-invalid"
                            >{{ errors.first('new0Participant.'+label) }}</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <!-- // step 2 \\--->

                  <!-- STEP 3 -->
                  <div class="uk-form-controls" v-show="stepper==3">
                    <div class="uk-form-label">{{$t('form.add_parent')}}</div>
                    <form data-vv-scope="new0Parent">
                      <div class="edit-data-form form-verification">
                        <div v-for="(p, label, index) in newOrder.parent" :key="index">
                          <div class="uk-margin" v-if="label=='country'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <select
                              class="uk-select"
                              v-model="newOrder.parent.country_id"
                              name="country_id"
                            >
                              <option
                                v-for="(country, index) in countries"
                                :value="country.id"
                                :key="index"
                              >{{country.name}}</option>
                            </select>
                          </div>

                          <div class="uk-margin" v-else-if="label=='birth_date'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <datepicker
                              :input-class="{ 'uk-input': true, 'input-area-invalid': errors.has('new0Parent.birth_date') }"
                              :value="newOrder.parent[label]"
                              v-model.lazy="newOrder.parent[label]"
                              :format="customDateFormatter"
                              @input="forceFormatDateNewOrder('parent',label)"
                            ></datepicker>
                            <span
                              v-show="errors.has('new0Parent.birth_date')"
                              class="input-invalid"
                            >{{ errors.first('new0Parent.birth_date') }}</span>
                            <input
                              v-model.lazy="newOrder.parent[label]"
                              v-show="false"
                              :data-vv-as="$t('clientarea.db.'+label)"
                              name="birth_date"
                              v-validate="'required'"
                            />
                          </div>

                          <div class="uk-margin" v-else-if="label=='passport_expire'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <datepicker
                              :name="label"
                              :value="newOrder.parent[label]"
                              v-model.lazy="newOrder.parent[label]"
                              :input-class="'uk-input'"
                              :format="customDateFormatter"
                              @input="forceFormatDateNewOrder('parent',label)"
                            ></datepicker>
                          </div>

                          <div class="uk-margin" v-else-if="label=='email'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <input
                              class="uk-input"
                              :name="label"
                              :data-vv-as="$t('clientarea.db.'+label)"
                              v-model.lazy="newOrder.parent[label]"
                              v-validate="'required|email'"
                              type="text"
                              :placeholder="$t('clientarea.db.'+label)"
                            />
                            <span
                              v-if="errors.has('new0Parent.'+label)"
                              class="input-invalid"
                            >{{ errors.first('new0Parent.'+label) }}</span>
                          </div>

                          <div class="uk-margin" v-else-if="label!='country_id'">
                            <label>{{$t('clientarea.db.'+label)}}</label>
                            <input
                              class="uk-input"
                              :name="label"
                              :data-vv-as="$t('clientarea.db.'+label)"
                              v-model.lazy="newOrder.parent[label]"
                              v-validate="'required'"
                              type="text"
                              :placeholder="$t('clientarea.db.'+label)"
                            />
                            <span
                              v-if="errors.has('new0Parent.'+label)"
                              class="input-invalid"
                            >{{ errors.first('new0Parent.'+label) }}</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <!-- // step 3 \\ -->

                  <!-- STEP 4 -->
                  <div class="uk-form-controls" v-if="stepper==4">
                    <div class="uk-form-label">{{$t('form.complete_registration')}}</div>
                    <div class="modal-uploading" v-if="!newOrder.sent">
                      <div class="inner loading">
                        <vk-spinner ratio="2.5"></vk-spinner>
                      </div>
                    </div>
                    <div class="payment" v-else>
                      <div class="lock-waiting" v-if="lock.stage">
                        <span v-if="lock.message">{{$t('payment.wait_verification')}}</span>
                        <img src="/img/pay-lock.gif" />
                      </div>
                      <div v-else>
                        <!--<p>
                {{$t('clientarea.do_payment')}}
                        </p>-->
                        <div class="invoice-list">
                          <label v-for="(invoice, index) in newOrder.invoices" :key="index">
                            <input
                              class="uk-checkbox"
                              type="checkbox"
                              :value="invoice.id"
                              :disabled="false"
                              v-model="selectedInvoices"
                            />
                            <div class="invoice-list_div">
                              <span>{{$t('invoice.invoiceid')}} {{invoice.id}}</span>
                              <span>${{invoice.amount}}</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="uk-form-controls d_f_jc_sb mt-md" v-show="!lock.stage">
                    <button
                      class="btn2 btn2-form-md"
                      v-if="(stepper<=1 && !newOrder.sent)"
                      @click="modals.makeOrder=false"
                    >{{$t('form.cancel')}}</button>
                    <button
                      class="btn2 btn2-form-md"
                      v-else-if="!newOrder.sent"
                      @click="stepper--"
                    >{{$t('form.back')}}</button>
                    <button
                      class="btn2 btn2-form-md"
                      v-else-if="newOrder.sent && 2==1"
                      @click="modals.makeOrder=false;fetchOrders();"
                    >{{$t('form.pay_later')}}</button>

                    <button
                      class="btn1 btn1-form-md"
                      v-if="!newOrder.sent"
                      @click="processTheOrder()"
                    >{{$t('form.continue')}}</button>
                    <NuxtLink
                      :to="{path: '/clientarea/order/'+newOrder.id}"
                      class="btn1 btn1-form-md"
                      v-if="newOrder.sent"
                      :disabled="selectedInvoices.length==0"
                    >{{$t('form.complete_register')}}</NuxtLink>

                    <button
                      class="btn1 btn1-form-md"
                      v-if="2==3"
                      :disabled="selectedInvoices.length==0"
                      @click="selectedInvoices.length>0?PreparePaymentLink():null"
                    >{{$t('form.pay')}}</button>
                  </div>
                </div>
              </div>

              <!-------- END ORDER FORM ------------------>
            </div>
          </div>
          <div>
            <div class="uk-width-auto@m"></div>
          </div>
        </vk-grid>
      </vk-modal-full>

      <vk-modal center v-show="lock.stage">
        <div class="lock-waiting">
          <span v-if="lock.message">{{$t('payment.wait_verification')}}</span>
          <img src="/img/pay-lock.gif" />
        </div>
      </vk-modal>
    </client-only>

    <!------ / MODALS ------->

    <vk-notification :messages.sync="messages" status="primary"></vk-notification>
  </div>
</template>

<script>
// uploading samples taken from:
// https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2

// some styles for popovers were taken from
// https://codepen.io/mihaeltomic/pen/PqxVaq

// the form could me moved to components.
// this is ho it works with vee-validate
// https://codesandbox.io/s/2wyrp5z000?from-embed

import OrderForm2 from "~/components/OrderForm2";
import OrderStepper from "~/components/OrderStepper";
import fileUploadMixin from "~/mixins/fileUploadMixin.js";
import paymentMixin from "~/mixins/paymentMixin.js";
import generalMixin from "~/mixins/generalMixin.js";

//const Cookie = process.client ? require('js-cookie') : undefined
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  mixins: [fileUploadMixin, paymentMixin, generalMixin],
  layout: "client-layout",
  // provide() {
  //   return {
  //     $validator: this.$validator,
  //   }
  // },
  data() {
    return {
      ordersLoading: true,
      bookings: [],
      workingID: null,
      participant: {},
      stepper: 1
    };
  },
  methods: {
    async deleteOrder(id) {
      var r = confirm(this.$t("clientarea.sure_to_delete"));
      if (r != true) {
        return null;
      }
      await this.$axios
        .get("/my_order/" + id + "/delete")
        .then(response => {
          this.fetchOrders();
        })
        .catch(err => {
          //this.snackbar.show = true;
          //this.error = err.response.data.error
        });
    },
    async fetchOrders() {
      this.ordersLoading = true;
      await this.$axios
        .get("/my_orders")
        .then(response => {
          this.bookings = response.data;
          this.calculateProgress();
          this.ordersLoading = false;
        })
        .catch(err => {
          //this.snackbar.show = true;
          //this.error = err.response.data.error
        });
    },
    async calculateProgress() {
      self = this;
      await this.bookings.forEach(function(e) {
        let incomplete = false;
        for (let key in self.formFields.participant) {
          if (self.formFields.participant.hasOwnProperty(key)) {
            let myKey = self.formFields.participant[key];
            if (!e.participant[myKey] || e.participant[myKey].length == 0) {
              incomplete = true;
              break;
            }
          }
        }
        if (!incomplete) {
          for (let key in self.formFields.parent) {
            if (self.formFields.parent.hasOwnProperty(key)) {
              let myKey = self.formFields.parent[key];
              if (
                !e.participant.participant_parent ||
                !e.participant.participant_parent[myKey] ||
                e.participant.participant_parent[myKey].length == 0
              ) {
                incomplete = true;
                break;
              }
            }
          }
        }
        e.complete = !incomplete;
      });
    },
    async getInvoices() {
      this.invoices = [];
      this.selectedInvoices = [];
      this.invoicesLoading = true;
      await this.$axios
        .get("/my_orders/" + this.workingID + "/invoices/list")
        .then(response => {
          this.invoices = response.data;
          this.invoicesLoading = false;
        })
        .catch(err => {
          //this.snackbar.show = true;
          //this.error = err.response.data.error
        });
    }
  },
  computed: {
    availableAddons() {
      return this.products[this.newOrder.productIndex].addons;
    }
  },
  components: {
    OrderForm2,
    OrderStepper
  },
  mounted() {
    this.fetchOrders();
    this.getCountries();
    this.getProducts();
    //this.getAddons();
  }
};
</script>

<style lang="scss" scoped>
//@import "../../../assets/scss/variables";
$green: #009688; //#4CAF50;
$red: #f0506e;

.lower-buttons {
  display: flex;
  margin-bottom: 140px;
  @media screen and (max-width: 750px) {
    margin-bottom: 40px;
    justify-content: center;
    button {
      height: 42px;
      width: 160px;
    }
  }
}
.order-list {
  margin-bottom: 50px;
}
.no-orders {
  padding: 30px 0;
}
.order-list-loading {
  min-height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paid {
  color: $green !important;
  font-weight: 700;
  padding-left: 8px;
}
.unpaid a {
  color: $red !important;
  font-weight: 700;
  padding-left: 8px;
}

a.upload-document-link {
  position: relative;
  display: flex;
  color: dimgray !important;
  align-self: stretch;
  width: 100%;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}
.d-list-p {
  position: relative;
  &:hover > .popover-tips {
    display: block !important;
    opacity: 1;
    transform: translateY(-20px, 0);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
  }
}
.modal-small-header {
  font-size: 16px;
  font-weight: 700;
}
.payment-status {
  display: block;
  margin-bottom: 8px;
}

.variation-select-flex {
  display: flex;
  .picture {
    flex: 0 0 160px;
    height: 160px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: bisque;
    background-size: cover;
  }
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
.order-form {
  padding: 10px 20px;
  @media (max-width: 900px) {
    margin: 0 !important;
    padding: 0 !important;
  }
}
.uk-margin2 {
  margin-bottom: 20px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 140px;
  @media (max-width: 900px) {
    margin: 0 !important;
    padding: 0 !important;
  }
}
.uk-radio,
.uk-checkbox {
  display: inline-block;
  height: 26px;
  width: 26px;
  overflow: hidden;
  margin-right: 16px;
  margin-bottom: 0;
  vertical-align: middle;
}
.r_f {
  display: flex;
  font-size: 18px;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
}
.btn2-form-xs {
  max-height: 42px;
}
header,
.uk-form-label {
  display: block;
  font-weight: 900;
  text-align: center;
  margin-top: 20px;
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    font-size: 18px;
  }
}
.order-form {
  .uk-form-label {
    @media (min-width: 900px) {
      text-align: left;
    }
  }
}
.a-price {
  width: 50%;
  right: 0;
  position: absolute;
  font-weight: 400;
  @media (max-width: 900px) {
    text-align: right;
    padding-right: 10px;
  }
  @media (max-width: 600px) {
    font-weight: 400;
    flex: 1;
    width: unset;
    position: relative;
  }
}
.d_f {
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    flex-direction: column;
  }
  label {
    flex: 0 0 50%;
    margin-bottom: 30px;
    @media (max-width: 900px) {
      margin-bottom: 20px;
    }
  }
}
.d_f_jc_sb {
  display: flex;
  justify-content: space-between;
}

.plus-prepend {
  padding-left: 40px;
  position: relative;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  &:after {
    content: "";
    background-image: url("/img/plus-icon.png");
    background-size: cover;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    z-index: 222222222;
    bottom: 0;
  }
}

.variations {
  margin-top: 40px;
}
.btn1-form-md {
  min-width: unset !important;
  padding-right: 30px !important;
  padding-left: 30px !important;
}
.invoice-list {
  margin: 90px 0;
}
</style>