<template>
  <b-form class="modalmargin">
    <label for="productcode">Product Barcode</label>
    <b-form-input
      class="form-control"
      type="text"
      placeholder="Enter Product Barcode"
    />
    <label for="productname">Product Name</label>
    <b-form-input
      class="form-control"
      type="text"
      placeholder="Enter Product Name"
    />

    <b-form class="form-inline">
      <label for="unitcost">Cost per unit</label>
      <input
        class="form-control"
        type="text"
        placeholder="Enter cost per unit"
      />
      <label for="productname">Quantity</label>

      <b-form-input
        class="form-control"
        type="text"
        placeholder="Enter product quantity"
      />
    </b-form>

    <label for="productname">Select Supplier:</label>
    <select class="form-control">
      <option>BestFoods</option>
      <option>Cargill</option>
      <option>PhilBest</option>
      <option>RD Fishing</option>
    </select>
  </b-form>
</template>

<script>
export default {};
</script>

<style scoped>
.modalmargin {
  margin: 0 20px 0 20px;
}
input {
  margin: 0px 0 10px 0;
}
label {
  margin: 0 10px 10px 0;
}
</style>
