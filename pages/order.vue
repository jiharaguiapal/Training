<template>
  <div class="container-fluid">
    <b-form-row>
      <div>
        <b-modal id="modal-1" hide-footer title="New Customer">
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
            <b-button class="reset" type="reset" variant="danger"
              >Reset</b-button
            >
          </b-form>
        </b-modal>
      </div>

      <b-col cols="">
        <b-card class="bg-white">
          <b-form-row>
            <b-col cols="4">
              <b-button v-b-modal.modal-1>Add Customer Detail</b-button>
            </b-col>
          </b-form-row>
        </b-card>

        <b-card class="card bg-info shadow p-4 mb-5 bg-white rounded">
          <b-form-group>
            <b-input-group size="">
              <b-form @submit.prevent="adddetail" class="form-inline">
                <b-col cols="8" class="form-inline">
                  <label for="">Select: </label>
                  <b-form-input
                    list="input-list"
                    id="input-order-list"
                    placeholder="Select product here"
                    v-model="detail.barcode"
                  ></b-form-input>
                  <b-form-datalist id="input-list"
                    ><option v-for="product in products" :key="product"
                      >{{ product.barcode }}
                    </option>
                  </b-form-datalist>
                  <b-form-input
                    readonly
                    v-model="detail.price"
                    value="product.barcode"
                  >
                  </b-form-input>
                </b-col>

                <b-col cols="3" class="form-inline">
                  <b-form-group
                    class="form-inline"
                    label="Qty: "
                    label-align="left"
                    label-for="qty"
                  >
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Enter quantity"
                      id="qty"
                      v-model="detail.qty"
                    />
                    <b-button type="submit" variant="primary">Add</b-button>
                  </b-form-group>
                </b-col>
              </b-form>
            </b-input-group>
          </b-form-group>
          <b-table
            id="order-table"
            striped
            hover
            :items="details"
            show-empty
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
          >
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card bg-variant="white" title="Order">
          <b-list-group>
            <b-list-group-item>Cras justo odio</b-list-group-item>
            <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item>Morbi leo risus</b-list-group-item>
            <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
            <b-list-group-item variant="danger">Total: $XX</b-list-group-item>
          </b-list-group>
          <br />
          <b-button type="submit" variant="primary">End Sale</b-button>
          <b-button class="cancel" variant="danger">Cancel </b-button>
        </b-card>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
      customermodal: false
    };
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  computed: mapState({
    customers: state => state.customers,
    orders: state => state.orders,
    details: state => state.details,
    products: state => state.products
  }),
  methods: {
    ...mapMutations(["ADD_CUSTOMER"]),
    addcustomer: function() {
      this.ADD_CUSTOMER(this.customer);
      this.customer = [];
    },
    ...mapMutations(["ADD_ORDER"]),
    addorder: function() {
      this.ADD_ORDER(this.order);
      this.order = [];
    },
    ...mapMutations(["ADD_DETAIL"]),
    adddetail: function() {
      this.ADD_DETAIL(this.detail);
      this.detail = [];
    },
    ...mapMutations(["ADD_PRODUCT"]),
    addproduct: function() {
      this.ADD_PRODUCT(this.product);
      this.product = [];
    }
  }
};
</script>

<style scoped>
.formTitle {
  color: white;
  text-align: center;
}
.cancel {
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
</style>
