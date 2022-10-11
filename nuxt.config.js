import dotenv from "dotenv";
dotenv.config();

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "NaLouGeh Prototype",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/custom.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/daterangepicker",
    "@/plugins/fontawesome",
    "@/plugins/Vuelidate"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt"
  ],
  bootstrapVue: {
    icons: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: "192.168.192.4",
    port: 8080
    //    host: "172.168.1.47"
    // port: 4012,
    // host: "172.16.4.88"
  },

  axios: {
    // baseURL: 'http://sap.jltechsol.com:7050'
    baseURL: process.env.URL
    //  baseURL: "http://localhost:3000"
    // baseURL: "http://172.16.4.88:3000"
    // proxy: true
    // baseUrl: 'http://localhost:8080'
  },
  env: {
    baseURL: "https://assessment4.biotechfarms.net"
  }
};
