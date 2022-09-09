<template>
  <div class="">
    <div class="navcon">
      <b-navbar toggleable="lg" type="dark" variant="secondary">
        <b-navbar-brand href="#"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

          <!-- Right aligned nav items -->
          <div>
            <h1 class="title">Supermarket</h1>
          </div>

          <b-navbar-nav class="ml-auto">
            <b-button
              size="sm"
              variant="outline-white"
              v-b-modal.ordermodal
              class="new-order-btn"
            >
              <font-awesome-icon icon="cart-plus" /> New Order</b-button
            >
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content> <em>User</em> </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#"
                ><NuxtLink class="link" :to="{ name: 'index' }"
                  >Sign out</NuxtLink
                ></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <div>
        <b-modal
          id="ordermodal"
          size="huge"
          class="order-modal"
          title="New Order"
          hide-footer
          scrollable
          no-close-on-backdrop
        >
          <Neworder />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
/* .container {
 
} */
.banner {
  height: 130px;
}
.title {
  /* padding-left: 300px; */
  color: aliceblue;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.card-header {
  width: 250px;
}
.nav-link {
  margin: 0.5rem 0;
}
.order-modal {
  width: 200px;
}
modal-xl {
  width: 700px !important;
}
.modal-dialog {
  height: 90vh;
}
.link {
  // border: 1px solid red;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: white;
  }
}
</style>
