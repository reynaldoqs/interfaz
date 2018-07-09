<template>
  <div>
    <search-bar v-on:onInput="search">
      <h3>Lista de ambientes</h3>
      <v-btn flat round @click="$router.push('/admin/ambientes/create')">Agregar un ambiente
        <v-icon right>add</v-icon>
      </v-btn>
    </search-bar>

    <div class="inter-container inter-card-container">
      <div class="my-auto-x-scroll">
      <ambientes-data-table :ambientes="ambientes"></ambientes-data-table>
      </div>
    </div>

  </div>
</template>
<script>
import SearchBar from "@/components/shared/SearchBar";
import AmbientesDataTable from "@/components/ambientes/AmbientesDataTable";
import ambientesApi from "@/services/ambientesService";
export default {
  data() {
    return {
      ambientes: []
    };
  },
  components: {
    SearchBar,
    AmbientesDataTable
  },
  methods: {
    search(value) {
      console.log(value);
    }
  },
  mounted() {
    ambientesApi.getAmbientes().then(data => {
      this.ambientes = data.ambientes;
    });
  }
};
</script>

