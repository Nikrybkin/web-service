<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о нормах расхода</div>
      <q-btn label="Назад" @click="$router.push('/consumptions')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateConsumptionRates">
        <q-select
          v-model="consumptionRatesChangeId.DepartmentID"
          :options="getDepartmentsName"
          class="input"
          filled
          label="Отдел"
          lazy-rules
        />
        <q-select
          v-model="consumptionRatesChangeId.ViewID"
          :options="getTypesExpenseName"
          class="input"
          filled
          label="Вид расхода"
          lazy-rules
        />
        <q-input
          v-model="consumptionRatesChangeId.Sum"
          class="input"
          filled
          label="Сумма"
          lazy-rules
          :rules="[(val) => val >= 0 || 'Введите число от 0']"
        />
        <q-input
          style="margin-top: -15px"
          class="input"
          filled
          v-model="consumptionRatesChangeId.Date"
          mask="####-##-##"
          label="Дата"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="consumptionRates.Date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-card-actions class="button-block">
          <q-btn
            :disabled="checkAddButtonDisabled"
            type="Submit"
            label="Создать"
            color="primary"
          />
        </q-card-actions>
      </form>
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class Consumption extends Vue {
  consumptionRates: any | [] = [];
  typesExpense: any | [] = [];
  departments: any | [] = [];
  isAddButtonDisabled: boolean = true;

  get checkAddButtonDisabled() {
    return !(
      this.consumptionRates.DepartmentID !== "" &&
      this.consumptionRates.ViewID !== "" &&
      this.consumptionRates.Date !== "" &&
      this.consumptionRates.Sum !== ""
    );
  }

  async getConsumptionRates() {
    const result = await axios.get(
      `http://localhost:8080/api/consumptionsRates/${this.$route.params.id}`
    );
    this.consumptionRates = result.data[0];
  }

  async getTypesExpense() {
    const response = await axios.get("http://localhost:8080/api/typesExpense/");
    this.typesExpense = response.data;
  }

  async getDepartments() {
    const response = await axios.get("http://localhost:8080/api/departments/");
    this.departments = response.data;
  }

  get getDepartmentsName() {
    let departmentsName = [];
    for (let item of this.departments) {
      departmentsName.push(item.Name);
    }
    return departmentsName;
  }

  get getTypesExpenseName() {
    let typesExpenseName = [];
    for (let item of this.typesExpense) {
      typesExpenseName.push(item.Name);
    }
    return typesExpenseName;
  }

  get consumptionRatesChangeId() {
    for (let d of this.departments) {
      if (this.consumptionRates.DepartmentID == d.DepartmentID) {
        this.consumptionRates.DepartmentID = d.Name;
      }
    }
    for (let d of this.typesExpense) {
      if (this.consumptionRates.ViewID == d.ViewID) {
        this.consumptionRates.ViewID = d.Name;
      }
    }
    return this.consumptionRates;
  }

  //   async getTypesExpense() {
  //     const response = await axios.get("http://localhost:8080/api/typesExpense/");
  //     this.typesExpense = response.data;
  //   }

  //   async getWorkers() {
  //     const response = await axios.get("http://localhost:8080/api/workers/");
  //     this.workers = response.data;
  //   }

  //   get getTypeExpenseName() {
  //     for (let t of this.typesExpense) {
  //       if (this.consumption.ViewID == t.ViewID) {
  //         this.consumption.ViewID = t.Name;
  //       }
  //     }
  //     return this.consumption;
  //   }

  //   get getWorkerName() {
  //     for (let t of this.workers) {
  //       if (this.getTypeExpenseName.WorkerID == t.WorkerID) {
  //         this.getTypeExpenseName.WorkerID = t.Name;
  //       }
  //     }
  //     return this.getTypeExpenseName;
  //   }

  //   get getWorkersName() {
  //     let workersName = [];
  //     for (let item of this.workers) {
  //       workersName.push(item.Name);
  //     }
  //     return workersName;
  //   }

  //   get getTypesExpenseName() {
  //     let typesExpenseName = [];
  //     for (let item of this.typesExpense) {
  //       typesExpenseName.push(item.Name);
  //     }
  //     return typesExpenseName;
  //   }

  async updateConsumptionRates() {
    for (let item of this.departments) {
      if (this.consumptionRates.DepartmentID === item.Name) {
        this.consumptionRates.DepartmentID = item.DepartmentID;
      }
    }
    for (let item of this.typesExpense) {
      if (this.consumptionRates.ViewID === item.Name) {
        this.consumptionRates.ViewID = item.ViewID;
      }
    }
    await axios.put(
      `http://localhost:8080/api/consumptionsRates/${this.$route.params.id}`,
      this.consumptionRates
    );
  }

  mounted() {
    this.getConsumptionRates();
    this.getTypesExpense();
    this.getDepartments();
  }
}
</script>

<style lang="scss">
.input {
  margin-bottom: 20px;
}

.button-block {
  padding: 0;
  justify-content: flex-end;
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
