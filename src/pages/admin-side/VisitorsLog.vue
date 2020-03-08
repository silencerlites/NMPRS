<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;"
          >Visitor Log</span
        >
        {{ visitorsLog }}
      </div>
      <!-- Add Visitors -->

      <q-dialog
        v-model="visitLog"
        persistent
        transition-show="scale"
        transition-hide="scale"
        style="max-width: 1000px"
      >
        <q-card class="my-card">
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
                <q-card class="my-card q-pa-sm bg-grey-1" flat bordered>
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
            <q-btn v-close-popup flat color="red" label="Cancel" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="row">
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm">
          <q-table
            title="Logs"
            :data="VisitorL"
            :columns="columns"
            row-key="id"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="(modalbtn = 'add'), (visitLog = true)"
              />
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="Building">{{
                  props.row.Building.NameBuilding
                }}</q-td>
                <q-td auto-width key="List">
                  <q-btn
                    dense
                    flat
                    color="primary"
                    label="View the List"
                    @click="view(props.row)"
                  ></q-btn>
                </q-td>
                <q-td :props="props" key="Date">{{
                  props.row.date | timeformat
                }}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    icon="edit"
                    @click="(modalbtn = 'edit'), editModal(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="delalert(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
    </div>
    <q-dialog v-model="alertDelete">
      <q-card>
        <q-card-section>
          <img
            src="statics/undraw_throw_away_ldjd.svg"
            alt
            style="height:250px"
            class="q-pa-lg"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-h4 text-center">Are you Sure?</div>
          <div class="text-h9 text-center">
            You won't be able to revert this!
          </div>
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

    <q-dialog v-model="viewList">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle2">Visitors List</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div  v-for="(line, index) in lines"
                :key="index"
                class="row q-pb-md">
                {{++index + '.' + ' ' + line.FirstN + ' ' + line.LastN}}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat v-close-popup>OK</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { firestore } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {},
  data () {
    return {
      viewList: false,
      visitorsLog: [],
      lines: [],
      viewsVisit: [{
        FirstN: null,
        LastN: null
      }],
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
      VisitorL: firestore.collection('VisitorsLog'),
      Types: firestore.collection('TypeVisitor'),
      Category: firestore.collection('Category'),
      SubCategory: firestore.collection('SubCategory'),
      Genders: firestore.collection('Gender')
    }
  },

  methods: {
    view (arg) {
      this.viewList = true
      this.lines = arg.ListVisitors
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
    addVisitors () {
      this.timestamp = Date.now()
      var listVist = {
        Building: this.Museum.Building,
        ListVisitors: this.lines,
        date: this.timestamp
      }
      this.modalbtn = 'add'
      try {
        this.$firestore.VisitorL.add(listVist)
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
    editModal (arg) {
      this.visitLog = true
      this.VisitorLog = arg
      this.Museum.Building = arg.Building
      this.lines = arg.ListVisitors
    },
    editRow () {
      try {
        var listVist = {
          Building: this.Museum.Building,
          ListVisitors: this.lines
        }
        this.$firestore.VisitorL.doc(this.VisitorLog.id).update(listVist)
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
        this.$firestore.VisitorL.doc(this.VisitorLog.id).delete()
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
    }
  },

  mounted () {
    this.addLine()
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
