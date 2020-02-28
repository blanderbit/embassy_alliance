<template>
    <div>
        <telegram v-if="telegram"></telegram>
        <nuxt/>
        <div id="recaptcha"/>
    </div>
</template>


<script>
    import telegramPopub from "../components/telegramPopub";

    export default {
        head() {
            return this.$nuxtI18nSeo()
        },
        components:{
            telegram:telegramPopub
        },
        computed: {
            telegram() {
                return this.$store.getters['getTelegramPopub']
            }
        },
        created() {
            console.log('default.vue')
        },
    }
</script>

<style lang="scss">

</style>
