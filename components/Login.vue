<template>
  <div>
    <b-row no-gutters class="container">
      <b-col class="img-bg">
        <b-row> </b-row>
        <b-row>
          <b-card-img
            src="~/static/imgs/login-illus.svg"
            alt="Image"
            class="rounded-0 image-ill"
          ></b-card-img>
        </b-row>
      </b-col>
      <b-col md="6">
        <b-row>
          <font-awesome-icon
            class="xButton"
            icon="times"
            @click="$bvModal.hide('loginModal')"
          />
        </b-row>
        <b-card-body>
          <b-form>
            <b-img src="~/static/imgs/l.png" class="shop-img"></b-img>
            <!-- <h2 class="titlecard">LougehTech</h2>
            <h2 class="titlecard">Shop</h2> -->
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
            <div class="link">
              <nuxt-link :to="{ name: 'registeruser' }">Sign Up</nuxt-link>
            </div>
          </b-form>
          <b-alert
            class="alert"
            :show="alert.showAlert"
            dismissible
            :variant="alert.variant"
            @dismissed="alert.showAlert = null"
          >
            <font-awesome-icon
              :icon="
                alert.variant == 'success' ? 'check-circle' : 'exclamation'
              "
              class="mr-1 alert__icon"
            />
            {{ alert.message }}
          </b-alert>
        </b-card-body>
      </b-col>
    </b-row>
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
        url: `${this.$axios.defaults.baseURL}/user/login`,

        data: {
          username: this.user.username,
          password: this.user.password
        }
      })
        .then(res => {
          localStorage.username = res.data.User.data[0].username;
          localStorage.id = res.data.User.data[0].id;
          localStorage.firstname = res.data.User.data[0].first_name;
          localStorage.lastname = res.data.User.data[0].last_name;
          localStorage.role = res.data.User.data[0].role;
          localStorage.address = res.data.User.data[0].address;
          localStorage.SecretKey = res.data.User.token;
          if (
            res.data.User.data[0].role == "Admin" ||
            res.data.User.data[0].role == "admin"
          ) {
            this.$router.push("/main");
          } else {
            this.$router.push("/");
            // @click="$bvModal.hide('loginModal')"
            this.$root.$emit("bv::show::modal", "loginModal", "loginModal");
          }
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
    close() {
      this.$refs["loginModal"].hide();
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
  font-size: 16px;
}
.container {
  /* width: 450px; */
  text-align: center;
  border: none;
  padding: 0;
}
.titlecard {
  text-align: center;
  color: #012340;
  font-weight: 600;
}
.shop-img {
  height: 250px;
  margin: 0 0 20px 0;
  /* margin: 50px 50px 20px 50px; */
}
label {
  margin-top: 10px;
}
.input {
  border-radius: 25px;
}
</style>
