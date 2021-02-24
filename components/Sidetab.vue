<template>
  <div>
    <b-card card-body>
      <b-tabs pills active-nav-item-class="font-weight-bold " justified>
        <b-tab title="Supplier" active>
          <template #title>
            <font-awesome-icon icon="store" /> Supplier
          </template>
          <Suppliertable />
        </b-tab>
        <b-tab title="Delivery">
          <template #title>
            <font-awesome-icon icon="truck" /> Delivery </template
          ><Deliverytable
        /></b-tab>
        <b-tab title="Product">
          <template #title>
            <font-awesome-icon icon="boxes" /> Product </template
          ><Producttable
        /></b-tab>
        <!-- <b-tab title="New Order">
          <template #title>
            <font-awesome-icon icon="cart-plus" /> New Order </template
          ><Neworder
        /></b-tab> -->
        <b-tab title="Sales">
          <template #title>
            <font-awesome-icon icon="receipt" /> Sales </template
          ><Salestable
        /></b-tab>
        <b-tab title="Customers">
          <template #title>
            <font-awesome-icon icon="user-tag" /> Customer </template
          ><Customerstable
        /></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.card-body {
  height: 100vh;
  padding: 0 20px;
}
.title {
  font-size: 50px;
}
</style>
