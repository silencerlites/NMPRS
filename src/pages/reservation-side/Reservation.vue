<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;"
          >Reservation Calendar</span
        >
        <q-btn
          color="green"
          label="Go to the Reservation List"
          style="float:right;"
          to="/reservationSide/reservation/list"
        />
      </div>
    </div>

    <div class="col-xs-12 col-sm-12 col-md-12">
      <q-card class="my-card">
        <q-card-section>
          <FullCalendar />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import FullCalendar from 'components/FullCalendar'

export default {
  name: 'PageIndex',
  components: {
    FullCalendar
  },
  data () {
    return {}
  },
  methods: {
  },
  mounted () {
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
