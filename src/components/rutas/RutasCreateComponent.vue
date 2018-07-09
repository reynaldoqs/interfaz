<template>
  <div class="crear-rutas-container">
    <v-tabs v-model="tab" color="teal" grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="item in tabItems" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <div class="create-rutas">
      <v-tabs-items v-model="tab" class="create-rutas-tab-items">
        <v-tab-item key="Datos de la ruta">
          <create-1 v-on:datosUno="datosUno"/>
        </v-tab-item>
        <v-tab-item key="Payload">
          <create-2 :idServicio="datosGenerales.idGeneralService" v-on:datosDos="datosDos"/>
        </v-tab-item>
        <v-tab-item key="Parametros">
          <create-3 v-on:datosTres="datosTres"/>
        </v-tab-item>
        <v-tab-item key="Respuestas">
          <create-4 v-on:datosCuatro="datosCuatro"/>
        </v-tab-item>
      </v-tabs-items>
<!--       <div class="create-buttons">
        <v-btn v-if="tab === 0" @click="validar" :disabled="!valid1" flat round outline :loading="!editable1">Verificar Datos</v-btn>
        <v-btn v-else @click="save" :disabled="!valid2" flat round outline :loading="!editable2">Crear Usuario</v-btn>
      </div> -->
      <v-btn round @click="guardar">guardar!!</v-btn>
      <v-btn round @click="next">next!!</v-btn>
    </div>
    <pre>
      {{tabItems}}
    </pre>
  </div>
</template>
<script>
import Create1 from "@/components/rutas/RutasCreateOne";
import Create2 from "@/components/rutas/RutasCreateTwo";
import Create3 from "@/components/rutas/RutasCreateThree";
import Create4 from "@/components/rutas/RutasCreateFour";
/* import definicionesApi from "@/services/definicionesService";*/
import rutasApi from "@/services/rutasService";
export default {
  name: "crear-rutas",
  data() {
    return {
      rutasModel: {
        nombre: "",
        version: "",
        metodo: "POST",
        baseUrl: "",
        descripcion: "",
        prefijoOperacion: "",
        seguridad: "JWT",
        parametros: [],
        idServicio: "",
        respuestas: [],
        cuerpoSolicitud: null
      } /* ,
      extraCuerpoSolicitud: {
        requerido: null,
        descripcion: null,
        contenido: {
          tipoContenido: "application/json",
          idReferencia: ""
        }
      } */,
      tabItems: [
        "Datos de la ruta" /* , "Payload", "Parametros", "Respuestas" */
      ],
      isEditable: [true, true, true, true],
      tab: 0,
      //datos generales
      datosGenerales: {
        idRutaToBepatched: "",
        idGeneralService: "",
        cuerpoSolicitud: {
          requerido: null,
          descripcion: null,
          contenido: {
            tipoContenido: "application/json",
            idReferencia: ""
          }
        },
        parametros: null,
        respuestas: null
      }
    };
  },
  methods: {
    datosUno(valor) {
      this.datosGenerales.idRutaToBepatched = valor.idRuta;
      this.datosGenerales.idGeneralService = valor.idServicio;
      this.tabItems.push("Payload");
      this.next();
    },
    datosDos(valor) {
      this.datosGenerales.cuerpoSolicitud.requerido = valor.requerido;
      this.datosGenerales.cuerpoSolicitud.descripcion = valor.descripcion;
      this.datosGenerales.cuerpoSolicitud.contenido.idReferencia =
        valor.idDefinicion;
      this.tabItems.push("Parametros");
      this.next();
    },
    datosTres(valor) {
      this.datosGenerales.parametros = valor;
      this.tabItems.push("Respuestas");
      this.next();
    },
    datosCuatro(valor) {
      this.datosGenerales.respuestas = valor;
      rutasApi.patchRuta(this.datosGenerales.idRutaToBepatched, {
        cuerpoSolicitud: this.datosGenerales.cuerpoSolicitud,
        parametros: this.datosGenerales.parametros,
        respuestas: this.datosGenerales.respuestas
      });
    },
    next() {
      const active = parseInt(this.tab);
      this.tab = active < 3 ? active + 1 : 0;
    },
    async guardar() {
      /*       try {
        if (this.idRutaToBepatched === "") {
          const idRuta = await rutasApi.postRuta(this.rutasModel);
          this.idRutaToBepatched = idRuta.id;
        }
        const idDefinition = await definicionesApi.postDefinicion(
          this.fullCuerpoSolicitud
        );
        this.extraCuerpoSolicitud.contenido.idReferencia = idDefinition.id;
        this.rutasModel.cuerpoSolicitud = Object.assign(
          {},
          this.extraCuerpoSolicitud
        );
        await rutasApi.patchRuta(this.idRutaToBepatched, {
          cuerpoSolicitud: this.extraCuerpoSolicitud
        });
        this.$store.dispatch("notification", { message: "Ruta guardada" });
      } catch (e) {
        this.$store.dispatch("notification", {
          message: e.response.data.error,
          dangerous: true
        });
      } */
    },

    cambiarParametros(valor) {
      this.rutasModel.parametros = valor;
    },
    cambiarRespuestas(valor) {
      this.rutasModel.respuestas = valor;
    }
  },
  components: {
    Create1,
    Create2,
    Create3,
    Create4
  }
};
</script>
<style>
.crear-rutas-container {
  max-width: 700px !important;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.create-rutas {
  overflow-y: auto;
  width: 100%;
  background-color: var(--ds-bg-2);
  padding: 16px 26px 16px 16px;
}
.create-rutas-tab-items {
  min-height: 600px;
}
.create-rutas-form-container {
  padding-top: 20px;
  min-height: 620px;
}
.create-rutas-buttons {
  text-align: center;
  padding: 16px 0;
}
@media screen and (max-width: 800px) {
  .create-rutas {
    padding: 16px 10px 16px 0px;
  }
}
</style>
