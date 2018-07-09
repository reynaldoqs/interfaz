<template>
  <v-card>
      <v-card-title>
        <span class="headline">Rutas del servicio</span>
      </v-card-title>
  
      <v-card-text>
        <data-table-view tipo="rutas" :loading="loading" :datos="requestData" v-on:onUpdatePagination="updatePagination"></data-table-view>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
  
      </v-card-actions>
  </v-card>
</template>
<script>
import DataTableView from "@/components/shared/DataTableView";
import serviciosApi from "@/services/serviciosService";

export default {
  data() {
    return {
      loading: false,
      requestData: {}
    };
  },
  props: ["idItem"],
  components: {
    DataTableView
  },
  methods: {
    updatePagination(pagination) {
      this.callApi(pagination);
    },
    callApi() {
      this.loading = true;
      serviciosApi.getRutas(this.idItem).then(data => this.formatData(data));
    },
    formatData(data) {
      //mejorar con graphql...
      let headers = ["Nombre Ruta", "Versión", "URL base", "Método", "Acción"];
      this.requestData = {
        totalItems: data.totalRutas,
        items: data.rutas.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.version,
            data3: data.baseUrl,
            data4: data.metodo,
            id: data.id
          };
          return formated;
        }),
        headers: headers.map(data => {
          let header = {
            text: data,
            align: "left",
            sortable: true
          };
          return header;
        })
      };
      this.loading = false;
    }
  }
};
</script>
