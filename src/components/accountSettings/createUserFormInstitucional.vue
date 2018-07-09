<template>
  <div class="create-user-form">
    <settingsHeader icon="assignment" title="Datos institucionales" description="Datos de la instituciona que pertenece" />
   <v-form ref="formUserPart2" v-model="valid">
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
            <v-text-field :disabled="!editable" :rules="[rules.req ,rules.email]" v-model="userModel.correoElectronico" label="Correo electrónico"></v-text-field>
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
            <v-text-field :disabled="!editable" :rules="[rules.req]" v-model="userModel.telefonoCelular[0]" label="Número de celular"></v-text-field>
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
            <v-text-field
            :append-icon="showClave ? 'visibility_off' : 'visibility'"
            :type="showClave ? 'text' : 'password'"
            :rules="[rules.req]"
            :disabled="!editable"
            v-model="userModel.clave"
            @click:append="showClave=!showClave"
            label="Contraseña"></v-text-field>
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
  </div>
</template>
<script>
import EntidadesComboBox from "@/components/shared/EntidadesComboBox";
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
      EventBus.$emit("InstitucionalValid", this.valid);
    }
  },
  computed: {
    rules() {
      return rules;
    }
  },
  components: {
    EntidadesComboBox,
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
