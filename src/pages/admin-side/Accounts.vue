<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;"
          >Accounts</span
        >

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
          <div class="col-12">
            Status
              <q-select outlined v-model="userAccount.Status" :options="options" />
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
    </div>

    <div class="row">
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm">
          <q-table
            title="User Account"
            :data="userAccoount"
            :columns="columns"
            row-key="date"
          >
          <template v-slot:top-right>
        <q-btn
          color="green"
          label="ADD"
          style="float:right;"
          @click="modalbtn = 'add' , userAccountModal = true"
        />
          </template>
          </q-table>
        </div>
      </template>

    </div>
  </q-page>
</template>

<script>
import { firestore, firebaseAuth, firebaseDb } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      Email: '',
      user_id: '',
      Password: null,
      model: null,
      options: [
        'Administrator', 'Reservation User', 'Operation Division User'
      ],
      delbtn: false,
      alertDelete: false,
      userAccountModal: false,
      modalbtn: null,
      activeItem: null,
      columns: [
        {
          feedback: null,
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 400px',
          headerClasses: 'bg-primary text-white',
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
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: 'school',
          sortable: true,
          style: 'max-width: 10px'
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      data: [
        {

        }
      ],
      userAccount: {
        Name: {
          FirstName: null,
          LastName: null
        },
        Email: null,
        Password: null,
        UserRole: null,
        Status: null,
        DateCreated: Date.now()
      }
    }
  },
  firestore () {
    return {
      user: firestore.collection('users').doc(this.userAccount.Email)
    }
  },
  methods: {
    addUserAccount () {
      this.modalbtn = 'add'
      try {
        firebaseAuth.createUserWithEmailAndPassword(this.Email, this.Password)
          .then(cred => {
            console.log(cred.user.uid)
            firebaseDb.collection('users').doc().set({
              Email: this.Email,
              user_id: cred.user.uid
            })
            this.$q.notify({
              message: 'Added',
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done'
            })
          }
          )
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
    delalert (Reserve) {
      this.alertDelete = true
      this.Reserve = Reserve
    },
    deleteRow () {
      try {
        this.$firestore.reservations.doc(this.Reserve.id).delete()
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

<style lang="scss">
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
</style>
