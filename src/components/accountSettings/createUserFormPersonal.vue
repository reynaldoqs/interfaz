<template>
  <div class="create-user-form">
    <settingsHeader icon="person" title="Datos personales para el registro" description="Datos personales para validad su existencia"/>
   <v-form ref="formUserPart1" v-model="valid">
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
            <v-text-field :rules="[rules.req]" :disabled="!editable" v-model="userModel.nombres" label="Nombres"></v-text-field>
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
            <v-text-field :disabled="!editable" v-model="userModel.primerApellido" label="Apellido paterno"></v-text-field>
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
            <v-text-field :disabled="!editable" v-model="userModel.segundoApellido" label="Segundo Apellido"></v-text-field>
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
              <v-text-field :disabled="!editable" :rules="[rules.req, rules.integer]" v-model.number="userModel.numeroCarnetIdentidad" label="Número Carnet"></v-text-field>
              <div class="extension">
              <v-checkbox
                class="my-checkbox"
                label="Complemento"
                v-model="hasExtension"
                :messages="['Extensión de Cedula de Identidad']"
              ></v-checkbox>
               <v-text-field v-show="hasExtension" :disabled="!editable" v-model="userModel.complementoCarnetIdentidad" label="Complemento"></v-text-field>
              </div>
          </v-flex>

        </v-layout>
    </v-form> 
  </div>
</template>
<script>
import EventBus from "@/utils/eventBus";
import rules from "@/config/formRules";
import settingsHeader from "@/components/accountSettings/settingsHeader";
export default {
  data() {
    return {
      editedModel: this.userModel,
      hasExtension: false,
      valid: true,
      showClave: false
    };
  },
  props: {
    userModel: {
      type: Object
    },
    editable: {
      type: Boolean
    }
  },
  watch: {
    valid() {
      EventBus.$emit("personalValid", this.valid);
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    settingsHeader
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
