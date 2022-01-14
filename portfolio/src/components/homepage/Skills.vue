<template>
  <div class="fit row justify-around">
    <q-icon v-for="skill in topRowSkills" :key="skill.id" :name="skill.technique.mdiIcon"></q-icon>
  </div>
</template>

<script>
function checkUnderstanding(value){
    return value >= 7;
}
export default {
  props: {
    skills: Array,
  },
  computed: {
    topRowSkills: () => {
        console.log(this.skills.filter(checkUnderstanding))
        return this.skills.filter(checkUnderstanding)
    },
  },
};
</script>

<style>
</style>