<template>
  <div>
    <div class="inter-card-container inter-container">
      <usuarios-data-table/>
    </div>
  </div>
</template>

<script>
import UsuariosDataTable from "@/components/usuarios/UsuariosDataTable";
export default {
  components: {
    "usuarios-data-table": UsuariosDataTable
  }
};
</script>
