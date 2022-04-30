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
    title: "Home",
    caption: "Home page",
    icon: "home",
    link: "/",
  },
  {
    title: "Departments",
    caption: "List of departments",
    icon: "table",
    link: "/#/departments",
  },
  {
    title: "Workers",
    caption: "List of workers",
    icon: "people",
    link: "/#/workers",
  },
  {
    title: "Types Expense",
    caption: "List of types expense",
    icon: "folder",
    link: "/#/typesExpense",
  },
  {
    title: "Consumptions",
    caption: "List of consumptions",
    icon: "landmark",
    link: "/#/consumptions",
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
