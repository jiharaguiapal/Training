<template>
  <div>
    <b-container>
      <b-row>
        <h3 class="my-cart-title">My Shopping Cart</h3>
      </b-row>
      <b-row>
        <b-col class="table-col">
          <b-table borderless show-empty :fields="fields" :items="items">
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-button
          size="sm"
          variant="primary"
          v-b-modal.ordermodal
          class="new-order-btn"
        >
          <font-awesome-icon icon="cart-plus" /> Checkout</b-button
        >
      </b-row>
    </b-container>
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
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "first_name",
          label: "Product Details"
        },
        {
          key: "quantity",
          label: "Quantity"
        },
        {
          key: "price",
          label: "Price"
        },
        {
          key: "total",
          label: "Total"
        }
      ],
      items: [
        {
          isActive: true,
          price: 40,
          quantity: 40,
          first_name: "Dickerson",
          total: "4324"
        },
        {
          isActive: false,
          price: 21,
          quantity: 40,
          first_name: "Larsen",
          total: "21"
        },
        {
          isActive: false,
          price: 89,
          quantity: 40,
          first_name: "Geneva",
          total: "234"
        },
        {
          isActive: true,
          price: 38,
          quantity: 40,
          first_name: "Jami",
          total: "321"
        }
      ]
    };
  }
};
</script>
