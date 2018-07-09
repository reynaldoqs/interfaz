<template>
  <div>
      <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="What state are you from?"
      solo-inverted
    >
      <template slot="item" slot-scope="data">
        <pre>{{data.item.nombre}}</pre>
      </template>
             <template
                slot="selection"
                slot-scope="data"
              >
              <div class="nombre-entidad" v-text="data.item.nombre"></div>
              <div class="dato-entidad"></div>
              </template>
    </v-autocomplete>
    <pre>
      {{select}}
    </pre>
  </div>
</template>
<script>
//import entidadesApi from "@/services/entidadesService";
import rutasApi from "@/services/rutasService";
export default {
  data: () => ({
    items: [],
    loading: false,
    search: null,
    select: null,
    rutas: []
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      this.items = this.rutas.filter(e => {
        return (
          (e.nombre || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
        );
      });
    }
  },
  mounted() {
    this.loading = true;
    rutasApi
      .getRutas(10)
      .then(data => {
        this.rutas = data.rutas;
      })
      .finally(() => (this.isLoading = false));
  }
};
</script>