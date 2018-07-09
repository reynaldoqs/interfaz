<template>
  <div class="settings-header">
    <div class="settings-header-icon">
      <div class="settings-icon">
        <v-icon>{{icon}}</v-icon>
      </div>
    </div>
    <div class="settings-information">
      <h3>{{title}}</h3>
      <small>{{description}}</small>
    </div>
  </div>
</template>
<script>
export default {
  name: "settings-header",
  props: ["icon", "title", "description"]
};
</script>

<style>
.settings-header-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.settings-header {
  text-align: center;
  padding: 16px 5px 20px 5px;
}
.settings-icon {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: white;
  text-align: center;
}

.settings-icon > i {
  font-size: 3rem;
  line-height: 52px;
  color: var(--inter-primary) !important;
}
</style>
