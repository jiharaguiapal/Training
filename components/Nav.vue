<template>
  <div>
    <b-navbar
      toggleable="lg"
      class="nav-header"
      active-class="font-weight-bold "
    >
      <b-navbar-brand href="#" class="icon-name"> LOUGEH TECH</b-navbar-brand>
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
          <b-nav-item active-class="active" href="/main"> Admin</b-nav-item>
          <b-nav-item active href="/supermarket"> Home</b-nav-item>
          <b-nav-item href="/supermarket/products"> Shop</b-nav-item>
          <b-nav-item href="/supermarket/cart"> Cart</b-nav-item>
          <!-- <b-nav-item> -->
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item class="dropDown" href="#">Profile</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item v-b-modal.loginModal>Sign In</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- </b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div>
      <b-modal
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
