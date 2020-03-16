<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-6">
        <img src="statics/Untitled-1.svg" alt style="height:auto" />
      </div>

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
