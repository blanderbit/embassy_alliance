import Vue from 'vue';
import VeeValidate from 'vee-validate';
import messagesRu from "~/node_modules/vee-validate/dist/locale/ru";

//VeeValidate.Validator.addLocale(VeeValidateMessagesRu);
//import messagesRu from '~/locales/validator/messages/ru.js';
//import attributesRu from '~/locales/validator/attributes/ru.js';
////console.log(messagesRu)

VeeValidate.Validator.localize('ru', messagesRu);

Vue.use(VeeValidate, {
  inject: true,
  locale: 'ru',
  dictionary: { 
    ru: { messages: messagesRu }
  }
});