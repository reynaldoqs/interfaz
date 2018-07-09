<template>
  <div class="usuario-detail-view">
    <div class="header-information">
      Datos generales
    </div>
    <div class="information-container">

      <div class="information-row">
        <div class="left-information">
          Nombres
        </div>
        <div class="right-information">
          {{userModel.nombres}}
        </div>
      </div>

      <div class="information-row">
        <div class="left-information">
          Primer apellido
        </div>
        <div class="right-information">
          {{userModel.primerApellido}}
        </div>
      </div>

      <div class="information-row" v-show="userModel.segundoApellido">
        <div class="left-information">
          Segundo apellido
        </div>
        <div class="right-information">
          {{userModel.segundoApellido}}
        </div>
      </div>

      <div class="information-row">
        <div class="left-information">
          Carnet de identidad
        </div>
        <div class="right-information">
          {{userModel.numeroCarnetIdentidad}}
          <span>-{{userModel.complementoCarnetIdentidad}}</span>
        </div>
      </div>

      <div class="information-row">
        <div class="left-information">
          Usuario
        </div>
        <div class="right-information">
          {{userModel.usuario}}
        </div>
      </div>

      <div class="information-row">
        <div class="left-information">
          Correo electrónico
        </div>
        <div class="right-information">
          {{userModel.correoElectronico}}
        </div>
      </div>

      <div class="information-row">
        <div class="left-information">
          Número de celular
        </div>
        <div class="right-information">
          <span v-for="(telefono, index) in userModel.telefonoCelular" :key="index">
            {{telefono}}
          </span>
        </div>
      </div>

      <div class="information-row">
        <div class="left-information">
          Estado
        </div>
        <div class="right-information">
          {{userModel.estado}}
        </div>
      </div>
    </div>
  <v-divider></v-divider>
  <div class="aditional-container">
    
  </div>
  </div>
</template>
<script>
export default {
  props: {
    userModel: {
      type: Object
    }
  }
};
</script>
<style scoped>
.usuario-detail-view {
  padding: 0 16px;
}
.header-information {
  background-color: var(--ds-bg-1);
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}
.information-container {
  padding: 16px 0;
}
.information-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
}
.left-information {
  width: 45%;
  padding: 2px 3px;
  font-family: "Courier New", Courier, monospace;
  color: var(--ds-txt-2);
  text-align: right;
  font-size: 0.9rem;
}
.right-information {
  width: 55%;
  padding: 2px 3px;
  text-align: left;
  font-size: 0.95rem;
}
</style>
