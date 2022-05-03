<template>
  <q-dialog @before-hide="hide" v-if="worker" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание рабочего</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addWorker">
          <q-input
            v-model="worker.Surname"
            class="input"
            filled
            label="Фамилия"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="worker.Name"
            class="input"
            filled
            label="Имя"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="worker.Patronymic"
            class="input"
            filled
            label="Отчество"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="worker.Position"
            class="input"
            filled
            label="Должность"
            lazy-rules
            maxlength="40"
          />
          <q-input
            v-model="worker.Experience"
            class="input"
            filled
            label="Опыт"
            type="number"
            lazy-rules
            :rules="[
              (val) => (val > 0 && val < 41) || 'Введите число от 1 до 40',
            ]"
          />
          <q-select
            style="margin-top: -15px"
            v-model="worker.DepartmentID"
            :options="departmentName"
            class="input"
            filled
            label="Отдел"
            lazy-rules
          />
          <q-card-actions class="button-block">
            <q-btn
              :disabled="checkAddButtonDisabled"
              type="submit"
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
export default class CreateWorkerForm extends Vue {
  @Prop({ type: Array, required: true }) propDepartments: any;

  value = false;
  worker:
    | {
        Surname: string;
        Name: string;
        Patronymic: string;
        Position: string;
        Experience: number;
        DepartmentID: number;
      }
    | any = null;

  get valid() {
    return true;
  }

  get checkAddButtonDisabled() {
    return !(
      this.worker.Name !== "" &&
      this.worker.Surname !== "" &&
      this.worker.Patronymic !== "" &&
      this.worker.Position !== "" &&
      this.worker.Experience > 0 &&
      this.worker.Experience < 41 &&
      this.worker.DepartmentID !== ""
    );
  }

  async show() {
    this.worker = {
      Surname: "",
      Name: "",
      Patronymic: "",
      Position: "",
      Experience: "",
      DepartmentID: "",
    };
    this.value = true;
  }

  async addWorker() {
    for (let item of this.propDepartments) {
      if (this.worker.DepartmentID === item.Name) {
        this.worker.DepartmentID = item.DepartmentID;
      }
    }
    const result = await axios.post(
      "http://localhost:8080/api/workers/",
      this.worker
    );
    if (result) {
      if (typeof result.data == "string") {
        console.log(result.data);
      }
      this.$emit("update-workers-list");
      this.value = false;
    }
  }

  //   get departmentId() {
  //     let departmentId = [];
  //     for (let i of this.propDepartments) {
  //       departmentId.push(i.DepartmentID);
  //     }
  //     return departmentId;
  //   }

  get departmentName() {
    let departmentName = [];
    for (let i of this.propDepartments) {
      departmentName.push(i.Name);
    }
    return departmentName;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-worker-form", () => this.show());
    console.log(this.propDepartments);
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-worker-form", () => this.hide());
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
