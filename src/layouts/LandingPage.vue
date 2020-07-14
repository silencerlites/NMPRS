<template>
  <q-layout view="hHh LpR fff">

    <q-header class="text-black col-12 q-pa-lg" reveal height-hint="98" style="background-color:white;">
      <q-toolbar>
        <q-toolbar-title>
          <img src="statics/app-logo-80x.svg" style="width:70px;" class="col-12">
          <span style="font-size:40px; color:#6B1510; padding-left:20px">National Museum of the Philippines</span>
        </q-toolbar-title>
        <q-btn flat style="font-size:28px; color: #6B1510;" label="Home" to="/"/>
        <q-btn flat style="font-size:28px; color: #6B1510;" label="Apps" to="/apps"/>
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
            <q-input standout v-model="form.email" type="email" prefix="Email:" >
                <template v-slot:prepend>
                <q-icon name="mail" />
                </template>
            </q-input>
            <q-input class="q-pt-md col-12" standout v-model="form.password" type="password" @keyup.enter="loginModule()" prefix="Password:">
                <template v-slot:prepend>
                <q-icon name="lock" />
                </template>
            </q-input>
            <!-- <div style="text-align:right; color:grey;"> Forgot your password? </div> -->

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

    <q-page-container class="landing-page">
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-1 text-black">
      <q-toolbar>
        <q-toolbar-title style="font-size:14px; text-align:center;">
          © Copyright 2020 National Museum of the Philippines. All Rights Reserved | Design and Develop By Cedric Liera
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: null,
        password: null
      },

      login: false
    }
  },
  methods: {
    loginModal () {
      this.login = true
    },
    ...mapActions('storetasks', ['loginUser']),
    loginModule () {
      this.loginUser(this.form)
    }
  }
}
</script>

<style>

.landing-page {
    background-image: url(../statics/3860710.svg);
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
