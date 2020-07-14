<template>
  <q-page class="q-pa-md">
    <div class="column">
      <!-- Add User -->
      <q-dialog
      persistent
      v-model="viewBill"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card flat bordered class="my-card bg-grey-1" style="width:890px; max-width:890px">
        <q-card-section>
          <div id="vBill">
            <div style="text-align:center;">
              <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
              <br />
              <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
            </div>
            <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
            <div class="col-12" style="text-align:right; padding-right:50px">
              Billing No:
              <b>{{ this.idVisit }}</b>
            </div>
            <q-separator class="q-mb-sm q-mt-sm" />
            <div class="row">
              <div class="col-8">
                Name:
                <br />
                <span style="font-size:25px; text-weight:300">{{ this.ConUser.Name }}</span>
              </div>
              <div class="col-4" style="float-right">
                <svg
                  class="bi bi-phone"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11 1H5a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1zM5 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V2a2 2 0 00-2-2H5z"
                    clip-rule="evenodd"
                  />
                  <path fill-rule="evenodd" d="M8 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                {{ this.ConUser.ConNum }}
                <br />
                <svg
                  class="bi bi-envelope-fill"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0014 2H2A2 2 0 00.05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108L9.157 8.879 8 9.586l-1.157-.707-6.675 3.926A2 2 0 002 14h12a2 2 0 001.832-1.195zM0 11.743l5.875-3.456L0 4.697v7.046z"
                  />
                </svg>
                {{ this.ConUser.Email }}
              </div>
            </div>
            <q-separator class="q-mb-sm q-mt-sm" />
            <b style="color:#6B1510">Reservation Details</b>
            <q-separator class="q-mb-sm q-mt-sm" />
            <div class="row q-mt-sm">
              <div class="col-8">
                Building:
                <br />
                <b class="text-h7">{{ this.Museum.Building.NameBuilding }}</b>
              </div>
              <div class="col-4">
                Date & Time:
                <br />
                {{ this.reservedate | timeformat }}
              </div>
            </div>
            <div class="row q-mt-xs">
              <div class="col-8">
                Name of School | Institution | Group:
                <br />
                <b class="text-h7">{{ this.title }}</b>
              </div>
              <div class="col-4">
                Number of Visitors:
                <br />
                <b class="text-h7">{{ this.NumberofVisitor }}</b>
              </div>
            </div>
            <q-separator class="q-mb-sm q-mt-sm" />
            <b style="color:#6B1510">Billing Details</b>
            <q-separator class="q-mb-sm q-mt-sm" />
            <div class="row q-mt-xs">
              <div class="col-8">
                Building Fee:
                <br />
                &#x20B1; {{ this.Museum.Building.Fees }}
              </div>
              <div class="col-4">
                Total Amount :
                <br />
                <b
                  style="color:#d35400"
                >&#x20B1; {{ this.NumberofVisitor * this.Museum.Building.Fees }}</b>
              </div>
            </div>
            <q-separator class="q-mb-sm q-mt-sm" />
            <b style="color:#6B1510">Payment Details</b>
            <q-separator class="q-mb-sm q-mt-sm" />
            <div class="row q-mt-xs">
              <div class="col-8">
                Payment Method:
                <br />
                {{ this.paymentMethod }}
              </div>
              <div class="col-4">
                Status of Payment:
                <br />
                <div v-if="this.statusPayment == 'Paid'">
                  <q-badge color="green">{{ this.statusPayment }}</q-badge>
                </div>
                <div v-if="this.statusPayment == 'Unpaid'">
                  <q-badge color="red">{{ this.statusPayment }}</q-badge>
                </div>
              </div>
            </div>
            <q-separator class="q-mb-sm q-mt-sm" />
          </div>
          <div v-if="this.paymentMethod == 'Credit/Debit Card'">
            <q-separator class="q-mb-sm q-mt-sm" />
            <b style="color:#6B1510">Receipt</b>
            <q-separator class="q-mb-sm q-mt-sm" />
            <div class="row q-mt-xs">
              <div class="col-8">
                <a
                  :href="receipt"
                  label="To Docs index"
                  outline
                  color="purple"
                  target="_blank"
                  class="link"
                >View the Receipt</a>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat v-close-popup>OK</q-btn>
          <q-btn flat @click="print">Print</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="paymentCash"
    >
      <q-card style="width: 450px; max-width: 80vw;">
             <q-card-section class="bg-primary text-white">
        <div class="text-h6">Payment for Cash</div>
      </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row">
               <div class="col-8">
                Name:
                <br>
                <span  style="font-size:20px;">{{ this.ConUser.Name }}</span>
              </div>
              <div class="col-4">
                Total Amount :
                <br>
                <b
                  style="color:#d35400; font-size:20px;"
                >&#x20B1; {{ this.amount }}</b>
              </div>
          </div>

          <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />

          <q-input v-model="orno" label="O.R No" stack-label  />

           <q-input v-model="payCashs" type="number" label="Payment" stack-label  prefix="₱"/>
           <div class="col-4 q-pt-md" v-if="!this.payCashs == ''">
                Change:
                <b
                  style="color:#2ecc71;"
                >&#x20B1; {{ this.payCashs - this.amount }}</b>
              </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat v-close-popup label="Make Payment" @click="PaymentCash"/>
          <q-btn flat v-close-popup class="bg-white text-red">Cancel</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>

    <div class="row">
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm">
          <q-table
          title="Billing & Payment"
            :data="Billing"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :pagination="pagination"
          >
          <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" style="width:400px">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
          <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="ref">{{ props.row.id }}</q-td>
                <q-td :props="props" key="name">{{ props.row.Contact.Name }}</q-td>
                <q-td :props="props" key="building">{{ props.row.Building.NameBuilding }}</q-td>
                <q-td :props="props" key="amount">{{ props.row.Amount }}</q-td>
                <q-td :props="props" key="status">
                   <q-badge color="green" v-if="props.row.Status == 'Paid'">
                    {{ props.row.Status}}
                  </q-badge>
                  <q-badge color="orange" v-if="props.row.Status == 'Unpaid'">
                    {{ props.row.Status}}
                  </q-badge>
                   <q-badge color="grey" v-if="props.row.Status == 'Refunded'">
                    {{ props.row.Status}}
                  </q-badge>
                  <q-badge color="red" v-if="props.row.Status == 'Cancel'">
                    {{ props.row.Status}}
                  </q-badge>
                  </q-td>
                <q-td auto-width key="action">
                  <q-btn dense round flat color="blue" @click="viewListBilling(props.row)" icon="print">
                    <q-tooltip content-class="bg-primary">Print</q-tooltip>
                  </q-btn>
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
import { firestore, firebaseAuth } from 'boot/firebase'
import moment from 'moment'

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      payCashs: null,
      orno: '',
      paymentCash: false,
      filter: '',
      paymentMethod: null,
      statusPayment: null,
      reservedate: '',
      idVisit: '',
      viewVisitorFire: [],
      viewList: false,
      viewBill: false,
      receipt: null,
      amount: null,
      complete: false,
      method: '',
      title: null,
      date: '',
      Museum: {
        Building: '',
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
      alertCancel: false,
      alertDelete: false,
      addReg: false,
      editReg: false,
      modalbtn: null,
      activeItem: null,
      step: 1,
      viewvi: [],
      userAccountModal: false,
      pagination: {
        sortBy: 'date',
        rowsPerPage: 12,
        descending: true // current rows per page being displayed
      },
      columns: [
        {
          name: 'ref',
          required: true,
          label: 'Transaction ID',
          align: 'left',
          field: row => row.id,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 400px',
          headerClasses: 'bg-primary text-white',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'name', label: 'Name', field: row => row.Contact.Name, align: 'center' },
        {
          name: 'building',
          label: 'Building',
          field: 'building',
          align: 'center'
        },
        {
          name: 'amount',
          label: 'Amount',
          field: 'amount',
          sortable: true,
          style: 'max-width: 10px'
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          sortable: true,
          style: 'max-width: 10px'
        },
        { name: 'actions', label: 'Actions', align: 'center' }
      ]
    }
  },
  firestore () {
    const user = firebaseAuth.currentUser
    return {
      Billing: firestore.collection('Billing').where('UserId', '==', user.uid),
      Billings: firestore.collection('Billing'),
      Payment: firestore.collection('Payment')
    }
  },
  methods: {
    print () {
      // Pass the element id here
      this.$htmlToPaper('vBill')
    },
    payCash (arg) {
      this.arg = arg
      this.paymentCash = true
      this.idVisit = arg.id
      var docRef = this.$firestore.Billing.doc(arg.id)

      docRef.get().then(doc => {
        console.log('Cached document data:', doc.data())
        this.ConUser = doc.data().Contact
        this.amount = doc.data().Amount
        this.statusPayment = doc.data().Status
      })
    },
    PaymentCash () {
      try {
        var updateStat = {
          Status: 'Paid'
        }
        this.$firestore.Billing.doc(this.arg.id).update(updateStat)
        this.$firestore.Payment.doc(this.arg.id).set({
          ORno: this.orno,
          amount: this.payCashs,
          Change: this.payCashs - this.amount,
          date: moment().format('L'),
          type: 'Cash',
          payment_method_details: {
            card: {
              brand: null
            },
            type: 'Cash'
          }
        })

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
    },
    viewListBilling (arg) {
      this.viewBill = true
      this.idVisit = arg.id
      var docRef = this.$firestore.Billings.doc(arg.id)
      var docRefs = this.$firestore.Payment.doc(arg.id)

      docRef.get().then(doc => {
        console.log('Cached document data:', doc.data())
        this.ConUser = doc.data().Contact
        this.Museum.Building = doc.data().Building
        this.NumberofVisitor = doc.data().NumberofVisitor
        this.reservedate = doc.data().DateofReserve
        this.title = doc.data().NameofGroup
        this.amount = doc.data().Amount
        this.paymentMethod = doc.data().PaymentMethod
        this.statusPayment = doc.data().Status
      })
      docRefs
        .get()
        .then(doc => {
          // console.log('Cached document data:', doc.data())
          this.receipt = doc.data().receipt_url
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function (error) {
          // console.log('Error getting document:', error)
        })
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
