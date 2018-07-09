<template>
    <v-container align-center>
      <inter-tabs :menuItems="menuOptions" v-on:onChangeComponent="changeComponent">
        <component v-bind:is="view" :idItem="idAmbiente"></component>
      </inter-tabs>
    </v-container>
</template>
<script>
import InterTabs from "@/components/shared/InterTabs";
import AmbientesDetailServicios from "@/components/ambientes/AmbientesDetailServicios";
import AmbientesDetailView from "@/components/ambientes/AmbientesDetailView";

export default {
  data() {
    return {
      view: "comp-a",
      idAmbiente: "",
      menuOptions: {
        title: "Datos del ambiente",
        components: [
          { title: "Ver detalles", component: "comp-a", icon: "add" },
          { title: "Ver servicios", component: "comp-b", icon: "add" },
          { title: "Ver otra cosa", component: "comp-c", icon: "add" }
        ]
      }
    };
  },
  methods: {
    changeComponent(value) {
      this.view = value;
    }
  },
  components: {
    InterTabs,
    "comp-a": AmbientesDetailView,
    "comp-b": AmbientesDetailServicios
  },
  mounted() {
    this.idAmbiente = this.$route.params.id;
  }
};
</script>

