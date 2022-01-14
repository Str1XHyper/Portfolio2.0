<template>
  <div class="home">
    <div
      class="
        fit
        row
        wrap
        justify-center
        items-start
        content-start
        banner
        q-pt-xl
      "
    >
      <about-me class="col-sm-5 q-mt-xl" />
    </div>
    <q-separator></q-separator>
    <div class="text-center text-h4">Mijn projecten</div>
    <div class="fit row justify-around q-mt-sm q-mb-md">
      <project-card
        class="col-3"
        :project="project"
        v-for="project in projects"
        :key="project.id"
      />
    </div>
    <q-separator></q-separator>
    <div class="text-center text-h4">Mijn vaardigheden</div>
    <div class="fit row justify-around">
      <q-icon
        size="150px"
        v-for="skill in topRowSkills"
        :key="skill.id"
        :name="skill.technique.mdiIcon"
      >
        <q-tooltip>
          {{ skill.technique.name }}
        </q-tooltip></q-icon
      >
    </div>
  </div>
</template>

<script>
import AboutMe from "@/components/homepage/AboutMe";
import ProjectCard from "@/components/homepage/ProjectCard";

function checkUnderstanding(skill) {
  return skill.understanding >= 7;
}
export default {
  name: "Home",
  components: {
    AboutMe,
    ProjectCard,
  },
  data: () => ({
    projects: [],
    skills: [],
    loading: true,
  }),
  computed: {
    topRowSkills: function () {
      return this.skills.filter(checkUnderstanding);
    },
  },
  created() {
    const config = {
      method: "get",
      url: "/homepage",
    };
    this.$axios(config)
      .then((result) => {
        this.projects = result.data.projectList;
        this.skills = result.data.skillList;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
};
</script>

<style>
.banner {
  background-image: url("/img/banner2.jpg");
  background-size: 100%;
  height: 50vh !important;
}
</style>
