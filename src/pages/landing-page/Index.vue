<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6">
        <img src="statics/Untitled-1.svg" alt style="height:auto" />
      </div>

      <div
        class="col-xs-12 col-sm-6 col-md-6 q-pl-xl q-pr-xl"
        style="font-size:20px;  padding-top:120px"
      >
        <h3 style="text-align:center">Reserve a tour</h3>Choose a Date
        <q-input outlined style="font-size:20px;" v-model="Reserve.start">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="Reserve.start"
                  @input="() => $refs.qDateProxy.hide()"
                  mask="YYYY-MM-DD"
                  :options="dateRuleOptions"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="q-pt-md" style="text-align:center; position:block;">
          <q-btn
            color="primary"
            label="Continue"
            style="width:200px; height:60px; font-size:20px;"
            @click="addReg = true"
          />
        </div>
      </div>
      <q-dialog  v-model="addReg" persistent transition-show="scale" transition-hide="scale">
        <template>
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      active-color="purple"
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
                    v-model="Reserve.Museum.Building"
                    :options="Building"
                    option-value="id"
                    option-label="NameBuilding"
                  />
                </div>
              Date
              <q-input outlined v-model="Reserve.start">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date
                        v-model="Reserve.start"
                        @input="() => $refs.qDateProxy.hide()"
                        mask="YYYY-MM-DD"
                        :options="dateRuleOptions"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <!-- checkbox -->
            <div class="col-12">
              <q-list>
                <!--
                Rendering a <label> tag (notice tag="label")
                so QCheckboxes will respond to clicks on QItems to
                change Toggle state.
                -->
                <!-- <q-option-group
                  :options="Building"
                  label="NameBuilding"
                  val="id"
                  type="checkbox"
                  v-model="Reserve.Museum.Building"
                /> -->
                <div class="col-12">
                  Time
                  <q-select
                    outlined
                    name="timeRS"
                    color="purple-12"
                    v-model="Reserve.Museum.Times"
                    :options="OperationHours"
                    option-value="id"
                    option-label="Hour"
                  />
                </div>

              <!-- Color
              <q-input outlined v-bind:value="Reserve.Museum.Building.Color"/>

              Start
              <q-input outlined :value="Reserve.Museum.dates + 'T' + Reserve.Museum.Times.Hour"/> -->
              </q-list>
              <!-- <div class="q-px-sm q-mt-sm" style="visibility: hidden;">
            Your selection is: <strong>{{ color }}</strong>
              </div>-->
            </div>
      </q-step>

      <q-step
        :name="2"
        title="Reservation Information"
        icon="create_new_folder"
        style="min-height: 100px"
        :done="step > 2"
      >
       <div class="col-12">
              School | Institution | Group
              <q-input outlined v-model="Reserve.title" />
            </div>
            <br>
            <b>Number of Visitors</b> <br>
            <b>Adult</b>
            <div class="row">
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.M" label="Male" />
             </div>
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.F" label="Female"/>
             </div>
             <div class="col-4">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.F" label="Non-binary"/>
             </div>
            </div>
            <b> Student</b>
             <br>
             Elementary
            <div class="row">
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.Elementary.M" label="Male" />
             </div>
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.Elementary.F" label="Female"/>
             </div>
              <div class="col-4">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.Elementary.F" label="Non-binary"/>
             </div>
            </div>
             High School
            <div class="row">
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.HighSchool.M" label="Male" />
             </div>
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.HighSchool.F" label="Female"/>
             </div>
              <div class="col-4">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.F" label="Non-binary"/>
             </div>
            </div>
             Senior High School
            <div class="row">
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.SeniorHighSchool.M" label="Male" />
             </div>
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.SeniorHighSchool.F" label="Female"/>
             </div>
             <div class="col-4">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.F" label="Non-binary"/>
             </div>
            </div>
             College
            <div class="row">
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.College.M" label="Male" />
             </div>
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Student.College.F" label="Female"/>
             </div>
             <div class="col-4">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.F" label="Non-binary"/>
             </div>
            </div>
            <b>Senior Citizen</b>
            <div class="row">
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.SeniorCitizen.M" label="Male" />
             </div>
             <div class="col-4 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.SeniorCitizen.F" label="Female"/>
             </div>
             <div class="col-4">
            <q-input outlined v-model="Reserve.NumberofVisitor.Adult.F" label="Non-binary"/>
             </div>
            </div>
            <b>Toddler</b>
            <div class="row">
             <div class="col-6 q-pr-md">
            <q-input outlined v-model="Reserve.NumberofVisitor.Toddler.M" label="Male" />
             </div>
             <div class="col-6">
            <q-input outlined v-model="Reserve.NumberofVisitor.Toddler.F" label="Female"/>
             </div>
            </div>

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
              <q-input outlined v-model="Reserve.ConUser.Name" />
            </div>
            <div class="col-6">
              Contact Number
              <q-input outlined v-model="Reserve.ConUser.ConNum" />
            </div>
            <div class="col-6">
              Email
              <q-input outlined v-model="Reserve.ConUser.Email" />
            </div>

      </q-step>

       <q-step
        :name="4"
        title="Billing"
        icon="add_comment"
        style="min-height: 100px"
      >
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-close-popup="step === 4" v-model="nextbtn" @click="$refs.stepper.next(), addReservation()" color="deep-orange" :label="step === 4 ? 'Reserve' : 'Continue'"/>
          <!-- <q-btn v-if="step === 4" v-close-popup flat color="red" label="Reservation" @click="addReservation()" /> -->
          <q-btn v-if="step > 1" flat color="deep-orange" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-stepper-navigation>
      </template>
    </q-stepper>

</template>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>

import { firestore } from 'boot/firebase'

export default {
  name: 'PageIndex',
  components: {

  },
  data () {
    return {
      addReg: false,
      step: 1,
      date: '',
      data: [

      ],
      Reserve: {
        title: null,
        start: '',
        color: null,
        Museum: {
          Building: [],
          Times: []
        },
        NumberofVisitor: {
          Adult: {
            M: null,
            F: null
          },
          Student: {
            Elementary: {
              M: null,
              F: null
            },
            HighSchool: {
              M: null,
              F: null
            },
            SeniorHighSchool: {
              M: null,
              F: null
            },
            College: {
              M: null,
              F: null
            }
          },
          SeniorCitizen: {
            M: null,
            F: null
          },
          Toddler: {
            M: null,
            F: null
          }
        },
        ConUser: {
          Name: null,
          ConNum: null,
          Email: null
        },
        StatusArrival: false
      }
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
    addReservation () {
      this.modalbtn = 'add'
      if (this.step === 4) {
        try {
          // this.$firestore.contactPerson.add(this.ConUser)
          this.$firestore.reservations.add(this.Reserve)
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
    dateRuleOptions (Reserve) {
      var today = new Date()
      // eslint-disable-next-line no-unused-vars
      var year = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()
      today = yyyy + '/' + mm + '/' + dd
      return Reserve > today && Reserve <= '3000/03/15'
    }
  }
}
</script>
