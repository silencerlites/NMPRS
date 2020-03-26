import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebaseAuth } from 'boot/firebase'

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

  // Router.beforeEach((to, from, next) => {
  //   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  //   const currentUser = firebaseAuth.currentUser
  //   if (requiresAuth && !currentUser) {
  //     next('/')
  //   } else if (requiresAuth && currentUser) {
  //     next()
  //   } else {
  //     next()
  //   }
  // })

  Router.beforeEach((to, from, next) => {
    firebaseAuth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebaseAuth.currentUser.getIdTokenResult()
          .then(function ({
            claims
          }) {
            if (claims.customer) {
              if (to.path !== '/customer') {
                return next({
                  path: '/customer'
                })
              }
            } else if (claims.admin) {
              if (to.path !== '/adminSide' && to.path !== '/adminSide/reservation' && to.path !== '/adminSide/reservation/list' && to.path !== '/adminSide/visitorslog' && to.path !== '/adminSide/survey' && to.path !== '/adminSide/billing' && to.path !== '/adminSide/accounts' && to.path !== '/adminSide/reports' && to.path !== '/adminSide/setting') {
                next({
                  path: '/adminSide'
                })
              }
            }
            // else if (claims.driver) {
            //   if (to.path !== '/driver') {
            //     return next({
            //       path: '/driver'
            //     })
            //   }
            // }
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
