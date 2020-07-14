<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="col-1 q-pb-md">
        <span style="font-size:25px; color:#5a5c69!important;">File Maintenance</span>
      </div>
    </div>
    <!-- File Maintenance Card -->
     <div class="q-pb-sm row items-start">
        <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
           <q-card class="my-card col-4">
              <q-card-section class="bg-primary text-white">
            <div class="text-h6">Museum Building</div>
          </q-card-section>

      <q-card-actions vertical>
        <q-btn flat @click="MBdialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>
        </div>
        <!-- Museum Building -->

         <q-dialog
      v-model="MBdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="col-12">
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
                    color="orange"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalBuild(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="MBmodalbtn = 'deletes', delalertBuild(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

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
    <!-- Operating Hours -->

        <div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
          <q-card class="my-card col-4">
            <q-card-section class="bg-primary text-white">
            <div class="text-h6">Operating Hours</div>
          </q-card-section>
      <q-card-actions vertical>
        <q-btn flat @click="OHdialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>
           </div>

      <q-dialog
      v-model="OHdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
           <div class="col-12">
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
                    color="orange"
                    icon="edit"
                    @click=" OTmodalbtn = 'edit', editModalOperate(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="MBmodalbtn = 'delete', delalertOperate(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

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
            @click="editRowOperate()"
            v-if="OTmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Gender -->

<div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
  <q-card class="my-card col-4">
     <q-card-section class="bg-primary text-white">
            <div class="text-h6">Gender</div>
          </q-card-section>
      <q-card-actions vertical>
        <q-btn flat @click="GNdialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>
</div>

<q-dialog
      v-model="GNdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
<div class="col-12">
          <q-table
            title="Gender"
            :data="Gender"
            :columns="Gencolumns"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="MBmodalbtn = 'add' , addgender = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="desc">{{props.row.label}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalGender(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="delalertGender(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addgender" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Gender</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Gender
            <q-input outlined v-model="genders" />
          </div>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Gender"
            @click="addGender()"
            v-if="MBmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRowGender()"
            v-if="MBmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Visitors Type -->

<div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
<q-card class="my-card col-4">
  <q-card-section class="bg-primary text-white">
            <div class="text-h6">Visitors Type</div>
          </q-card-section>

      <q-card-actions vertical>
        <q-btn flat @click="VTdialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>
</div>

<q-dialog
      v-model="VTdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
      <div class="col-12">
          <q-table
            title="Visitor's Type"
            :data="TypeVisitors"
            :columns="Gencolumns"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="MBmodalbtn = 'add' , addvisitType = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="desc">{{props.row.label}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalVisitType(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="MBmodalbtn = 'deletes', delalertVisitType(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addvisitType" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Visitor's Type</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Visitor Type
            <q-input outlined v-model="visitorType" />
          </div>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Visitor Type"
            @click="addVisitType()"
            v-if="MBmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRowVisitType()"
            v-if="MBmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Visitors Category -->

<div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
<q-card class="my-card col-4">
  <q-card-section class="bg-primary text-white">
            <div class="text-h6">Visitors Category</div>
          </q-card-section>
      <q-card-actions vertical>
        <q-btn flat @click="VCdialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>
</div>

<q-dialog
      v-model="VCdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
  <div class="col-12">
          <q-table
            title="Visitor's Category"
            :data="Categorys"
            :columns="Gencolumns"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="MBmodalbtn = 'add' , addvisitCat = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="desc">{{props.row.label}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalVisitCat(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="MBmodalbtn = 'deletes', delalertVisitCat(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addvisitCat" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Visitor's Category</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Visitor Type
            <q-input outlined v-model="visitorCateg" />
          </div>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Visitor Type"
            @click="addVisitCat()"
            v-if="MBmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRowVisitCat()"
            v-if="MBmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Visitor Sub Category -->

<div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
<q-card class="my-card col-4">
  <q-card-section class="bg-primary text-white">
            <div class="text-h6">Visitors Sub Category</div>
          </q-card-section>

      <q-card-actions vertical>
        <q-btn flat @click="VSCdialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>
</div>

<q-dialog
      v-model="VSCdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="col-12">
          <q-table
            title="Visitor's Sub Category"
            :data="SubCategorys"
            :columns="SCcolumns"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="MBmodalbtn = 'add' , addvisitSubCat = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="desc">{{props.row.CategoryRef}}</q-td>
                <q-td :props="props" key="SubCateg">{{props.row.label}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalVisitSubCat(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="delalertVisitSubCat(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addvisitSubCat" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Visitor's Sub Category</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Visitor Category
             <q-option-group
                      outlined
                      v-model="visitorCategSelect"
                      :options="Categorys"
                      inline
                    />
          </div>
          <div class="col-12">
            Visitor Sub Category
            <q-input outlined v-model="visitorSubCateg" />
          </div>

        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Visitor Sub Category"
            @click="addVisitSubCat()"
            v-if="MBmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRowVisitSubCat()"
            v-if="MBmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Rating -->

<div class="col-xs-12 col-sm-4 col-md-4 q-pr-sm q-pb-sm">
<q-card class="my-card col-4">
   <q-card-section class="bg-primary text-white">
            <div class="text-h6">Rating</div>
          </q-card-section>

      <q-card-actions vertical>
        <q-btn flat @click="Rdialog=true">Open</q-btn>
      </q-card-actions>
    </q-card>
</div>

<q-dialog
      v-model="Rdialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="col-12">
          <q-table
            title="Visitor's Sub Category"
            :data="Rating"
            :columns="Gencolumns"
          >
            <template v-slot:top-right>
              <q-btn
                color="green"
                label="ADD"
                style="float:right;"
                @click="MBmodalbtn = 'add' , addRate = true"
              />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td :props="props" key="desc">{{props.row.Questionnaire}}</q-td>
                <q-td auto-width key="action">
                  <q-btn
                    dense
                    round
                    flat
                    color="orange"
                    icon="edit"
                    @click=" MBmodalbtn = 'edit', editModalRatingQuestion(props.row)"
                  ></q-btn>

                  <q-btn
                    dense
                    round
                    flat
                    color="red"
                    @click="delalertRatingQuestion(props.row)"
                    icon="delete"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>

     <q-dialog v-model="addRate" persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card">
        <q-card class="col-12 text-white" style="background-color:#2ecc71;">
          <q-card-section>
            <div class="text-h6">Questioner</div>
          </q-card-section>
        </q-card>
        <div class="row q-pa-md" style="max-width: 500px">
          <div class="col-12">
            Question
            <q-input outlined v-model="question" />
          </div>
        </div>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Add Questioner"
            @click="addRatingQuestion()"
            v-if="MBmodalbtn == 'add'"
          />
          <q-btn
            v-close-popup
            flat
            color="primary"
            label="Save Changes"
            @click="editRowRatingQuestion()"
            v-if="MBmodalbtn == 'edit'"
          />
          <q-btn v-close-popup flat color="red" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
    <!-- Delete Diaglog -->

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

            <q-btn
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowGender()"
              class="col-5"
              v-if="MBmodalbtn == 'deletess'"
            />

             <q-btn
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowVisitType()"
              class="col-5"
              v-if="MBmodalbtn == 'deletesss'"
            />

             <q-btn
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowVisitCat()"
              class="col-5"
              v-if="MBmodalbtn == 'deletessss'"
            />
            <q-btn
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowVisitSubCat()"
              class="col-5"
              v-if="MBmodalbtn == 'deletesssss'"
            />

            <q-btn
              v-close-popup
              color="primary"
              label="Yes, delete it!"
              @click="deleteRowRatingQuestion()"
              class="col-5"
              v-if="MBmodalbtn == 'deletessssss'"
            />
            <q-btn v-close-popup color="red" label="Cancel" class="col-5" />
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
      Rdialog: false,
      VSCdialog: false,
      VCdialog: false,
      VTdialog: false,
      GNdialog: false,
      OHdialog: false,
      MBdialog: false,
      maximizedToggle: true,
      addgender: false,
      addoperate: false,
      addvisitType: false,
      delbtn: false,
      alertDelete: false,
      addRate: false,
      addvisitSubCat: false,
      addvisitCat: false,
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
      Gencolumns: [
        {
          name: 'desc',
          required: true,
          label: 'Description',
          align: 'left',
          field: row => row.desc,
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
      SCcolumns: [
        {
          name: 'desc',
          required: true,
          label: 'Category',
          align: 'left',
          field: row => row.desc,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 200px',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'SubCateg', label: 'Sub Category', field: 'SubCateg', align: 'center' },
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
      },
      genders: null,
      visitorCateg: null,
      visitorCategSelect: null,
      visitorType: null,
      question: null
    }
  },
  firestore () {
    return {
      Building: firestore.collection('MuseumBuilding'),
      OperationHours: firestore.collection('OperationHours'),
      Gender: firestore.collection('Gender'),
      TypeVisitors: firestore.collection('TypeVisitor'),
      Categorys: firestore.collection('Category'),
      SubCategorys: firestore.collection('SubCategory'),
      Rating: firestore.collection('RatingComment')
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
      this.MBmodalbtn = 'delete'
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
    },
    addGender () {
      this.MBmodalbtn = 'add'
      try {
        var Kasarian = {
          label: this.genders,
          value: this.genders
        }
        this.$firestore.Gender.add(Kasarian)
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
    editModalGender (Gen) {
      this.addgender = true
      this.Gen = Gen
      this.genders = Gen.value
      console.log(Gen)
    },
    editRowGender () {
      try {
        var Kasarians = {
          label: this.genders,
          value: this.genders
        }
        this.$firestore.Gender.doc(this.Gen.id).update(Kasarians)
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
    delalertGender (Gen) {
      this.alertDelete = true
      this.MBmodalbtn = 'deletess'
      this.Gen = Gen
    },
    deleteRowGender () {
      try {
        this.$firestore.Gender.doc(this.Gen.id).delete()
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
    addVisitType () {
      this.MBmodalbtn = 'add'
      try {
        var vType = {
          label: this.visitorType,
          value: this.visitorType
        }
        this.$firestore.TypeVisitors.add(vType)
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
    editModalVisitType (VisitType) {
      this.addvisitType = true
      this.VisitType = VisitType
      this.visitorType = VisitType.value
    },
    editRowVisitType () {
      try {
        var vType = {
          label: this.visitorType,
          value: this.visitorType
        }
        this.$firestore.TypeVisitors.doc(this.VisitType.id).update(
          vType
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
    delalertVisitType (VisitType) {
      this.alertDelete = true
      this.MBmodalbtn = 'deletesss'
      this.VisitType = VisitType
    },
    deleteRowVisitType () {
      try {
        this.$firestore.TypeVisitors.doc(this.VisitType.id).delete()
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
    addVisitCat () {
      this.MBmodalbtn = 'add'
      try {
        var vCat = {
          label: this.visitorCateg,
          value: this.visitorCateg
        }
        this.$firestore.Categorys.add(vCat)
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
    editModalVisitCat (VisitCat) {
      this.addvisitCat = true
      this.VisitCat = VisitCat
      this.visitorCateg = VisitCat.value
    },
    editRowVisitCat () {
      try {
        var vCat = {
          label: this.visitorCateg,
          value: this.visitorCateg
        }
        this.$firestore.Categorys.doc(this.VisitCat.id).update(
          vCat
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
    delalertVisitCat (VisitCat) {
      this.alertDelete = true
      this.MBmodalbtn = 'deletessss'
      this.VisitCat = VisitCat
    },
    deleteRowVisitCat () {
      try {
        this.$firestore.Categorys.doc(this.VisitCat.id).delete()
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
    addVisitSubCat () {
      this.MBmodalbtn = 'add'
      try {
        var vSubCat = {
          CategoryRef: this.visitorCategSelect,
          label: this.visitorSubCateg,
          value: this.visitorSubCateg
        }
        this.$firestore.SubCategorys.add(vSubCat)
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

    editModalVisitSubCat (VisitSubCat) {
      this.addvisitSubCat = true
      this.VisitSubCat = VisitSubCat
      this.visitorSubCateg = VisitSubCat.value
      this.visitorCategSelect = VisitSubCat.CategoryRef
    },

    editRowVisitSubCat () {
      try {
        var vCat = {
          CategoryRef: this.visitorCategSelect,
          label: this.visitorSubCateg,
          value: this.visitorSubCateg
        }
        this.$firestore.SubCategorys.doc(this.VisitSubCat.id).update(
          vCat
        )

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

    delalertVisitSubCat (VisitSubCat) {
      this.alertDelete = true
      this.MBmodalbtn = 'deletesssss'
      this.VisitSubCat = VisitSubCat
    },
    deleteRowVisitSubCat () {
      try {
        this.$firestore.SubCategorys.doc(this.VisitSubCat.id).delete()
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
    addRatingQuestion () {
      this.MBmodalbtn = 'add'
      try {
        var quest = {
          Questionnaire: this.question
        }
        this.$firestore.Rating.add(quest)
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
    editModalRatingQuestion (Rates) {
      this.addRate = true
      this.Rates = Rates
      this.question = Rates.Questionnaire
    },
    editRowRatingQuestion () {
      try {
        var quest = {
          Questionnaire: this.question
        }
        this.$firestore.Rating.doc(this.Rates.id).update(
          quest
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
    delalertRatingQuestion (Rates) {
      this.alertDelete = true
      this.MBmodalbtn = 'deletessssss'
      this.Rates = Rates
    },
    deleteRowRatingQuestion () {
      try {
        this.$firestore.Rating.doc(this.Rates.id).delete()
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
