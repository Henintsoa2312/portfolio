// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-lottie',
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><path fill=%22none%22 stroke=%22rgb(96,165,250)%22 stroke-width=%2212%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M35 20 C 15 40, 15 60, 35 80 M65 20 C 85 40, 85 60, 65 80%22 /></svg>' }
      ]
    }
  }
})