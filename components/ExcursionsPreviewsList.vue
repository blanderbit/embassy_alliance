<template>
    <div class="b06_in2">
        <div class="prizes-grid">
            <div class="col0 place2_col0" v-for="(addon, index) in addonsShorted" :key=index>
            <div class="b06_in2_b1">
                <div class="img-holder" :style="{'background-image': 'url('+addon.image+')'}" />
                <div class="b06_in2_sb1">
                <p class="b06_in2_tx1">
                    {{addon.i18n_name[$i18n.locale]}}
                </p>
                <p class="b06_in2_tx2" v-if="addon.i18n_description">
                    {{addon.i18n_description[$i18n.locale]}}
                </p>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ExcursionsPreviewsList',
  props: { 
      addonsShorted: Array,
      //isOpen: Boolean,
      },
    methods: {
        
    }
}
</script>