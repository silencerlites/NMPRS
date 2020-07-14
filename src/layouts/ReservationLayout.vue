<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          National Museum of the Philippines
        </q-toolbar-title>

        <q-separator vertical inset />
         <q-btn color="white" flat icon="help" />
        <q-separator vertical inset />
          <q-btn-dropdown avatar flat no-caps color="white" icon="perm_identity">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick" to="/reservationSide/accounts/manage">
                <q-item-section>
                  <q-item-label>Manage Account</q-item-label>
                </q-item-section>
              </q-item>
              <!-- <q-separator color="#bdc3c7"/>
              <q-item clickable v-close-popup @click="onItemClick" to="/adminSide/setting">
                <q-item-section>
                  <q-item-label >Setting</q-item-label>
                </q-item-section>
              </q-item> -->
              <q-separator color="#bdc3c7"/>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label @click="logout()">Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          <div class="q-pa-md">
      <img
        src="statics/account.svg"
        style="width:80px; float:left; padding-right: 20px"
      >
      <div style="margin-top: 10px;">
 <span style="font-size:17px;"> <b>{{ userDetails.FName + ' ' + userDetails.LName}}</b> </span><br>
         {{ userDetails.Email }} <br>
         <br>
      </div>

    </div>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { firebaseAuth, firestore } from 'boot/firebase'
import EssentialLink from 'components/EssentialLink'
import { mapState } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  firestore () {
    const user = firebaseAuth.currentUser
    return {
      UserAccount: firestore.collection('Users').doc(user.uid)
    }
  },

  data () {
    return {
      UserAccount: {
        Name: {
          FirstName: null,
          LastName: null
        }
      },
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Dashboard',
          icon: 'home',
          link: '/reservationSide',
          iconcolor: 'blue'
        },
        {
          title: 'Reservation',
          icon: 'event_note',
          link: '/reservationSide/reservation',
          iconcolor: 'red'
        },
        {
          title: 'Visitors Log',
          iconcolor: 'green',
          icon: 'menu_book',
          link: '/reservationSide/visitorslog'
        },
        {
          title: 'Ratings & Comments',
          iconcolor: 'orange',
          icon: 'grade',
          link: '/reservationSide/survey'
        },
        {
          title: 'Billing & Payment',
          iconcolor: 'indigo',
          icon: 'description',
          link: '/reservationSide/billing'
        },
        {
          title: 'Scanner QR Ticket',
          iconcolor: 'black',
          icon: 'qr_code_scanner',
          link: '/reservationSide/scanqr'
        },
        {
          title: 'Reports',
          iconcolor: 'purple',
          icon: 'assignment',
          link: '/reservationSide/reports'
        }
      ]
    }
  },
  methods: {
    logout () {
      firebaseAuth.signOut()
        .then(() => {
          this.$router.replace('/')
        }).catch((err) => {
          console.logout(err)
        })
    }

  },
  computed: {
    ...mapState('storetasks', ['userDetails'])
  },
  created () {
    var user = firebaseAuth.currentUser
    this.email = user.email
  }
}
</script>
