<template>
  <div>
    <v-form @submit.prevent="agregar" ref="formTres" v-model="valid3">
      <div class="create-rutas-form-container">
        <v-layout row wrap>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Nombre de la definición
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="ourParametros.nombre" box label="Nombre"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Unicación
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select :items="ubicaciones" v-model="ourParametros.ubicacion" :rules="[rules.req]" :disabled="!editable" label="Ubicación" box></v-select>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Tipo
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select :items="tipos" v-model="ourParametros.tipo" :rules="[rules.req]" :disabled="!editable" label="Tipo" box></v-select>
          </v-flex>
  
          <v-flex xs12 class="rutas-three-padding">
            <v-switch :disabled="!editable" box :label="`Requerido: ${ourParametros.requerido.toString()}`" v-model="ourParametros.requerido"></v-switch>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Descripción
                <small>(Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-textarea v-model="ourParametros.descripcion" :disabled="!editable" :rules="[rules.req]" label="Descripción" box></v-textarea>
          </v-flex>
          <v-flex xs12 style="text-align: center; padding-top:24px;">
            <v-badge v-model="show">
              <span slot="badge">{{paramatrosContainer.length}}</span>
              <v-btn :disabled="!valid3" flat outline round @click="agregar">
                Agregar
              </v-btn>
            </v-badge>
          </v-flex>
        </v-layout>
      </div>
  
      <div class="create-rutas-buttons">
        <v-btn @click="guardarTres" :disabled="paramatrosContainer.length === 0" :loading="!editable" flat outline round>
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
import rules from "@/config/formRules";
export default {
  name: "create-three",
  data() {
    return {
      show: false,
      valid3: true,
      editable: true,
      paramatrosContainer: [],
      ourParametros: {
        ubicacion: null,
        nombre: null,
        descripcion: null,
        tipo: null,
        requerido: true
      },
      tipos: [
        "string",
        "boolean",
        "array",
        "object",
        "integer",
        "number",
        "date",
        "datetime"
      ],
      ubicaciones: ["query", "header", "path", "cookie"]
    };
  },
  watch: {
    paramatrosContainer() {
      this.paramatrosContainer.length > 0
        ? (this.show = true)
        : (this.show = false);
    }
  },
  methods: {
    agregar() {
      let nuevoParametro = Object.assign({}, this.ourParametros);
      this.paramatrosContainer.push(nuevoParametro);
      this.$refs.formTres.reset();
    },
    guardarTres() {
      this.editable = false;
      setTimeout(() => {
        this.$emit("datosTres", this.paramatrosContainer);
      }, 300);
    }
  },
  computed: {
    rules() {
      return rules;
    }
  }
};
</script>
