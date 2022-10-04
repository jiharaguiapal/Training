<template>
  <div>
    <b-tabs
      card
      pills
      active-nav-item-class="font-weight-bold "
      justified
      vertical
      class="sidetab"
    >
      <b-tab title="Supplier" active>
        <template #title>
          <font-awesome-icon icon="store" /> Supplier
        </template>
        <Suppliertable />
      </b-tab>
      <b-tab title="Delivery">
        <template #title> <font-awesome-icon icon="truck" /> Delivery </template
        ><Deliverytable
      /></b-tab>
      <b-tab title="Product">
        <template #title>
          <font-awesome-icon icon="boxes" class="mr-1" /> Product </template
        ><Producttable
      /></b-tab>

      <b-tab title="Sales">
        <template #title>
          <font-awesome-icon icon="receipt" class="mr-2" />
          Sales </template
        ><Salestable
      /></b-tab>
      <b-tab title="Customers">
        <template #title>
          <font-awesome-icon icon="user-tag" /> Customer </template
        ><Customerstable
      /></b-tab>
      <b-tab title="Users">
        <template #title>
          <font-awesome-icon icon="user" class="mr-2" /> User </template
        ><Userstable
      /></b-tab>
    </b-tabs>
  </div>
</template>
<script>
export default {
  position: " "
};
</script>
<style lang="scss" scoped>
.card-body {
  height: 92vh;
  padding: 0;
}
.title {
  font-size: 50px;
  padding: 0;
}
</style>
