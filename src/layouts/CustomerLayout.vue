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
          <q-btn-dropdown avatar flat no-caps color="white" icon="perm_identity" >
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick" to="/customerSide/accounts/manage">
                <q-item-section>
                  <q-item-label>Manage Account</q-item-label>
                </q-item-section>
              </q-item>
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

          <q-separator  />

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
import { firebaseAuth } from 'boot/firebase'
import EssentialLink from 'components/EssentialLink'
import { mapState } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      UserAccount: {
        Name: {
          FirstName: null,
          LastName: null
        }
      },
      email: null,
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'My Reservation',
          icon: 'event_note',
          link: '/customerSide',
          iconcolor: 'red'
        },
        {
          title: 'My Billing',
          iconcolor: 'indigo',
          icon: 'description',
          link: '/customerSide/MyBilling'
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
  }
}
</script>
