<template>
  <div>
    <!-- USER DETAILS -->
    <div class="user-details" v-if="order.participant">
      <div class="photo">
        <div
          v-if="order.participant.avatar"
          class="item__img"
          :style="{ backgroundImage: 'url(' + $store.state.imgURL + order.participant.avatar + ')' }"
        ></div>
        <div v-else class="item__img-generic">
          <button class="btn2 btn2-form-xs" @click="uploadAvatarForm(order.id)">Upload image</button>
        </div>
      </div>
      <div class="name">
        <h2>{{order.participant.last_name}} {{order.participant.first_name}}</h2>
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
              @click="modals.pay4TheOrder = true"
            >{{$t('clientarea.order_make_payment')}}</a>
          </span>
        </span>
        <div class="documents">
          {{$t('clientarea.documents')}}:
          <ul>
            <li v-for="(invoice, index) in order.invoices" :key="index">
              <a
                href="javascript:void(0)"
                :style="(invoice.paid==1)?'color: #009688;':''"
                @click="downloadInvoice(invoice.id)"
              >
                <vk-icon icon="cloud-download"></vk-icon>
                Invoice ID {{invoice.id}}
              </a>
              <a
                href="javascript:void(0)"
                v-if="invoice.paid==0"
                @click="payInvoice(invoice.id)"
                class="pay-invoice"
              >{{$t('clientarea.pay_this_invoice')}}</a>
            </li>
          </ul>
          <a href="javascript:void(0)" class="voucher" @click="downloadVoucher(order.id)">
            <vk-icon icon="cloud-download"></vk-icon>Voucher
          </a>
        </div>
      </div>
      <div class="progress">
        <div :class="['progress-'+ Math.floor(order.progress/5)*5, 'pie-wrapper', 'style-2']">
          <span class="p-label">
            {{Math.floor(order.progress*1)}}
            <span class="smaller">%</span>
          </span>
          <div class="pie">
            <div class="left-side half-circle"></div>
            <div class="right-side half-circle"></div>
          </div>
          <div class="shadow"></div>
        </div>
      </div>
    </div>
    <!-- /USER DETAILS -->

    <!-- PARTICIPANT AND PARENT DETAILS -->
    <div class="user-forms" v-if="order.participant">
      <h2>{{$t('clientarea.applicant_data')}}</h2>
      <div class="user-data">
        <div class="participant">
          <div class="dd-header">
            <h3>{{$t('clientarea.participant_info')}}</h3>
            <span v-if="order.participant.complete" class="green">Complete</span>
            <span v-else class="red">{{$t('form.incomplete')}}</span>
          </div>

          <div
            class="participant__label"
            v-for="(p, label, index) in orderParticipant"
            :key="index"
          >
            <span class="participant__label_key">{{$t('clientarea.db.'+label)}}</span>
            <span :class="{ 'participant__label_value' : true, 'incomplete_value': !p}">
              <span v-if="label=='country'">{{p.name}}</span>
              <span v-else>{{p}}</span>
            </span>
          </div>
        </div>
        <button
          @click="modals.editProfile = true"
          class="btn2 btn2-form-md"
        >{{$t('clientarea.edit_participant_data')}}</button>

        <div class="parent" v-if="order.participant.participant_parent">
          <div class="dd-header">
            <h3>{{$t('clientarea.parent_info')}}</h3>
            <span v-if="order.participant.participant_parent.complete" class="green">Complete</span>
            <span v-else class="red">{{$t('form.incomplete')}}</span>
          </div>

          <div
            class="participant__label"
            v-for="(p, label, index) in orderParticipantParent"
            :key="index"
          >
            <span class="participant__label_key">{{$t('clientarea.db.'+label)}}</span>
            <span :class="{ 'participant__label_value' : true, 'incomplete_value': !p}">
              <span v-if="label=='country'">{{p.name}}</span>
              <span v-else>{{p}}</span>
            </span>
          </div>
        </div>
        <div v-else class="parent"></div>
        <button
          @click="modals.editParent = true"
          class="btn2 btn2-form-md"
        >{{$t('clientarea.edit_parent_data')}}</button>
      </div>
    </div>
    <div v-else-if="ordersLoading">
      <client-only>
        <div class="inner loading main-loading">
          <vk-spinner ratio="2.5"></vk-spinner>
        </div>
      </client-only>
    </div>
    <div v-else>
      <button
        @click="modals.uploadStuff = false"
        class="btn1 btn1-form-md"
      >{{$t('clientarea.create_participant')}}</button>
    </div>
    <!-- /PARTICIPANT AND PARENT DETAILS -->

    <!-- ORDER DETAILS -->
    <div class="order-details" v-if="order.variation">
      <div class="accomodation">
        <h3>{{$t('clientarea.accomodation_type')}}</h3>
        <div class="uk-form-controls uk-form-controls-text accomodation-list">
          <label v-for="(varnt, index) in order.variation.product.variations" :key="index">
            <input
              class="uk-radio"
              type="radio"
              :value="varnt.id"
              :disabled="order.variation_id != varnt.id"
              v-model="order.variation_id"
            />
            <span>{{varnt.name}}</span>
          </label>
        </div>
      </div>
      <div class="options">
        <h3>{{$t('clientarea.addition_options')}}</h3>
        <div class="uk-form-controls uk-form-controls-text accomodation-list">
          <label v-for="(addon, index) in availableAddonsSelected" :key="index">
            <input
              class="uk-checkbox"
              type="checkbox"
              :value="addon.id"
              disabled="disabled"
              v-model="selectedAddons"
            />
            <span>{{addon.name}}</span>
          </label>
          <p v-if="selectedAddons.length==0">{{$t('clientarea.addition_options_add')}}</p>
        </div>
      </div>
      <div class="options">
        <h3>{{$t('clientarea.available_options')}}</h3>
        <div class="uk-form-controls uk-form-controls-text accomodation-list">
          <label v-for="(addon, index) in availableAddonsFiltered" :key="index">
            <input
              class="uk-checkbox"
              type="checkbox"
              :value="addon.id"
              :disabled="false"
              @change="addonsTotalCalc()"
              v-model="selectableAddons"
            />
            <span>{{addon.name}}</span>
          </label>
        </div>
        <vk-button
          v-if="selectableAddons.length>0 && availableAddonsFiltered.length>0"
          @click="modals.createInvoice=true"
          class="uk-margin-small-right"
          style="align-self:center"
        >{{$t('clientarea.create_invoice')}}</vk-button>
      </div>
    </div>
    <!-- /ORDER DETAILS -->

    <!-- UPLOADED DOCUMENTS -->
    <div class="user-documents" v-if="order.participant">
      <h2>{{$t('clientarea.uploaded_documents')}}</h2>
      <div v-if="order.participant.documents" class="uploaded-documents">
        <div
          class="documents__label"
          v-for="(p, label, index) in orderParticipantDocuments"
          :key="index"
        >
          <!-- SECTION -->
          <div class="document-section">
            <div
              class="documents__label_value"
              v-if="documents[label].type=='image'"
              :style="{ 'background-image': 'url(' + documents[label].src +')' }"
            >
              <client-only>
                <vk-button-group :ref="'group-'+order.id" class="top-menu">
                  <div>
                    <vk-button class="btn-dots">&#8226;</vk-button>
                    <vk-dropdown mode="click" :boundary="'group-'+order.id" position="bottom-right">
                      <vk-nav-dropdown>
                        <li>
                          <a
                            href="javascript:void(0)"
                            @click="deleteFile(order.participant.documents.id,label)"
                          >{{$t('clientarea.delete_document')}}</a>
                        </li>
                      </vk-nav-dropdown>
                    </vk-dropdown>
                  </div>
                </vk-button-group>
              </client-only>
              <span class="documents__label_key">{{$t('clientarea.db.'+label)}}</span>
            </div>
            <div class="documents__label_value pdf" v-else-if="documents[label].type=='pdf'">
              <client-only>
                <vk-button-group :ref="'group-'+order.id" class="top-menu">
                  <div>
                    <vk-button class="btn-dots">&#8226;</vk-button>
                    <vk-dropdown mode="click" :boundary="'group-'+order.id" position="bottom-right">
                      <vk-nav-dropdown>
                        <li>
                          <a
                            href="javascript:void(0)"
                            @click="downloadFile(order.participant.documents.id,label)"
                          >{{$t('clientarea.download_document')}}</a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            @click="deleteFile(order.participant.documents.id,label)"
                          >{{$t('clientarea.delete_document')}}</a>
                        </li>
                      </vk-nav-dropdown>
                    </vk-dropdown>
                  </div>
                </vk-button-group>
              </client-only>
              <span class="documents__label_key">{{$t('clientarea.db.'+label)}}</span>
            </div>
            <div v-else class="documents__label_value light-bg-warning">
              <button
                v-if="!documents[label].type"
                class="upload-document-link btn1 btn1-form-md"
                @click="uploadStuff(order.id, label)"
              >{{$t('form.upload')}}</button>
              <span class="documents__label_key">{{$t('clientarea.db.'+label)}}</span>
            </div>
            <div class="document-description">
              <div class="dd-header">
                <h3>{{$t('clientarea.db.'+label)}}</h3>
                <span v-if="documents[label].type" class="green">Complete</span>
                <span v-else class="red">{{$t('form.incomplete')}}</span>
              </div>
              <p
                v-html="$t('clientarea.db.'+label+'_desc',{ url: $store.state.dwnFiles[$i18n.locale][label]})"
              ></p>
            </div>
            <div class="document-buttons">
              <button
                v-if="!documents[label].type"
                class="btn1 btn1-form-md"
                @click="uploadStuff(order.id, label)"
              >{{$t('form.upload')}}</button>
              <button
                v-else-if="documents[label].type=='pdf'"
                class="btn2 btn2-form-md"
                @click="downloadFile(order.participant.documents.id,label)"
              >{{$t('form.download')}}</button>
              <button
                v-else
                class="btn2 btn2-form-md"
                @click="showDocument(order.participant.documents.id,label)"
              >{{$t('form.show')}}</button>
            </div>
          </div>
          <!-- /END SECTION -->
        </div>
      </div>
    </div>
    <!-- /UPLOADED DOCUMENTS -->

    <!------------------------- @@@@@@@@@    MODALS    @@@@@@@@@@@@@ -------------------------------->
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
        <p>
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
        </p>
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

      <!--- SHOW IMAGE-DOCUMENT --->
      <vk-modal :show.sync="modals.showImage" class="show-image-modal">
        <div class="mt-xs mb-md flex-center">
          <img :src="modals.showImageSrc" />
          <button
            class="btn2 btn2-form-xs button-fixed"
            type="button"
            @click="modals.showImage = false;modals.showImageSrc = null"
          >{{$t('form.close')}}</button>
        </div>
      </vk-modal>
      <!--- SHOW IMAGE-DOCUMENT --->

      <!-- PAYMENT -->
      <vk-modal center :show.sync="modals.pay4TheOrder">
        <vk-modal-title :class="{'modal-small-header': true}">{{$t('clientarea.pay_4the_order')}}</vk-modal-title>
        <p>{{$t('clientarea.pay_4the_order')}}</p>
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
              <label v-for="(invoice, index) in unpaidInvoices" :key="index">
                <input
                  class="uk-checkbox"
                  type="checkbox"
                  :value="invoice.id"
                  :disabled="false"
                  v-model="selectedInvoices"
                />
                <div class="invoice-list_div">
                  <span>Invoice ID #{{invoice.id}}</span>
                  <span>${{invoice.amount}}</span>
                </div>
              </label>
            </div>
          </div>
        </form>
        <div class="flex-spread mt-sm mb-xs modal-bottom-buttons">
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
      <!-- /PAYMENT -->

      <!-- EDIT PROFILE -->
      <vk-modal :show.sync="modals.editProfile">
        <vk-modal-title
          :class="{'modal-small-header': true}"
        >{{$t('clientarea.edit_participant_data')}}</vk-modal-title>
        <p>{{$t('clientarea.edit_participant_data_desc')}}</p>
        <form id="editUserForm" data-vv-scope="participant">
          <div class="edit-data-form form-verification">
            <div v-for="(p, label, index) in orderParticipant" :key="index">
              <div class="uk-margin" v-if="label=='country'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <select class="uk-select" v-model="order.participant.country_id" name="country_id">
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
                  :name="label"
                  :value="order.participant[label]"
                  v-model.lazy="order.participant[label]"
                  :input-class="'uk-input'"
                  :format="customFormatter"
                  @input="forceFormatDate(label)"
                ></datepicker>
              </div>

              <div class="uk-margin" v-else-if="label=='passport_expire'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <datepicker
                  :name="label"
                  :value="order.participant[label]"
                  v-model.lazy="order.participant[label]"
                  :input-class="'uk-input'"
                  :format="customFormatter"
                  @input="forceFormatDate(label)"
                ></datepicker>
              </div>

              <div class="uk-margin" v-else-if="label=='email'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <input
                  class="uk-input"
                  :name="label"
                  :data-vv-as="$t('clientarea.db.'+label)"
                  v-model.lazy="order.participant[label]"
                  v-validate="'required|email'"
                  type="text"
                  :placeholder="$t('clientarea.db.'+label)"
                />
                <span v-if="errors.has(label)" class="input-invalid">{{ errors.first(label) }}</span>
              </div>

              <div class="uk-margin" v-else>
                <label>{{$t('clientarea.db.'+label)}}</label>
                <input
                  class="uk-input"
                  :name="label"
                  :data-vv-as="$t('clientarea.db.'+label)"
                  v-model.lazy="order.participant[label]"
                  v-validate="'required'"
                  type="text"
                  :placeholder="$t('clientarea.db.'+label)"
                />
                <span v-if="errors.has(label)" class="input-invalid">{{ errors.first(label) }}</span>
              </div>
            </div>
          </div>
        </form>
        <div class="flex-spread mt-sm mb-xs modal-bottom-buttons">
          <button
            class="btn2 btn2-form-md"
            type="button"
            @click="modals.editProfile = false"
          >{{$t('form.cancel')}}</button>
          <button class="btn1 btn1-form-md" type="button" @click="saveProfile()">{{$t('form.save')}}</button>
        </div>
      </vk-modal>
      <!-- /EDIT PROFILE -->

      <!-- EDIT PARENT -->
      <vk-modal
        :show.sync="modals.editParent"
        v-if="order.participant && order.participant.participant_parent"
      >
        <vk-modal-title :class="{'modal-small-header': true}">{{$t('clientarea.edit_parent_data')}}</vk-modal-title>
        <p>{{$t('clientarea.edit_parent_data_desc')}}</p>
        <form id="editParentForm" data-vv-scope="parent">
          <div class="edit-data-form form-verification">
            <div v-for="(p, label, index) in orderParticipantParent" :key="index">
              <div class="uk-margin" v-if="label=='birth_date'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <datepicker
                  :name="label"
                  :value="order.participant.participant_parent[label]"
                  v-model.lazy="order.participant.participant_parent[label]"
                  :input-class="'uk-input'"
                  :format="customFormatter"
                  @input="forceFormatDate(label)"
                ></datepicker>
              </div>

              <div class="uk-margin" v-else-if="label=='passport_expire'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <datepicker
                  :name="label"
                  :value="order.participant.participant_parent[label]"
                  v-model.lazy="order.participant.participant_parent[label]"
                  :input-class="'uk-input'"
                  :format="customFormatter"
                  @input="forceFormatDate(label)"
                ></datepicker>
              </div>

              <div class="uk-margin" v-else-if="label=='email'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <input
                  class="uk-input"
                  :name="label"
                  :data-vv-as="$t('clientarea.db.'+label)"
                  v-model.lazy="order.participant.participant_parent[label]"
                  v-validate="'required|email'"
                  type="text"
                  :placeholder="$t('clientarea.db.'+label)"
                />
                <span v-if="errors.has(label)" class="input-invalid">{{ errors.first(label) }}</span>
              </div>

              <div class="uk-margin" v-else>
                <label>{{$t('clientarea.db.'+label)}}</label>
                <input
                  class="uk-input"
                  :name="label"
                  :data-vv-as="$t('clientarea.db.'+label)"
                  v-model.lazy="order.participant.participant_parent[label]"
                  v-validate="'required'"
                  type="text"
                  :placeholder="$t('clientarea.db.'+label)"
                />
                <span v-if="errors.has(label)" class="input-invalid">{{ errors.first(label) }}</span>
              </div>
            </div>
          </div>
        </form>
        <div class="flex-spread mt-sm mb-xs modal-bottom-buttons">
          <button
            class="btn2 btn2-form-md"
            type="button"
            @click="modals.editParent = false"
          >{{$t('form.cancel')}}</button>
          <button class="btn1 btn1-form-md" type="button" @click="saveParent()">{{$t('form.save')}}</button>
        </div>
      </vk-modal>
      <!-- /EDIT PROFILE -->

      <!-- CREATE INVOICE -->
      <vk-modal
        center
        :show.sync="modals.createInvoice"
        v-if="order.participant && order.participant.participant_parent"
      >
        <vk-modal-title :class="{'modal-small-header': true}">{{$t('clientarea.add_options')}}</vk-modal-title>
        <div class="modal-uploading" v-if="createInvoiceSaving">
          <div class="inner loading">
            <vk-spinner ratio="2.5"></vk-spinner>
          </div>
        </div>
        <div v-else>
          <p>{{$t('clientarea.add_these_options_to_the_order')}}</p>
          <div class="uk-form-controls uk-form-controls-text accomodation-list">
            <div
              class="modal-invoice-list"
              v-for="(addon, index) in availableAddonsFiltered"
              :key="index"
            >
              <label>
                <input
                  class="uk-checkbox"
                  type="checkbox"
                  :value="addon.id"
                  :disabled="false"
                  @change="addonsTotalCalc()"
                  v-model="selectableAddons"
                />
                <span>{{addon.name}}</span>
              </label>
              <span>
                USD
                <span class="price">{{addon.price}}</span>
              </span>
            </div>
          </div>
          <div class="total">
            Total: USD
            <span>{{(addonsTotal).toFixed(2)}}</span>
          </div>

          <div class="mt-md mb-xs flex-spread">
            <button
              class="btn2 btn2-form-md"
              type="button"
              @click="modals.createInvoice = false"
            >{{$t('form.cancel')}}</button>
            <button
              class="btn1 btn1-form-md"
              type="button"
              @click="createInvoice()"
              :disabled="selectableAddons.length==0"
            >{{$t('form.next')}}</button>
          </div>
        </div>
      </vk-modal>
      <!-- /CREATE INVOICE -->

      <vk-modal center v-show="lock.stage">
        <div class="lock-waiting">
          <span v-if="lock.message">{{$t('payment.wait_verification')}}</span>
          <img src="/img/pay-lock.gif" />
        </div>
      </vk-modal>

      <vk-notification :messages.sync="messages" status="primary"></vk-notification>
    </client-only>
    <!------ / MODALS ------->
  </div>
