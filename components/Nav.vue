<template>
  <div>
    <b-navbar
      toggleable="lg"
      class="nav-header"
      active-class="font-weight-bold "
    >
      <b-navbar-brand href="#" class="icon-name"> LOUGEHTECH</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

        <!-- Right aligned nav items -->
        <!-- <div>
            <h1 class="title">Admin</h1>
          </div> -->

        <b-navbar-nav class="ml-auto navTabs">
          <!-- <b-button
            size="sm"
            variant="outline-white"
            v-b-modal.ordermodal
            class="new-order-btn"
          >
            <font-awesome-icon icon="cart-plus" /> Checkout</b-button
          > -->
          <b-nav-item
            active-class="active"
            href="/main"
            v-if="adminUser && checkToken"
          >
            Admin</b-nav-item
          >
          <b-nav-item active href="/supermarket"> Home</b-nav-item>
          <b-nav-item href="/supermarket/products"> Shop</b-nav-item>
          <b-nav-item href="/supermarket/cart">
            <font-awesome-icon icon="shopping-cart" /> My Cart
          </b-nav-item>
          <b-nav-item v-b-modal.loginModal v-if="!checkToken">
            Sign In
          </b-nav-item>
          <!-- <b-nav-item> -->
          <b-nav-item-dropdown text="User" right v-if="checkToken">
            <b-dropdown-item class="dropDown" href="#">
              <font-awesome-icon icon="user" /> Profile</b-dropdown-item
            >

            <!-- <b-dropdown-item>
              <font-awesome-icon icon="user" /> Sign In</b-dropdown-item
            > -->
            <b-dropdown-item href="/" @click.native="signOut()">
              <font-awesome-icon icon="user" /> Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <!-- </b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div>
      <b-modal
        centered
        header-bg-variant="white"
        id="loginModal"
        size="xl"
        class="order-modal"
        hide-footer
        hide-header
        no-close-on-backdrop
      >
        <Login />
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    checkToken() {
      if (localStorage.SecretKey) {
        return true;
      } else {
        return false;
      }
    },
    adminUser() {
      if (localStorage.role == "admin" || localStorage.role == "Admin") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    signOut() {
      console.log("out");
      localStorage.clear();
    }
  }
};
</script>

<style lang="scss" scoped>
/* .container {

} */
</style>
