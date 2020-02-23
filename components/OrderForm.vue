<template>
<div class="order-form">
    <div class="uk-margin">
        <div class="uk-form-label">{{$t('form.select_variation')}}</div>
        <div class="uk-form-controls">
            <label class="r_f" v-for="(variation, index) in product.variations" :key="index">
                <input 
                    class="uk-radio" 
                    :value="variation" 
                    type="radio" 
                    name="radio1"
                    v-model="computedVariation"
                    > {{variation.name}}
                    <span class="a-price">$ {{variation.price}}</span>
                </label>
        </div>
        <div class="uk-form-label  select-addons-label plus-prepend">{{$t('form.select_addons')}}</div>
        <div class="uk-form-controls d_f">

            <label v-for="(addon, index) in addons" :key="index">
                <input class="uk-checkbox" 
                    :value="addon"
                    v-model="computedAddons"
                    type="checkbox"> {{addon.name}}  ( $ {{addon.price}} )</label>

        </div>
        <div class="show-total" v-show="total>0">
            <span class="label">{{$t('total')}}:</span>
            <span class="total">${{total}}</span>
        </div>
        <div class="uk-form-controls d_f_jc_sb mt-md">
            <!--<button class="uk-button uk-button-default uk-button-large">{{$t('form.cancel')}}</button>
            <button class="uk-button uk-button-primary uk-button-large">{{$t('form.continue')}}</button>-->
                <button v-show="total>0"
                    class="btn1 btn1-form-md"
                    @click="onSubmit()"
                    >
                    {{$t('commonCamps.right.button')}}
                </button>
        </div>
    </div>
<!--    
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-field>
                <label for="productSelected">{{$t('form.select_product')}}</label>
                <md-select 
                    v-model.lazy="order.productID" 
                    name="product" 
                    id="productSelected" 
                    md-dense
                    >
                    <md-option 
                        v-for="(product, index) in products" 
                        :value="product.id" 
                        :key="product.id">
                        {{product.name}}
                    </md-option>
                </md-select>
            </md-field>
        </div>
        <div class="md-layout-item">
            <md-field>
            <label for="variationSelected">{{$t('form.select_variation')}}</label>
            <md-select v-model="order.variationID" name="country" id="variationSelected" md-dense>
                <md-option 
                    v-for="(variation, index) in variations" 
                    :value="variation.id" 
                    :key="variation.id">
                    {{variation.name}}
                </md-option>
            </md-select>
            </md-field>
        </div>
    </div>
    <header>{{$t('form.participant_info_header')}}</header>
    <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field md-clearable>
                <label>First Name</label>
                <md-input v-model.lazy="order.participant.firstName"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-field md-clearable>
              <label>Last Name</label>
              <md-input v-model.lazy="order.participant.lastName"></md-input>
              </md-field>
            </div>
          </div>

    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-field>
            <label for="countrySelected">{{$t('form.select_participants_country')}}</label>
            <md-select v-model="order.participant.countryID" name="country" id="countrySelected" placeholder="Country">
                <md-option v-for="(country, index) in countries" 
                    :value="country.id" 
                    :key="country.id">{{country.name}}
                </md-option>
            </md-select>
            </md-field>
        </div>
    </div>
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-field>
            <label for="font">Font</label>
            <md-select v-model="order.participant.countryID" name="font" id="font">
                <md-option value="arial">Arial</md-option>
            </md-select>
            </md-field>
        </div>
    </div>

    <md-button 
        class="md-primary md-raised no-h-margin-10 white" 
        @click="movie = 'pulp-fiction'">Place an Order</md-button>-->
  </div>
</template>

<script>
export default {
  name: 'OrderForm',
  props: { 
      countries: Array,
      addons: Array,
      product: Object,
      participant: Object,
      order: Object,
      variationModel: Object,
      addonsModel: Array,
      total: Number
      },
    methods: {
        onSubmit(){
            this.$emit('on-form-submit')
        }
    },
    computed: {
        computedVariation: {
            get() {
                return this.variationModel
            },
            set(val) {
                this.$emit('variation-emit', val)
            }
        },
        computedAddons:{
            get(){
                return this.addonsModel
            },
            set(val){
                this.$emit('addons-emit', val)
            }
        }
  }
}
</script>

<style lang="scss" scoped>
.mt-md{
    margin-top: 50px;
}
.order-form{
    padding: 10px 20px;
    @media(max-width:900px){
        margin: 0!important;
        padding: 0!important;
    }
}
.uk-margin {
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 80px;
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
    margin-bottom: 24px;
    @media(max-width:800px){
        widows: 100%;
    }
}
header,.uk-form-label{
    display: block;
    font-weight: 900;
    text-align: left;
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
    @media(max-width:800px){
       position: relative;
       flex: 1;
       justify-self: flex-end;
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
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
    @media(max-width:800px){
        .btn1{
            padding-left: 40px!important;
            padding-right: 40px!important;
        }
    }
}


.plus-prepend{
    padding-left: 50px;
    position: relative;
    @media(max-width:800px){
        padding-left: 40px;
    }
    &:after{
        content: "";
        background-image: url("/img/plus-icon.png");
        background-size: cover;
        width: 36px;
        height: 36px;
        position: absolute;
        left: -5px;
        z-index: 222222222;
        bottom: -4px;
        @media(max-width:800px){
            width: 20px;
            height: 20px;
            position: absolute;
            left: 0;
            z-index: 222222222;
            bottom: 0px;
        }
    }
}
.uk-button-primary {
    background-color: #1e87f0;
    color: #fff!important;
    font-weight: 600;
}

.mt-md{
    margin-top: 60px;
}
.mb-md{
    margin-bottom: 50px;
}
.select-addons-label{
    margin-top: 40px;
}
.show-total{
    margin: 10px 0 30px;
    .label{
        font-size: 24px;
        display: inline-block;
        margin-right: 20px;
    }
    .total{
        font-size: 24px;
    }
}
</style>