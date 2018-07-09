<template>
<div class="catalogo">
  <button @click="notificacion">Hacer clago</button>
</div>
</template>
<script>
export default {
  methods: {
    notificacion() {
      this.$store.dispatch("notification", {
        message: "This is a menssage to be fixed and uploaded like a boss",
        dangerous: false,
        time: 5000
      });
    }
  }
};
</script>
