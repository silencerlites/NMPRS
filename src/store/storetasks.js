
const state = {
  all: {},
  events: {},
  data: [
    { }
  ]
}

const getters = {
  events: state => state.events
}

const mutations = {

  ADD_EVENT: (state, event) => {
    state.events.push(event)
  }
}

const actions = {

  // async reservation ({ commit }, payload) {
  //   console.log('payload: ', payload)
  //   firebaseDb.collection('Reservation').add({
  //     Date: payload.Date,
  //     Building: {
  //       Building: payload.selection,
  //       Time: payload.Time
  //     },
  //     Adult: payload.Adult,
  //     Student: payload.Student,
  //     Group: payload.Group
  //   })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef.id)
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error)
  //     })
  // },

  // async contactuser ({ commit }, payload) {
  //   console.log('payload: ', payload)
  //   firebaseDb.collection('ContactUser').add({
  //     Name: payload.Name,
  //     ConNum: payload.ConNum,
  //     Email: payload.Email
  //   })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef.id)
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error)
  //     })
  // }

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
