<template>
<div class="login-component">
    <div class="login-header">
        <img src="../assets/logo.png" width="60px" alt="" style="margin: 0 auto">
        <h1>Plataforma de <strong>Interoperabilidad</strong></h1>
    </div>
    <form @submit.prevent="componentLogin">
        <div class="inter-login">
            <input type="text" :disabled="status === 'loading'" autofocus placeholder="usuario" v-model="username">
            <v-icon>person</v-icon>
        </div>
        <div class="inter-login">
            <input type="password" :disabled="status === 'loading'" placeholder="contraseña" v-model="password">
            <v-icon>lock</v-icon>
        </div>
        <div style="text-align:center">
            <div class="login-buttons">
                <v-btn v-if="!isLoggedIn" type="submit" :loading="status === 'loading'" round :disabled="status === 'loading'" class="white--text gradient">
                    Login

                </v-btn>
                <v-btn v-else round @click="componentLogout" class="white--text gradient">Logout

                </v-btn>
            </div>
            <div class="login-links">
                <div class="inter-links" @click.stop="createUser">
                  ¿Crear un nuevo usuario?
                </div>
                <div class="inter-links" @click.stop="openLogin">
                    Modal Dos
                </div>
            </div>
        </div>
    </form>

</div>
</template>

<script>
import EventBus from "@/utils/eventBus";
export default {
  data() {
    return {
      username: "scriales",
      password: "123456"
    };
  },
  props: ["isLoggedIn", "status"],
  methods: {
    createUser() {
      EventBus.$emit("settings", "create-user");
    },
    openLogin() {
      EventBus.$emit("modal", "login-comp");
    },
    componentLogin() {
      this.$emit("onLogin", {
        usuario: this.username,
        clave: this.password
      });
    },
    componentLogout() {
      this.$emit("onLogout");
    }
  }
};
</script>

<style scoped>
.login-header {
  text-align: center;
}

.login-header > h1 {
  color: #717171;
  font-size: 1.2rem;
  font-weight: 400;
  margin: 15px 0 30px 0;
}

.login-buttons > button {
  width: 80%;
  margin: 30px 0 10px 0;
}
.login-links {
  display: inline-flex;
  justify-content: flex-start;
  width: 75%;
  padding: 5px;
}
.login-links > div:last-child {
  margin-left: auto;
}
.login-component {
  padding: 30px 16px;
}

.inter-login {
  width: 80%;
  margin: 0 auto;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 2px 10px 2px 5px;
  margin-bottom: 30px;
  margin-top: 20px;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.2);
  border: solid 2px var(--ds-bg-4);
}

.inter-login i {
  color: var(--inter-primary) !important;
  user-select: none;
}

input[type="text"],
input[type="password"] {
  border: none;
  width: 100%;
  height: 35px;
  padding: 5px 10px;
  color: var(--inter-primary);
  font-size: 1.2rem;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
}
</style>
