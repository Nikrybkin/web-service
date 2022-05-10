<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> Company </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Главная",
    caption: "Загрузочная страница",
    icon: "home",
    link: "/",
  },
  {
    title: "Отделы",
    caption: "Спикок отделов",
    icon: "table",
    link: "/#/departments",
  },
  {
    title: "Работники",
    caption: "Список работников",
    icon: "people",
    link: "/#/workers",
  },
  {
    title: "Типы расходов",
    caption: "Список типов расходов",
    icon: "folder",
    link: "/#/typesExpense",
  },
  {
    title: "Расходы",
    caption: "Список расходов",
    icon: "book",
    link: "/#/consumptions",
  },
  {
    title: "Нормы расходов",
    caption: "Список норм расходов",
    icon: "style",
    link: "/#/consumptionsRates",
  },
];

@Component({
  components: { EssentialLink },
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
}
</script>

<style lang="scss">
.q-icon {
  justify-content: start !important;
}
</style>
