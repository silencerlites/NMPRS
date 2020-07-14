<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">Report</span>
      </div>
    </div>
    <div class="row">
      <!-- Reservation Report -->
      <div class="col-4 q-pr-sm">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Reservation Report</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="col-12" @click="datadateget = true">Open</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <q-dialog v-model="datadateget" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 500px">
          <q-card q-card flat bordered class="my-card">
            <q-card-section>
              <span class="text-h6">Date of Reservation</span>
              <div class="row">
                <div class="col-6 q-pr-md">
                  Starting Date
                  <q-input outlined v-model="startDate" placeholder="MM/DD/YYYY">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="startDate"
                            @input="() => $refs.qDateProxy.hide()"
                            mask="MM/DD/YYYY"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-6 q-pr-md">
                  Ending Date
                  <q-input outlined v-model="endDate" placeholder="MM/DD/YYYY">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="endDate"
                            @input="() => $refs.qDateProxy.hide()"
                            mask="MM/DD/YYYY"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" @click="RRdialog = true" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="RRdialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="text-black">
          <q-bar>
            <q-space />

            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip v-if="maximizedToggle" content-class="bg-primary text-white">Minimize</q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip v-if="!maximizedToggle" content-class="bg-primary text-white">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-primary text-white">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="col-1 q-pb-md">
              <span style="font-size:25px; color:#5a5c69!important;">Reservation Report</span>
              <q-btn color="green" label="Print" style="float:right;" @click="printVS" />
            </div>
            <q-card class="my-card" flat bordered id="rVS">
              <q-card-section>
                <q-card-section>
                  <div style="text-align:center;">
                    <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
                    <br />
                    <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
                    <br />
                    <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                    <span style="font-size:20px;">Reservation Report</span>
                  </div>

                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                  <div style="font-size:12px" align="left">
                    <b>
                      Cover Period: {{ this.startDate | timeformatDate }} -
                      {{ this.endDate | timeformatDate }}
                    </b>
                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />
                  <div class="row" align="center">
                    <div class="col-2" style="font-size:10px" align="left">
                      <b>Date</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Time</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Building</b>
                    </div>
                    <div class="col-3" style="font-size:11px">
                      <b>Name of School | Institution | Group</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Contact Person</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Contact Number</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Email</b>
                    </div>
                    <div class="col" style="font-size:10px" align="right">
                      <b>Status of Arrival</b>
                    </div>
                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />
                  <div
                    v-for="(Reserve, index) in filteredReservationData"
                    :key="index"
                    class="row q-pb-md"
                    align="center"
                  >
                    <div class="col-2" align="left">{{ Reserve.date | timeformatDate }}</div>

                    <div class="col" align="center">{{ Reserve.time }}</div>

                    <div class="col">{{ Reserve.Building.NameBuilding }}</div>

                    <div class="col-3">{{ Reserve.title }}</div>

                    <div class="col">{{ Reserve.Contact.Name }}</div>

                    <div class="col">{{ Reserve.Contact.ConNum }}</div>

                    <div class="col">{{ Reserve.Contact.Email }}</div>

                    <div class="col" align="right">{{ Reserve.StatusArrival }}</div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>

            <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm"></div>

            <div class="col-12"></div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Visitors Summary Report  -->
      <div class="col-4 q-pr-sm">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Visitors Summary Report</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="col-12" @click="VSdialog = true">Open</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <q-dialog
        v-model="VSdialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="text-black">
          <q-bar>
            <q-space />

            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip v-if="maximizedToggle" content-class="bg-primary text-white">Minimize</q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip v-if="!maximizedToggle" content-class="bg-primary text-white">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-primary text-white">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="col-1 q-pb-md">
              <span style="font-size:25px; color:#5a5c69!important;">Visitor Summary Report</span>
              <q-btn color="green" label="Print" style="float:right;" @click="printVS" />
              <!-- <q-btn color="primary" label="Daily" style="float:right;"  class="q-ml-sm"/>
              <q-btn color="primary" label="Weekly" style="float:right;"  class="q-ml-sm"/>
              <q-btn color="primary" label="Monthly" style="float:right;"  class="q-ml-sm"/>
              <q-btn color="primary" label="Yearly" style="float:right;" class="q-ml-sm"/>-->
            </div>

            <q-card class="my-card" flat bordered id="rVS">
              <q-card-section>
                <q-card-section>
                  <div style="text-align:center;">
                    <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
                    <br />
                    <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
                    <br />
                    <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                    <span style="font-size:20px;">Summary of Visitors Report</span>
                  </div>

                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                  <br />
                  <div class="row" align="center">
                    <div class="col" style="font-size:12px" align="left">
                      <b>Building</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Elementary</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>High School</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Senior High School</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>College</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Local Tourist</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Foreign Tourist</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Adult</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Senior Citizen</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Toddler</b>
                    </div>
                    <div class="col" style="font-size:12px">
                      <b>Total No. of Visitor</b>
                    </div>
                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />

                  <div class="row" align="center">
                    <div class="col" style="font-size:10px" align="left">Fine Arts</div>
                    <div class="col">{{ totalFAElem }}</div>
                    <div class="col">{{ totalFAH }}</div>
                    <div class="col">{{ totalFAHS }}</div>
                    <div class="col">{{ totalFAC }}</div>
                    <div class="col">{{ totalFAL }}</div>
                    <div class="col">{{ totalFAF }}</div>
                    <div class="col">{{ totalFAA }}</div>
                    <div class="col">{{ totalFASenior }}</div>
                    <div class="col">{{ totalFATod }}</div>
                    <div class="col">{{ totalFAL + totalFAF }}</div>
                  </div>

                  <div class="row" align="center">
                    <div class="col" style="font-size:10px" align="left">NaturalHistory</div>
                    <div class="col">{{ totalNHElem }}</div>
                    <div class="col">{{ totalNHH }}</div>
                    <div class="col">{{ totalNHHS }}</div>
                    <div class="col">{{ totalNHC }}</div>
                    <div class="col">{{ totalNHL }}</div>
                    <div class="col">{{ totalNHF }}</div>
                    <div class="col">{{ totalNHA }}</div>
                    <div class="col">{{ totalNHSenior }}</div>
                    <div class="col">{{ totalNHTod }}</div>
                    <div class="col">{{ totalNHL + totalNHF }}</div>
                  </div>

                  <div class="row" align="center">
                    <div class="col" style="font-size:10px" align="left">Anthropology</div>
                    <div class="col">{{ totalAElem }}</div>
                    <div class="col">{{ totalAH }}</div>
                    <div class="col">{{ totalAHS }}</div>
                    <div class="col">{{ totalAC }}</div>
                    <div class="col">{{ totalAL }}</div>
                    <div class="col">{{ totalAF }}</div>
                    <div class="col">{{ totalAA }}</div>
                    <div class="col">{{ totalASenior }}</div>
                    <div class="col">{{ totalATod }}</div>
                    <div class="col">{{ totalAL + totalAF }}</div>
                  </div>

                  <div class="row" align="center">
                    <div class="col" style="font-size:10px" align="left">Planetarium</div>
                    <div class="col">{{ totalPElem }}</div>
                    <div class="col">{{ totalPH }}</div>
                    <div class="col">{{ totalPHS }}</div>
                    <div class="col">{{ totalPC }}</div>
                    <div class="col">{{ totalPL }}</div>
                    <div class="col">{{ totalPF }}</div>
                    <div class="col">{{ totalPA }}</div>
                    <div class="col">{{ totalPSenior }}</div>
                    <div class="col">{{ totalPTod }}</div>
                    <div class="col">{{ totalPL + totalPF }}</div>
                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />

                  <div class="row" align="center">
                    <div class="col" align="left">
                      <b>TOTAL</b>
                    </div>
                    <b class="col">
                      {{
                      totalFAElem + totalNHElem + totalAElem + totalPElem
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAH + totalNHH + totalAH + totalPH
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAHS + totalNHHS + totalAHS + totalPHS
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAC + totalNHC + totalAC + totalPC
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAL + totalNHL + totalAL + totalPL
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAF + totalNHF + totalAF + totalPF
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAA + totalNHA + totalAA + totalPA
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFASenior +
                      totalNHSenior +
                      totalASenior +
                      totalPSenior
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFATod + totalNHTod + totalATod + totalPTod
                      }}
                    </b>
                    <b class="col">
                      {{
                      totalFAL +
                      totalFAF +
                      totalNHL +
                      totalNHF +
                      totalAL +
                      totalAF +
                      totalPL +
                      totalPF
                      }}
                    </b>
                  </div>
                  <br />
                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                  <span style="font-size:20px;">Overall Visitors Data</span>
                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                  <br />
                  <div class="row">
                    <div class="col-4" align="left">
                      <b>Building</b>
                    </div>
                    <div class="col-4" align="center">
                      <b>Vistors No.</b>
                    </div>
                    <div class="col-4" align="right">
                      <b>Date</b>
                    </div>
                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />
                  <div v-for="(line, index) in Report" :key="index" class="row q-pb-md">
                    <div class="col" style="font-size:9px">{{ line.Building }}</div>
                    <div class="col-9" align="center">
                      <div class="row">
                        <div class="col" style="font-size:8px">Local Visitors</div>
                        <div class="col" style="font-size:8px">Foreign Visitors</div>
                        <div class="col" style="font-size:8px">Toddler</div>
                        <div class="col" style="font-size:8px">Students</div>
                        <div class="col" style="font-size:8px">Adult</div>
                        <div class="col" style="font-size:8px">Senior Citizen</div>
                        <div class="col" style="font-size:8px">Male</div>
                        <div class="col" style="font-size:8px">Female</div>
                        <div class="col" style="font-size:8px">Non-Binary</div>
                      </div>
                      <div class="row">
                        <div class="col" style="font-size:10px">{{ line.Locals }}</div>
                        <div class="col" style="font-size:10px">{{ line.Foreign }}</div>
                        <div class="col" style="font-size:10px">{{ line.Toddler }}</div>
                        <div class="col" style="font-size:10px">{{ line.Student }}</div>
                        <div class="col" style="font-size:10px">{{ line.Adult }}</div>
                        <div class="col" style="font-size:10px">{{ line.Senior }}</div>
                        <div class="col" style="font-size:10px">{{ line.Male }}</div>
                        <div class="col" style="font-size:10px">{{ line.Female }}</div>
                        <div class="col" style="font-size:10px">{{ line.NonBinary }}</div>
                      </div>
                    </div>
                    <div
                      class="col"
                      align="right"
                      style="font-size:9px"
                    >{{ line.DateofRecord | timeformatDate }}</div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>

            <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm"></div>

            <div class="col-12"></div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- Sale Report -->
      <div class="col-4 q-pr-sm">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Sales Report</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="col-12" @click="datadategets = true">Open</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <q-dialog v-model="datadategets" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 500px">
          <q-card q-card flat bordered class="my-card">
            <q-card-section>
              <span class="text-h6">Date of Payment</span>
              <div class="row">
                <div class="col-6 q-pr-md">
                  Starting Date
                  <q-input outlined v-model="startDate" placeholder="MM/DD/YYYY">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="startDate"
                            @input="() => $refs.qDateProxy.hide()"
                            mask="MM/DD/YYYY"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-6 q-pr-md">
                  Ending Date
                  <q-input outlined v-model="endDate" placeholder="MM/DD/YYYY">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="endDate"
                            @input="() => $refs.qDateProxy.hide()"
                            mask="MM/DD/YYYY"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" @click="SRdialog = true" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="SRdialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="text-black">
          <q-bar>
            <q-space />

            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip v-if="maximizedToggle" content-class="bg-primary text-white">Minimize</q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip v-if="!maximizedToggle" content-class="bg-primary text-white">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-primary text-white">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="col-1 q-pb-md">
              <span style="font-size:25px; color:#5a5c69!important;">Sales Report</span>
              <q-btn color="green" label="Print" style="float:right;" @click="printVS" />
            </div>
            <q-card class="my-card" flat bordered id="rVS">
              <q-card-section>
                <q-card-section>
                  <div style="text-align:center;">
                    <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
                    <br />
                    <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
                    <br />
                    <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                    <span style="font-size:20px;">Sales Reservation Report</span>
                  </div>

                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                  <div style="font-size:12px" align="left">
                    <b>
                      Cover Period: {{ this.startDate | timeformatDate }} -
                      {{ this.endDate | timeformatDate }}
                    </b>
                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />
                  <div class="row" align="center">
                    <div class="col-3" style="font-size:10px" align="left">
                      <b>Transaction No.</b>
                    </div>
                    <div class="col-2" style="font-size:10px" align="left">
                      <b>Date of Payment</b>
                    </div>
                     <div class="col" style="font-size:11px">
                      <b>Amount</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Type</b>
                    </div>
                    <div class="col-2" style="font-size:11px">
                      <b>O.R No.</b>
                    </div>
                    <div class="col" style="font-size:11px" align="right">
                      <b>Brand (Card)</b>
                    </div>
                    <div class="col" style="font-size:11px">
                    </div>

                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />
                  <div
                    v-for="(Sales, index) in filteredSaleData"
                    :key="index"
                    class="row q-pb-md"
                    align="center"
                  >
                       <div class="col-3" align="left">{{ Sales.id }}</div>
                      <div class="col-2" align="left">{{ Sales.date | timeformatDate }}</div>
                      <div class="col" align="center">{{ Sales.amount }}</div>
                      <div class="col" align="center">{{ Sales.type }}</div>
                     <div class="col-2" align="center">{{ Sales.ORno }}</div>
                    <div class="col" v-for="Saless in Sales.payment_method_details" :key="Saless" align="right" style="text-transform: capitalize;"> {{ Saless.brand }} </div>
                  </div>

                  <q-separator class="q-mt-sm q-mb-sm" />
                  <div class="row q-pb-sm">
                    <b class="col-10" style="font-size:15px">Grand Total:</b>
                    <b class="col-2" style="float:right; font-size:15px">&#8369; {{totalSamount}}</b>
                  </div>
                  <q-separator class=" q-mb-sm" />

                </q-card-section>
              </q-card-section>
            </q-card>

            <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm"></div>

            <div class="col-12"></div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Rating Summary Report -->
      <div class="col-4 q-pr-sm q-pt-sm">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Rating Summary Report</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="center">
            <q-btn flat class="col-12" @click="RCRdialog = true">Open</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <q-dialog
        v-model="RCRdialog"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="text-black">
          <q-bar>
            <q-space />

            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip v-if="maximizedToggle" content-class="bg-primary text-white">Minimize</q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip v-if="!maximizedToggle" content-class="bg-primary text-white">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-primary text-white">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="col-1 q-pb-md">
              <span style="font-size:25px; color:#5a5c69!important;">Rating Summary Report</span>
              <q-btn color="green" label="Print" style="float:right;" @click="printVS" />
            </div>
            <q-card class="my-card" flat bordered id="rVS">
              <q-card-section>
                <q-card-section>
                  <div style="text-align:center;">
                    <img src="statics/app-logo-80x.svg" style="width:100px;" class="q-mr-lg" />
                    <br />
                    <span style="font-size:30px; color:#6B1510;">National Museum of the Philippines</span>
                    <br />
                    <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                    <span style="font-size:20px;">Sales Reservation Report</span>
                  </div>

                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs " />
                  <div class="row q-pb-sm q-pt-sm">
                    <b class="col-3" style="font-size:15px">Summary Rating:</b>
                    <b class="col-9" style=" font-size:15px" align="right"> {{ totalRate }}</b>
                  </div>
                  <q-separator class=" q-mb-sm" />
                  <div class="row q-pb-sm">
                    <b class="col-3" style="font-size:15px">Total Rating:</b>
                    <b class="col-9" style=" font-size:15px" align="right"> {{ totalRate / Ratings.length }}</b>
                  </div>
                  <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />

                    <div style="font-size:15px;" align="center">Rating Data</div>
           <q-separator style="background:#6B1510" class="q-mb-xs q-mt-xs" />
                  <div class="row q-pt-sm" align="center">
                    <div class="col-3" style="font-size:10px" align="left">
                      <b>Date</b>
                    </div>
                    <div class="col-2" style="font-size:10px" align="left">
                      <b>Name</b>
                    </div>
                     <div class="col" style="font-size:11px">
                      <b>Rating</b>
                    </div>
                    <div class="col" style="font-size:10px">
                      <b>Total Rate</b>
                    </div>
                    <div class="col" style="font-size:11px" align="right">
                      <b>Comment & Suggestion</b>
                    </div>

                  </div>
                  <q-separator class="q-mb-sm q-mt-sm" />

                  <div
                    v-for="(Rates, index) in Ratings"
                    :key="index"
                    class="row q-pb-md"
                    align="center"
                  >
                       <div class="col-3" align="left">{{ Rates.Date | timeformatDate}}</div>
                       <div class="col-2" align="left">{{ Rates.Name }}</div>
                       <div class="row"  v-for="Ratess in Rates.Rating" :key="Ratess" align="center">
                         <div class="col-1" align="center">
                           {{  "Question" + " " + ++index + "." + " " + Ratess.quality }}
                         </div>

                         </div>

                         <div class="col" align="center">{{ Rates.TotalRate }}</div>
                         <div class="col" align="right">{{ Rates.CommentSuggestion }}</div>

                  </div>

                </q-card-section>
              </q-card-section>
            </q-card>

            <div class="col-xs-12 col-sm-12 col-md-12 q-pb-sm q-pr-sm"></div>

            <div class="col-12"></div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { firestore } from 'boot/firebase'

