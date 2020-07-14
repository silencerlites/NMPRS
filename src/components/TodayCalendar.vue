<template>
  <div>
    <FullCalendar
      ref="fullCalendar"
      defaultView="listDay"
      allDay= 'false'
      :plugins="calendarPlugins"
      :header="{
        right: 'today'
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
        <q-card-section class="q-pt-none" v-if="this.extendedProps.StatusArrival == 'Cancel'">
            Status of Arrival: <b></b>  <q-badge color="red">
      {{extendedProps.StatusArrival}}
    </q-badge><br>
        </q-card-section>
        <q-card-section class="q-pt-none" v-if="this.extendedProps.StatusArrival == 'Arrived'">
            Status of Arrival: <b></b>  <q-badge color="green">
      {{extendedProps.StatusArrival}}
    </q-badge><br>
        </q-card-section>
         <q-card-section class="q-pt-none" v-if="this.extendedProps.StatusArrival == 'Pending'">
            Status of Arrival: <b></b>  <q-badge color="orange">
      {{extendedProps.StatusArrival}}
    </q-badge><br>
        </q-card-section>

        <q-card-actions align="center" class="q-pa-md q-pb-lg">
          <q-btn
              v-model="ok"
              v-close-popup
              color="primary"
              label="Ok"
              class="col-4"
            />

            <q-btn
            v-if="this.extendedProps.StatusArrival == 'Pending'"
              v-model="arr"
              v-close-popup
              color="green"
              label="Arrived"
              @click="arralert()"
              class="col-4"
            />
        </q-card-actions>

      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="alertArrived">
        <q-card>
          <q-card-section>
            <img src="statics/undraw_aircraft_fbvl.svg" alt style="height:250px" class="q-pa-lg" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h4 text-center" style="font-weight:bold">Are you Sure?</div>
            <div class="text-h9 text-center">You won't be able to revert this!</div>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-md q-pb-lg">
            <q-btn
              v-model="arrDia"
              v-close-popup
              color="primary"
              label="Yes, They Arrived!"
              @click="arrivedDone(), veriscanQr = true"
              class="col-5"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog persistent v-model="veriscanQr">
        <q-card>
          <q-card-section>
            <img src="statics/undraw_verified_tw20.svg" alt style="height:250px" class="q-pa-lg" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h4 text-center" style="font-weight:bold">QR Ticket Scanner</div>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-md q-pb-lg">
            <q-btn
              v-model="arrDia"
              v-close-popup
              color="primary"
              label="Scan Now!"
              @click="viewList()"
              class="col-5"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog persistent v-model="viewLists">
 <q-card
        flat
        bordered
        class="my-card bg-grey-1"
        style="width:1500px; max-width:1500px"
      >
        <q-card-section>
          <div style="text-align:center;">
            <img
              src="statics/app-logo-80x.svg"
              style="width:100px;"
              class="q-mr-lg"
            />
            <br />
            <span style="font-size:30px; color:#6B1510;"
              >National Museum of the Philippines</span
            >
          </div>
          <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />

          <q-card-section>
            <div class="row">
              <div class="col-1" style="color:#6B1510;"></div>
              <div class="col" style="color:#6B1510;">
                <b>Name</b>
              </div>
              <div class="col" style="color:#6B1510;">
                <b>Gender</b>
              </div>
              <div class="col" style="color:#6B1510;">
                <b>Visitor Type</b>
              </div>
              <div class="col" style="color:#6B1510;">
                <b>Category of Visitors</b>
              </div>
              <div class="col" style="color:#6B1510;">
                <b>Student Level</b>
              </div>
            </div>
          </q-card-section>

          <div v-for="(line, index) in linesss" :key="index" class="row q-pb-md">
            <div class="col-1"><q-checkbox v-model="line.status" disable/></div>
            <div class="col">
              {{ ++index + "." + " " + line.FirstN + " " + line.LastN }}
            </div>
            <div class="col">{{ line.Gender }}</div>
            <div class="col">{{ line.VisitorType }}</div>
            <div class="col">{{ line.Type }}</div>
            <div class="col">{{ line.SubType }}</div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions>
          <q-btn flat v-close-popup>OK</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-dialog persistent v-model="qrscan">
      <q-card>
        <q-card-section class="q-pt-none">
          <div>
            <p class="decode-result">
            </p>

            <qrcode-stream
              @init="onInit"
              v-if="!destroyed"
              :camera="camera"
              @decode="onDecode"
            >
              <div v-if="validationSuccess" class="validation-success">
                 Verified Successfully!
                 <br>
                <div
                  v-for="(line, index) in filteredReservationData"
                  :key="index"
                  class="row q-pb-md"
                >
                <div class="col">
                    <q-checkbox v-bind="(line.status = true)" />
                  </div>
                  <br />
                    <div class="col-12" align="center">
                      <div class="col">
                  </div>
                      <QrcodeVue
                        :value="line.generateQRs"
                        :size="size"
                        level="H"
                      ></QrcodeVue>
                       {{ line.FirstN + " " + line.LastN }} <br>
                      {{ line.generateQRs }}
                    </div>
                </div>
              </div>

              <div v-if="validationFailure" class="validation-failure">
                Invaild QR Ticket
              </div>

              <div v-if="validationPending" class="validation-pending">
                Please Wait for Validation
              </div>
            </qrcode-stream>
          </div>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="close" color="red" v-close-popup />
          <q-btn label="Scan Again" color="green" @click="reload" />
           <q-btn label="View The List" color="orange" @click="viewLists = true" />
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
import { QrcodeStream } from 'vue-qrcode-reader'
import QrcodeVue from 'qrcode.vue'

