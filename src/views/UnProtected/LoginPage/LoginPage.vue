<template>
<div class="login">
    <div class="left-section hidden-sm-and-down">
      <div class="top"></div>
      <div class="bottom">
        <img src="../../../assets/logo agetic blanco.png" alt="Agetic" width="150px">
      </div>
    </div>
    <div class="right-section">
      <div class="login-container">
        <div class="login-form">
            <LoginComponent
                :isLoggedIn="isUserAuthenticated"
                :status="authStatus"
                v-on:onLogin="login"
                v-on:onLogout="logout"
            />
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginComponent from "@/components/LoginComponent";
export default {
  name: "LoginPage",
  components: {
    LoginComponent
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    ...mapActions(["logout", "notification"]),
    login(creds) {
      this.$store.dispatch("login", creds).then(() => {
        this.notification({ message: "login successful" });
        this.$router.push("/admin");
      });
    }
  },
  computed: {
    ...mapGetters(["isUserAuthenticated", "authStatus"])
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  --right-size: 420px;
}

.left-section {
  background-color: var(--inter-primary);
  background-image: url(../../../assets/bg.jpg);
  background-size: cover;
  width: calc(100% - var(--right-size));
  margin: 0 auto;
  height: 100%;
  display: flex;
  padding: 25px;
  align-items: flex-end;
  justify-content: flex-end;
}
.left-image {
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/bg.jpg);
  background-size: cover;
  opacity: 0.6;
}

.right-section {
  width: var(--right-size);
  height: 100%;
  margin: 0 auto;
  max-width: 100%;
  box-shadow: -3px 0 6px rgba(0, 0, 0, 0.16);
}

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.login-form {
  border-radius: 2px;
  width: 360px;
  max-width: 100%;
  max-height: 100%;
  padding: 0;
  overflow: hidden;
}
</style>
