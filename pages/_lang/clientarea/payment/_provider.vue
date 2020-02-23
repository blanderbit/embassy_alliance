<template>
    <div>
        <client-only>
        <vk-modal center v-show="verificationModal">
        <div v-if="paymentSuccess=='success'" class="waiting">
            <div class="uk-alert-success" uk-alert>
                <header>{{$t('payment.successful')}}</header>
                <p>{{$t('payment.successful_desc')}}</p>
            </div>
        </div>
        <div v-else-if="paymentSuccess=='failed'" class="waiting">
            <div class="uk-alert-danger" uk-alert>
                <header>{{$t('payment.failed')}}</header>
                <p>{{$t('payment.failed_desc')}}</p>
            </div>
        </div>
        <div v-else class="waiting">
            <span>
            {{$t('payment.wait_verification')}}
            </span>
            <div class="inner loading">       
                <vk-spinner ratio="3.5"></vk-spinner>       
            </div>          
        </div>
        </vk-modal>
        </client-only>
    </div>
</template>



<script>
export default {
    layout: 'client-layout',
    data() {
       return {
           verificationModal: true,
           provider: null,
           paymentId: '',
           paymentToken: '',
           payerID: '',
           paymentSuccess: null,
       }
    },
    methods: {
        getPaymentQuery(){
            let result = false;
            if(this.$route.query.paymentId && this.$route.query.token && this.$route.query.PayerID){
                //$request->paymentId && $request->token && $request->PayerID
                //Seems to be paypal
                //console.log('query is ready to be precessed');
                this.paymentToken = this.$route.query.token;
                this.paymentId = this.$route.query.paymentId;
                this.payerID = this.$route.query.PayerID;
                result = true;
            }
            if(result){
                this.getPaymentStatus();
            }
        },
        async getPaymentStatus(){
            await this.$axios.post('payment/'+ this.provider +'/done',{
                paymentId: this.paymentId,
                token: this.paymentToken, 
                PayerID: this.payerID
            })
            .then((response) => {
                if(response.data.success){
                    this.paymentSuccess = 'success';  
                    let self = this;
                    setTimeout(function(){
                        if(response.data.order_id){
                            this.verificationModal = false;
                            self.$router.push({path:'/clientarea/order/' + response.data.order_id + '?reload=force' });
                        } else {
                            self.$route.go({path:'/clientarea' });
                        }
                        
                    },1000)  
                    return               
                }  
                this.paymentFailed();                
            })
            .catch((err) => {
                this.paymentFailed(); 
            })
        },
        paymentFailed(){
            this.paymentSuccess = 'failed';
        }
    },
    mounted(){
        this.provider = this.$route.params.provider;
        this.getPaymentQuery();
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/variables";

.uk-alert-success,.uk-alert-danger{
    width: 100%;
    header{
        font-size: 24px;
    }
}
.waiting{
    display: flex;
    padding: 40px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
        display: block;
        margin-bottom: 40px;
    }
}
</style>