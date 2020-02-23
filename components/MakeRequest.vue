<template>
<client-only>
<vk-modal-full center :show="showContactForm">
  
  <vk-grid collapse class="uk-grid-collapse uk-child-width-expand@s uk-flex-middle order-modal-body" >
    <div>
        <div class="uk-width-auto@m"></div>
    </div>
    <div class="uk-width-1-2@m uk-padding-large form-body" >
      <vk-modal-full-close large @click="closeOrderForm()"></vk-modal-full-close>
      <div class="modal-logo">
        <img src="/img/logo.png" alt="">
      </div>
  <!-- JUST A SIMPLE CONTACT FORM -->
  <div class="contact-form">
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
        <!--<div id="recaptcha" class="g-recaptcha"></div>-->
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
                class="btn1 btn1-form submit-btn"
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

</template>

<script>
// userData is what we know about the visitor
// it's the object returner from IPinfo

export default {
    props: { 
        showContactForm: Boolean,
        userData: Object,
      },
      data() {
        return {
            contact:{
                    firstName:'',
                    lastName: '',
                    email: '',
                    phone: '',
                    age: 9,
                    message: '',
                    response: ''
                },
            modal:{
                loader: false
            },
            formError: '',
        }
      },
    methods: {
        closeOrderForm(){
            this.$emit('close-order-form')
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
    }
}
</script>

<style lang="scss" scoped>
.contact-form{
  h2{
    @media(max-width: 700px){
      text-align: center;
    }
  }
}
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

.form-body{
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px !important;
    align-self: start;
    min-height: 100vh;
    position: relative;
    @media screen and (max-width: 1400px){
      width: 60vw;
    }
    @media screen and (max-width: 1000px){
      width: 80vw;
    }
    @media screen and (max-width: 600px){
      width: 100%;
      position: absolute;
    }
}
.submit-btn{
    min-width: 80px!important;
    padding-left: 30px!important;
    padding-right: 30px!important;
}
</style>
