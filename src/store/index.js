import Vue from 'vue'
import Vuex from 'vuex'
// import { firebaseDb } from 'src/boot/firebase'
// import { firebaseAuth, firebaseDb } from 'boot/firebase'
import storetasks from './storetasks'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // state: {
    //   events: []
    // },
    // getters: {
    //   EVENTS: state => state.events
    // },
    // mutations: {
    //   ADD_EVENT: (state, event) => {
    //     state.events.push(event)
    //   }
    // },
    // actions: {
    //   reservation: ({ commit, payload }) => {
    //     console.log('payload: ', payload)
    //     firebaseDb.collection('Reservation').add({
    //       Date: payload.Date,
    //       Selection: payload.Selection,
    //       Time: payload.time,
    //       Adult: payload.Adult,
    //       Student: payload.Student,
    //       Group: payload.Group
    //     })
    //       .then(function (docRef) {
    //         console.log('Document written with ID: ', docRef.id)
    //       })
    //       .catch(function (error) {
    //         console.error('Error adding document: ', error)
    //       })
    //   }

    // },

    modules: {
      storetasks
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  // if (process.env.DEV && module.hot) {
  //   module.hot.accept(['./storeTask.js'], () => {
  //     const newShowcase = require('./storeTask.js').default
  //     Store.hotUpdate({ modules: { showcase: newShowcase } })
  //   })
  // }

  return Store
}
