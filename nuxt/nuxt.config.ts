import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // Site configuration
      siteName: 'Leo Genot Portoflio',
      siteUrl: '',

      sanity: {
        projectId: 'y1aacj2s',
        dataset: 'production',
        apiVersion: '2024-03-15',
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/sanity',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    'nuxt-vitalizer',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    build: {
      sourcemap: true,
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['shallowequal', 'lodash/startCase.js'],
    },
  },

  image: {
    provider: 'sanity',
    sanity: {
      projectId: 'y1aacj2s',
    },
  },

  sanity: {
    globalHelper: true,
    projectId: 'y1aacj2s',
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2024-03-15',

    additionalClients: {
      another: {},
    },
    useCdn: process.env.NODE_ENV === 'production' ? true : false, // `false` if you want to ensure fresh data
  },

  experimental: { asyncContext: true },

  build: {
    transpile: ['gsap'],
  },

  sitemap: {
    sources: ['/api/sitemap'],
  },


  app: {
    pageTransition: {
      name: 'page-fade',
      mode: 'out-in',
    },
  },

  nitro: {
    compressPublicAssets: true,
    preset: 'netlify',
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': [
            "default-src * data: blob:",
            "script-src * 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src * 'self' 'unsafe-inline'",
            "connect-src * 'self'",
            "frame-ancestors 'self' https://leogenot.sanity.studio",
          ].join('; '),
          'X-Frame-Options': 'SAMEORIGIN',
        },
      },
    },
  },
})