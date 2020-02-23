// sing in from socialite:
// https://github.com/iliyaZelenko/laravel-nuxt

export default {
    data() {
        return {   
            emailRe: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,        
            formFields: {
                participant:[
                    'first_name',
                    'last_name',
                    'address',
                    'birth_date',
                    'email',
                    'phone',
                    'passport_expire',
                    'passport_number',
                    'city',
                    'country_id',
                ],
                parent: [
                    'first_name',
                    'last_name',
                    'email',
                    'phone'
                ]
            },
            countries: [],
            products: [],
            //availableAddons: [],
            messages: [],
            fieldsShown: [
                'first_name',
                'last_name',
                'address',
                'birth_date',
                'email',
                'phone',
                'passport_expire',
                'passport_number',
                'city',
                'country',
              ],
            newOrder: {
                productIndex: 0,
                addons: [],
                productID: null,
                variationID: null,
                variationIndex: 0,
                sent: false,
                invoices: [],
                participant:{
                    first_name: '',
                    last_name: '',
                    //email: '',
                    birth_date: '',  
                    country_id: 1,
                    country: {}               
                },
                parent:{
                    first_name: '',
                    last_name: ''
                }
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
        }
    },
    methods: {
        async getReCaptcha(){
            await this.$recaptcha.init()
            ////console.log('from recapthcha init')
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
          /*
        async getProducts(){
            await this.$axios.get('/products/list?lang='+ this.$i18n.locale)
                 .then((response) => {
                     this.products = response.data.data;
                     ////console.log(this.products);
                     //console.log('fetched products. Locale: '+ this.$i18n.locale)
                 })
                 .catch((err) => {
                    this.$toast.error('An error has occured!',{
                        icon : {
                            name : 'error'
                        }}).goAway(1500);
                 })
                 .finally(()=>{
                     //this.initCountDown(this.product.starts_at);
                     ////console.log("starts at: " + this.product.starts_at)
                 })
        },*/
        processPendingLocalOrders(){          
            let curTime = Date.now();
            let data = localStorage.getItem('orderToProcess');
            let expire = localStorage.getItem('orderToProcessExpire');
            if(typeof data != 'undefined' && data != null && typeof expire != 'undefined' && expire != null && expire*1>=curTime){
                let ord = JSON.parse(data);
                if(!ord.productID || !ord.variationID){
                    return 0;
                }
                ////console.log('A stored pending order was fetched from localstorage');
                this.newOrder.productIndex = this.productIndexByID(ord.productID);
                this.newOrder.variationIndex = this.variationGetIndexByID(this.newOrder.productIndex, ord.variationID);
                if(ord.addons.length>0){
                    for(let i=0,ln = ord.addons.length; i<ln;i++){
                        try {
                            this.newOrder.addons.push(ord.addons[i].id );
                        } catch(e) {}
                    }
                }
                this.stepper = 1;
                this.modals.makeOrder = true;
                localStorage.removeItem('orderToProcess');
                localStorage.removeItem('orderToProcessExpire');
            }
        },
        productIndexByID(id){
            for(let i=0,ln = this.products.length; i<ln;i++){
                try {
                    if(this.products[i].id == id){
                        return i;
                    }
                } catch(e) {}
            }
        },
        variationGetIndexByID(productID, id){
            if(this.products[productID] == null || typeof this.products[productID].variations === 'undefined')
            return null
            for(let i=0,ln = this.products[productID].variations.length; i<ln;i++){
                try {
                    if(this.products[productID].variations[i].id == id){
                        return i;
                    }
                } catch(e) {}
            }

        },
        async logout() {
            await this.$axios.post('/auth/logout')
                .then((response) => {
                    this.$auth.logout();
                })
        },
        async signinManually (access_token, refresh_token, user ) {
            this.$auth.setToken('local', 'Bearer ' + access_token)
            this.$auth.setRefreshToken('local', refresh_token)
            this.$auth.setUser(user)
            ////console.log('Logged in manually. Thanks to Iliya for this one!')
            /*
            this.$toast.show(this.$t('form.logging_in'),{
                icon : {
                    name : 'watch'
            }}).goAway(1500);
            */
            this.$router.go('/clientarea');
        },
        forceFormatDateNewOrder(model,key){
            let r = this.customDateFormatter(this.newOrder[model][key]);
            this.newOrder[model][key] = r;
        },
        customDateFormatter(date) {
            return this.$moment(date).locale(this.$i18n.locale).format('YYYY-MM-DD');
        },
        localDateFormat(date, format){
            let f = format || 'L';
            let nDate = ''// date.substring(0, date.indexOf('T') - 1);
            ////console.log('date: ' + nDate + ' ' + date + ' Format ' + f)
            return this.$moment(date).locale(this.$i18n.locale).format(f);
        },
        checkPassportExpires(date, start_date){
            ////console.log('passport expiration date event');
            //let reg = "/^(((\d{4})(-)(0[13578]|10|12)(-)(0[1-9]|[12][0-9]|3[01]))|((\d{4})(-)(0[469]|1‌​1)(-)([0][1-9]|[12][0-9]|30))|((\d{4})(-)(02)(-)(0[1-9]|1[0-9]|2[0-8]))|(([02468]‌​[048]00)(-)(02)(-)(29))|(([13579][26]00)(-)(02)(-)(29))|(([0-9][0-9][0][48])(-)(0‌​2)(-)(29))|(([0-9][0-9][2468][048])(-)(02)(-)(29))|(([0-9][0-9][13579][26])(-)(02‌​)(-)(29))))$/"
            if(!date && !start_date){
                return false;
            }
            var exp = date;
            var parseDate = start_date;
            var startDate = this.$moment(parseDate,"YYYY-MM-DD").add('months',6);
            var expireDate;
            try{
                if(/^((\d{4})(-)(\d{2})(-)(\d{2}))$/.test(exp)){
                    expireDate = this.$moment(exp, "YYYY-MM-DD");
                } else {
                    expireDate = this.$moment(exp, "MM/DD/YYYY");
                }
                
            } catch(e){
                return false;
            }
            if(!startDate){
                
            }
            ////console.log(startDate, expireDate)
            ////console.log(startDate >= expireDate)
            if(startDate >= expireDate){
                //alert('This passport is not allowed! Shold be valid at least 6 months by the time the camp starts');
                return false;
            }
            return true;
        },
        processTheOrder(){
            switch(this.stepper){
                case 1:
                    ////console.log('stage 1 ' + this.newOrder.productIndex);
                    let ok = 0;
                    try{
                        this.newOrder.productID = this.products[this.newOrder.productIndex].id;
                        this.newOrder.variationID = this.products[this.newOrder.productIndex].variations[this.newOrder.variationIndex].id;
                        ok++;
                    } catch(e){

                    }
                    if(ok>0){
                        this.stepper = 2;
                    }
                    break;

                case 2:                    
                    this.$validator.validateAll('new0Participant')
                        .then(result => {   
                            if (result) {
                                this.stepper = 3;
                            } else {
                                this.messages.push({ message: this.$t('clientarea.messages.form_general_error'), status: 'danger' })
                            }
                        });   
                    break;

                case 3:
                    this.$validator.validateAll('new0Parent')
                        .then(result => {                           
                            if (result) {
                                this.stepper = 4;
                                this.createNewOrder()
                            } else {
                                this.messages.push({ message: this.$t('clientarea.messages.form_general_error'), status: 'danger' })
                            }
                    });   
                    break;
            }
        },
        async createNewOrder(){
            await this.$axios.post('/my_order/new',{
                data: this.newOrder
            }).then((response) => {
                this.newOrder.invoices.push(...response.data.invoices);  
                this.newOrder.id = response.data.id; 
                this.newOrder.sent = true;                
            }).catch((err) => {
                  
            })
        },
        async getCountries(){
            await this.$axios.get('/helpers/country/list')
            .then((response) => {
                this.countries.push(...response.data);                    
            })
            .catch((err) => {
                  
            })
        }, 
        async getProducts(){
            this.products = [];
            await this.$axios.get('/products/list?lang='+ this.$i18n.locale)
            .then((response) => {
                this.products.push(...response.data.data);   
                //console.log('fetched products. Locale: '  + this.$i18n.locale)                 
            })
            .catch((err) => {
                //console.log('ERROR: products getter screwed!')  
                this.$toast.error('An error has occured!',{
                    icon : {
                        name : 'error'
                    }}).goAway(1500);
            })
            .finally(() => {
                this.processPendingLocalOrders();  
            });
        },  
        /*async getAddons(){
            this.ordersLoading = true;
            await this.$axios.get('/addons/list')
              .then((response) => {
                  this.availableAddons = response.data;
              })
              .catch(err => {    
                //console.log('ERROR: ADDONS got screwed!!')        
              })
        }, */
    },
    //created: function () {
        ////console.log('mixin hook called: ' + Date.now())
    //}
}