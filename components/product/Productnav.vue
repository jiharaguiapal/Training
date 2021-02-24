<template>
  <div>
    <b-card bg-variant="info">
      <b-form-row>
        <b-col cols="2 form-inline ">
          <!-- <b-button id="show-btn" @click="showModal" variant="primary"
            >Add product</b-button
          > -->
          <b-modal ref="product-modal" size="lg" title="Product Details"
            ><Productmodal />
          </b-modal>
        </b-col>
        <b-col cols="6 form-inline"></b-col>
        <b-col cols="4 form-inline">
          <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button
            size=""
            class="my-2 my-sm-0"
            type=" submit"
            variant="primary"
            >Search</b-button
          >
        </b-col>
      </b-form-row>
    </b-card>
  </div>
</template>
<script>
export default {
  methods: {
    showModal() {
      this.$refs["product-modal"].show();
    }
  }
};
</script>

<style scoped></style>
