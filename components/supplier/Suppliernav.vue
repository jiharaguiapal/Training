<template>
  <b-card bg-variant="info">
    <b-form-row>
      <b-col cols="2 form-inline ">
        <!-- <b-button id="show-btn" @click="showModal" variant="primary"
          >Add supplier</b-button
        > -->
        <b-modal ref="supplier-modal" size="lg" title="Supplier Details"
          ><Suppliermodal /></b-modal
      ></b-col>
      <b-col cols="6 form-inline"></b-col>
      <b-col cols="4 form-inline"
        ><b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="" class="" type=" search" variant="primary"
          >Search</b-button
        ></b-col
      >
    </b-form-row>
  </b-card>
</template>
<script>
export default {
  methods: {
    showModal() {
      this.$refs["supplier-modal"].show();
    }
  }
};
</script>

<style scoped></style>
