<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-sm-5 col-md-5">
        <img src="statics/2319927.svg" alt style="height:auto" />
      </div>

     <div
        class="col-xs-12 col-sm-6 col-md-6 q-pl-xl q-pr-xl"
        style="font-size:20px;  padding-top:40px"
      >
        <div style="text-align:center; font-size:40px"> <b>Space Explore (AR)</b></div>
        <div >Space Explore made using Unity and Vuforia. Place a realistic solar system to see the motion of the planets and how they rotate along their orbits.
Space Explore is a fun way of Exploring, Discovering and Playing with the Solar System and Outer Space like the holograms in science fiction.
It is a virtual journey through space in our solar system, you will have the possibility to visualize with the new technology of Augmented Reality by each planet of our system and to learn of them like you never did before. Only with your phone or tablet. </div>
        <div class="q-pt-xl" style="text-align:center; position:block;">
          <q-btn
            color="primary"
            label="Get Access"
            style="width:200px; height:60px; font-size:20px;"
            @click="downloadPop = true"

          />
        </div>
      </div>

      <q-dialog v-model="downloadPop" class="q-pa-lg">
      <q-card style="max-width:800px;  height: 600px;" class="landing-page">

        <q-card-section class="q-pt-md">
          <div style="font-size:20px;">
          This mobile application will guide and help while exploring inside the gallery in different approach from traditional to modern usage of technology.
         <br> <br>
          This mobile application is free to download and recommended to use inside the National Planetarium of the Philippines.
          <br> <br>

          </div>

          <div style="font-size:20px;">
         <b>Space Explore Specification</b>
          <br>
          Platform:Android
          <br> <br>
          Version:1.0
          <br> <br>
          Devices:Smartphone, Tablet
          <br> <br>
          Android Version:4.4 to latest
          <br> <br>
          Download Size:250 mb
          <br>

          </div>

        </q-card-section>

        <q-card-actions align="center">
           <q-btn
            color="green"
            label="Download Now"
            style="width:200px; height:60px; font-size:20px;"
            type="a" href="https://docs.google.com/uc?export=download&id=1pCL7D7_a1E3ZIY-1CmNpiFYIeQGNYGfi" target="__blank"
          />

        </q-card-actions>
      </q-card>
    </q-dialog>

    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  components: {},
  data () {
    return {
      data: [],
      downloadPop: false,
      userAccount: {
        Name: {
          FirstName: null,
          LastName: null
        },
        ContactNumber: null
      },
      Email: '',
      Password: null
    }
  },

  methods: {
    // RegistrationUser () {
    //   var storage = firebaseApp.storage()
    //   var gsReference = storage.refFromURL('gs://nmp2020-21376.appspot.com/apps/SpaceExplorerv4.6.apk')

    //   gsReference.getDownloadURL('https://firebasestorage.googleapis.com/v0/b/nmp2020-21376.appspot.com/o/apps%2FSpaceExplorerv4.6.apk?alt=media&token=ace5c9d3-be6a-4207-a154-93b1b58ac1db').then(function (url) {
    //     // `url` is the download URL for 'images/stars.jpg
    //   }).catch(function (error) {
    //     console.log(error)
    //   })

    //   // Create a reference from a Google Cloud Storage URI
    //   var gsReference = storage.refFromURL('gs://nmp2020-21376.appspot.com/apps/SpaceExplorerv4.6.apk')

    //   gsReference.getDownloadURL().then(function (url) {
    //     // Insert url into an <img> tag to "download"
    //   }).catch(function (error) {
    //     console.log(error)
    //   })

    // Create a reference from an HTTPS URL
    // Note that in the URL, characters are URL escaped!
    // }
  }
}
</script>
