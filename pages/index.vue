<template>
  <div class="container">
    <b-card class="bcard">
      <b-form>
        <div>
          <b-img src="@/assets/img/shop.svg" class="shop-img"></b-img>
        </div>
        <h2 class="titlecard">Lou Geh</h2>
        <h2 class="titlecard">Supermarket</h2>
        <label for=""></label>
        <b-form-input
          @keyup.enter="loginUser()"
          class="input"
          placeholder="Enter username"
          v-model="user.username"
          required
        ></b-form-input>

        <label for=""></label>
        <b-form-input
          @keyup.enter="loginUser()"
          placeholder="Enter password"
          type="password"
          v-model="user.password"
          required
          class="input"
        ></b-form-input>
        <br />
        <b-button pill block @click="loginUser" class="login-btn"
          >Login</b-button
        >
        <!-- <div class="link">
          <nuxt-link :to="{ name: 'registeruser' }">Create New User</nuxt-link>
        </div> -->
      </b-form>
    </b-card>
    <b-alert
      class="alert"
      :show="alert.showAlert"
      dismissible
      :variant="alert.variant"
      @dismissed="alert.showAlert = null"
    >
      <font-awesome-icon
        :icon="alert.variant == 'success' ? 'check-circle' : 'exclamation'"
        class="mr-1 alert__icon"
      />
      {{ alert.message }}
    </b-alert>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import axios from "axios";
import VueAxios from "vue-axios";

export default {
  // middleware: "authenticate",

  name: "Login",
  data() {
    return {
      counter: 0,
      users: [],
      user: [],
      errors: [],
      username: "",
      password: "",
      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      }
    };
  },

  created() {},
  head() {
    return {
      title: "Login"
    };
  },

  computed: {
    ...mapGetters({
      userState: "allUsers"
    })
  },
  methods: {
    toast(toaster, append = false, variant, message, title) {
      this.counter++;
      this.$bvToast.toast(message, {
        title: title,
        toaster: toaster,
        solid: true,
        variant: variant,
        appendToast: append
      });
    },
    async loginUser() {
      // this.$router.push("/main");
      await axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/users/login`,

        data: {
          username: this.user.username,
          password: this.user.password
        }
      })
        .then(res => {
          localStorage.username = res.data.User.data[0].username;
          localStorage.SecretKey = res.data.User.token;

          this.$router.push("/main");
          // this.showAlert(res.data.message, "success");
          let msg = res.data.message;

          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");

          this.user = [];
        })
        .catch(err => {
          // this.showAlert(err.response.data.error, "danger");
          let errMsg = err.response.data.error;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
        });
    },

    showAlert(message, variant) {
      this.alert = {
        showAlert: 3,
        dismissSecs: 2,

        variant,
        message
      };
    },
    async login() {
      this.showLoading = true;
      await axios({
        method: "POST",
        url: `${this.$axios.defaults.baseURL}/login`,
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(result => {
          if (this.username == this.userpassword) {
            this.$router.push("/main");
          } else {
            if (!result.data.user_actions) {
              this.showAlert(`User don't have access rights.`, "danger");
            } else {
            }

            this.showLoading = false;
          }
        })
        .catch(err => {
          this.showLoading = false;
          if (err.response && err.response.data.errorMsg) {
            this.showAlert(err.response.data.errorMsg, "danger");
          } else {
            this.showAlert(err.message, "danger");
          }
        });
    }
  }
};
</script>

<style scoped>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.link {
  margin-top: 10px;
}
.container {
  width: 450px;
  text-align: center;
}
.titlecard {
  text-align: center;
  color: #28594b;
}
.shop-img {
  height: 110px;
  margin: 50px 50px 20px 50px;
}
label {
  margin-top: 10px;
}
.input {
  border-radius: 25px;
}
.bcard {
  border: none;
  border-radius: 15px;
  margin-top: 80px;

  height: 580px;
}
</style>