export default {
  name: 'PageIndex',
  data () {
    return {
      startDate: null,
      endDate: null,
      pagination: {
        sortBy: 'Date',
        rowsPerPage: 0,
        descending: true // current rows per page being displayed
      },
      RCRdialog: false,
      SRdialog: false,
      VSdialog: false,
      RRdialog: false,
      datadategets: false,
      datadateget: false,
      maximizedToggle: true,
      columns: [
        {
          name: 'Building',
          label: 'Building',
          align: 'left',
          field: row => row.Building,
          format: val => `${val}`
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
          style: 'max-width: 100px'
        }
      ]
    }
  },

  firestore () {
    return {
      VisitorL: firestore
        .collection('VisitorsLog')
        .where('arrivalStatus', '==', 'Arrived'),
      Ratings: firestore.collection('Rate').orderBy('Date', 'desc'),
      Reservations: firestore.collection('Reservation').orderBy('date', 'asc'),
      Payments: firestore.collection('Payment').orderBy('date', 'desc'),
      Report: firestore
        .collection('Report')
        .where('Status', '==', 'Arrived')
        .orderBy('DateofRecord', 'desc'),
      ReportFA: firestore
        .collection('Report')
        .where('Status', '==', 'Arrived')
        .where('Building', '==', 'Fine Arts'),
      ReportNH: firestore
        .collection('Report')
        .where('Status', '==', 'Arrived')
        .where('Building', '==', 'Natural History'),
      ReportA: firestore
        .collection('Report')
        .where('Status', '==', 'Arrived')
        .where('Building', '==', 'Anthropology'),
      ReportP: firestore
        .collection('Report')
        .where('Status', '==', 'Arrived')
        .where('Building', '==', 'Planetarium'),
      Billing: firestore.collection('Billing')
    }
  },

  methods: {
    printVS () {
      // Pass the element id here
      this.$htmlToPaper('rVS')
    }
  },

  computed: {
    // Fine Art
    totalFAElem: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.Elementary
      })
      return sum
    },
    totalFAH: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.HighSchool
      })
      return sum
    },
    totalFAHS: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.SeniorHighSchool
      })
      return sum
    },
    totalFAC: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.College
      })
      return sum
    },
    totalFAL: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.Locals
      })
      return sum
    },
    totalFAF: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.Foreign
      })
      return sum
    },
    totalFAA: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.Adult
      })
      return sum
    },
    totalFASenior: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.Senior
      })
      return sum
    },
    totalFATod: function () {
      var sum = 0
      this.ReportFA.forEach(e => {
        sum += e.Toddler
      })
      return sum
    },
    // Natural History
    totalNHElem: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.Elementary
      })
      return sum
    },
    totalNHH: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.HighSchool
      })
      return sum
    },
    totalNHHS: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.SeniorHighSchool
      })
      return sum
    },
    totalNHC: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.College
      })
      return sum
    },
    totalNHL: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.Locals
      })
      return sum
    },
    totalNHF: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.Foreign
      })
      return sum
    },
    totalNHA: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.Adult
      })
      return sum
    },
    totalNHSenior: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.Senior
      })
      return sum
    },
    totalNHTod: function () {
      var sum = 0
      this.ReportNH.forEach(e => {
        sum += e.Toddler
      })
      return sum
    },

    // Anthropology

    totalAElem: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.Elementary
      })
      return sum
    },
    totalAH: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.HighSchool
      })
      return sum
    },
    totalAHS: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.SeniorHighSchool
      })
      return sum
    },
    totalAC: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.College
      })
      return sum
    },
    totalAL: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.Locals
      })
      return sum
    },
    totalAF: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.Foreign
      })
      return sum
    },
    totalAA: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.Adult
      })
      return sum
    },
    totalASenior: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.Senior
      })
      return sum
    },
    totalATod: function () {
      var sum = 0
      this.ReportA.forEach(e => {
        sum += e.Toddler
      })
      return sum
    },

    // Planetarium

    totalPElem: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.Elementary
      })
      return sum
    },
    totalPH: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.HighSchool
      })
      return sum
    },
    totalPHS: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.SeniorHighSchool
      })
      return sum
    },
    totalPC: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.College
      })
      return sum
    },
    totalPL: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.Locals
      })
      return sum
    },
    totalPF: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.Foreign
      })
      return sum
    },
    totalPA: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.Adult
      })
      return sum
    },
    totalPSenior: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.Senior
      })
      return sum
    },
    totalPTod: function () {
      var sum = 0
      this.ReportP.forEach(e => {
        sum += e.Toddler
      })
      return sum
    },
    // Reservation Filter
    filteredReservationData () {
      var _ = require('lodash')
      var startDate = this.startDate
      var endDate = this.endDate
      //  function (Reser) { return Reser.date })
      return _.filter(this.Reservations, function (Reser) {
        if (_.isNull(startDate) && _.isNull(endDate)) {
          return true
        } else {
          return Reser.date >= startDate && Reser.date <= endDate
        }
      })
    },
    // Sales Filter
    filteredSaleData () {
      var _ = require('lodash')
      var startDate = this.startDate
      var endDate = this.endDate
      //  function (Reser) { return Reser.date })
      return _.filter(this.Payments, function (Sales) {
        if (_.isNull(startDate) && _.isNull(endDate)) {
          return true
        } else {
          return Sales.date >= startDate && Sales.date <= endDate
        }
      })
    },
    totalSamount: function () {
      var sum = 0
      this.filteredSaleData.forEach(e => {
        sum += JSON.parse(e.amount)
      })
      return sum
    },
    // Rating
    totalRate: function () {
      var sum = 0
      this.Ratings.forEach(e => {
        sum += e.TotalRate
      })
      return sum
    }

  }
}
</script>
