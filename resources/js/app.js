
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import VueRouter from "vue-router"
import moment from 'vue-moment'
import Vuetify from 'vuetify'
import { Form } from 'vform'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(moment)
Vue.use(VueSweetalert2);
window.Form = Form

import App from "./components/App.vue"
import Home from "./components/Home.vue"
import UserIndex from "./components/UserIndex.vue"

import 'vuetify/dist/vuetify.min.css' 
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const routes = [
    { path:'/home', component:Home, name:'Home' },
    { path:'/users', component:UserIndex, name:'UserIndex' },
]

const router = new VueRouter({
    mode: 'history',
    routes:routes
})


const app = new Vue({
    el: '#app',
    components: { App },
    router
});
