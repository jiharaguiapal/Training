<template>
  <b-card bg-variant="info">
    <b-form-row>
      <b-col cols="2 form-inline ">
        <!-- <b-button id="show-btn" @click="showModal" variant="primary"
          >Add delivery</b-button
        > -->
        <b-modal ref="delivery-modal" size="lg" title="Delivery Details"
          ><Deliverymodal /></b-modal
      ></b-col>
      <b-col cols="6 form-inline">
        <label for="datefrom">From: </label>
        <b-form-datepicker type="date" class="form-control" id="datefrom" />
        <label for="dateto">To: </label>
        <b-form-datepicker type="date" class="form-control" id="dateto" />
        <b-button size="" class="my-2 my-sm-0" type=" submit" variant="primary"
          >Go</b-button
        ></b-col
      >
      <b-col cols="4 form-inline"
        ><b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="" class="my-2 my-sm-0" type=" submit" variant="primary"
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
      this.$refs["delivery-modal"].show();
    }
  },

  props: {}
};
</script>

<style scoped></style>
