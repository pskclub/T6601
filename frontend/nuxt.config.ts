// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { CONFIG } from './constants/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseAPI: process.env.APP_BASE_API,
      baseAPIMock: process.env.APP_BASE_API_MOCK,
      baseInternalAPI: process.env.APP_BASE_INTERNAL_API,
      port: process.env.PORT || '3000',
    },
  },
  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue', '@vuepic/vue-datepicker'],
  },
  experimental: {
    viewTransition: false,
    writeEarlyHints: false,
    renderJsonPayloads: false,
    inlineSSRStyles: false,
  },
  components: [
    {
      path: '~/components',
      extensions: ['vue'],
    },
  ],
  imports: {
    dirs: ['hooks', 'loaders', 'containers', 'constants'],
  },
  app: {
    head: {
      title: CONFIG.TITLE,
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
      link: [
        {
          rel: 'dns-prefetch',
          href: 'https://www.google-analytics.com/',
        },
        {
          rel: 'preconnect',
          href: 'https://www.google-analytics.com/',
          crossorigin: '',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/devtools'],
  css: ['@/assets/styles/main.scss'],
})
