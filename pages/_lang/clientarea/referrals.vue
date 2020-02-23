<template>
    <div>
        <div v-if="showList">
            <header class="t_header">
                <span>
                    <h2>{{$t('referral.list_of_visitors')}}</h2>
                    <span class="uk-badge" v-if="this.stats.length>0">{{this.stats.length}}</span>
                </span>
                <vk-button  class="uk-margin-small-right" @click="showList=false;loadOrders()">
                    {{$t('referral.show_orders')}}
                </vk-button>
            </header>
            <vk-table :data="stats" narrowed>
                <vk-table-column title="Country" cell="country"></vk-table-column>
                <vk-table-column title="City" cell="city"></vk-table-column>
                <vk-table-column title="Location" cell="loc"></vk-table-column>
                <vk-table-column title="IP" cell="ip"></vk-table-column>
                <vk-table-column title="Region" cell="region"></vk-table-column>
                <vk-table-column title="Date" cell="date"></vk-table-column>
                <vk-table-column title="ref.ID" cell="referralID"></vk-table-column>
            </vk-table>
        </div>
        <div v-else>
            <header class="t_header">
                <span>
                <h2>{{$t('referral.list_of_orders')}}</h2>
                <span class="uk-badge" v-if="this.orders.length>0">{{this.orders.length}}</span>
                </span>
                <vk-button  class="uk-margin-small-right" @click="showList=true;readFromFirestore()">
                    {{$t('referral.show_stats')}}
                </vk-button>
            </header>
            <vk-table :data="orders" narrowed>
                <vk-table-column title="Email" cell="email"></vk-table-column>
                <vk-table-column title="Date" cell="created_at"></vk-table-column>
                <vk-table-column title="ref.ID" cell="referral_id"></vk-table-column>
            </vk-table>
        </div>
    </div>
</template>



<script>
/*
    channelID null
    city "Krasnodar"
    country "RU"
    date 1555234239207
    hostname "95x153x133x78.kubangsm.ru"
    (string)
    ip "95.153.133.78"
    loc "45.0355,38.9750"
    org "AS29497 MTS PJSC"
    postal "350000"
    productID null
    referralID "15412"
    region "Krasnodarskiy Kray"
    uuid "a3398906-d48e-4cf8-b52f-f223ab8d154e" 
*/
import { fireDb } from '~/plugins/firebase.js';
export default {
    layout: 'client-layout',
    data() {
        return {
            stats: [],
            orders: [],
            showList: true
        }
    },
    methods: {
        async readFromFirestore() {
            var rid = this.$store.state.auth.user.referral.id;
            //console.log('RID: ' + rid);
            if(!rid || !this.showList || this.stats.length>0){                
                return null
            }
            await fireDb.collection("httpNewVisitors")
                .orderBy('referralID')
                .startAt(rid.toString()).endAt(rid.toString())
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.stats.push(doc.data());
                    });
                    this.convertDates();
                    //console.log(this.stats);
            });
        },
        convertDates(){
            for(let i=0;this.stats.length>1;i++){
                if(this.stats[i].date){
                    let t = new Date(this.stats[i].date).toDateString();
                    this.stats[i].date = t;
                }
            }
        },
        async loadOrders(){
            if(this.orders.length>0){                
                return null
            }
            await this.$axios.get('/referral/orders')
            .then((response) => {
                this.orders.push(...response.data);                    
            })
            .catch((err) => {
                  
            })
        }
    },
    mounted(){
        this.readFromFirestore();
    }
}

</script>


<style lang="scss" scoped>
.t_header{
    display: flex;
    justify-content: space-between;
    &>span{
        display: flex;
        align-items: center;
        h2{
            line-height: 1;
            margin-right: 14px;
            margin-bottom: 5px;
        }
    }
}
</style>