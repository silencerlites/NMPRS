
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})
// TODO: Replace the following with your app's Firebase project configuration

var firebaseConfig = {
  apiKey: 'AIzaSyC2dfVAw_kS2mxNrqifpHh8bUixpir96SM',
  authDomain: 'nmp2020-21376.firebaseapp.com',
  databaseURL: 'https://nmp2020-21376.firebaseio.com',
  projectId: 'nmp2020-21376',
  storageBucket: 'nmp2020-21376.appspot.com',
  messagingSenderId: '267431615019',
  appId: '1:267431615019:web:8f25e113159100fc27a86e'
}

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.firestore()
let firestore = firebaseApp.firestore()
let firefirestore = firebase.firestore

export { firebaseAuth, firebaseDb, firestore, firefirestore, firebaseApp }
