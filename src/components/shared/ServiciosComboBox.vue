<template>
  <div>
    <v-select :items="servicios" :disabled="disabled" :rules="rules" v-model="myId" @input="changeId"  box label="Servicio" item-value="id" item-text="sigla" max-height="auto" autocomplete>
      <template slot="selection" slot-scope="data">
                  <span
                      :selected="data.selected"
                      :key="JSON.stringify(data.item)"
                      @input="data.parent.selectItem(data.item)"
                    >
                          {{data.item.sigla}}
                  </span>
      </template>

      <template slot="item" slot-scope="data">
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.descripcion"></v-list-tile-title>
          <v-list-tile-sub-title v-html="data.item.sigla"></v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
        </v-select>
  </div>
</template>

<script>
import serviciosApi from "@/services/serviciosService";

export default {
  data() {
    return {
      servicios: [],
      myId: ""
    };
  },
  props: {
    idServicio: {
      type: Object
    },
    rules: {
      type: Array
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    changeId() {
      console.log("estamos emitiendo");
      this.$emit("updateIdServicio", this.myId);
    }
  },
  mounted() {
    serviciosApi.getServicios().then(data => {
      this.servicios = data.servicios.map(serv => {
        let newSer = {
          id: serv.id,
          descripcion: serv.datosEntidad.descripcionEntidad,
          sigla: serv.datosEntidad.siglaEntidad
        };
        return newSer;
      });
    });
  }
};
</script>
