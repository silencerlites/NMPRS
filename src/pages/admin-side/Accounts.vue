<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Accounts</span>
      </div>
      <!-- Add User -->
      <q-dialog
        v-model="userAccountModal"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="my-card">
          <q-card class="col-12 text-white" style="background-color:#2ecc71;">
            <q-card-section>
              <div class="text-h6">Create User</div>
            </q-card-section>
          </q-card>
          <div class="row q-pa-md" style="max-width: 500px">
            <div class="col-6 q-pr-md">
              First Name
              <q-input outlined v-model="userAccount.Name.FirstName" />
            </div>
            <div class="col-6 q-pr-md">
              Last Name
              <q-input outlined v-model="userAccount.Name.LastName" />
            </div>
            <!-- textbox -->
            <div class="col-12">
              Email
              <q-input outlined v-model="Email" type="email" />
            </div>
            <div class="col-12">
              Password
              <q-input outlined v-model="Password" type="password" />
            </div>
          </div>
          <q-separator />

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              color="primary"
              label="Add User"
              @click="addUserAccount()"
              v-if="modalbtn == 'add'"
            />
            <q-btn
              v-close-popup
              flat
              color="primary"
              label="Save Changes"
              @click="editRow"
              v-if="modalbtn == 'edit'"
            />
            <q-btn v-close-popup flat color="red" label="Cancel" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="alertDelete">
        <q-card>
          <q-card-section>
            <img src="statics/undraw_throw_away_ldjd.svg" alt style="height:250px" class="q-pa-lg" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h4 text-center" style="font-weight:bold">Are you Sure?</div>
            <div class="text-h9 text-center">You won't be able to revert this!</div>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-md q-pb-lg">
            <q-btn
              v-model="delbtn"
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRow()"
              class="col-5"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="row">
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm">
          <q-table title="User Account" :data="UserAccounts" :columns="columns" :pagination="pagination" row-key="id">
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="modalbtn = 'add' , userAccountModal = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="Name">{{ props.row.Name.FirstName }} {{ props.row.Name.LastName }}</q-td>
                <q-td :props="props" key="email">{{ props.row.email }}</q-td>
                <q-td :props="props" key="userrole">
                  <select @change="changeRole(props.row.id, $event)">
                    <option :selected="props.row.role.Customer" value="Customer">Customer</option>
                    <option :selected="props.row.role.Administrator" value="Administrator">Admin</option>
                    <option :selected="props.row.role.Reservation" value="Reservation">Operations Division</option>
                    <option :selected="props.row.role.FrontDesk" value="FrontDesk">Front Desk</option>
                  </select></q-td>
                 <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click="(modalbtn = 'edit'), editModal(props.row)"
                  >
                    <q-tooltip content-class="bg-primary">Edit</q-tooltip>
                  </q-btn>
                  <q-btn dense round flat color="red" @click="delalert(props.row)" icon="delete">
                    <q-tooltip content-class="bg-primary">Delete</q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>

import firebase from 'firebase'
import { firestore, firebaseAuth, firebaseDb } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {},
  data () {
    return {
      pagination: {
        sortBy: 'date',
        rowsPerPage: 12,
        descending: true // current rows per page being displayed
      },
      delbtn: false,
      users: [],
      user: null,
      Email: '',
      user_id: '',
      Password: null,
      alertDelete: false,
      role: null,
      roleAlert: false,
      userAccountModal: false,
      modalbtn: null,
      activeItem: null,
      columns: [
        {
          name: 'Name',
          label: 'Name',
          align: 'left',
          field: row => row.name,
          style: 'max-width: 400px',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'email', label: 'Email', field: 'email', align: 'center' },
        {
          name: 'userrole',
          label: 'User Role',
          field: 'userrole',
          align: 'center'
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      data: [{}],
      userAccount: {
        Name: {
          FirstName: null,
          LastName: null
        },
        Email: null,
        Password: null,
        Status: null,
        DateCreated: Date.now()
      }
    }
  },
  created () {
    var self = this
    firebase.auth().onAuthStateChanged(function (user) {
      self.user = user
    })

    this.users = []
    firebase
      .firestore()
      .collection('Users')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          var user = doc.data()
          user.id = doc.id
          console.log(doc.data())
          this.users.push(user)
        })
      })
  },
  firestore () {
    return {
      UserAccounts: firestore.collection('Users')
    }
  },
  methods: {
    changeRole (uid, event) {
      this.$q.loading.show()
      var addMessage = firebase.functions().httpsCallable('setUserRole')

      var data = { uid: uid, role: { [event.target.value]: true } }

      addMessage(data)
        .then(function (result) {
          console.log(result)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 8000)
    },
    addUserAccount () {
      this.$q.loading.show()
      var authApp = firebase.initializeApp({
        apiKey: 'AIzaSyC2dfVAw_kS2mxNrqifpHh8bUixpir96SM',
        authDomain: 'nmp2020-21376.firebaseapp.com',
        databaseURL: 'https://nmp2020-21376.firebaseio.com',
        projectId: 'nmp2020-21376',
        storageBucket: 'nmp2020-21376.appspot.com',
        messagingSenderId: '267431615019',
        appId: '1:267431615019:web:8f25e113159100fc27a86e'
      }, 'authApp')
      var detachedAuth = authApp.auth()
      this.modalbtn = 'add'
      try {
        detachedAuth
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
                ContactNumber: null
              })

            firebaseAuth.sendPasswordResetEmail(this.Email)
              .then(cred => {
                console.log(cred.user.uid)
              })

            this.$q.notify({
              message: 'Added',
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done'
            })
            this.$q.loading.hide()
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
          message: error,
          color: 'red',
          textColor: 'white',
          icon: 'clear'
        })
      }
    },
    editModal (Reserve) {
      this.addReg = true
      this.Reserve = Reserve
    },
    editRow () {
      try {
        this.$firestore.reservations.doc(this.Reserve.id).update(this.Reserve)
        // do something
        this.$q.notify({
          color: 'green-4',
          message: `Udated Succefully`,
          icon: 'done',
          timeout: 500
        })
      } catch (error) {
        this.$q.notify({
          message: 'Data Failed' + error,
          color: 'red',
          textColor: 'white',
          icon: 'clear'
        })
      }
    },
    delalert (userAc) {
      this.alertDelete = true
      this.account = userAc
    },
    deleteRow () {
      try {
        this.$firestore.UserAccounts.doc(this.account.id).delete()
        this.$q.notify({
          color: 'green-4',
          message: `Deleted Successfully`,
          icon: 'delete',
          timeout: 500
        })

        // do something
      } catch (error) {
        this.$q.notify({
          message: 'Data Failed' + error,
          color: 'red',
          textColor: 'white',
          icon: 'clear'
        })
      }
    }
  }
}
</script>
