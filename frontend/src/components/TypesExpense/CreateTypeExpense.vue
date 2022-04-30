<template>
  <q-dialog @before-hide="hide" v-if="typeExpense" v-model="value">
    <q-card style="width: 700px; max-width: 80vh">
      <q-card-section>
        <div class="text-h6">Создание отдела</div>
      </q-card-section>
      <q-card-section>
        <form @submit="addTypeExpense">
          <q-input
            v-model="typeExpense.Name"
            class="input"
            filled
            clearable
            label="Название"
            maxlength="40"
            lazy-rules
          />
          <q-input
            v-model="typeExpense.Description"
            class="input"
            filled
            clearable
            label="Описание"
            maxlength="40"
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
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class CreateTypeExpenseForm extends Vue {
  value = false;
  isAddButtonDisabled: boolean = true;
  typeExpense:
    | {
        Name: string;
        Description: string;
      }
    | any = null;

  get valid() {
    return true;
  }

  // get checkAddButtonDisabled() {
  //   return !(
  //     this.typeExpense.Name.length > 0 &&
  //     this.typeExpense.Description.length < 41
  //   );
  // }

  get checkAddButtonDisabled() {
    return this.typeExpense.Name == "" || this.typeExpense.Description == "";
  }

  async show() {
    this.typeExpense = {
      Name: "",
      Description: "",
    };
    this.value = true;
  }

  async addTypeExpense() {
    if (!this.typeExpense) return;
    const result = await axios.post(
      "http://localhost:8080/api/typesExpense/",
      this.typeExpense
    );
    if (result) {
      this.$emit("update-types-expense-list");
    }
    this.value = false;
  }

  hide() {
    this.value = false;
  }

  mounted(): void {
    this.$bus.$on("toggle-type-expense-form", () => this.show());
  }

  beforeDestroy(): void {
    this.$bus.$on("toggle-type-expense-form", () => this.hide());
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
