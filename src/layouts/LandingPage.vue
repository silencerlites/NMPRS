<template>
  <q-layout view="hHh LpR fff">

    <q-header class="text-black col-12 q-pa-lg" reveal height-hint="98" style="background-color:white;">
      <q-toolbar>
        <q-toolbar-title>
          <img src="statics/app-logo-80x.svg" style="width:70px;" class="col-12">
          <span style="font-size:40px; color:#6B1510;"> National Museum of the Philippines</span>
        </q-toolbar-title>
        <q-btn flat style="font-size:28px; color: #6B1510;" label="Home" />
        <q-btn flat style="font-size:28px; color: #6B1510;" label="Apps" />
        <q-btn flat style="font-size:28px; color: #6B1510;" label="Login" @click="loginModal"/>
      </q-toolbar>
    </q-header>

       <q-dialog
        v-model="login"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="my-card" style="width:400px">
          <q-card class="col-12 text-black" style="background-color:none; ">
            <q-card-section>
              <div class="text-h6">LOGIN</div>
            </q-card-section>
          </q-card>
          <div class="q-pl-md q-pr-md">
            <q-input standout v-model="email" type="email" prefix="Email:">
                <template v-slot:prepend>
                <q-icon name="mail" />
                </template>
            </q-input>
            <q-input class="q-pt-md col-12" standout v-model="password" type="password" @keyup.enter="loginModule()" prefix="Password:">
                <template v-slot:prepend>
                <q-icon name="lock" />
                </template>
            </q-input>
            <div style="text-align:right; color:grey;"> Forgot your password? </div>

          </div>
          <q-card-actions align="center" class="q-pa-md">
            <q-btn
              v-close-popup
              color="primary"
              label="LOGIN"
              @click="loginModule()"
              class="col-5"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-1 text-white" style="background-color:white;">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

import { firebaseAuth } from 'boot/firebase'

export default {
  data () {
    return {
      email: null,
      password: null,
      login: false
    }
  },
  methods: {
    loginModal () {
      this.login = true
    },

    loginModule () {
      firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.replace('adminSide')
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
    }

    // loginSignup () {
    //   try {
    //     firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
    //       .then((user) => {
    //         this.$router.replace('adminSide')
    //       })
    //       .catch(function (error) {
    //       // Handle Errors here.
    //         var errorCode = error.code
    //         var errorMessage = error.message
    //         if (errorCode === 'auth/weak-password') {
    //           alert('The password is too weak.')
    //         } else {
    //           alert(errorMessage)
    //         }
    //       })
    //     this.$q.notify({
    //       message: 'Added',
    //       color: 'green-4',
    //       textColor: 'white',
    //       icon: 'cloud_done'
    //     })
    //   } catch (error) {
    //     this.$q.notify({
    //       message: error,
    //       color: 'red',
    //       textColor: 'white',
    //       icon: 'clear'
    //     })
    //   }
    // }

  }
}
</script>
