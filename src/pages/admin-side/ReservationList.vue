<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Reservation List</span>
        <q-btn color="green" label="Go Back" style="float:right;" to="/adminSide/reservation" />
      </div>
      <!-- Add Registration -->
      <q-dialog
        v-model="addReg"
        persistent
        transition-show="scale"
        transition-hide="scale"
        style="max-width: 2000px"
      >
        <template>
          <q-stepper
            v-model="step"
            header-nav
            ref="stepper"
            color="primary"
            animated
            style="max-width: 2000px"
          >
            <q-step
              :name="1"
              title="Select Museum Availability"
              icon="settings"
              style="min-height: 100px"
              :done="step > 1"
            >
              <div class="col-12">
                <div class="col-12">
                  Select Museum
                  <q-select
                    outlined
                    name="AvailBuild"
                    v-model="Museum.Building"
                    :options="Building"
                    option-value="id"
                    option-label="NameBuilding"
                  />
                </div>Date
                <q-input outlined v-model="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="date"
                          @input="() => $refs.qDateProxy.hide()"
                          mask="YYYY-MM-DD"
                          :options="dateRuleOptions"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-list>
                  <div class="col-12">
                    Time
                    <q-select
                      outlined
                      name="timeRS"
                      color="purple-12"
                      v-model="Museum.Times"
                      :options="OperationHours"
                      option-value="id"
                      option-label="Hour"
                    />
                  </div>
                </q-list>
              </div>
              <q-stepper-navigation>
                <q-btn @click="() => { step = 2 }" color="primary" label="Continue" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Reservation Information"
              icon="create_new_folder"
              style="min-height: 100px"
              :done="step > 2"
            >
              <div class="col-12">
                Name of School | Institution | Group
                <q-input outlined v-model="title" />
              </div>

              <q-stepper-navigation>
                <q-btn @click="() => { step = 3 }" color="primary" label="Continue" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="List of Visitors"
              icon="add_comment"
              style="min-height: 100px"
              :done="step > 3"
            >
              <div v-for="(line, index) in lines" :key="index" class="row q-pb-md">
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
                    <q-option-group :options="Genders" type="radio" v-model="line.Gender" inline />
                  </div>
                  <div class="col-12">
                    Type of Visitor
                    <q-select
                      outlined
                      name="AvailBuild"
                      v-model="line.Category"
                      :options="Types"
                      option-value="Type"
                      option-label="Type"
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
                    />Student
                    <q-option-group
                      outlined
                      name="AvailBuild"
                      v-model="line.Type"
                      :options="SubCategory"
                      inline
                    />
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
              <q-stepper-navigation>
                <q-btn @click="() => { step = 4 }" color="primary" label="Continue" />
                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="4"
              title="Contact Information"
              icon="add_comment"
              style="min-height: 100px"
              :done="step > 4"
            >
              <div class="col-12">
                Name
                <q-input outlined v-model="ConUser.Name" />
              </div>
              <div class="col-6">
                Contact Number
                <q-input outlined v-model="ConUser.ConNum" />
              </div>
              <div class="col-6">
                Email
                <q-input outlined v-model="ConUser.Email" />
              </div>

              <q-stepper-navigation>
                <q-btn @click="() => { step = 5 }" color="primary" label="Continue" />
                <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="5"
              title="Billing & Payment"
              icon="add_comment"
              style="min-height: 100px"
              :done="step > 5"
            >
              <div class="row">
                <div class="col-12">
                  <q-card>
                  <q-card-section vertical>
                    <br>
                    <div style="text-align:right">
                      <img src="statics/app-logo-80x.svg" style="width:50px;" class="q-mr-lg">
                      <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
                    </div>
                    <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs"/>
                    <br>
                    <div class="row">
                      <div class="col-8">
                        Name: <br>
                        <b class="text-h5 ">{{ this.ConUser.Name}}</b>
                      </div>
                      <div class="col-4" style="float-right">
                        <q-icon name="phone_android" size="1.3rem"/> {{  this.ConUser.ConNum}} <br>
                        <q-icon name="mail" size="1.3rem"/> {{ this.ConUser.Email}}
                      </div>
                    </div>
                    <q-separator  class="q-mb-sm q-mt-sm"/>
                    <b style="color:#6B1510">Reservation Details</b>
                    <q-separator  class="q-mb-sm q-mt-sm"/>
                    <div class="row q-mt-sm">
                      <div class="col-8">
                        Building: <br>
                        <b class="text-h7 ">{{ this.Museum.Building.NameBuilding }}</b>
                      </div>
                      <div class="col-4">
                        Date: {{ this.date | timeformatDate }} <br>
                        Time: {{ this.date + 'T' + this.Museum.Times.Hour | timeformatTime }}
                      </div>
                    </div>
                    <div class="row q-mt-xs">
                      <div class="col-8">
                        Name of School | Institution | Group: <br>
                        <b class="text-h7 ">{{ this.title }}</b>
                      </div>
                      <div class="col-4" >
                        Number of Visitors: <br>
                        <b class="text-h7 ">{{ this.lines.length }} </b>
                      </div>
                    </div>
                    <q-separator  class="q-mb-sm q-mt-sm"/>
                    <b style="color:#6B1510">Billing Details</b>
                    <q-separator  class="q-mb-sm q-mt-sm"/>
                    <div class="row q-mt-xs">
                      <div class="col-8">
                        Building Fee: <br>
                        <b class="text-h7 "> &#x20B1; {{ this.Museum.Building.Fees }}</b>
                      </div>
                      <div class="col-4" >
                        Total Amount : <br>
                        <b class="text-h6" style="color:#d35400"> &#x20B1; {{ this.lines.length * this.Museum.Building.Fees }} </b>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                </div>
              <div class="col-12" v-if="this.lines.length * this.Museum.Building.Fees > 0">
                <q-card class="my-card q-mt-md col-12">
                  <q-card-section>
                     <div>
                    <b style="color:#6B1510" class="text-h6">Select Payment Method</b>
                    <div class="row q-mt-sm">
                      <div class="col-12">
                          <q-splitter
                              v-model="splitterModel"
                              style="height: auto"
                            >

      <template v-slot:before>
        <q-tabs
          v-model="method"
          vertical
          class="text-teal"
        >
          <q-tab name="Card" icon="credit_card" label="Credit/Debit Card" />
          <q-tab name="Cash" icon="local_atm" label="Cash" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="method"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="Card">
            <template>
                      <div class="my-card">
                        Pay with Credit or Debit Card
                        <card
                          class="stripe-card q-mt-sm"
                          :class="{ complete }"
                          stripe="pk_test_vqR369WnqQuVam22cDEZaWXh00Fao7K3bT"
                          @change="complete = $event.complete"
                        />
                      </div>
                     </template>
          </q-tab-panel>

          <q-tab-panel name="Cash">
            <span>Please settle a payment through our cashier</span>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
                      </div>

                    </div>

                </div>

                  </q-card-section>
                </q-card>
                </div>

              </div>

              <q-stepper-navigation>
                          <q-btn
                          v-if="method== 'Card'"
                        @click="placeOrderButtonPressed"
                        :disabled="!complete"
                        color="green"
                        label="Pay Now"
                        v-close-popup
                      />
                      <q-btn
                          v-if="method== 'Cash'"
                        @click="addReservationCash"
                        color="primary"
                        label="Reserve"
                        v-close-popup
                      />
                      <q-btn
                          v-if="this.lines.length * this.Museum.Building.Fees == 0"
                        @click="addReservationCash"
                        color="primary"
                        label="Reserve"
                        v-close-popup
                      />
                <q-btn flat @click="step = 4" color="primary" label="Back" class="q-ml-sm" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </template>
      </q-dialog>
    </div>

    <div class="row">
      <q-dialog v-model="alertDelete">
        <q-card>
          <q-card-section>
            <img src="statics/undraw_throw_away_ldjd.svg" alt style="height:250px" class="q-pa-lg" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h4 text-center">Are you Sure?</div>
            <div class="text-h9 text-center">You won't be able to revert this!</div>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-md q-pb-lg">
            <q-btn
              v-model="delbtn"
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRow()"
              class="col-5"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- table -->
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-table title="Reservation Details" :data="reservations" :columns="columns" row-key="id">
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="(modalbtn = 'add'), (addReg = true), (step = 1)"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="date">{{ props.row.date }}</q-td>
                <q-td :props="props" key="time">{{ props.row.time }}</q-td>
                <q-td :props="props" key="building">
                  {{
                  props.row.Building.NameBuilding
                  }}
                </q-td>
                <q-td :props="props" key="school">{{ props.row.title }}</q-td>
                <q-td :props="props" key="pax">
                  {{
                  props.row.NumberofVisitor
                  }}
                </q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    icon="edit"
                    @click="(modalbtn = 'edit'), editModal(props.row)"
                  ></q-btn>
                  <q-btn dense round flat color="grey" @click="delalert(props.row)" icon="delete"></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import firebase from 'firebase'
