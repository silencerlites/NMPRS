<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6">
        <img src="statics/Untitled-1.svg" alt style="height:auto" />
      </div>

     <div
        class="col-xs-12 col-sm-6 col-md-6 q-pl-xl q-pr-xl"
        style="font-size:20px;  padding-top:40px"
      >
        <div style="text-align:left; font-size:40px"> <b>Sign up for a Tour</b></div>
        <div style="color:#0097e6">Personal Information</div>
        <div class="q-pt-md" style="text-align:center; position:block;">
          <div class="row">
                    <div class="col-6 q-pr-md q-pb-md">

                      <q-input outlined label="First name" :dense="dense" v-model="userAccount.Name.FirstName" />
                    </div>
                    <div class="col-6">
                      <q-input outlined  label="Last name" :dense="dense" v-model="userAccount.Name.LastName" />
                    </div>
                     <div class="col-12 q-pb-md">
                        <q-input
                  outlined
                 v-model="userAccount.ContactNumber"
                  mask="(+63) #### - ######"
                  unmasked-value
                  label="Contact Number"
                  :dense="dense"

                  />

                  </div>
                  </div>

                  <div style="color:#0097e6; text-align:left; padding-bottom:18px;">User Account</div>
                    <div class="row">
                     <div class="col-12 q-pb-md">
                    <q-input outlined v-model="Email" type="email" label="Email" :dense="dense" />
                  </div>
                  <div class="col-12 q-pb-md">
                    <q-input outlined v-model="Password" type="password" label="Password" :dense="dense"  />
                  </div>
                  </div>
          <q-btn
            color="primary"
            label="Get Started"
            style="width:200px; height:60px; font-size:20px;"
            @click="RegistrationUser"
          />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>

import { firebaseAuth, firebaseDb } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {},
  data () {
    return {
      data: [],
      userAccount: {
        Name: {
          FirstName: null,
          LastName: null
        },
        ContactNumber: null
      },
      Email: '',
      Password: null
    }
  },

  methods: {
    async RegistrationUser (customClaims) {
      this.modalbtn = 'add'
      try {
        firebaseAuth
          .createUserWithEmailAndPassword(this.Email, this.Password)
          .then(cred => {
            console.log(cred.user.uid)
            firebaseDb
              .collection('Users')
              .doc(cred.user.uid)
              .set({
                DateCreated: Date.now(),
                Name: {
                  FirstName: this.userAccount.Name.FirstName,
                  LastName: this.userAccount.Name.LastName
                },
                ContactNumber: this.userAccount.ContactNumber
              })
            this.$q.notify({
              message: 'Thank you for register',
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done'
            })
            firebaseAuth.signOut()
            this.userAccount.Name.FirstName = null
            this.userAccount.Name.LastName = null
            this.userAccount.ContactNumber = null
            this.Email = null
            this.Password = null
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            if (errorCode === 'auth/weak-password') {
              alert('The password is too weak.')
            } else {
              alert(errorMessage)
            }
          })
      } catch (error) {
        this.$q.notify({
          message: 'Please type the input fields',
          color: 'red',
          textColor: 'white',
          icon: 'clear'
        })
      }
    }
  }
}
</script>