</template>

<script>
// This is how to access to route params
// https://stackoverflow.com/questions/49866867/nuxt-route-with-dynamic-path-multiple-parameters

// radial progress bar
// https://codepen.io/jo-asakura/pen/stFHi

import fileUploadMixin from "~/mixins/fileUploadMixin.js";
import referralMixin from "~/mixins/referralMixin.js";
import paymentMixin from "~/mixins/paymentMixin.js";
import generalMixin from "~/mixins/generalMixin.js";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  layout: "client-layout",
  mixins: [fileUploadMixin, referralMixin, paymentMixin, generalMixin],
  validate({ params }) {
    return /^([0-9]{1,12})$/.test(params.id);
  },
  data() {
    return {
      ordersLoading: true,
      id: null,
      addonsTotal: 0,
      countries: [],
      order: {},
      workingID: null,
      createInvoiceSaving: false,
      selectedAddons: [],
      selectableAddons: [],
      documentsShown: [
        "passport",
        "parent_approval",
        "rules",
        "photo",
        "medical_form",
        "parent_passport"
      ],
      imagePlaceholder:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      documents: {
        passport: {
          type: null,
          src: this.imagePlaceholder
        },
        parent_approval: {
          type: null,
          src: this.imagePlaceholder
        },
        rules: {
          type: null,
          src: this.imagePlaceholder
        },
        photo: {
          type: null,
          src: this.imagePlaceholder
        },
        medical_form: {
          type: null,
          src: this.imagePlaceholder
        },
        parent_passport: {
          type: null,
          src: this.imagePlaceholder
        }
      }
    };
  },
  methods: {
    downloadVoucher(id) {},
    showDocument(documentID, key) {
      //alert('Feature is not yet implemented')
      this.modals.showImage = true;
      this.modals.showImageSrc = this.documents[key].src;
    },
    forceFormatDate(key) {
      let r = this.customFormatter(this.order.participant[key]);
      this.order.participant[key] = r;
    },
    customFormatter(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    saveProfile() {
      this.$validator.validateAll("participant").then(result => {
        if (result) {
          if (
            !this.checkPassportExpires(
              this.order.participant.passport_expire,
              this.order.variation.product.starts_at
            )
          ) {
            this.messages.push({
              message: this.$t("clientarea.messages.passport_error"),
              status: "danger"
            });
            event.preventDefault();
            event.stopPropagation();
            return null;
          }
          this.sendData("participant");
        } else {
          this.messages.push({
            message: this.$t("clientarea.messages.form_general_error"),
            status: "danger"
          });
        }
      });
    },
    saveParent() {
      this.$validator.validateAll("parent").then(result => {
        if (result) {
          if (
            !this.checkPassportExpires(
              this.order.participant.passport_expire,
              this.order.variation.product.starts_at
            )
          ) {
            this.messages.push({
              message: this.$t("clientarea.messages.passport_error"),
              status: "danger"
            });
            event.preventDefault();
            event.stopPropagation();
            return null;
          }
          this.sendData("parent");
        } else {
          this.messages.push({
            message: this.$t("clientarea.messages.form_general_error"),
            status: "danger"
          });
        }
      });
    },
    async sendData(key) {
      await this.$axios
        .post("/my_order/" + this.order.id + "/data/update/" + key, {
          data: this.order
        })
        .then(response => {
          this.modals.editProfile = false;
          this.modals.editParent = false;
          this.messages.push(this.$t("clientarea.messages.updated"));
          this.calculateProgress();
        })
        .catch(err => {});
    },
    async fetchOrders() {
      this.ordersLoading = true;
      this.selectedAddons = [];
      if (!this.id) {
        // display the error
        return null;
      }
      await this.$axios
        .get("/my_order/" + this.id)
        .then(response => {
          //this.$auth.logout();
          //this.$router.push('/login')
          this.order = response.data;
          this.ordersLoading = false;
          this.fetchSecretDocuments();
          for (let i = 0; i < this.order.addons.length; i++) {
            this.selectedAddons.push(this.order.addons[i].addon_id);
          }
          this.availableAddons = this.order.variation.product.addons;
          this.calculateProgress();
        })
        .catch(err => {
          //this.snackbar.show = true;
          //this.error = err.response.data.error
        });
    },
    async calculateProgress() {
      if (!this.order.participant) {
        return null;
      }
      this.order.participant.complete = true;
      for (let key in this.formFields.participant) {
        if (this.formFields.participant.hasOwnProperty(key)) {
          let myKey = this.formFields.participant[key];
          if (
            !this.order.participant[myKey] ||
            this.order.participant[myKey].length == 0
          ) {
            this.order.participant.complete = false;
            break;
          }
        }
      }
      if (this.order.participant.participant_parent) {
        this.order.participant.participant_parent.complete = true;
        for (let key in this.formFields.parent) {
          if (this.formFields.parent.hasOwnProperty(key)) {
            let myKey = this.formFields.parent[key];
            if (
              !this.order.participant.participant_parent[myKey] ||
              this.order.participant.participant_parent[myKey].length == 0
            ) {
              this.order.participant.participant_parent.complete = false;
              break;
            }
          }
        }
      }
    },
    fetchSecretDocuments() {
      if (this.order.participant) {
        if (this.order.participant.documents) {
          for (let key in this.order.participant.documents) {
            if (
              this.order.participant.documents[key] &&
              this.documentsShown.indexOf(key) >= 0
            ) {
              let id = this.order.participant.documents.id;
              let re = /(?:\.([^.]+))?$/;
              let filename = this.order.participant.documents[key];
              let ext = re.exec(filename)[1];
              ////console.log('FILENAME: ' + filename, ext);
              if (ext == "pdf") {
                this.documents[key].type = "pdf";
              } else if (ext.length > 1) {
                this.documents[key].type = "image";
              }
              if (ext) {
                this.getImage(id, key);
              }
            }
          }
        }
      }
    },
    async getImage(id, slug) {
      let r = null;
      await this.$axios
        .get("/documents/image/" + id + "/" + slug, {
          responseType: "blob",
          timeout: 30000
        })
        .then(response => {
          let reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = () => {
            this.documents[slug].src = reader.result;
          };
        })
        .finally(() => {
          ////console.log(this.documents)
        });
      //return r;
    },
    async deleteFile(id, slug) {
      var r = confirm(this.$t("clientarea.sure_to_delete"));
      if (r == true) {
        await this.$axios
          .get("/documents/delete/" + id + "/" + slug)
          .then(response => {
            this.documents[slug].src = this.imagePlaceholder;
            this.documents[slug].type = null;
          })
          .catch(err => {
            this.messages.push({
              message: this.$t("clientarea.messages.file_cannot_be_deleted"),
              status: "danger"
            });
          });
      }
    },
    async downloadFile(id, slug) {
      await this.$axios
        .get("/documents/image/" + id + "/" + slug, {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = new Blob([response.data], { type: "application/pdf" }),
            url = window.URL.createObjectURL(blob);
          window.open(url);
        });
    },
    async downloadInvoice(id) {
      await this.$axios
        .get("/invoice/download/" + id, {
          responseType: "arraybuffer"
        })
        .then(response => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let url = window.URL.createObjectURL(blob);
          //window.open(url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf");
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          console.log(err);
          this.messages.push({
            message: this.$t("clientarea.messages.invoice_not_found"),
            status: "danger"
          });
        });
    },

    uploadAvatarForm(id) {
      this.workingID = id;
      this.modals.upload = true;
    },
    addonsTotalCalc() {
      let r = 0;
      if (this.availableAddons.length == 0) return 0;
      for (let i = 0; this.availableAddons.length > i; i++) {
        for (let j = 0; this.selectableAddons.length > j; j++) {
          if (
            this.availableAddons[i].hasOwnProperty("id") &&
            this.availableAddons[i].id == this.selectableAddons[j]
          ) {
            r += this.availableAddons[i].price * 1;
          }
        }
      }
      this.addonsTotal = r;
    },
    async createInvoice() {
      this.createInvoiceSaving = true;
      await this.$axios
        .post("my_order/" + this.order.id + "/addons/add", {
          data: this.selectableAddons
        })
        .then(response => {
          this.createInvoiceSaving = false;
          this.modals.createInvoice = false;
          this.messages.push(this.$t("clientarea.messages.invoice_created"));
        })
        .catch(err => {})
        .finally(() => {
          this.fetchOrders();
        });
    }
  },
  created() {},
  computed: {
    unpaidInvoices() {
      let r = [];
      if (typeof this.order.invoices != "undefined") {
        r = this.order.invoices.filter(m => m.paid == 0);
      }
      return r;
    },
    availableAddonsSelected() {
      return this.availableAddons.filter(
        i => this.selectedAddons.indexOf(i.id) >= 0
      );
    },
    availableAddonsFiltered() {
      return this.availableAddons.filter(
        i => this.selectedAddons.indexOf(i.id) == -1
      );
    },
    orderParticipant() {
      if (!this.order.participant) return null;
      let raw = this.order.participant;
      const filtered = Object.keys(raw)
        .filter(key => this.fieldsShown.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: raw[key]
          };
        }, {});
      return filtered;
    },
    orderParticipantParent() {
      if (!this.order.participant.participant_parent) return null;
      let raw = this.order.participant.participant_parent;
      const filtered = Object.keys(raw)
        .filter(key => this.fieldsShown.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: raw[key]
          };
        }, {});
      return filtered;
    },
    orderParticipantDocuments() {
      if (!this.order.participant.documents) return null;
      let raw = this.order.participant.documents;
      const filtered = Object.keys(raw)
        .filter(key => this.documentsShown.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: raw[key]
          };
        }, {});
      return filtered;
    }
  },
  mounted() {
    var _id = this.$route.params.id;
    this.id = _id;
    this.workingID = _id;
    this.fetchOrders();
    this.getCountries();
    this.invoicesLoading = false;
    if (this.$route.query.reload == "force") {
      //this.$router.replace({
      //  query: { reload: false }
      //})
      let url = window.location.href;
      let newUrl = url.split("?")[0];
      window.location.replace(newUrl);
      //this.$router.go()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/variables";
.button-fixed {
  position: absolute;
  bottom: 18px;
  right: 20px;
  height: 36px;
}
.incomplete_value {
  background: #f9ecee;
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
.uk-dropdown.uk-open {
  padding: 14px;
  min-width: 100px;
}
.document-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.voucher {
  margin-left: 30px;
  color: #009688 !important;
}
.show-image-modal {
  .uk-modal-body {
    padding: 0 !important;
  }
  @media (max-width: 750px) {
    img {
      margin-bottom: 10px;
    }
  }
}
.main-loading {
  @media (max-width: 750px) {
    display: flex;
    margin: 40px auto;
    margin-top: 80px;
    justify-content: center;
    align-items: center;
  }
}
.document-section {
  grid-template-columns: 140px 1fr 160px;
  display: grid;
  grid-gap: 30px;
  box-shadow: 4px 3px 10px rgba(0, 55, 55, 0.08);
  .document-description {
    padding: 16px 0;
  }
  @media (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, minmax(min-content, max-content));
    grid-gap: 10px;
    margin-bottom: 30px;
    box-shadow: none;
    .document-description {
      grid-column: 1/-1;
      grid-row: 1/2;
    }
    .documents__label_value {
      grid-row: 2/3;
    }
    .document-buttons {
      grid-row: 2/3;
      grid-column: 2/-1;
      button {
        width: 120px !important;
        min-width: 120px !important;
        height: 38px;
      }
    }
  }

  .documents__label_key {
    display: none;
  }
}

.dd-header {
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
  }
  h3 {
    margin-bottom: 0;
    line-height: 1;
  }
  .red,
  .green {
    font-weight: 700;
    margin-left: 30px;
    font-size: 14px;
    @media (max-width: 750px) {
      margin-left: 0;
      margin-top: 16px;
    }
  }
  .red {
    color: red !important;
  }
  .green {
    color: #009688 !important;
  }
}

.pay-invoice {
  background: #8c4d8c;
  color: white !important;
  padding: 2px 5px;
  border-radius: 5px;
  margin-left: 8px;
}
.total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  margin-bottom: 40px;
  span {
    font-size: 20px;
    font-weight: 700;
    color: $active-element-color !important;
    padding-right: 30px;
    margin-left: 8px;
  }
}
.modal-invoice-list {
  display: flex;
  justify-content: space-between;
  .price {
    padding-right: 30px;
    font-weight: 700;
  }
}
.pdf {
  background-image: url("/img/pdf.png") !important;
  background-repeat: no-repeat;
  background-size: 80px 80px !important;
}
.parent {
  grid-row: 1/2;
  grid-column: 2/3;
  @media (max-width: 750px) {
    grid-row: 3/4;
    grid-column: 1/2;
  }
}
.uploaded-documents {
  display: grid;
  //grid-template-columns: repeat(3,1fr);
  //grid-template-rows: repeat(2,300px);
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(6, 140px);
  grid-gap: 40px;
  margin-bottom: 80px;
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
}
.documents__label {
  display: grid;
  position: relative;
  .documents__label_key {
    position: absolute;
    background: rgba(0, 0, 0, 0.65);
    color: white;
    width: 100%;
    bottom: 0;
    padding: 10px 30px;
  }
  .documents__label_value {
    position: relative;
    background: #797979;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media (max-width: 750px) {
      min-height: 120px;
      min-width: 120px;
    }
    .upload-document-link {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: $btn-color;
      color: white;
      font-weight: 700;
      border: 0;
      @media (max-width: 750px) {
        display: none;
      }
    }
    .btn-dots {
      background: #dfdfdf;
      &:hover,
      &:active,
      &:focus {
        background: $btn-color !important;
        color: white !important;
      }
    }
    .top-menu {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
.light-bg-warning {
  background: #ccc !important;
  .documents__label_key {
    background: $btn-color;
  }
}
.user-forms,
.user-documents {
  border-top: 1px solid #dedede;
  margin-top: 20px;
  margin-bottom: 120px;
  padding-left: 10px;
  @media (max-width: 750px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-top: 60px;
  }
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
}
.user-data {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 30px;
  @media (max-width: 750px) {
    grid-template-columns: minmax(min-content, 1fr);
  }
  button {
    justify-self: center;
    align-self: center;
  }
}
.participant {
  display: flex;
  flex-direction: column;
}
.participant__label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: #fbf9f9;
  & > span {
    display: inline-block;
    width: 60%;
    text-align: left;
    padding: 6px 0;
    padding-left: 8px;
    @media (max-width: 750px) {
      font-size: 12px;
      line-height: 1.4;
      padding: 4px 0;
      max-width: calc(50% - 10px);
      overflow: hidden;
    }
  }
  .participant__label_key {
    width: 40%;
    border-right: white 8px solid !important;
  }
}
.item__img-generic {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-details {
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 750px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 200px minmax(min-content, max-content);
    grid-row-gap: 20px;
    margin-top: 30px;
    padding: 0 10px;
  }
  .photo {
    @media (max-width: 750px) {
      grid-row: 1/2;
      justify-items: stretch;
      align-items: stretch;
      justify-content: stretch;
      align-content: stretch;
      display: grid;
    }
    .item__img,
    .item__img-generic {
      min-height: 140px;
      background: #f5f5f5;
      min-width: 140px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  .name {
    flex: 1;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    @media (max-width: 750px) {
      grid-row: 2/3;
      grid-column: 1/-1;
      padding: 0 10px;
    }
    h2 {
      font-size: 22px;
      font-weight: 700;
      padding: 0;
      margin: 0;
      margin-bottom: 26px;
    }
  }
  .documents {
    border-top: 1px #ccc solid;
    padding-top: 8px;
    margin-top: 8px;
    flex: 0;
    display: flex;
    align-items: flex-start;
    @media (max-width: 750px) {
      flex-direction: column;
      ul {
        margin: 0;
        padding-left: 22px !important;
        margin-top: 10px;
      }
      li {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
        .pay-invoice {
          margin-left: 0 !important;
          margin-top: 10px;
        }
      }
      .voucher {
        margin-left: 22px !important;
      }
    }
  }
  .progress {
    position: relative;
    @media (max-width: 750px) {
      justify-items: center;
      align-items: center;
      justify-content: end;
      align-content: center;
      display: grid;
      padding-right: 10px;
    }
    @media (max-width: 500px) {
      padding-right: 0;
    }
  }
}

.order-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  @media (max-width: 750px) {
    flex-direction: column;
    h3 {
      font-size: 20px;
    }
  }
  .accomodation,
  .options {
    padding: 20px;
    flex: 0 0 35%;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    @media (max-width: 750px) {
      flex: 1;
    }
    p {
      margin-left: -20px;
    }
  }
  .accomodation {
    flex: 0 0 27%;
    @media (max-width: 750px) {
      flex: 1;
    }
  }
}

.accomodation-list {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  label {
    display: flex;
    margin-bottom: 24px;
    align-items: center;
    span {
      margin-left: 12px;
      margin-bottom: 1px;
    }
  }
  p {
    font-size: 13px;
    line-height: 1.4;
    font-weight: 400;
  }
}

// progress

$bg-color: #34495e;
$default-size: 120px;
$label-font-size: $default-size / 3.6;
$label-font-size-redo: $default-size * 3.6;

// -- mixins
@mixin size($width, $height) {
  height: $height;
  width: $width;
}

@mixin draw-progress($progress, $color) {
  .pie {
    .half-circle {
      border-color: $color;
    }

    .left-side {
      transform: rotate($progress * 3.6deg);
    }

    @if $progress <= 50 {
      .right-side {
        display: none;
      }
    } @else {
      clip: rect(auto, auto, auto, auto);

      .right-side {
        transform: rotate(180deg);
      }
    }
  }
}

@mixin draw-progress--solid($progress, $color, $bg-color) {
  background: linear-gradient(to right, $color 50%, $bg-color 50%);

  &:before {
    @if $progress <= 50 {
      background: $bg-color;
      transform: rotate((100 - (50 - $progress)) / 100 * 360deg * -1);
    } @else {
      background: $color;
      transform: rotate((100 - $progress) / 100 * 360deg);
    }
  }
}

// -- selectors

.set-size {
  font-size: 60px;
}

.charts-container {
  &:after {
    clear: both;
    content: "";
    display: table;
  }
}

.pie-wrapper {
  @include size($default-size, $default-size);
  float: left;
  margin: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  &:nth-child(3n + 1) {
    clear: both;
  }

  .pie {
    @include size(100%, 100%);
    clip: rect(0, $default-size, $default-size, $default-size / 2);
    left: 0;
    position: absolute;
    top: 0;

    .half-circle {
      @include size(100%, 100%);
      border: ($default-size / 10) solid #3498db;
      border-radius: 50%;
      clip: rect(0, $default-size / 2, $default-size, 0);
      left: 0;
      position: absolute;
      top: 0;
    }
  }

  .p-label {
    background: $bg-color;
    border-radius: 50%;
    bottom: $label-font-size-redo / 10;
    color: #ecf0f1;
    cursor: default;
    display: block;
    font-size: $label-font-size;
    //left: $label-font-size-redo / 13;
    line-height: 1.1;
    font-weight: 700;
    position: absolute;
    //right: $label-font-size-redo / 10;
    text-align: center;
    top: $label-font-size-redo / 10;

    .smaller {
      color: #bdc3c7;
      font-size: 24px;
      padding-bottom: 20px;
      font-weight: 700;
      //vertical-align: super;
    }
  }

  .shadow {
    @include size(100%, 100%);
    border: $default-size / 10 solid #efefef;
    border-radius: 50%;
  }

  &.style-2 {
    .p-label {
      background: none;
      color: #7f8c8d;

      .smaller {
        //color: #bdc3c7;
        color: #7f8c8d;
      }
    }
  }
  &.progress-5 {
    @include draw-progress(5, #e74c3c);
  }
  &.progress-10 {
    @include draw-progress(10, #e74c3c);
  }
  &.progress-15 {
    @include draw-progress(15, #e74c3c);
  }
  &.progress-20 {
    @include draw-progress(20, #e74c3c);
  }
  &.progress-25 {
    @include draw-progress(25, #e74c3c);
  }
  &.progress-30 {
    @include draw-progress(30, #e74c3c);
  }
  &.progress-35 {
    @include draw-progress(35, #e74c3c);
  }
  &.progress-40 {
    @include draw-progress(40, #e74c3c);
  }
  &.progress-45 {
    @include draw-progress(45, #e74c3c);
  }
  &.progress-50 {
    @include draw-progress(50, #e67e22);
  }
  &.progress-55 {
    @include draw-progress(55, #e67e22);
  }
  &.progress-60 {
    @include draw-progress(60, #e67e22);
  }
  &.progress-65 {
    @include draw-progress(65, #e67e22);
  }
  &.progress-70 {
    @include draw-progress(70, #8e44ad);
  }
  &.progress-75 {
    @include draw-progress(75, #8e44ad);
  }
  &.progress-80 {
    @include draw-progress(80, #8e44ad);
  }
  &.progress-85 {
    @include draw-progress(85, #8e44ad);
  }
  &.progress-90 {
    @include draw-progress(90, #1abc9c);
  }
  &.progress-95 {
    @include draw-progress(95, #1abc9c);
  }
  &.progress-100 {
    @include draw-progress(100, #1abc9c);
  }
}

.pie-wrapper--solid {
  border-radius: 50%;
  overflow: hidden;

  &:before {
    border-radius: 0 100% 100% 0 / 50%;
    content: "";
    display: block;
    height: 100%;
    margin-left: 50%;
    transform-origin: left;
  }

  .p-label {
    background: transparent;
  }

  &.progress-65 {
    @include draw-progress--solid(65, #e67e22, $bg-color);
  }

  &.progress-25 {
    @include draw-progress--solid(25, #9b59b6, $bg-color);
  }

  &.progress-88 {
    @include draw-progress--solid(88, #3498db, $bg-color);
  }
}
</style>