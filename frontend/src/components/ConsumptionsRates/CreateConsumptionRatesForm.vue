<template>
  <q-dialog @before-hide="hide" v-if="consumptionRates" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание норм расхода</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addConsumption">
          <q-select
            v-model="consumptionRates.DepartmentID"
            :options="getDepartmentsName"
            class="input"
            filled
            label="Тип расхода"
            lazy-rules
            maxlength="40"
          />
          <q-select
            v-model="consumptionRates.ViewID"
            :options="getTypesExpenseName"
            class="input"
            filled
            label="Тип расхода"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="consumptionRates.Sum"
            class="input"
            filled
            label="Работник"
            lazy-rules
            maxlength="40"
          />
          <q-input
            class="input"
            filled
            v-model="consumptionRates.Date"
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
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class CreateConsumptionRatesForm extends Vue {
  @Prop({ type: Array, required: true }) propTypesExpense: any;
  @Prop({ type: Array, required: true }) propDepartments: any;
  value = false;
  isAddButtonDisabled: boolean = true;
  consumptionRates:
    | {
        DepartmentID: number;
        ViewID: number;
        Date: Date;
        Sum: number;
      }
    | any = null;

  get valid() {
    return true;
  }

  async show() {
    this.consumptionRates = {
      DepartmentID: "",
      ViewID: "",
      Date: "",
      Sum: "",
    };
    this.value = true;
  }

  get checkAddButtonDisabled() {
    return !(
      this.consumptionRates.DepartmentID !== "" &&
      this.consumptionRates.ViewID !== "" &&
      this.consumptionRates.Date !== "" &&
      this.consumptionRates.Sum !== ""
    );
  }

  async addConsumption() {
    for (let item of this.propDepartments) {
      if (this.consumptionRates.DepartmentID === item.Name) {
        this.consumptionRates.DepartmentID = item.DepartmentID;
      }
    }
    for (let item of this.propTypesExpense) {
      if (this.consumptionRates.ViewID === item.Name) {
        this.consumptionRates.ViewID = item.ViewID;
      }
    }
    if (!this.consumptionRates) return;
    const result = await axios.post(
      "http://localhost:8080/api/consumptionsRates/",
      this.consumptionRates
    );
    if (result) {
      this.$emit("update-consumptions-rates-list");
    }
    this.value = false;
  }

  get getDepartmentsName() {
    let departmentsName = [];
    for (let item of this.propDepartments) {
      departmentsName.push(item.Name);
    }
    return departmentsName;
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
    this.$bus.$on("toggle-consumption-rates-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-consumption-rates-form", () => this.hide());
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
