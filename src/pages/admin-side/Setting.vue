<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Setting</span>
      </div>
    </div>
    <!-- MuseumModal -->
    <q-dialog v-model="addbuild" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Museum Building</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Name of Building
            <q-input outlined v-model="MuseumBuilding.NameBuilding" />
          </div>
          <!-- textbox -->
          <div class="col-6 q-pr-lg">
            Fees
            <q-input outlined v-model="MuseumBuilding.Fees" />
          </div>
          <div class="col-6">
            Limit Capacity
            <q-input outlined v-model="MuseumBuilding.LimitCapacity" />
          </div>
          <div class="col-12">
            Color Label
            <q-input outlined v-model="MuseumBuilding.Color" class="my-input">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="MuseumBuilding.Color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Building"
            @click="addbuilding()"
            v-if="MBmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRowBuild()"
            v-if="MBmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Operting Hours Modal -->

    <q-dialog v-model="addoperate" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Operating Hour</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Hour
            <q-input outlined v-model="OperatingTime.Hour" />
          </div>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Time"
            @click="addOperate()"
            v-if="OTmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRow"
            v-if="OTmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Museum Table -->
    <div class="row">
      <template>
        <div class="col-xs-12 col-sm-8 col-md-8 q-pb-sm q-pr-sm">
          <q-table
            title="Museum Building"
            :data="Building"
            :columns="mbColumns"
            row-key="NameBuilding"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="MBmodalbtn = 'add' , addbuild = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="NameBuilding">{{props.row.NameBuilding}}</q-td>
                <q-td :props="props" key="Fees">{{props.row.Fees}}</q-td>
                <q-td :props="props" key="limitCapacity">{{props.row.LimitCapacity}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalBuild(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="MBmodalbtn = 'deletes', delalertBuild(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <!-- Operating Table -->
        <div class="col-xs-12 col-sm-4 col-md-4 q-pb-sm q-pr-sm">
          <q-table
            title="Operating Time"
            :data="OperationHours"
            :columns="OTcolumns"
            row-key="Hour"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="OTmodalbtn = 'add' , addoperate = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="Hour">{{props.row.Hour}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    icon="edit"
                    @click=" OTmodalbtn = 'edit', editModalOperate(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="grey"
                    @click="MBmodalbtn = 'delete', delalertOperate(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>

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
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowBuild()"
              class="col-5"
              v-if="MBmodalbtn == 'deletes'"
            />

            <q-btn
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowOperate()"
              class="col-5"
              v-if="MBmodalbtn == 'delete'"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { firestore } from 'boot/firebase'
export default {
  name: 'PageIndex',
  components: {},
  data () {
    return {
      addoperate: false,
      delbtn: false,
      alertDelete: false,
      addbuild: false,
      MBmodalbtn: null,
      activeItem: null,
      mbColumns: [
        {
          name: 'NameBuilding',
          required: true,
          label: 'Name of Building',
          align: 'left',
          field: row => row.NameBuilding,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 200px',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Fees', label: 'Fees', field: 'Fees', align: 'center' },
        {
          name: 'limitCapacity',
          label: 'Limit Capacity',
          field: 'limitCapacity',
          align: 'center'
        },
        {
          name: 'Action',
          label: 'Action',
          field: 'Action',
          align: 'center'
        }
      ],
      OTcolumns: [
        {
          name: 'Hour',
          required: true,
          label: 'Hour',
          align: 'left',
          field: row => row.date,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 200px',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Action',
          label: 'Action',
          field: 'Action',
          align: 'center'
        }
      ],
      data: [{}],
      MuseumBuilding: {
        NameBuilding: null,
        Fees: null,
        LimitCapacity: null,
        Color: null
      },
      OperatingTime: {
        Hour: null,
        Status: null
      }
    }
  },
  firestore () {
    return {
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours')
    }
  },
  methods: {
    addbuilding () {
      this.MBmodalbtn = 'add'
      try {
        this.$firestore.Building.add(this.MuseumBuilding)
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
    editModalBuild (MuseumBuilding) {
      this.addbuild = true
      this.MuseumBuilding = MuseumBuilding
    },
    editRowBuild () {
      try {
        this.$firestore.Building.doc(this.MuseumBuilding.id).update(
          this.MuseumBuilding
        )
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
    },
    delalertBuild (MuseumBuilding) {
      this.alertDelete = true
      this.MuseumBuilding = MuseumBuilding
    },
    deleteRowBuild () {
      try {
        this.$firestore.Building.doc(this.MuseumBuilding.id).delete()
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
    },

    addOperate () {
      this.MBmodalbtn = 'add'
      try {
        this.$firestore.OperationHours.add(this.OperatingTime)
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
    editModalOperate (OperatingTime) {
      this.addoperate = true
      this.OperatingTime = OperatingTime
    },
    editRowOperate () {
      try {
        this.$firestore.OperationHours.doc(this.OperatingTime.id).update(
          this.OperatingTime
        )
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
    },
    delalertOperate (OperatingTime) {
      this.alertDelete = true
      this.OperatingTime = OperatingTime
    },
    deleteRowOperate () {
      try {
        this.$firestore.OperationHours.doc(this.OperatingTime.id).delete()
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
