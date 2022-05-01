<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showDepartmentForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          style="margin-left: 20px"
          @click="confirm()"
          color="red"
          label="Удалить"
        />
      </div>
    </div>
    <q-table
      class="table"
      :columns="columns"
      :data="departments"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="DepartmentID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/departments/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <department-form
      @update-departments-list="getDepartments"
    ></department-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import DepartmentForm from "src/components/Departments/CreateDepartmentForm.vue";

@Component({
  components: {
    DepartmentForm,
  },
})
export default class Departments extends Vue {
  departments: any | [] = [];
  selected: { DepartmentID: number }[] = [];

  columns = [
    {
      name: "DepartmentID",
      label: "DepartmentID",
      field: "DepartmentID",
      required: true,
      align: "left",
    },
    {
      name: "Name",
      label: "Name",
      field: "Name",
      required: true,
      align: "left",
    },
    {
      name: "NumberWorkers",
      label: "NumberWorkers",
      field: "NumberWorkers",
      required: true,
      align: "left",
    },
  ];

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить отдел?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/departments/${this.selected[0].DepartmentID}`
        );
        if (response) {
          this.getDepartments();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showDepartmentForm(value: boolean) {
    this.$bus.$emit("toggle-department-form", value);
  }

  async getDepartments() {
    const response = await axios.get("http://localhost:8080/api/departments/");
    this.departments = response.data;
  }

  // async deleteDepartment() {
  //   const response = await axios.delete(
  //     `http://localhost:8080/api/departments/${this.selected[0].DepartmentID}`
  //   );
  //   if (response) {
  //     this.getDepartments();
  //     this.selected = [];
  //   }
  // }

  mounted() {
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
