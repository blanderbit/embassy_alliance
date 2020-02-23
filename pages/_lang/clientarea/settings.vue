<template>
  <div>
    <h1>{{$t('clientarea.settings')}}</h1>

    <div class="resetForm s-ldr" v-if="sending">
          <div class="inner loading">
            <client-only>
          <vk-spinner ratio="3.5"></vk-spinner>
          </client-only>
          </div>
    </div>
    <div class="resetForm" v-if="!sending">
      <div class="uk-alert-danger" uk-alert v-if="error">
        <a class="uk-alert-close" uk-close></a>
        <p>{{error}}</p>
      </div>
      <form data-vv-scope="update">
      <fieldset class="uk-fieldset form-verification">
        <div class="uk-margin">
            <input 
                class="uk-input" 
                type="text" 
                v-model="user.firstName" 
                name="first_name"
                v-validate="'required'"
                :placeholder="$t('clientarea.first_name')"
                :data-vv-as="$t('clientarea.first_name')" 
                >
                <span v-if="errors.has('update.first_name')" class="input-invalid">
                      {{ errors.first('update.first_name') }}</span>
        </div>

        <div class="uk-margin">
            <input 
                class="uk-input" 
                type="text" 
                v-model="user.lastName" 
                name="last_name"
                v-validate="'required'"
                :placeholder="$t('clientarea.last_name')"
                :data-vv-as="$t('clientarea.last_name')" 
                >
                <span v-if="errors.has('update.last_name')" class="input-invalid">
                      {{ errors.first('update.last_name') }}</span>
        </div>
        <div class="uk-margin">
        <legend class="uk-legend">{{$t('clientarea.password')}}</legend>
        </div>
        <div class="uk-margin">
          <label>{{$t('clientarea.old_password')}}</label>
            <input 
              class="uk-input" 
              type="password" 
              name="old_password"
              v-validate="'required'"
              :data-vv-as="$t('clientarea.old_password')" 
              :placeholder="$t('clientarea.old_password')"
              v-model="user.oldPassword"
              >
              <span v-if="errors.has('update.old_password')" class="input-invalid">
                      {{ errors.first('update.old_password') }}</span>
        </div>

        <div class="uk-margin">
          <label>{{$t('clientarea.new_password')}}</label>
            <input 
                class="uk-input" 
                type="password" 
                name="new_password"
                v-validate="'min:6|max:35'"
                :data-vv-as="$t('clientarea.new_password')" 
                :placeholder="$t('clientarea.new_password')"
                v-model="user.newPassword"
                ref="new_password"
                >
                <span v-if="errors.has('update.new_password')" class="input-invalid">
                      {{ errors.first('update.new_password') }}</span>
        </div>
         <div class="uk-margin">
          <label>{{$t('clientarea.new_password_repeat')}}</label>
            <input 
                class="uk-input" 
                type="password" 
                name="new_password2"
                v-validate="'confirmed:new_password'"
                :data-vv-as="$t('clientarea.new_password_repeat')" 
                :placeholder="$t('clientarea.new_password_repeat')"
                v-model="user.newPassword2"
                ref="new_password2"
                >
                <span v-if="errors.has('update.new_password2')" class="input-invalid">
                      {{ errors.first('update.new_password2') }}</span>
        </div>
        <div class="uk-margin mt-md save-form-buttons">
        <button 
                class="btn1 btn1-form-sm"
                @click="onResetFormSubmit()"
                >
                {{$t('form.save')}}
                </button>
        </div>
      </fieldset>
      </form>
    </div>
    <vk-notification :messages.sync="messages" status="primary"></vk-notification>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  layout: 'client-layout',
  //middleware: 'auth'
  data() {
      return {
        sending: false,
        error: null,
        messages: [],
        user:{
          firstName: this.$store.state.auth.user.first_name,
          lastName: this.$store.state.auth.user.last_name,
          oldPassword: '',
          newPassword: '',
          newPassword2: '',
        }
      }
  },
  methods: {
    async onResetFormSubmit(){
      this.error = '';
      this.$validator.validateAll('update')
            .then(result => {
              if (result) {
                      if(this.user.newPassword.length>0 && this.user.oldPassword.length==0){
                      //error! old pass needed
                      this.error = this.$t('clientarea.errors.old_pass_needed');
                      return null;
                    }
                    if(this.user.oldPassword.length>0 && this.user.newPassword.length>0){

                    }
                    
                    this.sendUserData();
              } else {
                event.preventDefault();
                event.stopPropagation();
                return null;
                this.messages.push({ message: this.$t('clientarea.messages.form_general_error'), status: 'danger' })
              }
            });  
    },
    async sendUserData(){
      this.sending = true;
        await this.$axios.post('/auth/update',{  
                      
                        first_name: this.user.firstName,
                        last_name: this.user.lastName,
                        old_password: this.user.oldPassword,
                        password: this.user.newPassword
                            
                    }).then(() => {
                      //this.$auth.logout();
                      //this.$router.push('/login')
                      this.messages.push({ message: this.$t('clientarea.messages.your_data_has_been_updated'), status: 'success' })
                      this.$auth.fetchUser()
                      this.sending = false;
                    }).catch(err => {
                        //this.snackbar.show = true;
                        if(err.response.data.error){
                          this.messages.push({ message: this.$t('clientarea.messages.' + err.response.data.error), status: 'danger' })
                        }
                        //this.error = err.response.data.error
                        this.sending = false;
                        this.resetForm()
                    })
    },
    resetForm(){
        this.user.oldPassword = ''
        this.user.newPassword = ''
        this.user.newPassword2 = ''
    }
  },
  
}
</script>

<style lang="scss" scoped>
.resetForm{
  max-width: 500px;
}
.s-ldr{
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.save-form-buttons{
  margin-top:40px!important;
  @media(max-width:750px){
    display: flex;
    justify-content: center;
    
    button{
      height: 42px;
    }
  }
}
.resetForm{
  @media(max-width:750px){
        padding-left:10px;
        padding-right: 10px;
    }
}
</style>