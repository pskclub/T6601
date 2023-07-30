import { defineNuxtPlugin } from '#app'
import Notifications from '@kyvg/vue3-notification'
import VueLazyLoad from 'vue3-lazyload'
import Datepicker from '@vuepic/vue-datepicker'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications)
  nuxtApp.vueApp.use(VueLazyLoad)
  nuxtApp.vueApp.component('Datepicker', Datepicker)
})
