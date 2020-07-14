<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;"
          >Visitor Log</span
        >

        <q-btn
          color="green"
          label="ADD"
          style="float:right;"
          v-on:click.prevent="createNewUUID()"
          @click="(modalbtn = 'add'), (visitLog = true)(addLine())"
        />
      </div>
      <!-- Add Visitors -->

      <q-dialog
        v-model="visitLog"
        persistent
        transition-show="scale"
        transition-hide="scale"
        style="width: 1000px"
      >
        <q-card class="my-card" style="width: 1000px">
          <q-card class="col-12 text-white" style="background-color:#2ecc71;">
            <q-card-section>
              <div class="text-h6">Registration Visitors Log</div>
            </q-card-section>
          </q-card>
          <div class="col q-pa-md" style="max-width: 1000px">
            <div>
              <div class="col-12 q-pb-md">
                Select Museum
                <q-select
                  outlined
                  name="AvailBuild"
                  v-model="Museum.Building"
                  :options="Building"
                  option-value="NameBuilding"
                  option-label="NameBuilding"
                />
              </div>

              <div
                v-for="(line, index) in lines"
                :key="index"
                class="row q-pb-md"
              >
                <q-card class="my-card q-pa-sm bg-grey-1 col-12" flat bordered>
                  <div class="row">
                    <div class="col-6 q-pr-md">
                      First Name
                      <q-input outlined v-model="line.FirstN" />
                    </div>
                    <div class="col-6">
                      Last Name
                      <q-input outlined v-model="line.LastN" />
                    </div>
                  </div>

                  <div class="col-12">
                    Address | School | Institution
                    <q-input outlined v-model="line.Destination" />
                  </div>
                  <div class="col-12">
                    Gender
                    <q-option-group
                      :options="Genders"
                      type="radio"
                      v-model="line.Gender"
                      inline
                    />
                  </div>
                  <div class="col-12">
                    Type of Visitor
                    <q-option-group
                      outlined
                      name="AvailBuild"
                      v-model="line.VisitorType"
                      :options="Types"
                      inline
                    />
                  </div>
                  <div class="col-12">
                    Category of Visitor
                    <q-option-group
                      outlined
                      name="AvailBuild"
                      v-model="line.Type"
                      :options="Category"
                      inline
                    />
                    <div v-if="line.Type == 'Student'">
                      Student
                      <q-option-group
                        outlined
                        name="AvailBuild"
                        v-model="line.SubType"
                        :options="SubCategory"
                        inline
                      />
                    </div>
                    <!-- <br /> -->
                    <!-- <div class="col-12" align="center">
                      <QrcodeVue
                        :value="line.generateQRs"
                        :size="size"
                        level="H"
                      ></QrcodeVue>
                      {{ line.generateQRs }}
                    </div> -->
                  </div>

                  <q-card-actions align="right">
                    <q-btn
                      @click="removeLine(index)"
                      icon="delete"
                      label="Delete Visitors"
                      color="red"
                    />
                    <q-btn
                      v-if="index + 1 === lines.length"
                      @click="addLine"
                      icon="add"
                      label="Add Visitors"
                      color="green"
                    />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
            <br />
          </div>
          <q-separator />

          <q-card-actions align="right">
            <q-btn
              v-close-popup
              flat
              color="primary"
              label="Register"
              @click="addVisitors()"
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
            <q-btn
              v-close-popup
              flat
              color="red"
              label="Cancel"
              @click="clear"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="row">
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm">
          <q-table
            :pagination="pagination"
            :data="VisitorL"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="Building">{{
                  props.row.Building
                }}</q-td>
                <q-td auto-width key="List">
                  <q-btn
                    dense
                    flat
                    color="primary"
                    label="View the List"
                    @click="view(props.row)"
                  ></q-btn>
                  <q-badge color="blue">{{ props.row.ListVisitors.length }}</q-badge>
                </q-td>
                <q-td :props="props" key="Date">{{
                  props.row.date | timeformat
                }}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click="(modalbtn = 'edit'), editModal(props.row)"
                  ></q-btn>

                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
    </div>
    <!-- <div class="col-1 q-pb-md">
      <span style="font-size:25px; color:#5a5c69!important;">Summary</span>
    </div>
    <div class="row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <div style="text-align:right">
            <img src="statics/undraw_statistic_chart_38b6.svg" style="width:250px;" class="q-mr-lg" />
            <div style="text-align:right">
              Total Number of Visitors: {{total}}
              <br />
              Total Number of Male: {{totalMale}}
              <br />Total Number of Female:
              <br />Total Number of Non-Binary:
              <br />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>-->

    <q-dialog v-model="viewList">
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
            <div class="col-1"><q-checkbox v-model="line.status" /></div>
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
          <q-btn flat @click="qrscan = true">Scan QR</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="qrscan">
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
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="printqr">
      <q-card>
        <q-card-section ></q-card-section>
         <q-card-section class="q-pt-none">
          <div v-for="(line, index) in lines" :key="index" class="row q-pb-md">
            <div class="col-12" style="text-align:center;">
              <img
                src="statics/app-logo-80x.svg"
                style="width:80px;"
                class="q-mr-lg"
              />
              <br />
              <span style="font-size:20px;">NMP - {{ Museum.Building.NameBuilding }}</span>
              <br />
            </div>
            <div class="col-12" align="center">
              <QrcodeVue
                :value="line.generateQRs"
                :size="size"
                level="H"
                renderAs="svg"
              ></QrcodeVue>
              {{ line.generateQRs }} <br />
              {{ line.FirstN + " " + line.LastN }}
            </div>
          </div>
        </q-card-section>
        <vueEasyPrint ref="easyPrint">
          <q-card-section class="q-pt-none">
          <div v-for="(line, index) in lines" :key="index" class="row q-pb-md">
            <div class="col-12" style="text-align:center;">
              <img
                src="statics/app-logo-80x.svg"
                style="width:80px;"
                class="q-mr-lg"
              />
              <br />
              <span style="font-size:20px;">NMP - {{ Museum.Building.NameBuilding }}</span>
              <br />
            </div>
            <div class="col-12" align="center">
              <QrcodeVue
                :value="line.generateQRs"
                :size="size"
                level="H"
                renderAs="svg"
              ></QrcodeVue>
              {{ line.generateQRs }} <br />
              {{ line.FirstN + " " + line.LastN }}
            </div>
          </div>
        </q-card-section>
        </vueEasyPrint>

        <q-card-actions align="center">
          <q-btn
            flat
            label="PRINT"
            color="primary"
            v-close-popup
            @click="print"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { firestore } from 'boot/firebase'
