<template>
<v-app dark>
    <router-view/>
    <v-snackbar
      :timeout="time"
      v-model="isOn"
      :right="dangerous"
      :top="dangerous"
      multi-line
      white
      auto-height
      :bottom="!dangerous"
      :color="dangerous ?'red lighten-1':'green darken-1'"
    >
    <div class="inter-snack-bar">
        <div class="snack-icon">
          <v-icon v-text="dangerous ?'error_outline':'check_circle_outline'"></v-icon>
        </div>
        <div class="snack-container">
          <span v-if="dangerous" class="snack-title">Error</span>
          <span class="snack-message">{{ message }}</span>
        </div>
    </div>
    </v-snackbar>
        <main-modals/>
        <md-modal/>
</v-app>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { BASE_URL } from "./config/config.js";
import accountSettingsMainComponent from "@/components/accountSettings/accountSettingsMainComponent";
import ModalMainComponent from "@/components/modals/ModalMainComponent";
export default {
  name: "App",
  created() {
    //hacer un archivo para configurar los defaults de axios
    axios.defaults.baseURL = BASE_URL;
    //configurando la autorizacion de axios si el usuario esta en el storage
    if (this.$store.getters.isUserAuthenticated) {
      let token = JSON.parse(localStorage.getItem("user")).accesos.token;
      axios.defaults.headers.common["Authorization"] = token;
    }
  },
  computed: {
    ...mapGetters(["isOn", "dangerous", "time", "message"])
  },
  components: {
    "main-modals": accountSettingsMainComponent,
    "md-modal": ModalMainComponent
  }
};
</script>
<style>
.inter-snack-bar {
  max-width: 300px;
  display: flex;
}
.snack-title {
  text-decoration: underline;
  display: block;
  margin-bottom: 5px;
}
.snack-icon {
  padding: 0 10px 0 0;
}
.snack-message {
  font-size: 0.9rem;
  line-height: 0.5rem;
  font-weight: 400;
}
</style>
