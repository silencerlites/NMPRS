import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebaseAuth } from 'boot/firebase'
import VueHtmlToPaper from 'vue-html-to-paper'

import routes from './routes'
import moment from 'moment'

Vue.use(VueRouter)

Vue.filter('timeformat', (arg) => {
  return moment(arg).format('LLLL')
})

Vue.filter('timeformatDate', (arg) => {
  return moment(arg).format('LL')
})

Vue.filter('timeformatTime', (arg) => {
  return moment(arg).format('LT')
})

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  'styles': [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css'
  ]
}
Vue.use(VueHtmlToPaper, options)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    firebaseAuth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebaseAuth.currentUser.getIdTokenResult()
          .then(function ({
            claims
          }) {
            if (claims.Customer) {
              if (to.path !== '/customerSide' && to.path !== '/customerSide/MyBilling' && to.path !== '/customerSide/accounts/manage') {
                return next({
                  path: '/customerSide'
                })
              }
            } else if (claims.Administrator) {
              if (to.path !== '/adminSide' && to.path !== '/adminSide/reservation' && to.path !== '/adminSide/reservation/list' && to.path !== '/adminSide/visitorslog' && to.path !== '/adminSide/survey' && to.path !== '/adminSide/billing' && to.path !== '/adminSide/scanqr' && to.path !== '/adminSide/accounts' && to.path !== '/adminSide/accounts/manage' && to.path !== '/adminSide/reports' && to.path !== '/adminSide/setting') {
                next({
                  path: '/adminSide'
                })
              }
            } else if (claims.FrontDesk) {
              if (to.path !== '/kioskSide') {
                next({
                  path: '/kioskSide'
                })
              }
            } else if (claims.Reservation) {
              if (to.path !== '/reservationSide' && to.path !== '/reservationSide/reservation' && to.path !== '/reservationSide/scanqr' && to.path !== '/reservationSide/reservation/list' && to.path !== '/reservationSide/visitorslog' && to.path !== '/reservationSide/survey' && to.path !== '/reservationSide/billing' && to.path !== '/reservationSide/accounts' && to.path !== '/reservationSide/accounts/manage' && to.path !== '/reservationSide/reports' && to.path !== '/reservationSide/setting' && to.path !== '/reservationSide/accounts/manage') {
                next({
                  path: '/reservationSide'
                })
              }
            }
          })
      } else {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          next({
            path: '/',
            query: {
              redirect: to.fullPath
            }
          })
        } else {
          next()
        }
      }
    })
    next()
  })

  return Router
}
