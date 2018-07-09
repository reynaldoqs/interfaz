<template>
  <div>
    <inter-table :headers="usuarioHeaders" :items="usuarios"/>
  </div>
</template>
<script>
import InterDataTable from "@/components/shared/InterDataTable";
import usuariosApi from "@/services/usuariosService";

export default {
  data() {
    return {
      usuarios: [],
      usuarioHeaders: [
        { title: "Usuario", type: "user" },
        { title: "Correo Electrónico", type: "user" },
        { title: "Carnet de Identidad", type: "user" },
        { title: "Teléfonos", type: "user" },
        { title: "Entidad", type: "user" }
      ]
    };
  },
  components: {
    "inter-table": InterDataTable
  },
  mounted() {
    usuariosApi.getUsuarios().then(data => {
      this.usuarios = data.usuarios;
    });
  }
};
</script>
