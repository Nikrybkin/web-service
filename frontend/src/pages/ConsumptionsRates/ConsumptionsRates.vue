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
      :data="getDepartmentName"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="NormID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/consumptionsRates/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <consumption-rates-form
      @update-consumptions-rates-list="getConsumptionsRates"
      :propTypesExpense="typesExpense"
      :propDepartments="departments"
    ></consumption-rates-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import ConsumptionRatesForm from "src/components/ConsumptionsRates/CreateConsumptionRatesForm.vue";

@Component({
  components: {
    ConsumptionRatesForm,
  },
})
export default class ConsumptionsRates extends Vue {
  consumptionsRates: any | [] = [];
  typesExpense: any | [] = [];
  departments: any | [] = [];
  selected: { NormID: number }[] = [];

  columns = [
    {
      name: "NormID",
      label: "NormID",
      field: "NormID",
      required: true,
      align: "left",
    },
    {
      name: "DepartmentID",
      label: "DepartmentID",
      field: "DepartmentID",
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
      name: "Sum",
      label: "Sum",
      field: "Sum",
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
  ];

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить информацию о нормах расходов?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/consumptionsRates/${this.selected[0].NormID}`
        );
        if (response) {
          this.getConsumptionsRates();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showConsumptionForm(value: boolean) {
    this.$bus.$emit("toggle-consumption-rates-form", value);
  }

  async getConsumptionsRates() {
    const response = await axios.get(
      "http://localhost:8080/api/consumptionsRates/"
    );
    this.consumptionsRates = response.data;
  }

  async getTypesExpense() {
    const response = await axios.get("http://localhost:8080/api/typesExpense/");
    this.typesExpense = response.data;
  }

  async getDepartments() {
    const response = await axios.get("http://localhost:8080/api/departments/");
    this.departments = response.data;
  }

  get getTypeExpenseName() {
    for (let c of this.consumptionsRates) {
      for (let t of this.typesExpense) {
        if (c.ViewID == t.ViewID) {
          c.ViewID = t.Name;
        }
      }
    }
    return this.consumptionsRates;
  }

  get getDepartmentName() {
    for (let c of this.getTypeExpenseName) {
      for (let t of this.departments) {
        if (c.DepartmentID == t.DepartmentID) {
          c.DepartmentID = t.Name;
        }
      }
    }
    return this.getTypeExpenseName;
  }

  mounted() {
    this.getConsumptionsRates();
    this.getTypesExpense();
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
