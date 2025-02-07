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
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    preference: 'light',
  },
})