// import { mapGetters } from 'vuex'

import { firestore } from 'boot/firebase'

export default {
  computed: {
    validationPending () {
      return this.isValid === undefined && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    },
    filteredReservationData () {
      var _ = require('lodash')
      var startDate = this.result
      //  function (Reser) { return Reser.date })
      return _.filter(this.liness, function (Reser) {
        if (_.isNull(startDate)) {
          return true
        } else {
          return Reser.generateQRs === startDate
        }
      })
    },
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
    FullCalendar, // make the <FullCalendar> tag available
    QrcodeStream,
    QrcodeVue
  },
  data () {
    return {
      veriscanQr: false,
      destroyed: false,
      isValid: undefined,
      camera: 'auto',
      result: null,
      qrscan: false,
      viewLists: false,
      ok: null,
      arr: null,
      arrDia: false,
      alertArrived: false,
      allDay: false,
      details: false,
      linesss: [],
      liness: [],
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
      ],
      columns: [
        {
          name: 'Building',
          label: 'Building',
          align: 'left',
          field: row => row.Building,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'List',
          label: 'List of Visitor',
          field: 'List',
          align: 'center',
          style: 'max-width: 500px'
        },
        {
          name: 'Date',
          label: 'Date',
          field: 'Date',
          style: 'max-width: 100px',
          align: 'left'
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ]
    }
  },
  firestore () {
    return {
      VisitorL: firestore.collection('VisitorsLog'),
      reservations: firestore.collection('Reservation').where('StatusArrival', '==', 'Pending'),
      reservationss: firestore.collection('Reservation'),
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours')
    }
  },

  methods: {

    async reload () {
      this.destroyed = true

      await this.$nextTick()

      this.destroyed = false
      this.turnCameraOn()
    },
    onInit (promise) {
      promise.catch(console.error).then(this.resetValidationState)
    },

    resetValidationState () {
      this.isValid = undefined
    },

    async onDecode (content) {
      this.$q.loading.show()
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(3000)
      this.isValid = content.startsWith('NMP')

      // some more delay, so users have time to read the message
      await this.timeout(2000)
      var listVist = {
        ListVisitors: this.liness
      }
      this.$firestore.VisitorL.doc(this.arg.event.id)
        .update(listVist)
        .then(docRef => {})
      this.$q.notify({
        message: 'Successfully Added',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })

      var docRef = this.$firestore.VisitorL.doc(this.arg.event.id)

      docRef
        .get()
        .then(doc => {
          console.log('Cached document data:', doc.data())
          this.linesss = doc.data().ListVisitors
          this.liness = doc.data().ListVisitors
          this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })

      console.log()
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },

    handleClick (arg) {
      console.log(arg.event.extendedProps)
      this.arg = arg
      this.details = true
      this.extendedProps = arg.event.extendedProps
      this.event.title = arg.event.title
      this.event.start = arg.event.start
    },
    arralert () {
      this.alertArrived = true
    },
    viewList () {
      this.qrscan = true
      var docRef = this.$firestore.VisitorL.doc(this.arg.event.id)

      docRef
        .get()
        .then(doc => {
          console.log('Cached document data:', doc.data())
          this.linesss = doc.data().ListVisitors
          this.liness = doc.data().ListVisitors
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })

      console.log()
    },

    arrivedDone () {
      try {
        var Reserve = {
          StatusArrival: 'Arrived'
        }
        var Arrival = {
          arrivalStatus: 'Arrived'
        }
        this.$firestore.reservationss
          .doc(this.arg.event.id)
          .update(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(this.arg.event.id).update(Arrival)
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
          // do something
        this.$q.notify({
          color: 'green-4',
          message: `Successfully Arrived`,
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
    }
  }
}
</script>
<style lang="scss">
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
<style lang="scss">
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
</style>
