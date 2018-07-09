<template>
  <v-card>
      <v-card-title>
        <span class="headline">Rutas del servicio</span>
      </v-card-title>
 
        <v-card-text>
          <data-table-view tipo="servicios" :loading="loading" :datos="requestData"></data-table-view>
        </v-card-text>
      </v-card>
</template>

<script>
import ambientesApi from "@/services/ambientesService";
import DataTableView from "@/components/shared/DataTableView";

export default {
  data() {
    return {
      requestData: {},
      loading: true
    };
  },
  props: ["idItem"],
  components: {
    DataTableView
  },
  methods: {
    callApi() {
      this.loading = true;
      ambientesApi
        .getServicios(this.idItem)
        .then(data => this.formatData(data));
    },
    formatData(data) {
      //mejorar con graphql...
      let headers = [
        "Nombre del Servicio",
        "Sigla Entidad",
        "Código",
        "Estado",
        "Acción"
      ];
      this.requestData = {
        totalItems: data.totalServicios,
        items: data.servicios.map(data => {
          let formated = {
            data1: data.nombre,
            data2: data.datosEntidad.siglaEntidad,
            data3: data.codigo,
            data4: data.estado,
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
  },
  mounted() {
    this.callApi();
  }
};
</script>
