<template>
  <q-layout>

    <q-page class="landing-page">

      <router-view />
    </q-page>

    <q-footer class="bg-white-8 text-white" style="text-align:center; font-size:10px">
      <q-toolbar>
        <q-toolbar-title style="font-size:14px">
          © Copyright 2020 National Museum of the Philippines. All Rights Reserved | Design and Develop By Cedric Liera
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>

.landing-page {
    background-image: url(../statics/2769722.svg);
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
