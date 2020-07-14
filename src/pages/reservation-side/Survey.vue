<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;"
          >Rating and Comment</span>

        <q-btn
          color="green"
          label="ADD"
          style="float:right;"
          @click="modalbtn = 'add' , surveyModal = true"
        />

      </div>
      <!-- Add User -->
      <q-dialog
      v-model="surveyModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Survey Form</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 350px">
          <div class="col-12">
             Name
            <q-input outlined v-model="name" />
          </div>

          <div class="q-gutter-md col-9 q-pt-sm">
            <p><b>Questionier</b></p>
            <div v-for="(Question, index) in RatingComment" :key="index">{{ ++index + "." + " " + Question.Questionnaire }}
          <q-rating
            name="quality"
            v-model="Question.quality"
            max="5"
            size="3em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            no-dimming
          />
        </div>
        </div>
        <template>
  <div class="q-pt-md col-12">
    <p> <b> Comment and Suggestion</b></p>
    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
      ]"
    />
  </div>
  </template>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Rate"
            @click="addSurvey()"
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
          :pagination="pagination"
            :data="Rate"
            :columns="columns"
            row-key="id"
          >
           <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="Name">{{ props.row.Name }}</q-td>
                <q-td :props="props" key="Rating">{{ props.row.TotalRate }}</q-td>
                <q-td :props="props" key="Rating">{{ props.row.CommentSuggestion }}</q-td>
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
            <div class="text-h4 text-center" style="font-weight:bold">Are you Sure?</div>
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
      pagination: {
        sortBy: 'date',
        rowsPerPage: 12,
        descending: true // current rows per page being displayed
      },
      editor: '',
      RatingComment: [],
      quality: null,
      delbtn: false,
      alertDelete: false,
      surveyModal: false,
      modalbtn: null,
      activeItem: null,
      columns: [
        {
          name: 'Name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 400px',
          headerClasses: 'bg-primary text-white',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Rating',
          label: 'Rating',
          field: 'Rating',
          align: 'center'
        },
        {
          name: 'Comment',
          align: 'center',
          label: 'Comment and Suggestion',
          field: 'Comment',
          sortable: true,
          style: 'max-width: 10px'
        }
      ]
    }
  },
  firestore () {
    return {
      RatingComment: firestore.collection('RatingComment'),
      Rate: firestore.collection('Rate')
    }
  },
  methods: {
    addSurvey () {
      this.MBmodalbtn = 'add'
      try {
        var RateAns = {
          Rating: this.RatingComment,
          TotalRate: this.totalAmount / this.RatingComment.length,
          CommentSuggestion: this.editor,
          Name: this.name,
          Date: Date.now()
        }
        this.$firestore.Rate.add(RateAns)
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
    editModal (Reserve) {
      this.addReg = true
      this.Reserve = Reserve
    },
    editRow () {
      try {
        this.$firestore.reservations.doc(this.Reserve.id).update(this.Reserve)
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
    delalert (Rating) {
      this.alertDelete = true
      this.Rating = Rating
    },
    deleteRow () {
      try {
        this.$firestore.Rate.doc(this.Rating.id).delete()
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
  computed: {
    totalAmount: function () {
      var sum = 0
      this.RatingComment.forEach(e => {
        sum += e.quality
      })
      return sum
    }

  }
}
</script>
