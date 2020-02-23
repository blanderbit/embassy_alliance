<template>
<div class="order-form">
    <div class="uk-margin uk-margin2">    
        <div class="uk-form-controls" v-if="stepper==1">
            <div class="uk-form-label">{{$t('form.select_product')}}</div>

            <label>{{null}}</label>
                <select class="uk-select" v-model="order.productIndex" name="product_id">
                  <option  v-for="(product, index) in products" :key="index"
                    :value="index">{{product.name}}</option>
                </select>

            <div v-if="products[order.productIndex]" class="variations">
                <div class="variation-select-flex">
                    <div class="left">
                    <label class="r_f" v-for="(variation, index2) in products[order.productIndex].variations" :key="index2">
                        <input 
                            class="uk-radio" 
                            :value="index2" 
                            type="radio" 
                            name="radio1"
                            v-model="order.variationIndex"
                            > {{variation.name}}
                            <span class="a-price">$ {{variation.price}}</span>
                    </label>
                    </div>
                    <div class="picture">

                    </div>
                </div>
                <div class="uk-form-label2  mb-md mt-md plus-prepend">
                    {{$t('form.select_addons')}}
                </div>

                    <div class="uk-form-controls d_f">
                        <label v-for="(addon, index) in addons" :key="index">
                            <input class="uk-checkbox" 
                                :value="addon.id"
                                v-model="order.addons" 
                                type="checkbox"> {{addon.name}}  ( $ {{addon.price}} )
                        </label>
                    </div>
            </div>
        </div>
        
        <div class="uk-form-controls" v-if="stepper==2">
            <div class="uk-form-label">{{$t('form.add_participant')}}</div>
            <form data-vv-scope="new0_participant">
            <div class="edit-data-form form-verification">
            <div v-for="(p, label, index) in order.participant" 
                  :key="index">

              <div class="uk-margin" v-if="label=='country'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <select class="uk-select" v-model="order.participant.country_id" name="country_id">
                  <option v-for="(country, index) in countries" 
                    :value="country.id" :key="index">{{country.name}}</option>
                </select>
              </div>

              <div class="uk-margin" v-else-if="label=='birth_date'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <datepicker 
                  :name="label"
                  :value="order.participant[label]"
                  v-model="order.participant[label]"
                  :input-class="'uk-input'"
                  :format="customDateFormatter"
                  @input="forceFormatDateNewOrder('participant',label)"
                  ></datepicker>
              </div>

              <div class="uk-margin" v-else-if="label=='passport_expire'">
                <label>{{$t('clientarea.db.'+label)}}</label>
                <datepicker 
                  :name="label"
                  :value="order.participant[label]"
                  v-model="order.participant[label]"
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
                    v-model="order.participant[label]"
                    v-validate="'required|email'"
                    type="text" 
                    :placeholder="$t('clientarea.db.'+label)">
                    <span v-if="errors.has(label)" class="input-invalid">
                      {{ errors.first(label) }}</span>
              </div>

              <div class="uk-margin" v-else-if="label!='country_id'">
                <label>{{$t('clientarea.db.'+label)}}</label>
              <input 
                  class="uk-input" 
                  :name="label"
                  :data-vv-as="$t('clientarea.db.'+label)" 
                  v-model="order.participant[label]"
                  v-validate="'required'"
                  type="text" 
                  :placeholder="$t('clientarea.db.'+label)">
                  <span v-if="errors.has(label)" class="input-invalid">
                    {{ errors.first(label) }}</span>
              </div>
             
            </div>
          </div>
        </form>
        </div>

        <!-- // step 2 \\--->


        <div class="uk-form-controls" v-if="stepper==3">
            <div class="uk-form-label">{{$t('form.add_parent')}}</div>
        </div>
        <div class="uk-form-controls" v-if="stepper==4">
            <div class="uk-form-label">{{$t('form.payment')}}</div>
        </div>
        <div class="uk-form-controls d_f_jc_sb mt-md">
            <button class="btn2 btn2-form-md"
                v-if="stepper<=1" 
                @click="$emit('openStage',false)">{{$t('form.cancel')}}</button>
            <button class="btn2 btn2-form-md"
                v-else 
                @click="$emit('toggleStepper',-1)">{{$t('form.back')}}</button>
            <button class="btn1 btn1-form-md" @click="processTheOrder()">{{$t('form.continue')}}</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'OrderForm2',
    inject: ['$validator'],
    props: { 
        countries: Array,
        addons: Array,
        products: Array,
        participant: Object,
        order: Object,
        stepper: Number,
        show: Boolean,
        processTheOrder: Function,
        forceFormatDateNewOrder: Function,
        customDateFormatter: Function,
    },
        methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.mt-md{
    margin-top: 50px;
}
.variation-select-flex{
    display: flex;
    .picture{
        flex: 0 0 160px;
        height: 160px;
        background-position: center;
        background-repeat: no-repeat;
        background-color: bisque;
        background-size: cover;
    }
    .left{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
.order-form{
    padding: 10px 20px;
    @media(max-width:900px){
        margin: 0!important;
        padding: 0!important;
    }
}
.uk-margin2 {
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 140px;
    @media(max-width:900px){
        margin: 0!important;
        padding: 0!important;
    }
}
.uk-radio, .uk-checkbox {
    display: inline-block;
    height: 26px;
    width: 26px;
    overflow: hidden;
    margin-right: 16px;
    margin-bottom: 0;
    vertical-align: middle;
}
.r_f{
    display: flex;
    font-size: 18px;
    align-items: center;
    &:not(:last-child){
        margin-bottom: 24px;
    }  
}
header,.uk-form-label{
    display: block;
    font-weight: 900;
    text-align: center;
    margin-top: 20px;
    font-size: 22px;
    line-height: 1.2;
    margin-bottom: 30px;
    @media(max-width:900px){
        font-size: 18px;
    }
}
.a-price{
    width: 50%;
    right: 0;
    position: absolute;
    font-weight: 400;
    @media(max-width:900px){
        text-align:right;
        padding-right: 10px;
    }
}
.d_f{
    display: flex;
    flex-wrap: wrap;
    @media(max-width:900px){
        flex-direction: column;
    }
    label{
        flex: 0 0 50%;
        margin-bottom: 30px;
        @media(max-width:900px){
            margin-bottom: 20px;
        }
    }
}
.d_f_jc_sb{
    display: flex;
    justify-content: space-between;
}


.plus-prepend{
    padding-left: 40px;
    position: relative;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    &:after{
        content: "";
        background-image: url("/img/plus-icon.png");
        background-size: cover;
        width:24px;
        height: 24px;
        position: absolute;
        left: 0;
        z-index: 222222222;
        bottom: 0;
    }
}

.variations{
    margin-top: 40px;
}

.mt-md{
    margin-top: 60px;
}
.mb-md{
    margin-bottom: 50px;
}
</style>