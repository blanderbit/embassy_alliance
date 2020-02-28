<template>
    <div class="telegramPopub"  @click.self="$store.commit('setTelegramPopub', false)">
        <div class="telegramPopubContent">
            <div class="uk-margin" style="width: 100%" v-if="!ok">
                <input
                    class="uk-input"
                    type="text"
                    name="telegram_account"
                    :data-vv-as="$t('telegram.telegram_account')"
                    v-model="telegram_account"
                    v-validate="'required'"
                    :placeholder="$t('telegram.telegram_account')">
                <span v-if="errors.has('telegram_account')" class="input-invalid">
                  {{ errors.first('telegram_account') }}</span>
            </div>
            <h3 class="personal" v-if="ok">
                {{$t('telegram.telegram_ok')}}
            </h3>
            <button
                    v-if="!ok"
                    class="btn1 btn1-form submit-btn"
                    @click="!ok ? onContactFormSubmit() : this.$store.commit('setTelegramPopub',false)"
            >
                {{!ok ? $t('form.send') : $t('telegram.telegram_close')}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "telegram",
        data(){
            return{
                telegram_account: '',
                ok: false
            }
        },
        methods:{
            async onContactFormSubmit(){
                await this.$validator.validateAll()
                    .then(valid => {
                        if (!valid) {
                             return null;
                        } else {
                            return this.send()
                        }
                    });
            },
            send(){
                return this.$axios.post('/bot/sendmessage', {
                    telegram_account: this.telegram_account
                })
                    .then(() => this.ok = true)
            }
        }
    }
</script>

<style scoped>
    .telegramPopub{
        width: 100%;
        height: 100vh;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        background: rgba(50,64,91,.3);
    }
    .telegramPopubContent{
        width: 100%;
        max-width: 400px;
        padding: 10px;
        box-sizing: border-box;
        background: white;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        display: flex;
    }
    .input-invalid{
        color: #f0506e!important;
        display: inline-block;
        font-size: 12px;
    }
</style>
