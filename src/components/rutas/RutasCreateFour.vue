<template>
  <div>
    <v-form @submit.prevent="agregar" ref="formCuatro" v-model="valid4">
      <div class="create-rutas-form-container">
        <v-layout row wrap>
  
          <v-flex xs12 md6>
            <v-text-field :disabled="!editable" :rules="[rules.req, rules.integer]" v-model.number="ourRespuestas.codigoHttp" box label="Código Http"></v-text-field>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="ourRespuestas.descripcion"  box label="Descripcion"></v-text-field>
             <v-divider></v-divider>
            <small>Para la definicion de la respuesta</small> 
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="definicionModel.nombre" box label="Nombre definición"></v-text-field>
            <v-textarea :disabled="!editable" :rules="[rules.req]" v-model="jsonToBeValided" box label="Definición" @input="formatJson"></v-textarea>
            
          </v-flex>
  
          <v-flex xs12 md6 style="padding-left: 20px">
            <div class="json-container">
              <def-json :data="definicionModel.estructura" />
            </div>
          </v-flex>

        </v-layout>
        <v-layout row wrap>

          <v-flex xs12 style="text-align: center; padding-top:24px;">
            <v-badge v-model="show">
              <span slot="badge">{{respuestasContainer.length}}</span>
              <v-btn :disabled="!valid4" flat outline round @click="agregar">
                Agregar
              </v-btn>
            </v-badge>
          </v-flex>
        </v-layout>
      </div>
        <div class="create-rutas-buttons">
          <v-btn @click="guardarCuatro" :disabled="!respuestasContainer.length > 0" :loading="!editable" flat outline round>
            Guardar Ruta
                      <v-icon right>
           save
          </v-icon>
          </v-btn>
        </div>      
    </v-form>
    <pre>
          {{respuestasContainer}}
          ______________=========__________________________________
          {{definicionesContainer}}
        </pre>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import rules from "@/config/formRules";
import definicionesApi from "@/services/definicionesService";
export default {
  name: "create-four",
  data() {
    return {
      show: false,
      valid4: true,
      editable: true,
      respuestasContainer: [],
      definicionesContainer: [],
      ourRespuestas: {
        codigoHttp: null,
        descripcion: null,
        tipoContenido: "application/json",
        idReferencia: null
      },
      definicionModel: {
        nombre: "",
        estructura: {},
        idServicio: "5b22e1afa4b9897b079eb33d", //ver como hacer reactivo!! areglar pronto
        ejemplo: null
      },
      httpError: false,
      jsonToBeValided: ""
      //lodash quiries
    };
  },
  props: {
    idServicio: {
      type: String
    }
  },
  watch: {
    codigoHttp: function() {
      this.searchQueryIsDirty = true;
      this.expensiveOperation();
    },
    respuestasContainer() {
      this.respuestasContainer.length > 0
        ? (this.show = true)
        : (this.show = false);
    }
  },
  methods: {
    async guardarCuatro() {
      this.editable = false;
      let esValido = await this.verificaDefiniciones(
        this.definicionesContainer
      );
      if (esValido.isValid) {
        let respFull = await this.assignIds(
          this.definicionesContainer,
          this.respuestasContainer
        );
        this.$emit("datosCuatro", respFull);
        this.editable = true;
      } else {
        this.eraseErros(
          this.definicionesContainer,
          this.respuestasContainer,
          esValido.errorsOn
        );
        this.editable = true;
      }
      console.log("esto tiene que pasar al final");
    },
    assignIds(array1 = [], array2 = []) {
      return new Promise(resolve => {
        setTimeout(() => {
          let promesasAdefiniciones = array1.map(definicion => {
            return definicionesApi.postDefinicion(definicion);
          });
          Promise.all(promesasAdefiniciones).then(values => {
            for (let key in values) {
              array2[key].idReferencia = values[key].id;
            }
            resolve(array2);
          });
        }, 500);
      });
    },
    verificaDefiniciones(definiciones) {
      return new Promise(resolve => {
        let promesasAdefiniciones = definiciones.map(definicion => {
          return definicionesApi.searchDefinicion(definicion.nombre);
        });
        Promise.all(promesasAdefiniciones).then(values => {
          resolve({
            isValid: values.every(data => data.definiciones.length === 0),
            errorsOn: values.map(data => {
              return data.definiciones.length !== 0;
            })
          });
        });
      });
    },
    eraseErros(array1 = [], array2 = [], controlArray = []) {
      //da error en algunos casos,pero funciona en borrado, verificar!!
      let nombresDefiniconesConErrores = "";
      let numControl = 0;
      for (let i = 0; i < controlArray.length; i++) {
        if (controlArray[i]) {
          typeof array1[i - numControl].nombre !== "undefined"
            ? (nombresDefiniconesConErrores +=
                array1[i - numControl].nombre + ",")
            : "";
          array1.splice(i - numControl, i - numControl + 1);
          array2.splice(i - numControl, i - numControl + 1);
          numControl++;
        }
      }
      this.$store.dispatch("notification", {
        message: `Nombre registrado: ${nombresDefiniconesConErrores} eliminando.`,
        dangerous: true,
        time: 4000
      });
    },
    agregar() {
      let newRespuesta = Object.assign({}, this.ourRespuestas);
      let newDefiniciones = Object.assign({}, this.definicionModel);
      this.respuestasContainer.push(newRespuesta);
      this.definicionesContainer.push(newDefiniciones);
      this.$refs.formCuatro.reset();
    },
    formatJson(value) {
      try {
        this.validJson = JSON.parse(value);
        this.definicionModel.estructura = this.validJson;
      } catch (error) {
        console.error("Error al convertir a json");
      }
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    "def-json": VueJsonPretty
  }
};
</script>

<style>
.rutas-three-padding {
  padding: 0 5px;
}

.v-messages__message {
  color: #f44336;
}
</style>