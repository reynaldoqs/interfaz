<template>
  <div>
    <v-dialog v-model="dialog" max-width="400" lazy>
      <v-card>
        <component v-bind:is="currentTabComponent"></component>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from "@/utils/eventBus";
import LoginModal from "@/components/modals/LoginModal";
export default {
  data() {
    return {
      dialog: false,
      currentTabComponent: ""
    };
  },
  components: {
    "login-comp": LoginModal
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.currentTabComponent = "";
      }
    }
  },
  mounted() {
    EventBus.$on("modal", item => {
      console.log(item);
      this.currentTabComponent = item;
      this.dialog = true;
    });
    EventBus.$on("closeModal", () => {
      this.dialog = false;
    });
  },
  beforeDestroy() {
    EventBus.$off("modal");
    EventBus.$off("closeModal");
  }
};
</script>
