import Vue from 'vue'
import Vuikit from 'vuikit'
/*
import { Modal, ModalFull, ModalClose, ModalFullClose } from 'vuikit/lib/modal'
import { Spinner } from 'vuikit/lib/spinner'
import { Offcanvas, OffcanvasContent } from 'vuikit/lib/offcanvas'
import { Grid } from 'vuikit/lib/grid'
import { Button } from 'vuikit/lib/button'
import { Notification } from 'vuikit/lib/notification'
import { Icon } from 'vuikit/lib/icon'
*/
import VuikitIcons from '@vuikit/icons'

import '@vuikit/theme'

Vue.use(Vuikit)
/*
Vue.component('VkModal', Modal)
Vue.component('VkModalFull', ModalFull)
Vue.component('VkModalClose', ModalClose)
Vue.component('VkModalFullClose', ModalFullClose)
Vue.component('VkSpinner', Spinner)
Vue.component('VkOffcanvas', Offcanvas)
Vue.component('VkOffcanvasContent', OffcanvasContent)
Vue.component('VkGrid', Grid)
Vue.component('VkButton', Button)
Vue.component('VkNotification', Notification)
Vue.component('VkIcon', Icon)
*/
Vue.use(VuikitIcons)