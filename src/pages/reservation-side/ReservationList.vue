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
                    option-value="NameBuilding"
                    option-label="NameBuilding"
                  />
                </div>
                <div class="row">
                  <div class="col-6 q-pr-md">
                    Date
                    <q-input outlined v-model="date" placeholder="YYYY-MM-DD">
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
                  <div class="col-3 q-pr-md">
                    Start Time
                    <q-list>
                      <q-select
                        outlined
                        name="timeRS"
                        color="purple-12"
                        v-model="Museum.Times"
                        :options="OperationHours"
                        option-value="id"
                        option-label="Hour"
                      />
                    </q-list>
                  </div>
                  <div class="col-3">
                    End Time
                    <q-list>
                      <q-select
                        outlined
                        name="timeRS"
                        color="purple-12"
                        v-model="Museum.ETimes"
                        :options="OperationHours"
                        option-value="id"
                        option-label="Hour"
                      />
                    </q-list>
                  </div>
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 2;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
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
                <q-btn
                  @click="
                    () => {
                      step = 3;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
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
                     <!-- <br />
                    <div class="col-12" align="center">
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
              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 4;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
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
                <q-input
                  outlined
                  v-model="ConUser.ConNum"
                  mask="(+63) #### - ######"
                  unmasked-value
                />
              </div>
              <div class="col-6">
                Email
                <q-input outlined v-model="ConUser.Email" />
              </div>

              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 5;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
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
                      <br />
                      <div style="text-align:right">
                        <img src="statics/app-logo-80x.svg" style="width:50px;" class="q-mr-lg" />
                        <span
                          style="font-size:30px; color:#6B1510;"
                        >National Museum of the Philippines</span>
                      </div>
                      <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                      <br />
                      <div class="row">
                        <div class="col-8">
                          Name:
                          <br />
                          <b class="text-h5">{{ this.ConUser.Name }}</b>
                        </div>
                        <div class="col-4" style="float-right">
                          <q-icon name="phone_android" size="1.3rem" />
                          {{ this.ConUser.ConNum }}
                          <br />
                          <q-icon name="mail" size="1.3rem" />
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
                          <b class="text-h7">
                            {{
                            this.Museum.Building.NameBuilding
                            }}
                          </b>
                        </div>
                        <div class="col-4">
                          Date: {{ this.date | timeformatDate }}
                          <br />
                          Time:
                          {{
                          (this.date + "T" + this.Museum.Times.Hour)
                          | timeformatTime
                          }}
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
                          <b class="text-h7">{{ this.lines.length }}</b>
                        </div>
                      </div>
                      <q-separator class="q-mb-sm q-mt-sm" />
                      <b style="color:#6B1510">Billing Details</b>
                      <q-separator class="q-mb-sm q-mt-sm" />
                      <div class="row q-mt-xs">
                        <div class="col-8">
                          Building Fee:
                          <br />
                          <b class="text-h7">&#x20B1; {{ this.Museum.Building.Fees }}</b>
                        </div>
                        <div class="col-4">
                          Total Amount :
                          <br />
                          <b class="text-h6" style="color:#d35400">
                            &#x20B1;
                            {{
                            this.lines.length * this.Museum.Building.Fees
                            }}
                          </b>
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
                            <q-splitter v-model="splitterModel" style="height: auto">
                              <template v-slot:before>
                                <q-tabs v-model="method" vertical class="text-teal">
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
                                    <span>
                                      Please settle a payment through our
                                      cashier
                                    </span>
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
                  v-if="method == 'Card'"
                  @click="placeOrderButtonPressed"
                  :disabled="!complete"
                  color="green"
                  label="Pay Now"
                  v-close-popup
                />
                <q-btn
                  v-if="method == 'Cash'"
                  @click="addReservationCash"
                  color="primary"
                  label="Reserve"
                  v-close-popup
                />
                <q-btn
                  v-if="this.lines.length * this.Museum.Building.Fees == 0"
                  @click="addReservationNoPayment"
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
      <!-- Reschedule -->
      <q-dialog
        v-model="editReg"
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
                    option-value="NameBuilding"
                    option-label="NameBuilding"
                    disable
                  />
                </div>
                <div class="row">
                  <div class="col-6 q-pr-md">
                    Date
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
                  <div class="col-3 q-pr-md">
                    Start Time
                    <q-list>
                      <q-select
                        outlined
                        name="timeRS"
                        color="purple-12"
                        v-model="Museum.Times"
                        :options="OperationHours"
                        option-value="id"
                        option-label="Hour"
                      />
                    </q-list>
                  </div>
                  <div class="col-3">
                    End Time
                    <q-list>
                      <q-select
                        outlined
                        name="timeRS"
                        color="purple-12"
                        v-model="Museum.ETimes"
                        :options="OperationHours"
                        option-value="id"
                        option-label="Hour"
                      />
                    </q-list>
                  </div>
                </div>
              </div>

              <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 2;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
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
                <q-btn
                  @click="
                    () => {
                      step = 3;
                    }
                  "
                  color="primary"
                  label="Continue"
                />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Contact Information"
              icon="add_comment"
              style="min-height: 100px"
              :done="step > 3"
            >
              <div class="col-12">
                Name
                <q-input outlined v-model="ConUser.Name" />
              </div>
              <div class="col-6">
                Contact Number
                <q-input
                  outlined
                  v-model="ConUser.ConNum"
                  mask="(+63) #### - ######"
                  unmasked-value
                />
              </div>
              <div class="col-6">
                Email
                <q-input outlined v-model="ConUser.Email" />
              </div>

              <q-stepper-navigation>
                <q-btn @click="editRow" color="orange" label="Reschedule" v-close-popup />
                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                <q-btn v-close-popup flat color="red" label="Cancel" />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </template>
      </q-dialog>
    </div>

    <div class="row">
      <q-dialog v-model="alertCancel">
        <q-card>
          <q-card-section>
            <img
              src="statics/undraw_stranded_traveler_pdbw.svg"
              alt
              style="height:250px"
              class="q-pa-lg"
            />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h4 text-center" style="font-weight:bold">Are you Sure?</div>
            <div class="text-h9 text-center">You won't be able to revert this!</div>
          </q-card-section>

          <q-card-actions align="center" class="q-pa-md q-pb-lg">
            <q-btn
              v-model="delbtn"
              v-close-popup
              color="primary"
              label="Yes, Cancel it!"
              @click="cancelReserve()"
              class="col-5"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="alertArrived">
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
              v-model="delbtn"
              v-close-popup
              color="primary"
              label="Yes, They Arrived!"
              @click="arrivedDone()"
              class="col-5"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- table -->
      <template>
        <div class="col-xs-12 col-sm-12 col-md-12">
          <q-table
            title="Reservation Details"
            :data="reservations"
            :columns="columns"
            :pagination="pagination"
            row-key="id"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="(modalbtn = 'add'), (addReg = true), (step = 1), (addLine())"
                v-on:click.prevent="createNewUUID()"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="date">{{ props.row.date }}</q-td>
                <q-td :props="props" key="time">{{ props.row.time }}</q-td>
                <q-td :props="props" key="building">{{ props.row.Building.NameBuilding }}</q-td>
                <q-td :props="props" key="school">{{ props.row.title }}</q-td>
                <q-td :props="props" key="pax">
                  <q-btn
                    dense
                    flat
                    color="grey"
                    label="View the List"
                    align="right"
                    @click="viewListVisitor(props.row)"
                  ></q-btn>|
                  <q-badge color="blue">{{ props.row.NumberofVisitor }}</q-badge>
                </q-td>
                <q-td :props="props" key="bill">
                  <q-btn
                    dense
                    flat
                    color="orange"
                    label="View the Billing"
                    @click="viewListBilling(props.row)"
                  ></q-btn>
                </q-td>
                <q-td :props="props" key="ticket">
                  <q-btn
                    dense
                    flat
                    color="grey"
                    label="View the QR Ticket"
                    @click="viewQRTicket(props.row)"
                  ></q-btn>
                </q-td>
                <q-td :props="props" key="status">
                  <q-badge
                    color="red"
                    v-if="props.row.StatusArrival == 'Cancel'"
                  >{{ props.row.StatusArrival}}</q-badge>
                  <q-badge
                    color="orange"
                    v-if="props.row.StatusArrival == 'Pending'"
                  >{{ props.row.StatusArrival}}</q-badge>
                  <q-badge
                    color="green"
                    v-if="props.row.StatusArrival == 'Arrived'"
                  >{{ props.row.StatusArrival}}</q-badge>
                </q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click="(modalbtn = 'edit'), editModal(props.row)"
                    v-if="props.row.StatusArrival == 'Pending'"
                  >
                    <q-tooltip content-class="bg-primary">Edit / Reschedule</q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="green"
                    @click="arralert(props.row)"
                    icon="flight_takeoff"
                    v-if="props.row.StatusArrival == 'Pending'"
                  >
                    <q-tooltip content-class="bg-primary">Arrived</q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="canalert(props.row)"
                    icon="cancel_schedule_send"
                    v-if="props.row.StatusArrival == 'Pending'"
                  >
                    <q-tooltip content-class="bg-primary">Cancel Reservation</q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
    </div>
    <q-dialog v-model="viewList">
      <q-card flat bordered class="my-card bg-grey-1" style="width:1500px; max-width:1500px">
        <div id="vBill">
          <q-card-section>
            <div style="text-align:center;">
              <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
              <br />
              <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
            </div>
            <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />

            <q-card-section>
              <div class="row">
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

            <div v-for="(line, index) in lines" :key="index" class="row q-pb-md">
              <div class="col">{{ ++index + "." + " " + line.FirstN + " " + line.LastN }}</div>
              <div class="col">{{ line.Gender }}</div>
              <div class="col">{{ line.VisitorType }}</div>
              <div class="col">{{ line.Type }}</div>
              <div class="col">{{ line.SubType }}</div>
            </div>
          </q-card-section>
          <q-separator />
        </div>

        <q-card-actions>
          <q-btn flat v-close-popup>OK</q-btn>
          <q-btn flat @click="print">Print</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      :maximized="maximizedToggle"
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
                >&#x20B1; {{ this.lines.length * this.Museum.Building.Fees }}</b>
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

    <!-- Ticket QR -->

    <q-dialog v-model="printqr">
      <q-card style="max-width: 1000px;">
        <div id="vBill">
           <q-card-section align="center" class="text-h4">Printable QR Ticket</q-card-section>
         <q-card-section class="row q-pt-none" >

          <div v-for="(line, index) in liness" :key="index" class="row q-pb-md  q-mr-md q-mt-md" style="border: 1px solid black; padding: 10px; border-style: dashed;">
            <div>
              <div class="col" style="text-align:center;">
              <img
                src="statics/app-logo-80x.svg"
                style="width:80px;"
                class="q-mr-lg"
              />
              <br />
              <span style="font-size:20px;">NMP - {{ Museum.Building }}</span>
              <br />
            </div>
            <div class="col" align="center">
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

          </div>
        </q-card-section>

        </div>

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
import firebase from 'firebase'
import { firestore } from 'boot/firebase'
import { Card, createToken } from 'vue-stripe-elements-plus'
import moment from 'moment'
import { QrcodeStream } from 'vue-qrcode-reader'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'PageIndex',
  // eslint-disable-next-line vue/no-unused-components
  components: { Card, QrcodeVue, QrcodeStream },
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
      SubCategory: {
        value: '',
        label: '',
        CategoryRef: 'Student'
      },
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
      liness: [],
      FirstN: null,
      LastN: null,
      Destination: null,
      Gender: null,
      Type: null,
      timestamp: '',
      Category: null,
      delbtn: false,
      alertArrived: false,
      alertCancel: false,
      alertDelete: false,
      addReg: false,
      editReg: false,
      modalbtn: null,
      activeItem: null,
      step: 1,
      viewvi: [],
      pagination: {
        sortBy: 'date',
        rowsPerPage: 12,
        descending: true // current rows per page being displayed
      },
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
        {
          name: 'pax',
          label: 'Numbers of Visitors',
          field: 'pax',
          align: 'left'
        },
        { name: 'bill', label: 'Billing', field: 'bill', align: 'center' },
        { name: 'ticket', label: 'QR Tickets', field: 'ticket', align: 'center' },
        { name: 'status', label: 'Status of Arrival', field: 'status', align: 'center' },
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
      OperationHours: firestore
        .collection('OperationHours')
        .orderBy('Hour', 'asc'),
      Payment: firestore.collection('Payment'),
      Billing: firestore.collection('Billing'),
      Report: firestore.collection('Report')
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
        .then(docRef => {})
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
    print () {
      // Pass the element id here
      this.$htmlToPaper('vBill')
    },
    // stripe Billing
    placeOrderButtonPressed () {
      this.$q.loading.show()
      createToken().then(result => {
        if (result.error) {
          this.stripeValidationError = result.error.message
        } else {
          var stripeObject = {
            date: moment().format('L'),
            amount: this.lines.length * this.Museum.Building.Fees,
            type: 'Card',
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
        Status: 'Pending',
        DateofRecord: moment(this.date).format('L')
      }
      var Reserve = {
        title: this.title,
        date: moment(this.date).format('L'),
        time: this.Museum.Times.Hour + ' - ' + this.Museum.ETimes.Hour,
        color: this.Museum.Building.Color,
        start: this.date + 'T' + this.Museum.Times.Hour,
        end: this.date + 'T' + this.Museum.ETimes.Hour,
        NumberofVisitor: this.lines.length,
        Building: this.Museum.Building,
        Contact: this.ConUser,
        StatusArrival: 'Pending'
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
          this.$q.loading.hide()
          this.$q.notify({
            color: 'green-4',
            message: `Payment Successfully`,
            icon: 'credit_card',
            timeout: 2000
          })
        }

        this.$firestore.reservations.doc(pushId).set(Reserve)

        this.$firestore.Report.doc(pushId).set(Rep)
        this.$firestore.VisitorL.doc(pushId).set({
          ListVisitors: this.lines,
          Building: this.Museum.Building.NameBuilding,
          date: this.date + 'T' + this.Museum.Times.Hour,
          visitorType: 'reservation'
        })
        this.$firestore.Billing.doc(pushId)
          .set({
            Contact: this.ConUser,
            Building: this.Museum.Building,
            Amount: this.lines.length * this.Museum.Building.Fees,
            PaymentMethod: 'Credit/Debit Card',
            DatePayment: Date.now(),
            NumberofVisitor: this.lines.length,
            DateofReserve: this.date + 'T' + this.Museum.Times.Hour,
            NameofGroup: this.title,
            Status: 'Paid'
          })

          .this.$q.notify({
            color: 'green-4',
            message: `Reservation Successfully Done`,
            icon: 'cloud_done',
            timeout: 900
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

    viewListVisitor (arg) {
      this.viewList = true
      this.idVisit = arg.id
      var docRef = this.$firestore.VisitorL.doc(arg.id)

      docRef
        .get()
        .then(doc => {
          console.log('Cached document data:', doc.data())
          this.lines = doc.data().ListVisitors
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })

      console.log()
    },
    viewListBilling (arg) {
      this.viewBill = true
      this.idVisit = arg.id
      var docRef = this.$firestore.Billing.doc(arg.id)
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
          console.log('Cached document data:', doc.data())
          this.receipt = doc.data().receipt_url
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })
    },

    viewQRTicket (arg) {
      this.printqr = true
      this.idVisit = arg.id
      var docRef = this.$firestore.VisitorL.doc(arg.id)
      var docRefs = this.$firestore.reservations.doc(arg.id)

      docRef
        .get()
        .then(doc => {
          console.log('Cached document data:', doc.data())
          this.liness = doc.data().ListVisitors
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })

      docRefs
        .get()
        .then(doc => {
          console.log('Cached document data:', doc.data())
          this.Museum.Building = doc.data().Building.NameBuilding
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })

      console.log()
    },
    addLine () {
      // let checkEmptyLines = this.lines.filter(line => line.FirstN === null)
      // if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
      //   return
      // }
      this.lines.push({
        generateQRs: this.GUID + this.lines.length,
        status: false
      })
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
          date: moment(this.date).format('L'),
          time: this.Museum.Times.Hour + ' - ' + this.Museum.ETimes.Hour,
          color: this.Museum.Building.Color,
          start: this.date + 'T' + this.Museum.Times.Hour,
          end: this.date + 'T' + this.Museum.ETimes.Hour,
          NumberofVisitor: this.lines.length,
          Building: this.Museum.Building,
          Contact: this.ConUser,
          StatusArrival: 'Pending'
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
          Status: 'Pending',
          DateofRecord: moment(this.date).format('L')
        }
        this.$firestore.reservations
          .add(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(docRef.id).set({
              ListVisitors: this.lines,
              Building: this.Museum.Building.NameBuilding,
              date: this.date + 'T' + this.Museum.Times.Hour,
              visitorType: 'reservation'
            })
            this.$firestore.Billing.doc(docRef.id).set({
              Contact: this.ConUser,
              Building: this.Museum.Building,
              Amount: this.lines.length * this.Museum.Building.Fees,
              PaymentMethod: 'Cash',
              DatePayment: '',
              NumberofVisitor: this.lines.length,
              DateofReserve: this.date + 'T' + this.Museum.Times.Hour,
              NameofGroup: this.title,
              Status: 'Unpaid'
            })
            this.$firestore.Report.doc(docRef.id).set(Rep)
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
          Status: 'Pending',
          DateofRecord: moment(this.date).format('L')
        }
        var Reserve = {
          title: this.title,
          date: moment(this.date).format('L'),
          time: this.Museum.Times.Hour + ' - ' + this.Museum.ETimes.Hour,
          color: this.Museum.Building.Color,
          start: this.date + 'T' + this.Museum.Times.Hour,
          end: this.date + 'T' + this.Museum.ETimes.Hour,
          NumberofVisitor: this.lines.length,
          Building: this.Museum.Building,
          Contact: this.ConUser,
          StatusArrival: 'Pending'
        }
        this.$firestore.reservations
          .add(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(docRef.id).set({
              ListVisitors: this.lines,
              Building: this.Museum.Building.NameBuilding,
              date: this.date + 'T' + this.Museum.Times.Hour,
              visitorType: 'reservation'
            })
            this.$firestore.Billing.doc(docRef.id).set({
              Contact: this.ConUser,
              Building: this.Museum.Building,
              Amount: this.lines.length * this.Museum.Building.Fees,
              PaymentMethod: '',
              NumberofVisitor: this.lines.length,
              DateofReserve: this.date + 'T' + this.Museum.Times.Hour,
              DatePayment: Date.now(),
              NameofGroup: this.title,
              Status: 'Paid'
            })
            this.$firestore.Report.doc(docRef.id).set(Rep)
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
      this.editReg = true
      this.Reserve = Reserve
      this.Museum.Building = Reserve.Building
      this.title = Reserve.title
      this.ConUser = Reserve.Contact
    },
    editRow () {
      try {
        var Reserve = {
          title: this.title,
          date: moment(this.date).format('L'),
          time: this.Museum.Times.Hour + ' - ' + this.Museum.ETimes.Hour,
          color: this.Museum.Building.Color,
          start: this.date + 'T' + this.Museum.Times.Hour,
          end: this.date + 'T' + this.Museum.ETimes.Hour,
          Building: this.Museum.Building,
          Contact: this.ConUser,
          StatusArrival: 'Pending'
        }
        this.$firestore.reservations.doc(this.Reserve.id).update(Reserve)

        this.$firestore.Billing.doc(this.Reserve.id)
          .update({
            Contact: this.ConUser,
            DateofReserve: this.date + 'T' + this.Museum.Times.Hour,
            NameofGroup: this.title
          })

          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
        // do something
        this.$q.notify({
          color: 'green-4',
          message: `Udated Succefully`,
          icon: 'done',
          timeout: 900
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
    canalert (Reserve) {
      this.alertCancel = true
      this.Reserve = Reserve
    },
    arralert (Arrived) {
      this.alertArrived = true
      this.Arrived = Arrived
    },
    cancelReserve () {
      try {
        var Reserve = {
          StatusArrival: 'Cancel'
        }
        var Arrival = {
          arrivalStatus: 'Cancel'
        }
        var Refund = {
          Status: 'Refunded'
        }
        var Rep = {
          Status: 'Cancel'
        }
        this.$firestore.reservations
          .doc(this.Reserve.id)
          .update(Reserve)
          .then(docRef => {
            this.$firestore.Billing.doc(this.Reserve.id).update(Refund)
            this.$firestore.VisitorL.doc(this.Reserve.id).update(Arrival)
            this.$firestore.Report.doc(this.Reserve.id).update(Rep)
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
        // do something
        this.$q.notify({
          color: 'green-4',
          message: `Cancel Reservation Successfully. Note: if you have card payment it takes 5-10 days for refund`,
          icon: 'done',
          timeout: 9000
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
    arrivedDone () {
      try {
        var Reserve = {
          StatusArrival: 'Arrived'
        }
        var Arrival = {
          arrivalStatus: 'Arrived'
        }
        var Rep = {
          Status: 'Arrived'
        }
        this.$firestore.reservations
          .doc(this.Arrived.id)
          .update(Reserve)
          .then(docRef => {
            this.$firestore.VisitorL.doc(this.Arrived.id).update(Arrival)
            this.$firestore.Report.doc(this.Arrived.id).update(Rep)
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
        // do something
        this.$q.notify({
          color: 'green-4',
          message: `Arrived Successfully`,
          icon: 'done',
          timeout: 900
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
            this.$firestore.Billing.doc(this.Reserve.id).delete()
            this.$firestore.Payment.doc(this.Reserve.id).delete()
            this.$firestore.Report.doc(this.Reserve.id).delete()
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
        this.$q.notify({
          color: 'green-4',
          message: `Deleted Successfully`,
          icon: 'delete',
          timeout: 900
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
.link {
  color: black;
  padding: 0.5em 1em;
  text-decoration: none;
  text-transform: uppercase;
}

.link:hover {
  background-color: #555;
}

.link:active {
  background-color: black;
}
</style>
