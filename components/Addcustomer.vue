<template>
  <b-form class="modalmargin" @submit.prevent="addcustomer">
    <label for="productname">Customer Name</label>
    <b-form-input
      class="form-control"
      type="text"
      placeholder="Enter Customer Name"
      v-model="customer.name"
      required
    />

    <label for="productdesc">Customer Address</label>
    <b-form-input
      class="form-control"
      type="text"
      placeholder="Enter Customer Address"
      v-model="customer.address"
      required
    />
    <b-form class="">
      <label for="unitcost">Contact Number</label>
      <input
        class="form-control"
        type="number"
        placeholder="Enter Contact Number"
        v-model="customer.contact_number"
        required
      />
    </b-form>
    <br />
    <b-button type="submit" variant="primary">Continue</b-button>
    <b-button class="reset" type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>
