<template>
  <div class="home">
    <div class="fit row wrap justify-center items-start content-start banner q-pt-xl">
      <about-me class="col-sm-5 q-mt-xl"/> 
    </div>
    <q-separator></q-separator>
    <div class="fit row justify-around q-mt-sm q-mb-md" >
      <project-card class="col-3" :project="project" v-for="project in projects" :key="project.id"/>
    </div>
    <q-separator></q-separator>
  </div>
</template>

<script>
import AboutMe from '@/components/homepage/AboutMe'
import ProjectCard from '@/components/homepage/ProjectCard'

export default {
  name: 'Home',
  components: {
    AboutMe,
    ProjectCard
  },
  data: () => ({
    projects: [],
    loading: true,
  }),
  created() {
    const config = {
      method: "get",
      url: "/project/Starred",
    };
    this.$axios(config)
      .then((result) => {
        console.log(result)
        this.projects = result.data
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  },
}
</script>

<style>
.banner{
  background-image: url('/img/banner2.jpg');
  background-size: 100%;
  height: 50vh !important;
} 

</style>
