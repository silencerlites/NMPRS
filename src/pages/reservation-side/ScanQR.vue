<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">QR Ticket Scanner</span>
      </div>
    </div>

      <q-card>
          <div>
            <qrcode-stream
              @init="onInit"
              v-if="!destroyed"
              :camera="camera"
              @decode="onDecode"
            >
              <div v-if="validationSuccess" class="validation-success">
                 Verified Successfully!
                 <br>

                    <div class="col-12" align="center">
                      <QrcodeVue
                        :value="result"
                        :size="size"
                        level="H"
                      ></QrcodeVue>
                      {{result}}
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

        <q-card-actions align="center">
          <q-btn label="Scan Again" color="green" @click="reload" />
        </q-card-actions>
      </q-card>

  </q-page>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { firestore } from 'boot/firebase'
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  name: 'PageIndex',
  components: { QrcodeVue, QrcodeStream },
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
      lines: []
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },

  firestore () {
    return {
      VisitorLogs: firestore.collection('VisitorsLog')
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
      this.$q.loading.show()
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(3000)
      this.isValid = content.startsWith('NMP')

      // some more delay, so users have time to read the message
      await this.timeout(2000)
      this.$q.loading.hide()
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
    this.lines = this.filteredReservationData
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
      return _.filter(this.filteredReservationDatas, function (Reser) {
        if (_.isNull(startDate)) {
          return true
        } else {
          return Reser.ListVisitors.generateQRs === startDate
        }
      })
    },
    filteredReservationDatas () {
      var _ = require('lodash')

      //  function (Reser) { return Reser.date })
      return _.toArray(_.mapValues(this.VisitorLogs, 'ListVisitors'))
    },
    filteredReservationDatass () {
      var _ = require('lodash')
      return _.map(this.VisitorLogs, v => v.generateUUID)
      //  function (Reser) { return Reser.date })
    },
    shownUUID: function () {
      var newGuid = this.GUID
      return newGuid
    }

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
