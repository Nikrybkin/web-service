<template>
  <div>
    <q-card-section class="btns">
      <div class="text-h6">Информация о типе расхода</div>
      <q-btn label="Назад" @click="$router.push('/typesExpense')" />
    </q-card-section>
    <q-card-section>
      <form @submit="updateTypeExpense">
        <q-input
          v-model="typeExpense.Name"
          class="input"
          filled
          label="Название"
          lazy-rules
          maxlength="40"
        />
        <q-input
          v-model="typeExpense.Description"
          class="input"
          filled
          label="Описание"
          lazy-rules
          maxlength="40"
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
  typeExpense: any | [] = [];

  async getTypeExpense() {
    const result = await axios.get(
      `http://localhost:8080/api/typesExpense/${this.$route.params.id}`
    );
    this.typeExpense = result.data[0];
    console.log(this.typeExpense);
  }

  async updateTypeExpense() {
    await axios.put(
      `http://localhost:8080/api/typesExpense/${this.$route.params.id}`,
      this.typeExpense
    );
  }

  get checkAddButtonDisabled() {
    return this.typeExpense.Name == "";
  }

  mounted() {
    this.getTypeExpense();
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
