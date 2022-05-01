<template>
  <q-dialog @before-hide="hide" v-if="department" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание отдела</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addDepartment">
          <q-input
            v-model="department.Name"
            class="input"
            filled
            label="Название"
            maxlength="40"
            lazy-rules
          />
          <q-input
            v-model="department.NumberWorkers"
            class="input"
            filled
            label="Количество рабочих"
            lazy-rules
            type="number"
            :rules="[
              (val) => (val > 0 && val < 101) || 'Введите число от 1 до 100',
            ]"
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
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class CreateDepartmentForm extends Vue {
  value = false;
  isAddButtonDisabled: boolean = true;
  department:
    | {
        Name: string;
        NumberWorkers: number;
      }
    | any = null;

  get valid() {
    return true;
  }

  get checkAddButtonDisabled() {
    return !(
      this.department.NumberWorkers > 0 &&
      this.department.NumberWorkers < 101 &&
      this.department.Name !== ""
    );
  }

  async show() {
    this.department = {
      Name: "",
      NumberWorkers: "",
    };
    this.value = true;
  }

  async addDepartment() {
    if (!this.department) return;
    const result = await axios.post(
      "http://localhost:8080/api/departments/",
      this.department
    );
    if (result) {
      this.$emit("update-departments-list");
    }
    this.value = false;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-department-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-department-form", () => this.hide());
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
