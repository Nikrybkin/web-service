<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация об отделе</div>
      <q-btn label="Назад" @click="$router.push('/departments')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateDepartment">
        <q-input
          v-model="department.Name"
          class="input"
          filled
          clearable
          label="Название"
          lazy-rules
        />
        <q-input
          v-model="department.NumberWorkers"
          class="input"
          filled
          clearable
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
export default class Department extends Vue {
  department: any | [] = [];
  isAddButtonDisabled: boolean = true;

  async getDepartment() {
    const result = await axios.get(
      `http://localhost:8080/api/departments/${this.$route.params.id}`
    );
    this.department = result.data[0];
  }

  async updateDepartment() {
    await axios.put(
      `http://localhost:8080/api/departments/${this.$route.params.id}`,
      this.department
    );
  }

  get checkAddButtonDisabled() {
    return !(
      this.department.NumberWorkers > 0 && this.department.NumberWorkers < 101
    );
  }

  mounted() {
    this.getDepartment();
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
