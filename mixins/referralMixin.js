import { fireDb } from '~/plugins/firebase.js';
import axios from 'axios';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export default {
    data() {
        return {
            userData: {},
        }
    },
    methods: {
        async writeUserToFirestore() {
            const ref = fireDb.collection("httpNewVisitors").doc()
            const document = this.userData;         
            try {
              await ref.set(document)
            } catch (e) {
            // TODO: error handling
                console.error(e)
            }
            this.writeSuccessful = true
            //console.log('firebase okie!');
        },
        getReferrence(){
            ////console.log(this.$route.query);
            //referral_id
            //channel_id
            //product_id
            if(this.$route.query.referral_id){
            this.userData.referralID = this.$route.query.referral_id;
            this.userData.channelID = this.$route.query.channel_id || null;
            this.userData.productID = this.$route.query.product_id || null;
            this.userData.date = Date.now();
            this.$cookies.set('referralID', this.userData.referralID, {
                    path: '/',
                    maxAge: COOKIE_MAX_AGE
            });
            this.setGetCookie();
            }
            
        },
        setGetCookie(){
            let cookieRes = this.$cookies.get('ea-uuid');
            if(!cookieRes || cookieRes.legth == 0){
                let uuid = this.generateUUID();
                this.$cookies.set('ea-uuid', uuid, {
                    path: '/',
                    maxAge: COOKIE_MAX_AGE
                });
                this.userData.uuid = uuid;
                this.getUserInfo();
            }
            
        },
        getUserInfo(){
            //console.log('getting data from ipinfo')
            const url = 'https://ipinfo.io?token=f63b46f8a5fb0e';
            axios.get(url)
            .then(response => {
            //const items = JSON.parse(data.response).Items
            if(response.data){
                //console.log(response.data);
                let key
                for(key in response.data){
                    if (response.data.hasOwnProperty(key)){
                        this.userData[key] = response.data[key];
                    }
                }
            }
                //console.log(this.userData);          
            })
            .finally(() => {
                //console.log('Firestore write')
                this.writeUserToFirestore();          
            });
        },
        async modalLogin(){           
            if(this.login.username.length==0 || this.login.password.length==0){
              alert('Please fill up the fields');
              return null
            }    
            this.modal.registerLoader = true;        
            await this.$auth.login({
              data: {
                  email: this.login.username,
                  password: this.login.password
              }
            }).then(() => {
              //this.$router.push('/clientarea')
            }).catch(err => {
              //this.snackbar.show = true;
              //this.error = err.response.data.error
              this.modal.registerLoader = false
            }).finally(()=>{
              this.modal.registerLoader = false
            })
        },
    },
    //created: function () {
        ////console.log('mixin hook called: ' + Date.now())
    //}
}