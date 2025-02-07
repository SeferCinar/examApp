// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  routeRules: {
    "/": { redirect: "/basicMode" }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'light',
  },
  app: {
    head: {
      title: 'ExamApp',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'ExamApp', content: 'Öğrenciler için çeşitli araçları içeren bir site' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
