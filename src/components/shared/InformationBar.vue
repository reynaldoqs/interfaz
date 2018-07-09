<template>
  <div class="search-bar inter-buttons">
    <v-layout row wrap class="text-xs-center text-md-left">
      <v-flex xs12 sm6 class="parche-feo">
        <slot></slot>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-md-right">
        <div class="search-item extra-margin">
          <label class="hidden-sm-and-down">Busqueda</label>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busqueda: ""
    };
  }
};
</script>

<style scoped>
.search-bar {
  padding: 5px 16px;
  width: 100%;
  min-height: 80px;
  background-color: var(--ds-bg-1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.extra-margin {
  margin-top: 10px;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-right: 15px;
  font-size: 1.1rem;
}

.parche-feo {
  display: inline-flex;
  align-items: center;
}

.parche-feo > * {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
