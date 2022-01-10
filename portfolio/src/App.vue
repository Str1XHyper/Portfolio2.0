<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="header-back">
        <q-toolbar-title>
          Tijn van Veghel
        </q-toolbar-title>
        <q-spacer></q-spacer>
        <q-btn class="q-mx-xs">
          Home
        </q-btn>
        <q-btn class="q-mx-xs">
          Projects
        </q-btn>
        <q-btn class="q-mx-xs">
          Skills
        </q-btn>
        <q-btn class="q-mx-xs">
          Contact
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  name: 'LayoutDefault',

  components: {
  },

  setup () {
  const $q = useQuasar()
    $q.dark.set(true)
  }
}
</script>
