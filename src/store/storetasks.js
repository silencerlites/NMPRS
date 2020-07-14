import { firestore, firebaseAuth } from 'boot/firebase'
import Vue from 'vue'

const state = {
  userDetails: {},
  myreservedetails: {}
}

const mutations = {
  setUserDetails (state, payload) {
    state.userDetails = payload
  },
  reservmy (state, payload) {
    console.log('payload', payload)
    Vue.set(state.myreservedetails, payload.id, payload.myreservedetails)
  }
}

const getters = {
  myreservedetails: state => {
    return state.myreservedetails
  }

}

const actions = {

  // fetchUser ({ commit }, user) {
  //   commit('SET_LOGGED_IN', user !== null)
  //   if (user) {
  //     commit('SET_USER', {
  //       displayName: user.displayName,
  //       email: user.email
  //     })
  //   } else {
  //     commit('SET_USER', null)
  //   }
  // }

  // eslint-disable-next-line no-empty-pattern
  loginUser ({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        console.log(user)
        // this.$router.replace('adminSide')
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password!')
        } else {
          alert(errorMessage)
        }
        // ...
      })
  },
  handleAuthStateChanged ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        let userId = firebaseAuth.currentUser.uid
        firestore.collection('Users').doc(user.uid).get()
          .then(function (querySnapshot) {
            let userDetails = querySnapshot.data()
            console.log('snap: ', userDetails)
            commit('setUserDetails', {
              FName: userDetails.Name.FirstName,
              LName: userDetails.Name.LastName,
              Email: userDetails.email,
              ConNumber: userDetails.ContactNumber,
              UserId: userId
            })
          }).catch(function (error) {
            console.log('Error getting documents: ', error)
          })

        dispatch('reservationCustomer')
      } else {
        commit('setUserDetails', {})
      }
    })
  },
  reservationCustomer ({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        firestore.collection('Reservation').where('UserId', '==', userId).orderBy('date', 'desc').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (documentSnapshot) {
            let myreservedetails = documentSnapshot.data()
            let id = documentSnapshot.id
            // do something with the data of each document.
            console.log('snaps: ', myreservedetails)
            commit('reservmy', {
              id,
              myreservedetails
            })
          })
        })
      }
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
