<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Profile Settings</span>
      </div>
    </div>

    <div class="row">
        <div class="col-12" align="center">
        <img
        src="statics/account.svg"
        style="width:200px; float:center; padding-right: 20px"
        >
        </div>
         <div class="col-6 q-pr-md q-pt-md">
              First Name
              <q-input outlined v-model="UserAccounts.Name.FirstName" />
            </div>
            <div class="col-6 q-pr-md q-pt-md">
              Last Name
              <q-input outlined v-model="UserAccounts.Name.LastName" />
            </div>
            <div class="col-12 q-pr-md q-pt-md">
              Contact Number
              <q-input  mask="(+63) #### - ######" outlined v-model="Contact" unmasked-value/>
            </div>
            <!-- <div class="col-12 q-pr-md q-pt-md">
                Change profile picture
                <div>
    <div >
      <input type="file" @change="previewImage" accept="image/*" >
    </div>
  </div>
            </div> -->

        <div class="col-12 q-pb-md q-pt-md" align="right">
                <q-btn color="primary" label="Save Changes" />
        </div>

    </div>

  </q-page>
</template>

<script>

import { firestore, firebaseAuth, firebaseApp } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {},
  data () {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      UserAccounts: {
        Name: {
          FirstName: null,
          LastName: null
        }
      },
      password: null,
      Contact: null
    }
  },
  firestore () {
    const user = firebaseAuth.currentUser
    return {
      UserAccounts: firestore.collection('Users').doc(user.uid)
    }
  },
  created () {
    var user = firebaseAuth.currentUser
    this.email = user.email
  },
  methods: {
    previewImage (event) {
      let file = event.target.files[0]
      var storageRef = firebaseApp.storage().ref('profilePic/' + file.name)
      storageRef.put(file)
    },
    updateProfile () {

    }
  }
}
</script>
