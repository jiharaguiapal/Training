<template>
  <b-form class="modalmargin">
    <label for="companyname">Select Company Name: </label>
    <select class="form-control">
      <option>BestFoods</option>
      <option>Cargill</option>
      <option>PhilBest</option>
      <option>RD Fishing</option>
    </select>

    <label for="supplieraddress">Delivery Number: </label>
    <b-form-input class="form-control " type="text" placeholder=" Enter " />
    <label for="companycontact">Delivery Date: </label>
    <b-form-datepicker
      class="form-control col-sm-4"
      type="date"
      placeholder="Selet Delivery Date"
    />
  </b-form>
</template>

<script>
export default {};
</script>

<style scoped>
.modalmargin {
  margin: 0 20px 0 20px;
}
input,
select {
  margin: 0px 0 10px 0;
}
label {
  margin: 0 10px 10px 0;
}
</style>

</style>>
