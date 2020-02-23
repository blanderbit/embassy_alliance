<template>
<ul class="uk-accordion">
   <li v-for="(item, index) in items" :key="index">
        <a class="uk-accordion-title" 
            href="javascript:void(0)"
            @click="toggle(index)"
            :class="{open:switches[index]}">
            <span class="num" v-if="indexing">{{index+1}}</span>
            <span class="head">{{item.head}}</span>
        </a>
        <div class="uk-accordion-content" v-show="switches[index]">
            <p>{{item.body}}</p>
        </div>
    </li>
</ul>
</template>

<script>
export default {
    name: 'VkAccordion',
    props: { 
      items: Array,
      multiply: {
          default: false,
          type: Boolean
        },
        indexing: {
          default: false,
          type: Boolean
        },
    },     
    data() {
      return {
          switches: []
      }
    },
    methods: {
        toggle(i){
            //this.switches[i] = !this.switches[i];
            this.$set(this.switches, i, !this.switches[i]);
            if(!this.multiply){
                this.closeOthers(i);
            }
        },
        closeOthers(v){
            for(let i=0,len=this.switches.length;len>i;i++){
                if(v==i)continue
                this.$set(this.switches, i, false);
            }
        },
        createIndexes(){
            for(let i=0,len=this.items.length;len>i;i++){
                this.$set(this.switches, i, false);
            }
        }
    },
    mounted(){
        this.createIndexes();
    }
}
</script>
    

