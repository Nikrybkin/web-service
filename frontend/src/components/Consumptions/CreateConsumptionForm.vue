<template>
  <q-dialog @before-hide="hide" v-if="consumption" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание отдела</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addConsumption">
          <q-select
            v-model="consumption.ViewID"
            :options="getTypesExpenseName"
            class="input"
            filled
            label="Тип расхода"
            lazy-rules
            maxlength="40"
          />
          <q-select
            v-model="consumption.WorkerID"
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
            v-model="consumption.Date"
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
                  <q-date v-model="consumption.Date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="consumption.Sum"
            class="input"
            filled
            clearable
            label="Стоимость"
            lazy-rules
          />
          <q-card-actions class="button-block">
            <q-btn type="Submit" label="Создать" color="primary" />
          </q-card-actions>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class CreateConsumptionForm extends Vue {
  @Prop({ type: Array, required: true }) propTypesExpense: any;
  @Prop({ type: Array, required: true }) propWorkers: any;
  value = false;
  isAddButtonDisabled: boolean = true;
  consumption:
    | {
        ViewID: number;
        WorkerID: number;
        Date: Date;
        Sum: number;
      }
    | any = null;

  get valid() {
    return true;
  }

  async show() {
    this.consumption = {
      ViewID: "",
      WorkerID: "",
      Date: "",
      Sum: "",
    };
    this.value = true;
  }

  async addConsumption() {
    for (let item of this.propWorkers) {
      if (this.consumption.WorkerID === item.Name) {
        this.consumption.WorkerID = item.WorkerID;
      }
    }
    for (let item of this.propTypesExpense) {
      if (this.consumption.ViewID === item.Name) {
        this.consumption.ViewID = item.ViewID;
      }
    }
    if (!this.consumption) return;
    const result = await axios.post(
      "http://localhost:8080/api/consumptions/",
      this.consumption
    );
    if (result) {
      this.$emit("update-consumptions-list");
    }
    this.value = false;
  }

  get getWorkersName() {
    let workersName = [];
    for (let item of this.propWorkers) {
      workersName.push(item.Name);
    }
    return workersName;
  }

  get getTypesExpenseName() {
    let typesExpenseName = [];
    for (let item of this.propTypesExpense) {
      typesExpenseName.push(item.Name);
    }
    return typesExpenseName;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-consumption-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-consumption-form", () => this.hide());
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
</style>
