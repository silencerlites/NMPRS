<template>
  <q-page class="q-pa-lg">
    <div class="column">
 <div style="text-align:center;">
              <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
              <b style="font-size:50px; color:#6B1510;">National Museum of the Philippines</b>
            </div>
      <div class="row justify-center q-pt-md">

              <div class="col-4 q-mr-xl">
     <q-card class="my-card" @click="visitLog = true, addLine()"  v-on:click.prevent="createNewUUID()" >
               <img src="statics/undraw_click_here_2li1.svg" style="max-height:600px; max-height:590px;">
      <q-card-section class="bg-primary text-white">

        <div class="text-h2 q-pb-md q-pt-md" align="center"> <b>Visitor's Log</b> </div>
      </q-card-section>

    </q-card>

</div>

<div class="col-4">
     <q-card class="my-card" @click="surveyModal = true">
               <img src="statics/undraw_rate.svg" style="max-height:600px; max-height:590px;">
      <q-card-section class="bg-primary text-white">

        <div class="text-h2 q-pb-md q-pt-md" align="center"> <b>Rating & Comment</b> </div>
      </q-card-section>

    </q-card>

</div>

</div>
      </div>
      <!--  Visitors -->
      <q-dialog
      v-model="visitLog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h3" align="center"> <b> Registration of Visitor's</b></div>
        </q-card-section>

        <q-card-section class="q-pt-none text-black">
          <div class="col q-pa-md text-black">
            <div>

              <div v-for="(line, index) in lines" :key="index" class="row q-pb-md">
                <q-card class="my-card q-pa-sm col-12" flat bordered>
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
                    <q-option-group :options="Genders" type="radio" v-model="line.Gender" inline />
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

          <q-card-actions align="center" class="q-pt-lg">
            <q-btn
              v-close-popup
              color="green"
              label="Register"
              size="50px"
              @click="addVisitors()"
              class="q-pa-sm"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
<!-- Rating -->

<q-dialog
      v-model="surveyModal"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h3" align="center"> <b>Rating & Comment</b>  </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-black">
      <q-card class="my-card">
        <div class="row q-pa-md">
          <div class="col-12">
             Name
            <q-input outlined v-model="name" />
          </div>

          <div class="q-gutter-md col-9 q-pt-sm ">
            <p><b>Questionier</b></p>
            <div v-for="(Question, index) in RatingComment" :key="index">{{ ++index + "." + " " + Question.Questionnaire }}
            <br>
          <q-rating
            name="quality"
            v-model="Question.quality"
            max="5"
            size="3em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            no-dimming
          />
        </div>
        </div>
        <template>
  <div class="q-pt-md col-12">
    <p> <b> Comment and Suggestion</b></p>
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
      ]"
    />
  </div>
  </template>
        </div>

      </q-card>
        </q-card-section>
        <q-separator />

        <q-card-actions  align="center" class="q-pt-lg">
          <q-btn
            v-close-popup
            color="green"
            label="Rate"
            class="q-pa-sm"
            @click="addSurvey()"
            size="50px"
            style="width:300px"
          />
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
import { firestore } from 'boot/firebase'
import moment from 'moment'
import vueEasyPrint from 'vue-easy-print'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'PageIndex',
  components: { QrcodeVue, vueEasyPrint },
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
      editor: '',
      RatingComment: [],
      quality: null,
      modalbtn: null,
      activeItem: null,
      maximizedToggle: true,
      surveyModal: false,
      viewList: false,
      VisitorsLog: [],
      VisitorL: [],
      lines: [],
      blockRemoval: true,
      visitLog: false,
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
    },
    VisitorL () {
      this.blockRemoval = this.VisitorL.length <= 1
    }
  },

  firestore () {
    return {
      Building: firestore.collection('MuseumBuilding'),
      VisitorLogs: firestore.collection('VisitorsLog'),
      VisitorL: firestore.collection('VisitorsLog').where('arrivalStatus', '==', 'Arrived'),
      Types: firestore.collection('TypeVisitor'),
      Category: firestore.collection('Category'),
      SubCategory: firestore.collection('SubCategory'),
      Genders: firestore.collection('Gender'),
      Report: firestore.collection('Report'),
      RatingComment: firestore.collection('RatingComment'),
      Rate: firestore.collection('Rate')
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
    addSurvey () {
      this.MBmodalbtn = 'add'
      try {
        var RateAns = {
          Rating: this.RatingComment,
          TotalRate: this.totalAmount / this.RatingComment.length,
          CommentSuggestion: this.editor,
          Name: this.name,
          Date: Date.now()
        }
        this.$firestore.Rate.add(RateAns)
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
    },
    totalAmount: function () {
      var sum = 0
      this.RatingComment.forEach(e => {
        sum += e.quality
      })
      return sum
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
