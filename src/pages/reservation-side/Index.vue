<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Dashboard</span>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm">
        <q-card  style="background-color:#778beb; color:white">
          <q-card-section>
            <div style="font-weight:bold; font-size:18px;">No. Visitors</div>
          </q-card-section>
          <q-card-section style="padding-top:0px">
            <div style="font-size:40px; font-weight:bold;">{{ totalVisitor }}</div>
            <q-icon
              name="perm_identity"
              style="font-size:60px; color:white; float:right; top:-67px; position:relative;"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm">
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
       <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm">
          <q-card class="my-card" style="background-color:#fed330; color:white">
            <q-card-section>
              <div style="font-weight:bold; font-size:18px;">Rating</div>
            </q-card-section>
            <q-card-section style="padding-top:0px">
              <div style="font-size:40px; font-weight:bold;">  {{ totalRate / Rate.length }}</div>
              <q-icon
                name="grade"
                style="font-size:60px; color:white; float:right; top:-67px; position:relative;"
              />
            </q-card-section>
          </q-card>
      </div>

      <!-- Todays Tours -->
    </div>

    <div class="row">
      <!-- Calendar -->
      <div class="col-xs-12 col-sm-8 col-md-8 q-pr-sm">
         <div class="q-mb-md" style="font-size:25px; color:#5a5c69!important;">Today's Tours</div>
        <q-card class="my-card">
          <q-card-section>
            <FullCalendar/>
          </q-card-section>
        </q-card>
      </div>
       <div class="col-xs-12 col-sm-4 col-md-4">
         <div class="q-mb-md" style="font-size:25px; color:#5a5c69!important;">Recent Rating</div>
        <q-card class="my-card">
          <div class="q-pa-md">
    <q-table
      grid
      :data="Rate"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

    </q-table>
  </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import FullCalendar from 'components/TodayCalendar'
import { firestore } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {
    FullCalendar
  },
  firestore () {
    return {
      reservations: firestore.collection('Reservation'),
      VisitorL: firestore.collection('VisitorsLog').where('arrivalStatus', '==', 'Arrived'),
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours'),
      Rate: firestore.collection('Rate'),
      RatingComment: firestore.collection('RatingComment')
    }
  },
  data () {
    return {
      filter: '',
      columns: [
        {
          name: 'Name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.Name,
          classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white',
          format: val => `${val}`,
          sortable: true

        },
        {
          name: 'Rating',
          label: 'Rating',
          field: row => row.TotalRate,
          align: 'center'
        },
        {
          name: 'Comment',
          align: 'center',
          label: 'Comment and Suggestion',
          field: row => row.CommentSuggestion,
          sortable: true
        }
      ]
    }
  },
  computed: {
    totalVisitor: function () {
      console.log(this.VisitorL)
      return this.VisitorL.reduce(function (total, item) {
        return total + item.ListVisitors.length
      }, 0)
    },
    filteredArray () {
      // eslint-disable-next-line no-unused-vars
      var out = ''
      var log = this.VisitorL.ListVisitors
      for (var i = 0; i < log; i++) {
        console.log(log)
      }
      // document.getElementById('people').innerHTML = out
      return this.count(this.VisitorL.ListVisitors)
    },
    totalRate: function () {
      var sum = 0
      this.Rate.forEach(e => {
        sum += e.TotalRate
      })
      return sum
    }

  }
}
</script>
