<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о рабочем</div>
      <q-btn label="Назад" @click="$router.push('/workers')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateWorker">
        <q-input
          v-model="workerChangeId.Surname"
          class="input"
          filled
          clearable
          label="Фамилия"
          lazy-rules
          maxlength="40"
        />
        <q-input
          v-model="workerChangeId.Name"
          class="input"
          filled
          clearable
          label="Имя"
          lazy-rules
          maxlength="40"
        />
        <q-input
          v-model="workerChangeId.Patronymic"
          class="input"
          filled
          clearable
          label="Отчество"
          lazy-rules
          maxlength="40"
        />
        <q-input
          v-model="workerChangeId.Position"
          class="input"
          filled
          clearable
          label="Должность"
          maxlength="40"
          lazy-rules
        />
        <q-input
          v-model="workerChangeId.Experience"
          class="input"
          filled
          clearable
          label="Опыт"
          type="number"
          lazy-rules
          :rules="[
            (val) => (val > 0 && val < 41) || 'Введите число от 1 до 40',
          ]"
        />
        <q-select
          style="margin-top: -15px"
          v-model="workerChangeId.DepartmentID"
          :options="workerName"
          class="input"
          filled
          label="Отдел"
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
export default class Worker extends Vue {
  worker: any | [] = [];
  departments: any | [] = [];
  isAddButtonDisabled: boolean = true;

  async getWorker() {
    const result = await axios.get(
      `http://localhost:8080/api/workers/${this.$route.params.id}`
    );
    this.worker = result.data[0];
  }

  async getDepartments() {
    const response = await axios.get("http://localhost:8080/api/departments/");
    this.departments = response.data;
  }

  async updateWorker() {
    for (let item of this.departments) {
      if (this.worker.DepartmentID === item.Name) {
        this.worker.DepartmentID = item.DepartmentID;
      }
    }
    await axios.put(
      `http://localhost:8080/api/workers/${this.$route.params.id}`,
      this.worker
    );
  }

  get checkAddButtonDisabled() {
    return !(this.worker.Experience > 0 && this.worker.Experience < 41);
  }

  get workerChangeId() {
    for (let d of this.departments) {
      if (this.worker.DepartmentID == d.DepartmentID) {
        this.worker.DepartmentID = d.Name;
      }
    }
    return this.worker;
  }

  get workerName() {
    let workerName = [];
    for (let i of this.departments) {
      workerName.push(i.Name);
    }
    return workerName;
  }

  mounted() {
    this.getWorker();
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
