<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showConsumptionForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          @click="confirm()"
          style="margin-left: 20px"
          color="red"
          label="Удалить"
        />
      </div>
    </div>
    <q-table
      class="table"
      :columns="columns"
      :data="getWorkerName"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="ExpenseID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/consumptions/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <consumption-form
      @update-consumptions-list="getConsumptions"
      :propTypesExpense="typesExpense"
      :propWorkers="workers"
    ></consumption-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import ConsumptionForm from "src/components/Consumptions/CreateConsumptionForm.vue";

@Component({
  components: {
    ConsumptionForm,
  },
})
export default class Workers extends Vue {
  consumptions: any | [] = [];
  typesExpense: any | [] = [];
  workers: any | [] = [];
  selected: { ExpenseID: number }[] = [];

  columns = [
    {
      name: "ExpenseID",
      label: "ExpenseID",
      field: "ExpenseID",
      required: true,
      align: "left",
    },
    {
      name: "ViewID",
      label: "ViewID",
      field: "ViewID",
      required: true,
      align: "left",
    },
    {
      name: "WorkerID",
      label: "WorkerID",
      field: "WorkerID",
      required: true,
      align: "left",
    },
    {
      name: "Date",
      label: "Date",
      field: "Date",
      required: true,
      align: "left",
    },
    {
      name: "Sum",
      label: "Sum",
      field: "Sum",
      required: true,
      align: "left",
    },
  ];

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить информацию о расходах?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/consumptions/${this.selected[0].ExpenseID}`
        );
        if (response) {
          this.getConsumptions();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showConsumptionForm(value: boolean) {
    this.$bus.$emit("toggle-consumption-form", value);
  }

  async getConsumptions() {
    const response = await axios.get("http://localhost:8080/api/consumptions/");
    this.consumptions = response.data;
  }

  async getTypesExpense() {
    const response = await axios.get("http://localhost:8080/api/typesExpense/");
    this.typesExpense = response.data;
  }

  async getWorkers() {
    const response = await axios.get("http://localhost:8080/api/workers/");
    this.workers = response.data;
  }

  get getTypeExpenseName() {
    for (let c of this.consumptions) {
      for (let t of this.typesExpense) {
        if (c.ViewID == t.ViewID) {
          c.ViewID = t.Name;
        }
      }
    }
    return this.consumptions;
  }

  get getWorkerName() {
    for (let c of this.getTypeExpenseName) {
      for (let t of this.workers) {
        if (c.WorkerID == t.WorkerID) {
          c.WorkerID = t.Name;
        }
      }
    }
    return this.getTypeExpenseName;
  }

  mounted() {
    this.getConsumptions();
    this.getTypesExpense();
    this.getWorkers();
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
