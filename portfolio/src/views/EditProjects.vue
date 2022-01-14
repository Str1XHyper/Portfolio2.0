<template>
  <div>
    <q-table title="Projects" :rows="projects" :columns="columns" row-key="name"
      ><template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="accent"
            icon-right="mdi-pencil"
            no-caps
            flat
            dense
            @click="openEditProject(props.row)"
          />
          <q-btn
            color="negative"
            icon-right="mdi-delete"
            no-caps
            flat
            dense
            disabled
          />
        </q-td>
      </template>
      <template v-slot:top>
        <q-space />
        <q-btn
          class="q-ml-md text-black"
          color="positive"
          @click="openAddProject"
          >Voeg toe</q-btn
        >
      </template>
    </q-table>

    <!-- Start Add Prompt -->
    <q-dialog v-model="addPrompt">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add project</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="selected.name" label="Name" />
          <q-input
            v-model="selected.description"
            label="Description"
            type="textarea"
            counter
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="text-primary" flat label="Cancel" v-close-popup />
          <q-btn
            class="text-positive"
            flat
            label="Add project"
            v-close-popup
            @click="AddProject"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Start Edit Prompt -->
    <q-dialog v-model="editPrompt">
      <q-card style="min-width: 1200px" class="container">
        <q-card-section>
          <div class="text-h6">Edit project</div>
        </q-card-section>
        <div class="fit row no-wrap justify-around">
          <q-card-section class="q-pt-none col-grow">
            <div class="text-subtitle1">Details</div>
            <q-input v-model="selected.name" label="Name" />
            <q-input
              v-model="selected.description"
              label="Description"
              type="textarea"
              counter
            />
          </q-card-section>

          <q-card-section class="q-pt-none col-2">
            <q-checkbox
              v-model="selected.visible"
              label="Is visible on all projects page"
            />
            <q-checkbox
              v-model="selected.starred"
              label="Favourite"
              :disable="!selected.visible"
            />
          </q-card-section>

          <q-card-section class="q-pt-none col-3">
            <q-file v-model="selected.bannerImage" label="Banner Image" flat>
              <template v-slot:prepend>
                <q-icon name="mdi-paperclip" />
              </template>
            </q-file>
            <q-file
              v-model="selected.previewImage"
              label="Preview Image"
              flat
              class="q-mt-xs"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-paperclip" />
              </template>
            </q-file>
          </q-card-section>
        </div>

        <div class="fit row no-wrap justify-around">
          <q-card-section class="q-pt-none col-3">
            <div class="text-subtitle1">Stakeholders</div>
            <div
              v-for="(stakeholder, index) in selected.stakeholders"
              :key="stakeholder"
            >
              <q-input
                outlined
                dense
                class="q-mt-xs"
                autofocus
                v-model="selected.stakeholders[index]"
              >
              </q-input>
            </div>

            <q-btn
              @click="addStakeholder"
              color="positive"
              class="q-mt-xs"
              flat
              icon-right="mdi-plus"
            ></q-btn
          ></q-card-section>
          <q-card-section class="q-pt-none col-3">
            <div class="text-subtitle1">Requirements</div>
            <div
              v-for="(requirement, index) in selected.requirements"
              :key="requirement"
            >
              <q-input
                outlined
                dense
                class="q-mt-xs"
                autofocus
                v-model="selected.requirements[index]"
              >
              </q-input>
            </div>

            <q-btn
              @click="addRequirement"
              color="positive"
              class="q-mt-xs"
              flat
              icon-right="mdi-plus"
            ></q-btn
          ></q-card-section>
        </div>
        <q-card-actions align="right">
          <q-btn class="text-primary" flat label="Cancel" v-close-popup />
          <q-btn
            class="text-positive"
            flat
            label="Save"
            v-close-popup
            @click="EditProject"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    columns: [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (project) => project.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "starred",
        required: true,
        label: "Starred",
        align: "left",
        field: (project) => project.starred,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "actions",
        align: "right",
        label: "Actions",
        field: "actions",
      },
    ],
    projects: [],
    selected: {},
    defaultProject: {
      description: "",
      name: "",
      techniqueIds: [],
      starred: false,
      visible: false,
      stakeholders: [],
      requirements: [],
      previewImage: "",
      bannerImage: "",
      id: "",
    },
    addPrompt: false,
    editPrompt: false,
  }),
  created() {
    const config = {
      method: "get",
      url: "/project",
    };
    this.$axios(config)
      .then((result) => {
        this.projects = result.data;
        this.loading = false;

        this.projects.forEach((project) => {
          project.previewImage = null;
          project.bannerImage = null;
        });
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
  },
  methods: {
    async toBase64(file) {
      if (
        typeof this.selected.bannerImage != typeof "" &&
        typeof this.selected.bannerImage != typeof undefined
      )
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
            console.log(reader.result);
          };
          reader.readAsDataURL(file);
        });
    },
    openAddProject() {
      this.selected = { ...this.defaultProject };
      this.addPrompt = true;
    },
    AddProject() {
      const config = {
        method: "post",
        url: "/project/Add",
        data: {
          name: this.selected.name,
          description: this.selected.description,
        },
      };
      this.$axios(config)
        .then((result) => {
          this.projects.push(result.data);
          this.loading = false;
        })
        .catch((error) => {
          this.error = true;
          console.log(error);
        });
    },
    openEditProject(project) {
      this.selected = project;
      this.editPrompt = true;
    },
    async EditProject() {
      console.log(this.selected);

      var data = {
        description: this.selected.description,
        id: this.selected.id,
        name: this.selected.name,
        requirements: this.selected.requirements,
        stakeholders: this.selected.stakeholders,
        visible: this.selected.visible,
        starred: this.selected.starred,
        techniqueIds: [1, 2, 3, 4],
        userID: "",
      };

      if (
        typeof this.selected.bannerImage != typeof "" &&
        this.selected.bannerImage != null
      ) {
        data.bannerImage = await this.toBase64(this.selected.bannerImage);
      }

      if (
        typeof this.selected.previewImage != typeof "" &&
        this.selected.previewImage != null
      ) {
        data.previewImage = await this.toBase64(this.selected.previewImage);
      }

      if (!this.selected.visible) {
        data.starred = false;
      }

      const config = {
        method: "put",
        url: "/project/Edit",
        data: data,
      };
      this.$axios(config)
        .then((result) => {
          this.loading = false;
          console.log(result);
        })
        .catch((error) => {
          this.error = true;
          console.log(error);
        });
    },
    addStakeholder() {
      this.selected.stakeholders.push("");
    },
    addRequirement() {
      this.selected.requirements.push("");
    },
  },
};
</script>

<style>
</style>