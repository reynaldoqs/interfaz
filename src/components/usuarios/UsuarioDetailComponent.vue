<template>
  <div>
    <div class="inter-card-container inter-container">
      <v-layout wrap>
        <v-flex sm12 md8>
          <usuarioDetailForm :userModel="userModel" />
        </v-flex>
        <v-flex sm12 md3 offset-md1>
          <usuarioDetailView :userModel="userModel" />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import usuariosApi from "@/services/usuariosService";
import usuarioDetailForm from "@/components/usuarios/UsuarioDetailForm";
import usuarioDetailView from "@/components/usuarios/UsuarioDetailView";
import check from "@/utils/checkChanges";
import EventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      userModel: {},
      userOldModel: {}
    };
  },
  components: {
    usuarioDetailForm,
    usuarioDetailView
  },
  mounted() {
    EventBus.$on("onSaveUser", () => {
      usuariosApi.patchUsuario(
        this.$route.params.id,
        check.checkIt(this.userOldModel, this.userModel)
      );
    });
    usuariosApi.getUsuario(this.$route.params.id).then(usuario => {
      //this.userOldModel = Object.assign({}, usuario); no funciona con los key que son obj y array
      this.userModel = usuario;
      this.userOldModel = JSON.parse(JSON.stringify(usuario));
    });
  }
};
</script>