import moment from 'moment'
import { QrcodeStream } from 'vue-qrcode-reader'
import vueEasyPrint from 'vue-easy-print'

export default {
  name: 'PageIndex',
  components: { QrcodeVue, QrcodeStream, vueEasyPrint },
  data () {
    return {
      printqr: false,
      destroyed: false,
      isValid: undefined,
      camera: 'auto',
      result: null,
      qrscan: false,
      GUID: this.generateUUID,
      value: null,
      size: 200,
      pagination: {
        sortBy: 'date',
        rowsPerPage: 15,
        descending: true // current rows per page being displayed
      },
      viewList: false,
      VisitorsLog: [],
      VisitorL: [],
      lines: [],
      liness: [],
      linesss: [],
      blockRemoval: true,
      delbtn: false,
      alertDelete: false,
      visitLog: false,
      modalbtn: null,
      FirstN: null,
      LastN: null,
      Destination: null,
      Gender: null,
      Type: null,
      timestamp: '',
      Category: null,
      Museum: {
        Building: ''
      },
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
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },

  firestore () {
    return {
      Building: firestore.collection('MuseumBuilding'),
      VisitorLogs: firestore.collection('VisitorsLog'),
      VisitorL: firestore
        .collection('VisitorsLog')
        .where('arrivalStatus', '==', 'Arrived'),
      Types: firestore.collection('TypeVisitor'),
      Category: firestore.collection('Category'),
      SubCategory: firestore.collection('SubCategory'),
      Genders: firestore.collection('Gender'),
      Report: firestore.collection('Report')
    }
  },

  methods: {
    print () {
      this.$refs.easyPrint.print()
      var lineId
      if (!this.blockRemoval) {
        this.lines.splice(lineId, this.lines.length)
      } else {
        this.lines.splice(lineId, 1)
      }
    },
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
      this.$firestore.VisitorLogs.doc(this.arg.id)
        .update(listVist)
        .then(docRef => {
          this.$q.loading.hide()
        })
      this.$q.notify({
        message: 'Successfully Added',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      })
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
    view (arg) {
      this.viewList = true
      this.linesss = arg.ListVisitors
      this.liness = arg.ListVisitors
      this.arg = arg
    },
    addLine () {
      // let checkEmptyLines = this.lines.filter(line => line.FirstN === null)
      // if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
      //   return
      // }
      this.lines.push({
        generateQRs: this.GUID + this.lines.length,
        status: true
      })
    },
    removeLine (lineId) {
      if (!this.blockRemoval) {
        this.lines.splice(lineId, 1)
      }
    },
    clear () {
      var lineId
      if (!this.blockRemoval) {
        this.lines.splice(lineId, this.lines.length)
      } else {
        this.lines.splice(lineId, 1)
      }
    },
    addVisitors () {
      var listVist = {
        Building: this.Museum.Building.NameBuilding,
        ListVisitors: this.lines,
        date: moment().format(),
        arrivalStatus: 'Arrived',
        visitorType: 'walk-in'
      }
      var Rep = {
        Building: this.Museum.Building.NameBuilding,
        Male: this.totalMale,
        Female: this.totalFemale,
        NonBinary: this.totalNonBinary,
        Locals: this.totalLocal,
        Foreign: this.totalForeign,
        Toddler: this.totalCatTodd,
        Student: this.totalCatStud,
        Adult: this.totalCatAdult,
        Senior: this.totalCatSenior,
        Elementary: this.totalSubCatElem,
        HighSchool: this.totalSubCatHigh,
        SeniorHighSchool: this.totalSubCatSeniorHigh,
        College: this.totalSubCatCollege,
        Status: 'Arrived',
        DateofRecord: moment().format('L')
      }
      try {
        this.$firestore.VisitorLogs.add(listVist).then(docRef => {
          this.$firestore.Report.doc(docRef.id).set(Rep)
          this.$q.notify({
            message: 'Successfully Added',
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done'
          })
        })
      } catch (error) {
        this.$q.notify({
          message: 'Data Failed' + error,
          color: 'red',
          textColor: 'white',
          icon: 'clear'
        })
      }
      this.printqr = true
    },
    editModal (arg) {
      this.visitLog = true
      this.arg = arg
      this.Museum.Building = arg.Building
      this.lines = arg.ListVisitors
    },
    editRow () {
      try {
        var listVist = {
          Building: this.Museum.Building,
          ListVisitors: this.lines
        }
        var Rep = {
          Male: this.totalMale,
          Female: this.totalFemale,
          NonBinary: this.totalNonBinary,
          Locals: this.totalLocal,
          Foreign: this.totalForeign,
          Toddler: this.totalCatTodd,
          Student: this.totalCatStud,
          Adult: this.totalCatAdult,
          Senior: this.totalCatSenior,
          Elementary: this.totalSubCatElem,
          HighSchool: this.totalSubCatHigh,
          SeniorHighSchool: this.totalSubCatSeniorHigh,
          College: this.totalSubCatCollege
        }
        this.$firestore.VisitorLogs.doc(this.arg.id)
          .update(listVist)
          .then(docRef => {
            this.$firestore.Report.doc(this.arg.id).update(Rep)
          })
        this.$q.notify({
          message: 'Successfully Added',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
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
    delalert (VisitorLog) {
      this.alertDelete = true
      this.VisitorLog = VisitorLog
    },
    deleteRow () {
      try {
        // this.$firestore.contactPerson.add(this.ConUser)
        this.$firestore.VisitorLogs.doc(this.VisitorLog.id)
          .delete()
          .then(docRef => {
            this.$firestore.Report.doc(this.VisitorLog.id).delete()
          })
        this.$q.notify({
          message: 'Successfully Added',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done'
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
    createNewUUID () {
      this.GUID = this.generateUUID()
    },
    generateUUID () {
      // Public Domain/MIT
      var d = new Date().getTime()
      if (
        typeof performance !== 'undefined' &&
        typeof performance.now === 'function'
      ) {
        d += performance.now() // use high-precision timer if available
      }
      var newGuid = 'NMPxxxxx-xxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })

      return newGuid
    }
  },

  mounted () {
    this.GUID = this.generateUUID()
  },

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
    shownUUID: function () {
      var newGuid = this.GUID
      return newGuid
    },

    total: function () {
      console.log(this.VisitorL)
      return this.VisitorL.reduce(function (total, item) {
        return total + item.ListVisitors.Gender.length
      }, 0)
    },
    // Gender
    totalMale: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Gender === 'Male')
      }, 0)
    },
    totalFemale: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Gender === 'Female')
      }, 0)
    },
    totalNonBinary: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Gender === 'Non Binary')
      }, 0)
    },
    // VisitorType
    totalLocal: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.VisitorType === 'Local Tourist')
      }, 0)
    },

    totalForeign: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.VisitorType === 'Foreign Tourist')
      }, 0)
    },
    // VisitorCategory
    totalCatSenior: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Type === 'Senior Citizen')
      }, 0)
    },
    totalCatTodd: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Type === 'Toddler')
      }, 0)
    },
    totalCatStud: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Type === 'Student')
      }, 0)
    },
    totalCatAdult: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.Type === 'Adult')
      }, 0)
    },
    // Visitor Sub Type
    totalSubCatElem: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.SubType === 'Elementary')
      }, 0)
    },
    totalSubCatHigh: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.SubType === 'High School')
      }, 0)
    },
    totalSubCatSeniorHigh: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.SubType === 'Senior High School')
      }, 0)
    },
    totalSubCatCollege: function () {
      return this.lines.reduce(function (n, line) {
        return n + (line.SubType === 'College')
      }, 0)
    }
    // totalMale: function () {
    //   console.log(this.VisitorMale)
    //   return this.VisitorMale.reduce(function (totalMale, item) {
    //     return totalMale + item.ListVisitors.length
    //   }, 0)
    // }
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
