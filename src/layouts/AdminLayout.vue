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

        <q-btn-dropdown
          flat
          push
          no-caps
          color="white"
          icon="notifications"
          @click="onMainClick"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section avatar>
                <q-avatar icon="folder" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label></q-item-label>
                <q-item-label caption>February 22, 2020</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" color="amber" />
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section avatar>
                <q-avatar icon="assignment" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label></q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="info" color="amber" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical inset />
         <q-btn color="white" flat icon="help" />
        <q-separator vertical inset />
          <q-btn-dropdown avatar flat no-caps color="white" icon="perm_identity">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Manage Account</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator color="#bdc3c7"/>
              <q-item clickable v-close-popup @click="onItemClick" to="/adminSide/setting">
                <q-item-section>
                  <q-item-label >Setting</q-item-label>
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
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
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

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Dashboard',
          icon: 'home',
          link: '/adminSide',
          iconcolor: 'blue'
        },
        {
          title: 'Reservation',
          icon: 'event_note',
          link: '/adminSide/reservation',
          iconcolor: 'red'
        },
        {
          title: 'Visitors Log',
          iconcolor: 'green',
          icon: 'menu_book',
          link: '/adminSide/visitorslog'
        },
        {
          title: 'Survey',
          iconcolor: 'orange',
          icon: 'grade',
          link: '/adminSide/survey'
        },
        {
          title: 'Billing',
          iconcolor: 'indigo',
          icon: 'description',
          link: '/adminSide/billing'
        },
        {
          title: 'Accounts',
          iconcolor: 'light-blue',
          icon: 'perm_identity',
          link: '/adminSide/accounts'
        },
        {
          title: 'Reports',
          iconcolor: 'purple',
          icon: 'assignment',
          link: '/adminSide/reports'
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

  }
}
</script>
