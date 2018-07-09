<template>
  <div>
    <v-tabs slot="extension" v-model="tab" color="teal" grow>
      <v-tabs-slider></v-tabs-slider>
  
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-card raised>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="items[0]">
  
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Nombres
                    <small>(Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field readonly v-model="userModel.nombres" label="Nombres"></v-text-field>
              </v-flex>
  
              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Apellido paterno
                    <small> (Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field readonly v-model="userModel.primerApellido" label="Apellido paterno"></v-text-field>
              </v-flex>
  
              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Apellido Materno
                    <small> (Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field readonly v-model="userModel.segundoApellido" label="Segundo Apellido"></v-text-field>
              </v-flex>
  
              <v-flex xs4>
                <v-subheader>
                  <div class="inter-subheader">
                    Número de Carnet de Identidad
                    <small> (Requerido)</small>
                  </div>
                </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field readonly v-model="userModel.numeroCarnetIdentidad" label="Numero Carnet"></v-text-field>
                <div class="extension">
                  <v-checkbox class="my-checkbox" label="Complemento" v-model="hasExtension" :messages="['Extensión de Cedula de Identidad']" readonly></v-checkbox>
                  <v-text-field v-show="hasExtension" readonly v-model="userModel.complementoCarnetIdentidad" label="Complemento"></v-text-field>
                </div>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-tab-item>
  
        <v-tab-item :key="items[1]">
          <v-card-title>
          
          </v-card-title>
  
          <v-card-text>
            <v-form ref="formUser" @submit.prevent="save" v-model="valid">
              <v-layout row wrap>
  
                <v-flex xs4>
                  <v-subheader>
                    <div class="inter-subheader">
                      Correo electrónico
                      <small> (Requerido)</small>
                    </div>
                  </v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-text-field v-model="userModel.correoElectronico" label="Correo electrónico"></v-text-field>
                </v-flex>
  
                <v-flex xs4>
                  <v-subheader>
                    <div class="inter-subheader">
                      Número de Celular
                      <small> (Requerido)</small>
                    </div>
                  </v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-text-field v-if="userModel.telefonoCelular" :disabled="!editable" :rules="[rules.req]" v-model="userModel.telefonoCelular[0]" label="Número de celular"></v-text-field>
                </v-flex>
  
                <v-flex xs4>
                  <v-subheader>
                    <div class="inter-subheader">
                      Usuario
                      <small>(Requerido)</small>
                    </div>
                  </v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="userModel.usuario" label="Usuario"></v-text-field>
                </v-flex>
  
                <v-flex xs4>
                  <v-subheader>
                    <div class="inter-subheader">
                      Contraseña
                      <small>(Requerido)</small>
                    </div>
                  </v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-text-field :append-icon="showClave ? 'visibility_off' : 'visibility'" :type="showClave ? 'text' : 'password'" :rules="[rules.req]" :disabled="!editable" v-model="userModel.clave" @click:append="showClave=!showClave" label="Contraseña"></v-text-field>
                </v-flex>
  
                <v-flex xs12>
                  <h2 class="title">Datos institucionales</h2>
                </v-flex>
  
                <v-flex xs4>
                  <v-subheader>
                    <div class="inter-subheader">
                      Datos de la entidad
                      <small>(Requerido)</small>
                    </div>
                  </v-subheader>
                </v-flex>
                <v-flex xs8>
                  <EntidadesComboBox/>
                </v-flex>
  
              </v-layout>
            </v-form>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-btn @click="save">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import EntidadesComboBox from "@/components/shared/EntidadesComboBox";
import EventBus from "@/utils/eventBus";
import rules from "@/config/formRules";
export default {
  data() {
    return {
      editedModel: this.userModel,
      hasExtension: true,
      editable: true,
      valid: true,
      showClave: false,
      items: ["Datos personales", "Datos adicionales"],
      tab: null,
      text: "Audiman"
    };
  },
  props: {
    userModel: {
      type: Object
    }
  },
  methods: {
    save() {
      EventBus.$emit("onSaveUser");
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    EntidadesComboBox
  }
};
</script>

<style>
.extension {
  display: inline-flex;
}

.my-checkbox {
  margin-right: 25px;
}
</style>
