<template>
  <div class="container">
    <b-card class="bcard">
      <h2 class="titlecard">Create User</h2>
      <b-form>
        <label for="">First Name</label>

        <b-form-input
          class="input "
          placeholder="Enter first name"
          v-model="firstName"
          required
        ></b-form-input>

        <label class="mt-3" for="">Last Name</label>

        <b-form-input
          class="input"
          placeholder="Enter last name"
          v-model="lastName"
          required
        ></b-form-input>

        <label class="mt-3" for="">Create Username</label>
        <b-form-input
          class="input"
          placeholder="Enter username"
          v-model="userName"
          required
        ></b-form-input>

        <label class="mt-3" for="">Create Password</label>
        <b-form-input
          placeholder="Enter password"
          type="password"
          v-model="password"
          required
          class="input"
        ></b-form-input>
        <label class="mt-3" for="">Select User Type</label>
        <b-form-select v-model="userType" class="input">
          <b-form-select-option :value="null"
            >Please select an option</b-form-select-option
          >
          <b-form-select-option value="sales">Sales</b-form-select-option>
          <b-form-select-option value="warehouse"
            >Warehouse</b-form-select-option
          >
        </b-form-select>

        <b-button
          pill
          block
          type="submit"
          v-on:click="login()"
          class="login-btn"
          >Submit</b-button
        >
        <b-button pill block type="reset" class="reset" variant="danger"
          >Reset</b-button
        >
      </b-form>
      <div class="link">
        <nuxt-link :to="{ name: 'index' }">Back</nuxt-link>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      userType: "",
      optionss: [
        { value: null, text: "Please select user type" },
        { value: "warehouse", text: "Warehouse" },
        { value: "sales", text: "Sales" }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  width: 450px;
  margin: auto;
}
.titlecard {
  text-align: center;
  color: #024059;
}
.shop-img {
  height: 150px;
  margin: 50px 50px 20px 50px;
}

.input {
  border-radius: 10px;
}
.login-btn {
  margin-top: 30px;
}
.link {
  text-align: center;
  margin-top: 10px;
}
.bcard {
  border-radius: 15px;
  margin-top: 190px;
  /* height: 580px; */
}
</style>
