<template>
  <div>
    <v-form @submit.prevent="guardarDos" ref="formDos" v-model="valid2">
      <div class="create-rutas-form-container">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="definicionModel.nombre" box label="Nombre"></v-text-field>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="definicionRuta.descripcion" box label="descripción"></v-text-field>
            <v-switch :disabled="!editable" box :label="`Requerido: ${definicionRuta.requerido.toString()}`" v-model="definicionRuta.requerido"></v-switch>
            <v-textarea :disabled="!editable" rows="15" box v-model="jsonToBeValided" :rules="[rules.req]" label="Definición" @input="formatJson"></v-textarea>
          </v-flex>
          <v-flex xs12 md6 style="padding-left: 20px">
            <div class="json-container">
              <def-json :data="definicionModel.estructura" />
            </div>
          </v-flex>
        </v-layout>
      </div>
        <div class="create-rutas-buttons">
          <v-btn @click="guardarDos" :disabled="!valid2" :loading="!editable" flat outline round>
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
import VueJsonPretty from "vue-json-pretty";
import rules from "@/config/formRules";
import definicionesApi from "@/services/definicionesService";
export default {
  name: "create-two",
  data() {
    return {
      valid2: true,
      editable: true,
      definicionModel: {
        nombre: "",
        estructura: {},
        idServicio: "5b22e1afa4b9897b079eb33d", //ver como hacer reactivo!! areglar pronto
        ejemplo: null
      },
      definicionRuta: {
        descripcion: null,
        requerido: true
      },
      jsonToBeValided: ""
    };
  },
  props: {
    idServicio: {
      type: String
    }
  },
  watch: {
    idServicio() {
      console.log("El idServicio de definicones ha cambiado");
    }
  },
  methods: {
    guardarDos() {
      this.editable = false;
      setTimeout(() => {
        definicionesApi.postDefinicion(this.definicionModel).then(data => {
          if (data) {
            this.$emit("datosDos", {
              idDefinicion: data.id,
              descripcion: this.definicionRuta.descripcion,
              requerido: this.definicionRuta.requerido
            });
          } else {
            this.editable = true;
            console.error("Problemas al guardar la definición");
          }
        });
      }, 500);
    },
    formatJson(value) {
      try {
        /* var obj = JSON.parse(value);
              var pretty = JSON.stringify(obj, undefined, 4);
              this.validJson = pretty; */
        this.validJson = JSON.parse(value);
        this.definicionModel.estructura = this.validJson;
      } catch (error) {
        console.error("Error al convertir a json");
      }
    }
  },
  components: {
    "def-json": VueJsonPretty
  },
  computed: {
    rules() {
      return rules;
    }
  }
};
</script>
