<template>
  <div>
    <section class="b05_02" v-if="showCampList">
      <div class="container">
        <div class="b05_02_header">
          <h2>{{$t('index.b5_2.header')}}</h2>
        </div>
        <!-- HERE WE SHOW THE CAROUSEL -->
        <div class="camp-spinner">
          <CampList :products="products" :localDateFormat="localDateFormat" />
        </div>
      </div>
    </section>

    <h1>{{$t('clientarea.my_past_bookings')}}</h1>
    <div class="order-list-loading" v-if="ordersLoading">
      <client-only>
        <div class="inner loading">
          <vk-spinner ratio="3.5"></vk-spinner>
        </div>
      </client-only>
    </div>
    <div class="order-list" v-else>
      <div
        v-if="bookings.length==0"
        class="no-orders"
      >{{$t('clientarea.currently_no_orders_short')}}</div>
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
              <div class="register-again">
                <button
                  type="button"
                  class="btn2 btn2-form-xs"
                  @click="openOrderModal(index)"
                >{{$t('clientarea.register_again_button')}}</button>
              </div>
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
      <!-- <button 
            class="btn1 btn1-form-md" 
      @click="modals.makeOrder=true">{{$t('form.new_order')}}</button>-->
    </div>

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
            class="uk-width-1-2@m uk-padding-large order"
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
              <div class="order-form">
                <div class="uk-margin uk-margin2">
                  <div class="uk-form-controls" v-show="stepper==1">
                    <div class="uk-form-label-part">{{$t('form.participant_name')}}</div>
                    <span
                      v-if="orderIndex!=null"
                      class="participant-name"
                    >{{bookings[orderIndex].participant.last_name}} {{bookings[orderIndex].participant.first_name}}</span>
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
                            <span class="a-price">$ {{(variation.price*1)}}</span>
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
                      class="btn1 btn1-form-md"
                      @click="registerParticipant()"
                    >{{$t('form.register')}}</button>
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
import CampList from "~/components/CampList";

//const Cookie = process.client ? require('js-cookie') : undefined
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  mixins: [fileUploadMixin, paymentMixin, generalMixin],
  layout: "client-layout",
  data() {
    return {
      orderIndex: null,
      ordersLoading: true,
      bookings: [],
      workingID: null,
      participant: {},
      stepper: 1,
      showCampList: false
    };
  },
  methods: {
    async registerParticipant() {
      let variationID;
      try {
        variationID = this.products[this.newOrder.productIndex].variations[
          this.newOrder.variationIndex
        ].id;
      } catch (e) {
        this.$toast
          .error(this.$t("messages.errors.order_error"), {
            icon: { name: "error" }
          })
          .goAway(2500);
        return null;
      }

      let orderID = this.bookings[this.orderIndex].id;

      await this.$axios
        .post("/reorder/" + orderID + "/camp/" + variationID, {
          addons: this.newOrder.addons
        })
        .then(response => {
          this.modals.makeOrder = false;
          this.$toast
            .success(this.$t("clientarea.messages.order_created"), {
              icon: { name: "check" }
            })
            .goAway(2500);
          this.$router.go("/clientarea/index");
        })
        .catch(err => {
          //console.log(err.response);
          if (
            typeof err.response.data != "undefined" &&
            err.response.data.error == "already_exists"
          ) {
            this.$toast
              .error(this.$t("messages.errors.order_already_exists"), {
                icon: { name: "error" }
              })
              .goAway(2500);
          } else {
            this.$toast
              .error(this.$t("messages.errors.connection_error"), {
                icon: { name: "error" }
              })
              .goAway(2500);
          }
        });
    },
    openOrderModal(index) {
      this.modals.makeOrder = true;
      this.orderIndex = index;
    },
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
          this.$toast
            .error(this.$t("messages.errors.connection_error"), {
              icon: {
                name: "error"
              }
            })
            .goAway(2500);
        });
    },
    async fetchOrders() {
      this.ordersLoading = true;
      await this.$axios
        .get("/my_orders/past")
        .then(response => {
          this.bookings = response.data;
          this.ordersLoading = false;
        })
        .catch(err => {
          this.$toast
            .error(this.$t("messages.errors.connection_error"), {
              icon: {
                name: "error"
              }
            })
            .goAway(2500);
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
          this.$toast
            .error(this.$t("messages.errors.connection_error"), {
              icon: {
                name: "error"
              }
            })
            .goAway(2500);
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
    //OrderStepper,
    CampList
  },
  mounted() {
    this.fetchOrders();
    //this.getCountries();
    this.getProducts();
    if (
      typeof this.$route.query != "undefined" &&
      this.$route.query.a == "camps"
    ) {
      this.showCampList = true;
    }
  }
};
</script>

<style lang="scss" scoped>
//@import "../../../assets/scss/variables";
$green: #009688; //#4CAF50;
$red: #f0506e;

.b05_02 {
  background: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  h2 {
    font-size: 32px;
    margin-left: 20px;
  }
}

.lower-buttons {
  display: flex;
  margin-bottom: 40px;
  @media screen and (max-width: 750px) {
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
.register-again {
  align-self: flex-end;
  margin-bottom: 10px;
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
  margin-top: 40px;
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
.participant-name {
  display: block;
  margin-bottom: 60px;
  font-size: 20px;
}
.uk-form-label-part {
  display: block;
  font-weight: 700;
  margin-top: 0;
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    font-size: 18px;
    text-align: center;
  }
}
header,
.uk-form-label {
  display: block;
  font-weight: 700;
  margin-top: 20px;
  font-size: 22px;
  line-height: 1.2;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    font-size: 18px;
    text-align: center;
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
</style>