// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ['styles', 'reset'],
  build: {
    transpile: ['gsap'],
  },
  ssr: true,
  // target: 'static',
  app:{
    head: {
      title: 'Stand With Freedom',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
    }
  },
  modules: [
    'nuxt-appwrite',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@dargmuesli/nuxt-cookie-control',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@nuxt/content',
    'nuxt-quasar-ui',
    // '@nuxtjs/tailwindcss',
  ],
  quasar: {
    plugins: [
      'Dark',
      'Loading',
      'Notify',
      'Dialog',
      'LoadingBar',
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons','ionicons-v4'],
      animations: 'all',
    },
    config: {
      dark: true,
    },
    sassVariables: "/assets/quasar-variables.sass",
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage',
  },
  appwrite: {
    endpoint: 'https://back.standwithfreedom.org/v1',
    project: '63f2718577a2ba21aed9',
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    public: {
      siteName: 'Stand With Freedom',
      siteUrl: 'http://192.168.1.51:3000',
      // database: '64150377b9872d128753',
      // botCollection: '641f43e0162b6b45eeea',
    }
  },
  // cookie module options
  cookieControl: {
    barPosition: 'bottom-full',
    colors: {
      barBackground: '#000',
      controlButtonIconHoverColor: '#fff',
      focusRingColor: '#808080',
    },    
    cookies: {
      necessary: [
        {
          description: {
            en: 'This cookie does something very very very very very very very long.',
          },
          name: {
            en: 'Necessary Cookie',
          },
          targetCookieIds: ['NEC'],
        },
      ],
      optional: [
        // {
        //   id: 'op',
        //   name: 'Optional Cookie',
        //   links: {
        //     '/privacy': 'Privacy Policy',
        //     'https://standwithfreedom.org/privacy': null,
        //   },
        //   targetCookieIds: ['_o', '_p', '_t'],
        // },
      ],
    },
    isAcceptNecessaryButtonEnabled: false,
    isCookieIdVisible: false,
    isControlButtonEnabled: false,
    isCssEnabled: true,
    locales: ['en'],
    localeTexts: {
      de: {
        iframeBlocked: 'Bitte funktionale Cookies aktivieren:',
      },
    },
  },
});

