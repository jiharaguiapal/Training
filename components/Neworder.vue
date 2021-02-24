<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="">
          <b-card>
            <b-form @submit.prevent="adddetail" class="form-inline">
              <b-row>
                <label for="">Select: </label>
                <b-col cols="" class="form-inline">
                  <b-form-input
                    class="input"
                    list="input-list"
                    id="input-order-list"
                    placeholder="Enter barcode"
                    v-model="detail.barcode"
                    @change="pushItem(product.product_barcode)"
                  ></b-form-input>
                </b-col>

                <b-form-datalist id="input-list" class="option"
                  ><option
                    class="option"
                    v-for="product in productsState"
                    :key="product.product_barcode"
                    :value="product.product_barcode"
                    >Name: {{ product.product_name }} | Price: ${{
                      product.price
                    }}
                  </option>
                </b-form-datalist>

                <label for="">Quantity: </label>
                <b-col cols="" class="form-inline">
                  <b-form-input
                    class="form-control"
                    type="number"
                    placeholder="Enter quantity"
                    id="qty"
                    v-model="order.quantity"
                  ></b-form-input>

                  <b-button variant="primary">Add</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
          <b-row>
            <b-card
              bg-variant="light"
              title="Customer Details"
              class="customercard"
            >
              <b-form class="modalmargin">
                <label for="productname">Customer Name</label>
                <b-form-input
                  class="form-control"
                  type="text"
                  placeholder="Enter Customer Name"
                  v-model="customer.fullname"
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
                    v-model="customer.contact"
                    required
                  />
                </b-form>
                <br />
                <!-- <b-button @click="addtocustomer()" variant="primary"
                  >Continue</b-button
                >
                <b-button class="reset" type="reset" variant="danger"
                  >Reset</b-button
                > -->
              </b-form>
            </b-card>
            <b-col>
              <b-card bg-variant="white" title="Order #XXX" class="paper">
                <b-table
                  responsive="sm"
                  show-empty
                  :items="productsStates"
                  :fields="fields"
                >
                  <template #cell(productDesc)>
                    {{ supplier.productDesc }}
                  </template>
                </b-table>

                <!-- <b-button type="submit" variant="primary">End Sale</b-button>
          <b-button class="cancel" variant="danger">Cancel </b-button> -->
              </b-card>
            </b-col>
          </b-row>
          <!-- <b-col cols="">
          <b-button v-b-modal.modal-1 class="addBtn"
            >Add Customer Detail</b-button
          >
        </b-col> -->

          <!-- <div class="mt-3">
          <b-pagination
            v-model="currentPage"
            pills
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="supplier-table"
            align="center"
          ></b-pagination>
        </div> -->
        </b-col>
        <!-- <b-col cols="4"> -->
        <!-- <b-col cols="">
          <b-button v-b-modal.modal-1 class="addBtn"
            >Add Customer Detail</b-button
          >
        </b-col> -->
        <!-- <b-card bg-variant="white" title="Order #XXX">
            <b-table
              responsive="sm"
              show-empty
              :items="productsStates"
              :fields="fields"
            >
              <template #cell(productDesc)>
                {{ supplier.productDesc }}
              </template>
            </b-table> -->

        <!-- <b-button type="submit" variant="primary">End Sale</b-button>
          <b-button class="cancel" variant="danger">Cancel </b-button> -->
        <!-- </b-card> -->
        <!-- </b-col> -->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [],
      rows: 100,
      perPage: 10,
      currentPage: 1,

      filter: null,
      filterOn: [],
      sortBy: " ",
      sortDesc: false,

      customer: [],
      select_barcode: "",
      product: [],
      detail: [],
      order: [],
      customermodal: false,

      fields: [
        { key: "barcode" },
        { key: "productDesc", label: "Product Name" },
        { key: "quantity" },
        { key: "costPerUnit", label: "Price" },
        { key: "Total" }
      ],
      selectedfields: [
        { key: "barcode" },
        { key: "productDesc", label: "Product Name" },
        // { key: "quantity" },
        { key: "costPerUnit", label: "Price" }
        // { key: "Total" }
      ],

      value: "",
      itemSelect: [],
      showselect: ""
    };
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadProducts");
  },
  computed: {
    ...mapGetters({
      productsState: "allProducts"
    })
  },

  methods: {
    addtocustomer() {
      this.$store
        .dispatch("addCustomer", {
          fullname: this.customer.fullname,
          contact: this.customer.contact,
          address: this.customer.address
        })
        .then(res => {});
      this.customer = [];
    },
    selecteditem() {
      // console.log("this", this.product.barcode);
    },

    pushItem(event) {
      return (this.showselect = "name:" + this.product.barcode);
      console.log("meeeew", this.product.barcode);
    }
  }
};
</script>

<style scoped>
.formTitle {
  color: white;
  text-align: center;
}
.reset {
  float: right;
}
.card {
  background-color: #95abc1;
}
.card h4 {
  text-align: center;
}
.modal_header {
  background-color: red;
}
.addBtn {
  margin: 0 10px 15px -15px;
}
.customercard {
  height: 350px;
  width: 350px;
  margin: 15px 0 0 15px;
}
.input {
  width: 500px;
}
.option {
  width: 500px;
  font-size: 20px;
}
.paper {
  margin: 15px 0 0 0;
  height: 650px;
}
</style>
