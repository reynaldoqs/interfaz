<template>
        <v-layout wrap>
        <v-flex sm12 md3>
          <div class="tab-menu-container">
            <div class="tab-title">
              {{menuItems.title}}
            </div>
            <div class="tab-menu inter-buttons" v-for="(item, index) in menuItems.components" :key="index">
              <v-btn flat round @click="changeComponent(item.component)">
                <v-icon left color="green">{{item.icon}}</v-icon>
                {{item.title}}
              </v-btn>
            </div>
          </div>
        </v-flex>
        <v-flex sm12 md9>
          <transition name="iop-tabs-fade" mode="out-in">
            <slot>
            </slot>
          </transition>
        </v-flex>
      </v-layout>
</template>
<script>
export default {
  props: {
    menuItems: {
      type: Object
    }
  },
  methods: {
    changeComponent(value) {
      this.$emit("onChangeComponent", value);
    }
  }
};
</script>
<style>
.tab-menu-container {
  padding: 0 26px 10px 26px;
}
.tab-title {
  width: 100%;
  background-color: var(--ds-bg-1);
  padding: 10px 20px;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  margin-bottom: 10px;
  font-size: 1.3rem;
  text-align: center;
}
.tab-menu {
  padding-left: 20px;
}
.iop-tabs-fade-enter-active,
.iop-tabs-fade-leave-active {
  transition: opacity 0.2s ease;
}
.iop-tabs-fade-enter,
.iop-tabs-fade-leave-to {
  opacity: 0;
}
</style>
