<template>
  <div class="side-var-view">
    <div class="user-info" v-bind:class="{active: isUserAuthenticated}">
      <div class="top-options">
  
      </div>
    </div>
    <v-list class="my-list left-bar">
      <v-tooltip right v-for="(link, i) in links" :key="i">
      <v-list-tile slot="activator" value="true" :to="link.to">
          <v-list-tile-action>
            <v-icon v-html="link.icon"></v-icon>
          </v-list-tile-action>
      </v-list-tile>
      <span>{{link.title}}</span>
      </v-tooltip>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      links: [
        {
          icon: "people_outline",
          title: "Usuarios",
          to: "/admin/usuarios"
        },
        {
          icon: "cast_connected",
          title: "Ambientes",
          to: "/admin/ambientes"
        },
        {
          icon: "cloud_queue",
          title: "Servicios",
          to: "/admin/servicios"
        },
        {
          icon: "call_split",
          title: "Rutas",
          to: "/admin/rutas"
        },
        {
          icon: "account_balance",
          title: "Entidades",
          to: "/admin/entidades"
        },
        {
          icon: "description",
          title: "Noticias",
          to: "/admin/noticias"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "isUserAuthenticated"])
  }
};
</script>

<style scoped>
.my-list {
  background-color: transparent !important;
}
.theme--dark .icon {
  color: #516161;
  position: relative;
}

.top-options {
  width: 100%;
  height: 65px;
}
</style>
