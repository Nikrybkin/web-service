<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showWorkerForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          @click="deleteWorker()"
          style="margin-left: 20px"
          color="red"
          label="Удалить"
        />
      </div>
    </div>
    <q-table
      class="table"
      :columns="columns"
      :data="getDepartmentName"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="WorkerID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/workers/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <worker-form
      :propDepartments="departments"
      @update-workers-list="getWorkers"
    ></worker-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import WorkerForm from "src/components/Workers/CreateWorkerForm.vue";

@Component({
  components: {
    WorkerForm,
  },
})
export default class Workers extends Vue {
  workers: any | [] = [];
  copyWorkers: any | [] = [];
  departments: any | [] = [];
  selected: { WorkerID: number }[] = [];

  columns = [
    {
      name: "WorkerID",
      label: "WorkerID",
      field: "WorkerID",
    },
    {
      name: "Surname",
      label: "Surname",
      field: "Surname",
    },
    {
      name: "Name",
      label: "Name",
      field: "Name",
    },
    {
      name: "Patronymic",
      label: "Patronymic",
      field: "Patronymic",
    },
    {
      name: "Position",
      label: "Position",
      field: "Position",
    },
    {
      name: "Experience",
      label: "Experience",
      field: "Experience",
    },
    {
      name: "DepartmentID",
      label: "Department",
      field: "DepartmentID",
    },
  ];

  showWorkerForm(value: boolean) {
    this.$bus.$emit("toggle-worker-form", value);
  }

  async getWorkers() {
    const response = await axios.get("http://localhost:8080/api/workers/");
    this.workers = response.data;
  }

  async getDepartments() {
    const response = await axios.get("http://localhost:8080/api/departments/");
    this.departments = response.data;
  }

  get getDepartmentName() {
    for (let d of this.departments) {
      for (let w of this.workers) {
        if (w.DepartmentID == d.DepartmentID) {
          w.DepartmentID = d.Name;
        }
      }
    }
    return this.workers;
  }

  async deleteWorker() {
    const response = await axios.delete(
      `http://localhost:8080/api/workers/${this.selected[0].WorkerID}`
    );
    if (response) {
      this.getWorkers();
      this.selected = [];
    }
  }

  mounted() {
    this.getWorkers();
    this.getDepartments();
  }

  getSelectedString() {
    return this.selected.length === 0
      ? "ничего не выбрано"
      : `${this.selected.length} record${this.selected.length > 1 ? "s" : ""}`;
  }
}
</script>

<style lang="scss">
.container {
  margin: 20px;
}

.table {
  height: auto;
  max-height: calc(100vh - 146px);
}

.btns {
  margin-bottom: 20px;
}

.td-curs {
  cursor: pointer;
}
</style>
