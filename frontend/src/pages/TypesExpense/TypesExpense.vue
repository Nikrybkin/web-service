<template>
  <div class="container">
    <div class="btns" style="display: flex">
      <q-btn @click="showTypeExpenseForm(false)" label="Создать" />
      <div style="margin-left: auto">
        <q-btn
          v-if="selected.length"
          @click="confirm()"
          style="margin-left: 20px"
          color="red"
          label="Удалить"
        />
      </div>
    </div>
    <q-table
      class="table"
      :columns="columns"
      :data="typesExpense"
      virtual-scroll
      :rows-per-page-options="[0]"
      row-key="ViewID"
      selection="single"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td
          class="td-curs"
          @click="$router.push(`/typesExpense/${props.key}`)"
          :selected="selected"
          :props="props"
        >
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <type-expense-form
      :propTypeExpense="typesExpense"
      @update-types-expense-list="getTypesExpense"
    ></type-expense-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import TypeExpenseForm from "src/components/TypesExpense/CreateTypeExpense.vue";

@Component({
  components: {
    TypeExpenseForm,
  },
})
export default class Workers extends Vue {
  typesExpense: any | [] = [];
  selected: { ViewID: number }[] = [];

  columns = [
    {
      name: "ViewID",
      label: "ViewID",
      field: "ViewID",
      required: true,
      align: "left",
    },
    {
      name: "Name",
      label: "Name",
      field: "Name",
      required: true,
      align: "left",
    },
    {
      name: "Description",
      label: "Description",
      field: "Description",
      required: true,
      align: "left",
    },
  ];

  confirm() {
    this.$q
      .dialog({
        title: "Подтвердите действие",
        message: `Вы действительно хотите удалить тип расхода?`,
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        const response = await axios.delete(
          `http://localhost:8080/api/typesExpense/${this.selected[0].ViewID}`
        );
        if (response) {
          this.getTypesExpense();
          this.selected = [];
        }
      })
      .onCancel(() => {
        console.log(">>>> Cancel");
      });
  }

  showTypeExpenseForm(value: boolean) {
    this.$bus.$emit("toggle-type-expense-form", value);
  }

  async getTypesExpense() {
    const response = await axios.get("http://localhost:8080/api/typesExpense/");
    this.typesExpense = response.data;
  }

  mounted() {
    this.getTypesExpense();
  }

  getSelectedString() {
    return this.selected.length === 0
      ? "ничего не выбрано"
      : `${this.selected.length} record${this.selected.length > 1 ? "s" : ""}`;
  }
}
</script>

<style lang="scss">
.container {
  margin: 20px;
}

.table {
  height: auto;
  max-height: calc(100vh - 146px);
}

.btns {
  margin-bottom: 20px;
}

.td-curs {
  cursor: pointer;
}
</style>
