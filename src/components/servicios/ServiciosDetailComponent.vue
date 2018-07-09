<template>
    <v-container align-center>
      <inter-tabs :menuItems="menuOptions" v-on:onChangeComponent="changeComponent">
        <component v-bind:is="view" :idItem="idServicio"></component>
      </inter-tabs>
    </v-container>
</template>

<script>
import InterTabs from "@/components/shared/InterTabs";
import ServiciosDetailView from "@/components/servicios/ServiciosDetailView";
import ServiciosDetailRutes from "@/components/servicios/ServiciosDetailRutes";
export default {
  data() {
    return {
      view: "comp-a",
      idServicio: "",
      menuOptions: {
        title: "Datos del Servicio",
        components: [
          { title: "Ver detalles", component: "comp-a", icon: "add" },
          { title: "Ver Rutas", component: "comp-b", icon: "add" }
        ]
      }
    };
  },
  methods: {
    changeComponent(value) {
      this.view = value;
    }
  },
  created() {
    this.idServicio = this.$route.params.id;
  },
  components: {
    InterTabs,
    "comp-a": ServiciosDetailView,
    "comp-b": ServiciosDetailRutes
  }
};
</script>
<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
