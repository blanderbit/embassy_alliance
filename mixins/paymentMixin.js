
export default {
    data() {
        return {
            lock:{
                message: null,
                stage: false
            },
            modals:{
                pay4TheOrder: false,
                makeOrder: false,
            },
            selectedInvoices: [],
            invoices: [],
            invoicesLoading: true,
            products: [],
            countries: []
        }
    },
    methods: {
        openPaymentModal(id){
            this.workingID = id;
            this.modals.pay4TheOrder = true;
            this.getInvoices();
        },
        payInvoice(id){
            this.selectedInvoices = [];
            this.selectedInvoices.push(id);
            this.modals.pay4TheOrder = true;
            this.invoicesLoading = false;
        },
        async PreparePaymentLink(){
            this.invoicesLoading = true;
            this.lock.stage = true;
            await this.$axios.post('/payment/checkout/paypal',{
                invoices: this.selectedInvoices,
                cancel_url: window.location.origin + this.$route.fullPath
            })
            .then((response) => {           
                //this.invoicesLoading = false;
                if(response.data.success){
                    window.location.replace(response.data.url);
                }           
            }).catch(err => {
                //this.snackbar.show = true;
                //this.error = err.response.data.error
            })
        },
    }
}