import { firestore } from 'boot/firebase'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  name: 'PageIndex',
  components: { Card },
  data () {
    return {
      tab: '',
      amount: null,
      complete: false,
      method: '',
      title: null,
      date: '',
      Museum: {
        Building: [],
        Times: []
      },
      NumberofVisitor: null,
      ConUser: {
        Name: null,
        ConNum: null,
        Email: null
      },
      StatusArrival: false,
      lines: [],
      FirstN: null,
      LastN: null,
      Destination: null,
      Gender: null,
      Type: null,
      timestamp: '',
      Category: null,
      delbtn: false,
      alertDelete: false,
      addReg: false,
      modalbtn: null,
      activeItem: null,
      step: 1,
      columns: [
        {
          name: 'date',
          required: true,
          label: 'Date',
          align: 'left',
          field: row => row.date,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 200px',
          headerClasses: 'bg-primary text-white',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'time', label: 'Time', field: 'time', align: 'center' },
        {
          name: 'building',
          label: 'Building',
          field: 'building',
          align: 'center'
        },
        {
          name: 'school',
          align: 'center',
          label: 'School | Institution | Group',
          field: 'school',
          sortable: true,
          style: 'max-width: 10px'
        },
        { name: 'pax', label: 'Numbers of Visitors', field: 'pax' },
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
      VisitorL: firestore.collection('VisitorsLog'),
      Types: firestore.collection('TypeVisitor'),
      Category: firestore.collection('Category'),
      SubCategory: firestore.collection('SubCategory'),
      Genders: firestore.collection('Gender'),
      reservations: firestore.collection('Reservation'),
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours'),
      Payment: firestore.collection('Payment'),
      Billing: firestore.collection('Billing')
    }
  },
  methods: {
    // stripe Billing
    placeOrderButtonPressed () {
      createToken().then(result => {
        if (result.error) {
          this.stripeValidationError = result.error.message
        } else {
          var stripeObject = {
            amount: this.lines.length * this.Museum.Building.Fees,
            source: result.token
          }
          this.saveDataToFireStore(stripeObject)
        }
      })
    },

    saveDataToFireStore (stripeObject) {
      const db = firebase.firestore()
      const chargesRef = db.collection('Payment')
      const pushId = chargesRef.doc().id
      var Reserve = {
        title: this.title,
        date: this.date,
        time: this.Museum.Times.Hour,
        color: this.Museum.Building.Color,
        start: this.date + 'T' + this.Museum.Times.Hour,
        NumberofVisitor: this.lines.length,
        Building: this.Museum.Building,
        Contact: this.ConUser
      }

      db.collection('Payment')
        .doc(pushId)
        .set(stripeObject)

      chargesRef.doc(pushId).onSnapshot(snapShot => {
        const charge = snapShot.data()

        if (charge.error) {
          this.$q.notify({
            message: 'Data Failed' + charge.error,
            color: 'red',
            textColor: 'white',
            icon: 'clear'
          })
          chargesRef.doc(pushId).delete()
          return
        }
        // eslint-disable-next-line eqeqeq
        if (charge.status && charge.status == 'succeeded') {
          this.$q.notify({
            color: 'green-4',
            message: `Payment Successfully`,
            icon: 'credit_card',
            timeout: 500
          })
        }

        this.$firestore.reservations
          .doc(pushId)
          .set(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(pushId).set({
              Building: this.Museum.Building,
              ListVisitors: this.lines,
              date: this.date + 'T' + this.Museum.Times.Hour,
              visitorType: 'reservation'
            })
            this.$firestore.Billing.doc(pushId).set({
              Contact: this.ConUser,
              Building: this.Museum.Building,
              Amount: this.lines.length * this.Museum.Building.Fees,
              PaymentMethod: 'Credit/Debit Card',
              DatePayment: Date.now(),
              Status: 'Paid'
            })
              .this.$q.notify({
                color: 'green-4',
                message: `Reservation Successfully Done`,
                icon: 'cloud_done',
                timeout: 500
              })
          })
          .catch(function (error) {
            this.$q.notify({
              message: 'Data Failed' + error,
              color: 'red',
              textColor: 'white',
              icon: 'clear'
            })
          })
      })
    },
    addLine () {
      // let checkEmptyLines = this.lines.filter(line => line.FirstN === null)
      // if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
      //   return
      // }
      this.lines.push({})
    },
    removeLine (lineId) {
      if (!this.blockRemoval) {
        this.lines.splice(lineId, 1)
      }
    },
    addReservationCash () {
      try {
        var Reserve = {
          title: this.title,
          date: this.date,
          time: this.Museum.Times.Hour,
          color: this.Museum.Building.Color,
          start: this.date + 'T' + this.Museum.Times.Hour,
          NumberofVisitor: this.lines.length,
          Building: this.Museum.Building,
          Contact: this.ConUser
        }
        this.$firestore.reservations
          .add(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(docRef.id).set({
              Building: this.Museum.Building,
              ListVisitors: this.lines,
              date: this.date + 'T' + this.Museum.Times.Hour,
              visitorType: 'reservation'
            })
            this.$firestore.Billing.doc(docRef.id).set({
              Contact: this.ConUser,
              Building: this.Museum.Building,
              Amount: this.lines.length * this.Museum.Building.Fees,
              PaymentMethod: 'Cash',
              DatePayment: '',
              Status: 'Unpaid'
            })
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
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
    addReservationNoPayment () {
      try {
        var Reserve = {
          title: this.title,
          date: this.date,
          time: this.Museum.Times.Hour,
          color: this.Museum.Building.Color,
          start: this.date + 'T' + this.Museum.Times.Hour,
          NumberofVisitor: this.lines.length,
          Building: this.Museum.Building,
          Contact: this.ConUser
        }
        this.$firestore.reservations
          .add(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(docRef.id).set({
              Building: this.Museum.Building,
              ListVisitors: this.lines,
              date: this.date + 'T' + this.Museum.Times.Hour,
              visitorType: 'reservation'
            })
            this.$firestore.Billing.doc(docRef.id).set({
              Contact: this.ConUser,
              Building: this.Museum.Building,
              Amount: this.lines.length * this.Museum.Building.Fees,
              PaymentMethod: '',
              DatePayment: Date.now(),
              Status: 'Paid'
            })
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
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

    dateRuleOptions (Reserve) {
      var today = new Date()
      // eslint-disable-next-line no-unused-vars
      var year = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      today = yyyy + '/' + mm + '/' + dd
      return Reserve > today && Reserve <= '3000/03/15'
    },
    editModal (Reserve) {
      this.addReg = true
      this.Reserve = Reserve
      this.Museum.Building = Reserve.Building
      this.title = Reserve.title
      this.date = Reserve.date
      this.Museum.Times = Reserve.time
      this.NumberofVisitor = Reserve.NumberofVisitor
      this.lines = Reserve.ListVisitors
      this.ConUser = Reserve.Contact
    },
    editRow () {
      if (this.step === 6) {
        try {
          var Reserve = {
            title: this.title,
            date: this.date,
            time: this.Museum.Times.Hour,
            color: this.Museum.Building.Color,
            start: this.date + 'T' + this.Museum.Times.Hour,
            NumberofVisitor: this.NumberofVisitor,
            Building: this.Museum.Building,
            Contact: this.ConUser
          }
          var vst = {
            Building: this.Museum.Building,
            ListVisitors: this.lines,
            date: this.date + 'T' + this.Museum.Times.Hour,
            visitorType: 'reservation'
          }
          this.$firestore.reservations
            .doc(this.Reserve.id)
            .update(Reserve)
            .then(docRef => {
              this.$firestore.VisitorL.doc(this.Reserve.id).update(vst)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
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
      }
    },
    delalert (Reserve) {
      this.alertDelete = true
      this.Reserve = Reserve
    },
    deleteRow () {
      try {
        this.$firestore.reservations
          .doc(this.Reserve.id)
          .delete()
          .then(docRef => {
            this.$firestore.VisitorL.doc(this.Reserve.id).delete()
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
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
  },
  mounted () {
    this.addLine()
  }
}
</script>

<style>
.stripe-card {
  box-sizing: border-box;
  height: 40px;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}
</style>
