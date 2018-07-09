<template>
  <div>
    <div v-if="header">
      <div class="inter-row-header">
        <div style="min-width:260px">{{data.title1}}</div>
        <div style="margin-left:20px">{{data.title2}}</div>
        <div>{{data.title3}}</div>
        <div>{{data.title4}}</div>
        <div>{{data.title5}}</div>
        <div>{{data.title6}}</div>
      </div>
    </div>

    <div v-else>
      <div class="inter-row">
        <div style="min-width:220px">
          <div class="title-row text-over row-padding">
              <router-link class=" row-link"  :to="`ambientes/detail/${data.id}`">{{data.nombre}}</router-link>
          </div>
          <div class="sub-title-row text-over">
            {{data.descripcion}}
          </div>
        </div>
        <div>
          <div class="title-row">
            {{data.url}}
          </div>
          <div class="sub-title-row">
            {{data.ipServidor}}
          </div>
        </div>
        <div class="align-h-center">
          <div class="protocolo" v-for="(protocolo,index) in data.protocolos" :key="index">
            {{protocolo}}
          </div>
        </div>
        <div class="align-h-center" :state="data.estado">{{data.estado}}</div>
        <div class="align-h-center">{{data.fechaRegistro | normalDate}}</div>
        <div>acciones</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    header: {
      type: Boolean
    }
  }
};
</script>

<style scoped>
div[state="REGISTRADO"] {
  text-transform: lowercase;
  color: #c5e1a5;
}
.align-h-center {
  display: flex;
  align-items: center;
}
.text-over {
  max-width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
}
.row-padding {
  padding-top: 2px;
}
.row-link {
  color: var(--ds-bg-3);
  cursor: pointer;
  text-decoration: none;
}
.row-link:hover {
  text-decoration: underline;
}
.inter-row-header {
  min-width: 100%;
  text-transform: capitalize;
  font-size: 0.9rem;
  color: var(--ds-txt-1);
  display: inline-flex;
  justify-content: space-between;
  position: relative;
}
.inter-row {
  min-width: 100%;
  background-color: var(--ds-bg-2);
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.inter-row::after {
  content: "";
  position: absolute;
  width: 3px;
  background-color: aqua;
  height: 100%;
}

.inter-row > div,
.inter-row-header > div {
  padding: 15px 20px;
  min-width: 150px;
}

.inter-row > div:first-child {
  padding-left: 40px;
}

.title-row {
  font-size: 1rem;
  line-height: 1.1rem;
}
.protocolo {
  color: antiquewhite;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.9rem;
  text-transform: uppercase;
}
.protocolo:not(:last-child)::after {
  content: ",";
  margin-left: -4px;
}
.sub-title-row {
  color: var(--ds-txt-2);
  font-size: 0.9rem;
  line-height: 1rem;
}
</style>

