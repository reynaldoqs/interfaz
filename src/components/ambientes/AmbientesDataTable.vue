<template>
  <div class="data-table-controller">
    <inter-table-row header :data="headers"></inter-table-row>
    <inter-table-row :data="ambiente" v-for="(ambiente,index) in ambientes" :key="index"></inter-table-row>
  </div>
</template>
<script>
import InterTableRow from "@/components/ambientes/InterTableRow";
export default {
  data() {
    return {
      headers: {
        title1: "Nombre del ambiente",
        title2: "Dirrección",
        title3: "Protodolos",
        title4: "Estado",
        title5: "Fecha de registro",
        title6: "Acciones"
      }
    };
  },
  props: {
    ambientes: {
      type: Array
    }
  },
  components: {
    InterTableRow
  }
};
</script>
<style>
.data-table-controller {
  min-width: 800px;
}
</style>
