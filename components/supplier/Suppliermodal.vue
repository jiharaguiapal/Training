<template>
  <b-form class="modalmargin" @submit.prevent="additem" id="app">
    <label for="companyname">Company Name: </label>
    <b-form-input
      class="form-control"
      type="text"
      placeholder="Enter Company or Supplier name"
      id="companyname"
      v-model="newitem"
    />

    <label for="supplieraddress">Company Address: </label>
    <b-form-input
      class="form-control"
      type="text"
      placeholder=" Enter Company address"
      id="supplieraddress"
    />
    <label for="companycontact">Contact Number: </label>
    <b-form-input
      class="form-control"
      type="number"
      placeholder="Enter Company contact number"
      id="companycontact"
    />
  </b-form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      newitem: ""
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    }
  },
  ...mapMutations(["additem"]),
  additem: function() {
    this.additem(this.newitem);
    this.newitem = "";
  }
};
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
