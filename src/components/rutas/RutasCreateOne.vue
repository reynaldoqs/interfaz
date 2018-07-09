<template>
  <div>
    <v-form @submit.prevent="guardarUno" ref="formUno" v-model="validUno">
      <div class="create-rutas-form-container">
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Nombre de la ruta
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="rutasModel.nombre" box label="Nombre"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Descripción de la ruta
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="rutasModel.descripcion" box></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Versión de la ruta
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="rutasModel.version" box label="Versión"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Base de la URL
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="rutasModel.baseUrl" box label="base Url"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Prefijo de la operación
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="rutasModel.prefijoOperacion" box label="Prefijo"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Métodos de la ruta
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select :disabled="!editable" :rules="[rules.req]" :items="metodosOtp" v-model="rutasModel.metodo" label="Métodos" box></v-select>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Servicio al que pertenecerá
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <ServiciosComboBox v-on:updateIdServicio="updateIdServicio" :rules="[rules.req]" :disabled="!editable" />
          </v-flex>
        </v-layout>
      </div>
      <div class="create-rutas-buttons">
        <v-btn @click="guardarUno" :disabled="!validUno" :loading="!editable" flat round outline>
          Siguiente
          <v-icon right>
            navigate_next
          </v-icon>
        </v-btn>
      </div>

    </v-form>
  </div>
</template>

<script>
import ServiciosComboBox from "@/components/shared/ServiciosComboBox";
import rutasApi from "@/services/rutasService";
import rules from "@/config/formRules";
export default {
  name: "user-create-one",
  data() {
    return {
      editable: true,
      validUno: true,
      rutasModel: {
        nombre: "",
        version: "",
        metodo: "POST",
        baseUrl: "",
        descripcion: "",
        prefijoOperacion: "",
        seguridad: "JWT",
        parametros: null,
        idServicio: "",
        respuestas: null,
        cuerpoSolicitud: null
      },
      metodosOtp: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"]
    };
  },
  methods: {
    guardarUno() {
      this.editable = false;

      setTimeout(() => {
        rutasApi.postRuta(this.rutasModel).then(data => {
          if (data) {
            this.$emit("datosUno", {
              idRuta: data.id,
              idServicio: data.idServicio
            });
          } else {
            this.editable = true;
            console.error("error al guardar la ruta");
          }
        });
      }, 500);
      //fines esteticos
    },
    updateIdServicio(valor) {
      this.rutasModel.idServicio = valor;
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    ServiciosComboBox
  }
};
</script>
