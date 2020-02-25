<template>
  <div>
    <section class="b01" :style="{backgroundImage: 'url(./img/b01_bg.jpg)'}">
  <Nav/>
  <div class="b01_in2" >
    <div class="container">
      <div class="flex flex-end">
        <div class="col5 top-capture">
          <p class="b01_in2_tx1">Embassy English</p>
          <p class="b01_in2_tx2">{{$t('landing.b1.camp')}}</p>
          <p class="b01_in2_tx3">{{$t('landing.b1.dates')}}</p>
          <p class="b01_in2_tx4">Cyberjaya, Malaysia</p>
          <p class="b01_in2_tx5">{{$t('landing.b1.age')}}: {{product.age_from}} - {{product.age_to}} {{$t('landing.b1.years')}}</p>
          <div class="b01_in2_sb1">
            <div class="flex1 flex-justify">
              <a href="javascript:void(0)"
                  class="btn1"
                  @click="showPrice=false;openOrderForm($event)">
                  {{$t('landingCommon.buttons.make_order')}}
              </a>
              <a href="javascript:void(0)"
                  class="btn2"
                  @click="showPrice=true;openOrderForm($event)">
                  {{$t('landingCommon.buttons.inquire')}}
              </a>
            </div>
          </div>
          <p class="b01_in2_txt5">
            {{$t('landing.b1.capture')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="b02">
  <div class="container">
    <!--<div class="owl-carousel b02_sb1">-->
    <Comments :comments="comments"/>
      <!--</div>-->
  </div>
</section>

<section class="b03" v-if="cd.count>0">
  <div class="container">
    <div class="flex flex-justify flex-v-center">
      <div class="col6 b03_col6">
        <div class="b03_in1">
          <div class="flex flex-justify">
            <div class="col0">
              <p class="b03_in1_tx1 js-tmr_days">
                {{cd.days}}
              </p>
              <p class="b03_in1_tx2 js-tmr_days_txt">
                {{$t('days')}}
              </p>
            </div>
            <div class="col0 b03_fix_with">
              <div class="flex1">
                <div>
                  <p class="b03_in1_tx1 js-tmr_hour">
                    {{cd.hours}}
                  </p>
                  <p class="b03_in1_tx2 js-tmr_hour_txt">
                    {{$t('hours')}}
                  </p>
                </div>
                <div class="b03_in3">
                  <p class="b03_in1_tx1">
                    :
                  </p>
                </div>
                <div>
                  <p class="b03_in1_tx1 js-tmr_min">
                    {{cd.minutes}}
                  </p>
                  <p class="b03_in1_tx2 js-tmr_min_txt">
                    {{$t('minutes')}}
                  </p>
                </div>
                <div class="b03_in3">
                  <p class="b03_in1_tx1">
                    :
                  </p>
                </div>
                <div>
                  <p class="b03_in1_tx1 js-tmr_sec">
                    {{cd.seconds}}
                  </p>
                  <p class="b03_in1_tx2 js-tmr_sec_txt">
                    {{$t('seconds')}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col6 b03_col6">
        <div class="b03_in5">
          <p class="b01_in2_tx1">{{$t('landingCommon.promo.header')}}</p>
          <p class="b03_in5_tx2">{{$t('landingCommon.promo.desc1')}} {{promoDate}} {{$t('landingCommon.promo.desc2')}}
          </p>
          <div class="b03_in5_tx3">
            <a href="javascript:void(0)"
                class="btn1"
                @click="showPrice=false;openOrderForm($event)">
                {{$t('landingCommon.buttons.get_prize')}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="b04">
  <div class="container">
    <div class="flex flex-justify">
      <!--LOOP-->
      <div class="col4" v-for="(b,index) in $t('landingCommon.fake_counter')" :key="index">
        <div class="b04_in1">
          <img :src="b.img" alt="">
        </div>
        <div class="b04_in2">
          <p>{{b.p1}}<br>
            {{b.p2}}
          </p>
        </div>
      </div>
    <!--/LOOP-->
    </div>
  </div>
</section>

<section class="b05">
  <div class="container">
    <div class="flex flex-justify">
      <div class="col6">
        <p class="b01_in2_tx1">{{$t('landing.b5.header')}}</p>
        <p class="b05_in1_tx1">
          {{$t('landing.b5.desc')}}
        </p>
        <div class="b05_in1_img">
          <img src="/img/girls_bg.jpg" alt="">
        </div>
      </div>
      <div class="col5">
        <div class="b05_in2" v-for="(b, index) in $t('landing.b5.items')" :key="index">
          <p class="b05_in2_tx1">{{b.head}}</p>
          <p class="b05_in2_tx2">{{b.body}}</p>
        </div>
      </div>
    </div>

  </div>
</section>

<section class="b05_02">
  <div class="container">
    <div class="b05_02_header">
      <p class="_l">
        {{$t('landing.b5_2.header1')}}
      </p>
      <p class="_r">{{$t('landing.b5_2.header2')}}</p>
    </div>
    <div class="b05_02_shield">
      <img src="/img/shield.svg">
    </div>
    <h2 class="sbh">{{$t('landing.b5_2.header3')}}</h2>

    <p class="sbh_d">{{$t('landing.b5_2.header4')}}</p>
    <div class="b05_02_points">
      <span v-for="(p,index) in $t('landingCommon.security_blocks')" :key="index">{{p.body}}</span>
    </div>
  </div>
</section>

<Prizes/>

<section class="b07">
  <div class="container">
    <div class="b07_in1">
      <div class="flex flex-justify">
        <div class="col6 f-v-self-center">
          <p class="b01_in2_tx1">{{$t('landing.b7.header')}}</p>
        </div>
        <div class="col5">
          <p class="b06_in2_tx2">
            {{$t('landingCommon.about_school_desc')}}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="b07_in2">
    <!--<div class="owl-carousel b07_in2_car">-->
      <client-only> <!-- important to add client-only-->
      <!--<carousel :autoplay="false" :nav="true" :items="1" :dots="true" :navText='["", ""]' >
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_1.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_2.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_3.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_4.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_5.jpg')"></div>
      </div>
      </carousel>-->

      <iframe src="https://www.youtube.com/embed/nNAWg5EnAQ4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </client-only>
    <!--</div>-->
  </div>
</section>

<section class="b08">
  <div class="container">
    <div class="b08_row">
      <div class="flex flex-justify flex-v-center">
        <div class="col6 no-pad-rt" id="carousellSchool">
          <client-only>
          <!--<img src="/img/b06_img1_1.jpg" alt="">-->
          <owl-carousel :autoplay="false" :nav="true" :items="1" :dots="true" :navText='["", ""]' >
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_1.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_2.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_3.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_4.jpg')"></div>
      </div>
      <div>
        <div class="facility-c" style="background-image: url('/img/facility_bg_5.jpg')"></div>
      </div>
      </owl-carousel>
      </client-only>
        </div>
        <div class="col5">
          <p class="b08_tx1">
            {{$t('landing.b8.s1.header')}}
          </p>
          <p class="b08_tx2">
            {{$t('landingCommon.about_school_accommodation')}}
          </p>
          <ul class="b08_ul">
            <li v-for="(b, index) in $t('landing.b8.s1.items')" :key="index">{{b.item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="b08_row">
      <div class="flex flex-justify flex-v-center">
        <div class="col5">
          <p class="b08_tx1">{{$t('landing.b8.s2.header')}}</p>
          <ul class="b08_ul">
            <li v-for="(b, index) in $t('landing.b8.s2.items')" :key="index">{{b.item}}</li>
          </ul>
        </div>
        <div class="col6 no-pad-lt">
          <img src="/img/b06_img2.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="b08_row">
      <div class="flex flex-justify flex-v-center">
        <div class="col6 no-pad-rt">
          <img src="/img/b06_img3.jpg" alt="">
        </div>
        <div class="col5">
          <p class="b08_tx1">{{$t('landing.b8.s3.header')}}</p>
          <ul class="b08_ul">
            <li v-for="(b, index) in $t('landing.b8.s3.items')" :key="index">{{b.item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MAIN VIDEO -->
<section class="b09">
<client-only>
<silentbox-single src="https://www.youtube.com/watch?v=8CvTwwAZmK0" :autoplay=autoplay description="Embassy English Camp">
    <div class="container">
      <div class="b09_in1">
        <div class="flex1 flex-v-center">
          <div class="b09_in1_plb">
          </div>
          <p class="b09_in1_tx">
            {{$t('landing.b9.header')}}
          </p>
        </div>
      </div>
    </div>
</silentbox-single>
</client-only>
</section>
<!-- /MAIN VIDEO -->


<!-- PRICE INCLUDES -->
<section class="b10">
  <div class="container">
    <p class="b01_in2_tx1">{{$t('landing.b10.header')}}:</p>
    <div class="flex flex-wrap">
      <div class="col6" v-for="(b, index) in $t('landing.b10.items')" :key="index">
        <div class="b05_in2">
          <p class="b05_in2_tx1">{{b.head}}</p>
          <p class="b05_in2_tx2">{{b.body}}</p>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- /PRICE INCLUDES -->


<!-- Reasons to join Desktop -->
<section class="b10_02 hide-600">
  <div class="container">
    <p class="b01_in2_tx1">
      {{$t('landing.reasons_to_join').length}} {{$t('landing.b10_2.header')}}
    </p>
    <div class="b10_02_flex">
      <div v-for="(reason,index) in $t('landing.reasons_to_join')" :key="index">
        <header><span class="num">{{index+1}}</span> <span>{{reason.head}}</span></header>
        <span>{{reason.body}}</span>
      </div>
    </div>
  </div>
</section>
<!-- / Reasons to join Desktop -->

<!-- Reasons to join Mobile -->
<section class="b10_02 below-600">
  <div class="container">
    <p class="b01_in2_tx1">
      {{$t('landing.reasons_to_join').length}} {{$t('landing.b10_2.header')}}
    </p>
    <div class="b10_02_flex">
    <vk-accordion :items="$t('landing.reasons_to_join')" :indexing="true" />
    </div>
  </div>
</section>
<!-- / Reasons to join Mobile -->

<!-- video-reviews -->
<section class="b11">
  <div class="container">
    <p class="b01_in2_tx1">{{$t('landing.b11.header')}}</p>
    <div class="b11_in1">
      <div class="flex flex-justify">

        <div class="col0" v-for="(b,index) in $t('landing.b11.items')" :key="index">
          <div class="thumb-wrap">
            <iframe width="100%" :src="b.src" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
<!-- /video-reviews -->

<!-- reviews gallery -->
<section class="b12">
  <div class="b12_in" style="background: rgba(255,255,255,.85);">
    <p class="b01_in2_tx1">{{$t('landing.b12.header')}}</p>
    <div class="b12_in_sb1">
      <a href="javascript:void(0)"
          class="btn2"
          @click="toggleReviews()">
          {{$t('landing.b12.button')}}</a>
    </div>
  </div>
</section>
<!-- /reviews gallery -->

<section class="b13">
  <div class="container">
    <p class="b01_in2_tx1">{{$t('landing.b13.header')}}</p>
    <p class="b13_tx1">{{$t('landing.b13.desc')}}</p>
  </div>
</section>

<section class="b14" v-show="showBottomButtons">
  <div class="flex1 flex-justify">
    <a href="javascript:void(0)"
        class="btn1"
        @click="showPrice=false;openOrderForm($event)">
        {{$t('landingCommon.buttons.make_order')}}
    </a>
    <a href="javascript:void(0)"
        class="btn2"
        @click="showPrice=true;openOrderForm($event)">
        {{$t('landingCommon.buttons.inquire')}}
    </a>
  </div>
</section>


<!------------------------ @@@@@@ -------------------------------->

<!------------------------ MODALS -------------------------------->

<client-only>
<!------ REVIEWS ------->
<vk-modal size="container" :show.sync="modal.reviews" id="f-reviews">
  <vk-modal-close @click="toggleReviews()"></vk-modal-close>
    <owl-carousel :autoplay="false" :nav="true" :items="1" :dots="false">
        <div v-for="(item, index) in reviews.tmpImages" :key="index" class="reviews">
          <div class="items_tx1" v-if="item.comment && item.name">
            <p class="">{{item.name}}</p>
            <p class="">{{item.comment}}</p>
          </div>
            <div class="reviews__holder">
              <div class="reviews__holder_img-container">
                <img class="review" :src="item.src" >
              </div>

            </div>
        </div>
    </owl-carousel>
</vk-modal>
<!------/REVIEWS ----->

<!-- ORDER --->
<vk-modal-full center :show="modal.makeOrder">

  <vk-grid collapse class="uk-grid-collapse uk-child-width-expand@s uk-flex-middle order-modal-body" >
    <div>
        <div class="uk-width-auto@m"></div>
    </div>
    <div class="uk-width-1-2@m uk-padding-large"
      style="background: #fff;
             box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px !important;
             align-self: start;
             min-height: 100vh;
             position: relative;"
      >
      <vk-modal-full-close large @click="closeOrderForm()"></vk-modal-full-close>
      <div class="modal-logo">
        <img src="/img/logo.png" alt="">
      </div>
  <div v-if="!simpleForm && !showPrice">
      <OrderStepper :stepper="stepper"/>
      <!--<h1>Headline</h1>-->
      <OrderForm
        :countries="countries"
        :order="order"
        :product="product"
        :addons="addons"
        />
  </div>
  <div v-if="simpleForm && showPrice">
    <div class="product-description">
      <h2>{{$t('landingCommon.modals.inquire.header', { name: product.name})}}</h2>
            <div class="modal-price-listing" v-for="(variation) in product.variations" :key="variation.id">
              <span class="l-price">$ {{(variation.price*1).toFixed(0)}}</span>
              <span class="l-name"> {{variation.name}}</span>
              <span class="l-desc">{{variation.i18n_name[locale]}}</span>
            </div>
      <h3>{{$t('landingCommon.modals.inquire.header2')}}:</h3>
      <div class="flex flex-wrap ">
          <ul class="b08_ul modal-included-list">
            <li v-for="(b, index) in $t('landing.modals.inquire.items')" :key="index">{{b.body}}</li>
          </ul>
      </div>

      <div class="flex1 flex-center mt-md">
        <a href="javascript:void(0)" class="btn1 btn1-form" @click="showPrice=false">{{$t('form.send_request')}}</a>
      </div>

    </div>
  </div>
  <!-- IF JUST A SIMPLE CONTACT FORM -->
  <div v-if="simpleForm && !showPrice" class="contact-form">
      <div v-if="modal.loader" class="inner loading">
       <vk-spinner ratio="4.5"></vk-spinner>
      </div>
      <div v-else id="contactForm">
        <div v-if="contact.response.length>1">
          <div class="response-success">
            {{contact.response}}
          </div>
          <div class="centered-button mt-md mb-md">
            <button
                class="uk-button uk-button-default uk-button-large"
                @click="closeOrderForm()"
                >
                {{$t('form.close')}}
            </button>
          </div>
        </div>
        <div v-else>
          <h2>{{$t('form.contact_form')}}</h2>
          <fieldset class="uk-fieldset">

        <legend class="uk-legend">{{$t('form.fill_up_the_form')}}</legend>

        <div class="uk-margin">
            <input
                class="uk-input"
                type="text"
                name="ct_first_name"
                :data-vv-as="$t('form.first_name')"
                v-model="contact.firstName"
                v-validate="'required|alpha'"
                :placeholder="$t('form.first_name')">
                <span v-if="errors.has('ct_first_name')" class="input-invalid">
                  {{ errors.first('ct_first_name') }}</span>
        </div>
        <div class="uk-margin">
            <input
                class="uk-input"
                name="ct_last_name"
                :data-vv-as="$t('form.last_name')"
                v-model="contact.lastName"
                v-validate="'required'"
                type="text"
                :placeholder="$t('form.last_name')">
                <span v-if="errors.has('ct_last_name')" class="input-invalid">
                  {{ errors.first('ct_last_name') }}</span>
        </div>
        <div class="uk-margin">
            <input class="uk-input"
                v-validate="'required|email'"
                name="ct_email"
                type="email"
                :data-vv-as="$t('form.email')"
                v-model="contact.email"
                :placeholder="$t('form.email')">
                <span v-if="errors.has('ct_email')" class="input-invalid">
                  {{ errors.first('ct_email') }}</span>
        </div>
        <div class="uk-margin">
            <input class="uk-input"
                type="phone"
                name="ct_phone"
                :data-vv-as="$t('form.phone')"
                v-validate="'required'"
                v-model="contact.phone"
                :placeholder="$t('form.phone_placeholder')">
                <span v-if="errors.has('ct_phone')" class="input-invalid">
                  {{ errors.first('ct_phone') }}</span>
        </div>
       <div class="age-group">
         <span class="age-label">{{$t('form.age')}}</span>
          <div class="uk-margin">
            <input class="uk-range"
              v-model="contact.age"
              name="ct_age"
              type="range"
              v-validate="'required'"
              value="2" min="9" max="20" step="1">
          </div>
          <span class="age-display">{{contact.age}} {{$t('form.years')}}</span>
       </div>

        <div class="uk-margin">
            <textarea v-model="contact.message" class="uk-textarea" rows="5" :placeholder="$t('form.message')"></textarea>
        </div>
        <div id="recaptcha" class="g-recaptcha"></div>
        <!--<script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>-->
    </fieldset>
          <div class="spreaded-buttons-2 mt-md mb-md">
            <button
                class="btn2 btn2-form"
                @click="closeOrderForm()"
                >
                {{$t('form.cancel')}}
            </button>
            <button
                class="btn1 btn1-form"
                @click="onContactFormSubmit()"
                >
                {{$t('form.send')}}
                </button>
          </div>
            </div>
          </div> <!-- end of form-->
        </div>
      </div>
    <div>
        <div class="uk-width-auto@m"></div>
    </div>
  </vk-grid>
</vk-modal-full>
</client-only>

  <!-- END OF MODALS -->
  </div>
</template>

<script>
//import { fireDb } from '~/plugins/firebase.js';
//import axios from 'axios';
import Nav from '~/layouts/partials/nav';
import OrderForm from '~/components/OrderForm'
import OrderStepper from '~/components/OrderStepper'
import Comments from '~/components/Comments'
import VkAccordion from '~/components/VkAccordion'
import Prizes from '~/components/Prizes'
import referralMixin from '~/mixins/referralMixin.js'
import generalMixin from '~/mixins/generalMixin.js'

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
//const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export default {
    mixins: [referralMixin,generalMixin],
    layout: 'landing-layout',
    auth: false,
    data() {
      return {
        comments: this.$t('landing.comments'),
            promoDayLast: 30,
            promoMonths: 3, //how many months before will be promo
            locale: this.$i18n.locale,
            autoplay: true,
            showPrice: false,
            formError: '',
            reviews:{
              tmpImages: [
              ],
              images:[
                 { src:'/img/embassy_english_reviews/rev_ea_1_1.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_2.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_3.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_4.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_5.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_6.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_7.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_8.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_9.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_10.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1_11.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_1.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_2.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_3.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_4.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_5.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_6.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_7.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_8.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_9.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_10.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_11.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_12.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_13.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_14.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_15.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_16.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_17.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_18.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_19.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_20.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_21.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_22.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_23.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_24.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_25.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_26.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_27.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_28.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_29.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_30.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_31.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_32.jpg', },
                 { src:'/img/embassy_english_reviews/rev_ea_33.jpg', },
              ],
              index: null
            },
            promoDate: '',
            simpleForm: true,
            stepper:{
              step: 1
            },
            contact:{
              firstName:'',
              lastName: '',
              email: '',
              phone: '',
              age: 9,
              message: '',
              response: ''
            },
            writeSuccessful: false,
            //userData: {},
            variationTemplate: {
                  id: '',
                  name: 'Please Select The Camp first',
                  price: 0
            },
            modal:{
                  makeOrder: false,
                  inquire: false,
                  register: false,
                  registerLoader: false,
                  loader: false,
                  reviews: false
            },
            login: {
                  username: '',
                  password: ''
            },
            register: {
                  firstname: '',
                  lastname: '',
                  email: '',
                  password: '',
                  password_repeat: ''
            },
            product: {
              variations: []
            },
            countries: [
                //{ id: '', name: this.$t('form.please_select'), dial_code: '+...'}
            ],
            addons: [],
            order:{
                productID: '',
                variationID: '',
                participant:{
                    firstName: '',
                    lastname: '',
                    email: '',
                    address: '',
                    city: '',
                    countryID: '',
                    phone: '',
                    company: '',
                    passport: {
                          number: '',
                          expire: ''
                      },
                    birthDate: ''
                },
                parent:{
                    firstName: '',
                    lastname: '',
                    email: '',
                    phone: ''
                },
            },
            cd:{
                count: 0,
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
                counting: false,
                endTime: 0,
                started: false,
                enable: true
            }
        }
    },
    head() {
      //const i18nSeo = this.$nuxtI18nSeo()
        return {
            title: this.$t('landing.title'),
            meta: [
                    { name: 'description', content: this.$t('landing.description')},
                    { name: 'keywords', content: 'Embassy English camp 2019'},
                ]
            }
    },
    methods: {
        toggleReviews(){
          //this.syncImageArrays();
          this.modal.reviews = !this.modal.reviews;
          this.$store.commit('setStickyNav',false);
        },
        syncImageArrays(){
          if( this.reviews.tmpImages.length != this.reviews.images.length){
            for(let i=0;this.reviews.images.length>i;i++){
              if(!this.reviews.tmpImages[i]){
                this.reviews.tmpImages.push(this.reviews.images[i])
              }
            }
          }
          ////console.log(this.reviews.images)
        },
        async getReCaptcha(){
            await this.$recaptcha.init()
            //console.log('from recapthcha init')
        },
        async getProduct(){
          // debugger
          var res = this.$route.path.split("/");
          //console.log(res);
          var slug = res[res.length - 1]; //this.$nuxt.$route.name ||
           await this.$axios.get('/products/slug/' + slug)
                .then((response) => {
                  // debugger
                  //console.l1og(slug + ":" + response.data.data)
                    //this.products.push(...response.data.data);
                    if(response.data.data.variations){
                      this.product = response.data.data;
                      this.setInitialVariation();
                    }
                })
                .catch((err) => {

                })
                .finally(()=>{
                  // debugger
                    this.initCountDown(this.product.starts_at || new Date);
                    //console.log("starts at: " + this.product.starts_at)
                })
        },
        async getAddons(){
            await this.$axios.get('/addons/list')
                .then((response) => {
                  //console.log(response.data)
                    //this.products.push(...response.data.data);
                    this.addons = response.data;
                })
                .catch((err) => {

                })
        },

        setInitialVariation(){
          this.order.variationID = this.product.variations[this.product.variations.length - 1].id;
        },
        openOrderForm(e){
            e.stopPropagation()
            this.modal.makeOrder = true;
            this.$store.commit('setStickyNav',false);
            this.$store.commit('setstickyNavDisabled',true);
        },
        closeOrderForm(){
            this.modal.makeOrder = false;
            this.$store.commit('setstickyNavDisabled',false);
        },
        async onContactFormSubmit() {
          let el = document.getElementById("contactForm");
          if(!el.classList.contains("form-verification")){
            el.className += "form-verification";
          }

          this.$validator.validateAll()
            .then(valid => {
              ////console.log('Validation: ' + valid);
              if (!valid) {
              //  return null;
              }
            });

          if( !this.contact.firstName ||
              !this.contact.lastName ||
              !this.contact.email ||
              !this.contact.phone ||
              !this.contact.age ||
              this.errors.has('ct_first_name') ||
              this.errors.has('ct_last_name') ||
              this.errors.has('ct_email') ||
              this.errors.has('ct_phone') ||
              this.errors.has('ct_age')){
                //console.log('ERROR: form is not filled up');
                return null;
              }
          this.modal.loader = true;
          let tknPass = true;
          let thisToken = '';

          //console.log('reCaptcha check..');

          await this.$recaptcha('login').then((token) => {
              ////console.log(token) // Will print the token
              if(token.length < 30){
                this.modal.loader = false;
                this.formError = "reCatcha error has occured";
                tknPass = false;
                //console.log('ERROR: reCatcha Problems');
                return null;
              } else {
                thisToken = token;
              }
          });

          //console.log('reCaptcha passed..');

          if(!tknPass){
            //console.log('ERROR: reCatcha token Problems');
            return null;
          }
          let uuid = this.$cookies.get('ea-uuid') || '';
          let refID = this.$cookies.get('referralID') || '';

          await this.$axios.post('/contact_form/send',{
              first_name: this.contact.firstName,
              last_name: this.contact.lastName,
              email: this.contact.email,
              phone: this.contact.phone,
              age: this.contact.age,
              message: this.contact.message,
              uuid: uuid,
              referral: refID,
              ip: this.userData.ip,
              country: this.userData.country,
              token: thisToken
          })
          .then((response) => {
              this.modal.loader = false;
              this.contact.response = this.$t('form.contact_form_complete');
            })
          .catch((err) => {
              this.modal.loader = false;
              //console.log(err);
              if(err.response){
                this.formError = err.response.message;
              }
              //console.log(this.formError);
          })

        },
        initReCaptcha() {
          var self = this;
          setTimeout(function() {
              if(typeof grecaptcha === 'undefined') {
                  self.initReCaptcha();
              }
              else {
                  grecaptcha.render('recaptcha', {
                      sitekey: '6Lc9-JkUAAAAAKqSx0nxCIgjQw1X8GB7I5498Hjb',
                      size: 'invisible',
                      badge: 'inline',
                      callback: self.submit
                  });
              }
          }, 100);
        },
        countDownCalc(){
            this.cd.days = (function(c) {
                let a = Math.floor(c / MILLISECONDS_DAY);
                if(a<10){
                  a = '0' + a
                }
                return a
              })(this.cd.count);

            this.cd.hours = (function(c) {
              let a = Math.floor((c % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
              if(a<10){
                a = '0' + a
              }
              return a
            })(this.cd.count);

            this.cd.minutes = (function(c) {
              let a = Math.floor((c % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
              if(a<10){
                a = '0' + a
              }
              return a
            })(this.cd.count);

            this.cd.seconds = (function(c) {
              const seconds = (c % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND;
              let a = Math.floor(seconds);
              if(a<10){
                a = '0' + a
              }
              return a
            })(this.cd.count);
        },
        countDownStart(){
          if(!this.cd.enable){
            return null;
          }
            setInterval(function(){
              this.cd.count -= 1000;
              this.countDownCalc();
            }.bind(this), 1000);
        },
        initCountDown(date = '') {
            var ts = Math.round((new Date()).getTime() );
            console.log(ts)
          date = new String(date)
            const [year, month, day] = [...date.split('-')]
            const monthIndex = month - 1 // remember that Date's contructor 2nd param is monthIndex (0-11) not month number (1-12)!
            var eventDate = new Date(year, monthIndex, this.promoDayLast) //year, monthIndex, day
            eventDate.setMonth(eventDate.getMonth() - this.promoMonths);
            this.promoDate = eventDate.toLocaleDateString();
            var ts2 = Math.round(eventDate.getTime() );
            // this.cd.count = ts2 - ts;
            this.cd.count = 1000000;
            if(this.cd.count>0 && !this.cd.started && !this.$route.query.cd){
              this.countDownStart()
              this.cd.started = true;
            }
        },
    },
    //components: { carousel },
    components: {
      Nav,
      OrderForm,
      OrderStepper,
      Comments,
      Prizes,
      VkAccordion
    },
    mounted(){
        //this.$validator.localize('en');
        this.getReferrence();
        this.getCountries();
        this.getProduct();
        this.getAddons();
        this.syncImageArrays();
        //this.reviews.tmpImages.push(this.reviews.images[0])
        //this.reviews.tmpImages.push(this.reviews.images[1])
        //this.initReCaptcha();

    },
    computed: {
      showBottomButtons(){
        if(this.$store.state.deviceWidth <= 600){
          return this.$store.state.showBottomButtons;
        } else {
          return true;
        }
      }
    },
}
</script>

<style lang="scss" scoped>
$desc-text: #636363;
$btn-color: #ff5722;
.col-6-modal{
  width: 50%;
  @media(max-width: 700px){
      width: 100%;
      padding-left: 10%
    }
}

.product-description{
  h2{
    font-weight:600;
  }
  h2,h3{
    text-align: center;
    margin: 40px;
    color: $desc-text;
    @media(max-width: 700px){
      margin: 10px;
      font-size: 20px;
    }
  }
  .price-listing{
    max-width: 550px;
    margin: 30px auto;
    display:flex;
    align-items: center;
    @media(max-width: 700px){
      flex-direction: column;
    }
    .l-price-name{
      display: flex;
      width: 60%;
      @media(max-width: 700px){
        justify-content: flex-start;
        padding-left: 10%;
        width: 100%;
      }
    }
    span{
      color: $desc-text;
      display: inline-block;
      &.l-price{
        font-size: 24px;
        font-weight: 400;
        color: !important;
        padding-right: 60px;
        @media(max-width: 700px){
          padding-right: 30px;
        }
      }
      &.l-name{
        font-size: 22px;
      }
      &.l-desc{
        flex-grow: 1;
        text-align: left;
      }
    }
  }
}
.order-modal-body{
  background-size: cover;
  background-image: linear-gradient(rgba(255,255,255,.80), rgba(255,255,255,.80)), url('/img/b01_bg.jpg');
  min-height: 100vh;
  background-attachment: fixed;
}
  .md-dialog {
    min-width: 628px;
    max-width: 728px;
    width: 628px;
  }
  .md-dialog .inner{
    min-height: 300px;
  }
  .md-dialog .loading{
    display: flex;
      align-items: center;
      justify-content: center;
  }
  .md-button-content{
    color:white!important;
  }
  iframe:not(.md-image){
    height: 100%!important;
    @media(max-width: 1200px){
      width: 90%;
      height: 500px!important;
    }
    @media(max-width: 900px){
      width: 90%;
      height: 400px!important;
    }
    @media(max-width: 800px){
      width: 90%;
      height: 360px!important;
    }
    @media(max-width: 600px){
      width: 100%;
      min-height: 0px !important;
      //height: 360px!important;
    }
  }
  .silentbox-single {
    cursor: pointer;
    text-decoration: none;
}
.md-tabs {
  padding: 0 24px;
}
.md-btn-close{
  margin-bottom: 10px;
    margin-right: 10px;
}
// vk
.age-group{
  display: flex;
  width:100%;
  align-items: center;
  @media(max-width: 700px){
    flex-direction: column;
  }
  .age-display{
    min-width: 80px;
    text-align: right;
  }
  .age-display,.age-label{
    font-size:20px;
  }
  .uk-margin{
    flex: 1 1;
    margin-left: 30px;
    margin-right: 30px;
    @media(max-width: 700px){
    width: 100%;
    }
  }
  .uk-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 35px;
    height: 35px;
    cursor: pointer;
    margin-top: -17px;

  }

  .uk-range::-moz-range-thumb {
    width: 35px;
    height: 35px;
    cursor: pointer;
    margin-top: -17px;
  }
}

.facility-c{
  height: 260px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media(min-width: 900px){
    height: 420px;
  }
  @media(min-width: 1200px){
    height: 680px;
  }
}
.loading{
    margin-top: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.response-success{
  margin-top: 160px;
  margin-bottom: 100px;
  font-size: 18px;
  text-align: center;
  line-height: 1.6;
}
.spreaded-buttons-2{
  @media(max-width: 400px){
    margin-top: 30px;
  }
}
.contact-form{
  h2{
    @media(max-width: 700px){
      text-align: center;
    }
  }
}
.b07_in2{
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: black;
  iframe{
     @media(min-width: 1200px){
       width: 1200px!important;
       height: 612px!important;
     }
  }
}
.b05_02_shield{
  display: flex;
  margin: 60px 0;
  justify-content: center;
  align-items: center;
  @media(max-width: 600px){
        margin: 30px 0;
      }
&:before,&:after{
      content: "";
      border-bottom: 4px #ff5722 solid;
      flex: 1;
      margin: 0 20px;
      @media(max-width: 600px){
        border-bottom: 2px #ff5722 solid;
      }
    }
  img{
    height: 120px;
    @media(max-width: 600px){
      height: 80ph;
    }
  }
}
.b13{
  .b01_in2_tx1 {
    font-size: 42px;
    font-weight: 700;
    @media(max-width: 600px){
      font-size: 22px;
      text-align: center;
    }
  }
  .b13_tx1{
    @media(max-width: 600px){
      font-size: 18px;
      text-align: center;
      line-height: 1.4;
    }
  }
}

</style>
