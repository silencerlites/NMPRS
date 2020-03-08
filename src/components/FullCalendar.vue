<template>
  <div>
    <FullCalendar
      ref="fullCalendar"
      :plugins="calendarPlugins"
      :header="{
        left: 'dayGridMonth, timeGridWeek, timeGridDay',
        center: 'title',
        right: 'prev, today, next'
      }"
      :events="reservations"
      @select="handleSelect"
      @eventClick="handleClick"
    />

    <q-dialog v-model="details" persistent>
      <q-card>
         <q-card-section style="text-align:center">
            <img src="statics/undraw_no_data_qbuo.svg" alt style="height:230px" class="q-pa-sm"/>
          </q-card-section>
        <q-card-section>
          <div class="text-h6">Reservation Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Building: <b>{{extendedProps.Building.NameBuilding}}</b> <br>
          Date & Time: <b>{{event.start | timeformat }}</b> <br>
          Group Name: <b>{{event.title}}</b> <br>
          Numbers of Visitor: <b>{{extendedProps.NumberofVisitor}}</b> <br>
        </q-card-section>
        <q-separator color="grey-5" inset />
         <q-card-section>
          <div class="text-h6">Contact Details</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            Name: <b>{{extendedProps.Contact.Name}}</b> <br>
            Email: <b>{{extendedProps.Contact.Email}}</b> <br>
            Mobile Number: <b>{{extendedProps.Contact.Email}}</b> <br>
        </q-card-section>
         <q-separator color="grey-5" inset />
        <q-card-section>
          <div class="text-h6">Status</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            Status of Arrival: <b></b>  <q-badge color="orange">
      {{extendedProps.StatusArrival}}
    </q-badge><br>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-md q-pb-lg">
          <q-btn
              v-model="delbtn"
              v-close-popup
              color="primary"
              label="Ok"
              @click="deleteRow()"
              class="col-10"
            />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

// import { mapGetters } from 'vuex'

import { firestore } from 'boot/firebase'

export default {
  computed: {
    contentStyle () {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      }
    },

    contentActiveStyle () {
      return {
        backgroundColor: '#eee',
        color: 'black'
      }
    },

    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data () {
    return {
      allDay: false,
      details: false,
      extendedProps: {
        date: '',
        time: '',
        Building: [],
        NumberofVisitor: null,
        Contact: {
          Name: null,
          ConNum: null,
          Email: null
        }
      },
      event: {
        title: '',
        start: ''
      },
      calendarPlugins: [
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin,
        listPlugin
      ]
    }
  },
  firestore () {
    return {
      reservations: firestore.collection('Reservation'),
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours')
    }
  },

  methods: {
    handleClick (arg) {
      console.log(arg.event.extendedProps)
      this.details = true
      this.extendedProps = arg.event.extendedProps
      this.event.title = arg.event.title
      this.event.start = arg.event.start
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
