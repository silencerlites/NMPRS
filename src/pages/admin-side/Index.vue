<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Dashboard</span>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm">
        <q-card class="my-card" style="background-color:#778beb; color:white">
          <q-card-section>
            <div style="font-weight:bold; font-size:18px;">No. Visitors</div>
          </q-card-section>
          <q-card-section style="padding-top:0px">
            <div style="font-size:40px; font-weight:bold;">0</div>
            <q-icon
              name="perm_identity"
              style="font-size:60px; color:white; float:right; top:-67px; position:relative;"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm">
        <div class="q-gutter-xs">
          <q-card class="my-card" style="background-color:#ff7f50; color:white">
            <q-card-section>
              <div style="font-weight:bold; font-size:18px;">No. Reservations</div>
            </q-card-section>
            <q-card-section style="padding-top:0px">
              <div style="font-size:40px; font-weight:bold;"> {{ reservations.length }}</div>
              <q-icon
                name="event_note"
                style="font-size:60px; color:white; float:right; top:-67px; position:relative;"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm">
        <div class="q-gutter-xs">
          <q-card class="my-card" style="background-color:#fed330; color:white">
            <q-card-section>
              <div style="font-weight:bold; font-size:18px;">Ratings</div>
              <div style="font-size:40px; font-weight:bold;">0</div>
              <q-icon
                name="grade"
                style="font-size:60px; color:white; float:right; top:-67px; position:relative;"
              />
            </q-card-section>
            <q-card-section style="padding-top:0px"></q-card-section>
          </q-card>
        </div>
      </div>
      <!-- Todays Tours -->
    </div>
    <div class="row">
      <div class="col col-xs-12 col-sm-4 col-md-4">
        <div class="col-xs-12 col-sm-4 col-md-4 q-pb-sm q-pr-sm">
          <q-table
            title="Today's Tour"
            :data="data"
            :columns="columns"
            row-key="name"
            hide-bottom
          >
          <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn>
            <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
          </q-td>
        </template>
        </q-table>
        </div>
        <!-- Survey
        <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
          <q-card class="col-12 text-white" style="background-color:#eccc68;">
            <q-card-section>
              <div class="text-h6">Recent Survey</div>
            </q-card-section>
          </q-card>
          <q-card class="my-card">
            <q-item clickable v-ripple>
              <q-item-section>Image avatar</q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>Image square avatar</q-item-section>
              <q-item-section avatar>
                <q-avatar square>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>Image rounded avatar</q-item-section>
              <q-item-section avatar>
                <q-avatar rounded>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-card>
        </div> -->
      </div>
      <!-- Calendar -->
      <div class="col-xs-12 col-sm-8 col-md-8">
        <q-card class="my-card">
          <q-card-section>
            <FullCalendar />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import FullCalendar from 'components/FullCalendar'
import { firestore } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {
    FullCalendar
  },
  firestore () {
    return {
      reservations: firestore.collection('Reservation'),
      // contactPerson: firestore.collection('ContactReservation'),
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours')
    }
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Time',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-white'
        },
        {
          name: 'school',
          align: 'left',
          label: 'School | Institution | Group',
          field: 'school',
          sortable: true,
          style: 'max-width: 10px'
        },
        { name: 'pax', label: 'Pax', field: 'pax', sortable: true },
        { name: 'status', label: 'Building', field: 'building' },
        { name: 'status', label: 'Status', field: 'status' },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      data: [

      ]
    }
  }
}
</script>
