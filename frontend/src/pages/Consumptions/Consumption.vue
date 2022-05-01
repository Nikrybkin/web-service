<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о расходах</div>
      <q-btn label="Назад" @click="$router.push('/consumptions')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateConsumption">
        <q-select
          v-model="getWorkerName.ViewID"
          :options="getTypesExpenseName"
          class="input"
          filled
          label="Тип расхода"
          lazy-rules
          maxlength="40"
        />
        <q-select
          v-model="getWorkerName.WorkerID"
          :options="getWorkersName"
          class="input"
          filled
          label="Работник"
          lazy-rules
          maxlength="40"
        />
        <q-input
          class="input"
          filled
          v-model="getWorkerName.Date"
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
                <q-date v-model="getWorkerName.Date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="getWorkerName.Sum"
          class="input"
          filled
          clearable
          label="Стоимость"
          maxlength="40"
          lazy-rules
        />
        <q-card-actions class="button-block">
          <q-btn
            :disabled="checkAddButtonDisabled"
            type="Submit"
            label="Изменить"
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
  consumption: any | [] = [];
  typesExpense: any | [] = [];
  workers: any | [] = [];
  isAddButtonDisabled: boolean = true;

  get checkAddButtonDisabled() {
    return !(
      this.consumption.ViewID !== "" &&
      this.consumption.WorkerID !== "" &&
      this.consumption.Date !== "" &&
      this.consumption.Sum !== ""
    );
  }

  async getConsumption() {
    const result = await axios.get(
      `http://localhost:8080/api/consumptions/${this.$route.params.id}`
    );
    this.consumption = result.data[0];
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
    for (let t of this.typesExpense) {
      if (this.consumption.ViewID == t.ViewID) {
        this.consumption.ViewID = t.Name;
      }
    }
    return this.consumption;
  }

  get getWorkerName() {
    for (let t of this.workers) {
      if (this.getTypeExpenseName.WorkerID == t.WorkerID) {
        this.getTypeExpenseName.WorkerID = t.Name;
      }
    }
    return this.getTypeExpenseName;
  }

  get getWorkersName() {
    let workersName = [];
    for (let item of this.workers) {
      workersName.push(item.Name);
    }
    return workersName;
  }

  get getTypesExpenseName() {
    let typesExpenseName = [];
    for (let item of this.typesExpense) {
      typesExpenseName.push(item.Name);
    }
    return typesExpenseName;
  }

  async updateConsumption() {
    for (let item of this.workers) {
      if (this.consumption.WorkerID === item.Name) {
        this.consumption.WorkerID = item.WorkerID;
      }
    }
    for (let item of this.typesExpense) {
      if (this.consumption.ViewID === item.Name) {
        this.consumption.ViewID = item.ViewID;
      }
    }
    await axios.put(
      `http://localhost:8080/api/consumptions/${this.$route.params.id}`,
      this.consumption
    );
  }

  mounted() {
    this.getConsumption();
    this.getTypesExpense();
    this.getWorkers();
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
