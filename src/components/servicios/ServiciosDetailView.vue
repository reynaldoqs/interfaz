<template>
  <v-card>
   <v-form ref="formService" @submit.prevent="save" v-model="valid">
      <v-card-title>
        <span class="headline">Detalles del servicio</span>
        <v-switch :label="`Editable: ${editable.toString()}`" v-model="editable"></v-switch>
      </v-card-title>
  
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Nombre del servicio
                <small> (Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" v-model="servicio.nombre" label="Nombre"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Código del servicio
                <small> (Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" v-model="servicio.codigo" label="Código"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Descripción del servicio
                <small> (Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field :disabled="!editable" v-model="servicio.descripcion" label="Descripción"></v-text-field>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Estado del servicio
                <small> (Requerido)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-select :disabled="!editable" :items="estados" v-model="servicio.estado" label="Estado"></v-select>
          </v-flex>
  
          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Inicio de disponibilidad
                <small> (Opcional)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-menu ref="menu1" :close-on-content-click="false" :nudge-right="40" :return-value.sync="servicio.fechaInicioDisponibilidad" lazy transition="scale-transition" offset-y full-width min-width="290px" :disabled="!editable">
              <v-text-field slot="activator" v-model="servicio.fechaInicioDisponibilidad" label="Fecha inicio disponibilidad" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="servicio.fechaInicioDisponibilidad" @input="$refs.menu1.save(servicio.fechaInicioDisponibilidad)"></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Final de disponibilidad
                <small> (Opcional)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-menu ref="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="servicio.fechaFinDisponibilidad" lazy transition="scale-transition" offset-y full-width min-width="290px" :disabled="!editable">
              <v-text-field slot="activator" v-model="servicio.fechaFinDisponibilidad" label="Fecha final disponibilidad" prepend-icon="event" readonly></v-text-field>
              <v-date-picker v-model="servicio.fechaFinDisponibilidad" @input="$refs.menu2.save(servicio.fechaFinDisponibilidad)"></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs4>
            <v-subheader>
              <div class="inter-subheader">
                Palabras clave
                <small>(Mínimo 1)</small>
              </div>
            </v-subheader>
          </v-flex>
          <v-flex xs8>
            <chips-control></chips-control>
          </v-flex>

        </v-layout>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
  
      </v-card-actions>
    </v-form> 
  </v-card>
</template>

<script>
import ChipsControl from "@/components/shared/ChipsControl";
import serviciosApi from "@/services/serviciosService";
export default {
  data() {
    return {
      servicio: {},
      valid: true,
      editable: false,
      items: ["http", "https", "udp"],
      estados: [
        "REGISTRADO",
        "ACTIVO",
        "INACTIVO",
        "OBSOLETO",
        "EN MANTENIMIENTO"
      ]
    };
  },
  props: ["idItem"],
  components: {
    ChipsControl
  },
  mounted() {
    serviciosApi.getServicio(this.idItem).then(data => {
      this.servicio = data;
    });
  }
};
</script>