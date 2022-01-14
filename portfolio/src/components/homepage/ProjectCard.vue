<template>
  <q-card class="card q-mt-sm" style="width: 400px">
    <q-card-section class="q-pa-none">
      <div class="text-h5 q-pa-sm">{{ project.name }}</div>
      <q-img height="175px" :src="project.previewImage"></q-img>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle1 text-grey text-center text-weight-medium">
        Beschrijving
      </div>
      <div v-html="project.description" style="height:150px"></div>
    </q-card-section>
    <q-separator ></q-separator>
    <q-card-section >
      <div class="text-subtitle1 text-grey text-center text-weight-medium">
        Gebruikte technieken
      </div>
      <div class="fit row no-wrap justify-around">
        <div v-for="technique in project.techniques" :key="technique.id">
          <q-icon
            class="col-xs-6"
            size="25px"
            :name="'mdi-' + technique.mdiIcon"
          >
            <q-tooltip>
              {{ technique.name }}
            </q-tooltip>
          </q-icon>
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="row justify-around">
      <q-btn class="col-3" color="primary">
        Leer meer
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    project: Object,
  },
};
</script>

<style>
.card {
  width: 500px;
}
</style>