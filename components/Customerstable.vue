<template>
  <div class="">
    <b-form-row>
      <!-- <b-col cols="3">
        <b-card class="bg-secondary">
          <h3 class="formTitle">Add Customer</h3>
        </b-card>
        <b-card>
          <b-form class="modalmargin" @submit.prevent="addcustomer">
            <label for="productname">Customer Name</label>
            <b-form-input
              class="form-control"
              type="text"
              placeholder="Enter Customer Name"
              v-model="customer_name"
            />

            <label for="productdesc">Customer Address</label>
            <b-form-input
              class="form-control"
              type="text"
              placeholder="Enter Customer Address"
              v-model="customer_address"
            />
            <b-form class="">
              <label for="unitcost">Contact Number</label>
              <input
                class="form-control"
                type="number"
                placeholder="Enter Contact Number"
                v-model="customer_number"
              />
            </b-form>
            <br />
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button class="reset" type="reset" variant="danger"
              >Reset</b-button
            >
          </b-form>
        </b-card>
      </b-col> -->

      <b-col>
        <!-- <b-card class="bg-info">

          <b-form-row>
            <b-col cols="6">
              <b-form @submit.prevent="addorder" class="form-inline">
                <label for="">Select: </label>
                <b-form-input
                  list="input-list"
                  id="input-with-list"
                ></b-form-input>
                <b-form-datalist id="input-list" v-model="product"
                  ><option v-for="product in products" :key="product">{{
                    product.product_name
                  }}</option>
                </b-form-datalist>
              </b-form>
            </b-col>
            <b-col cols="6">
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
                />
                <b-button type="submit" variant="primary">Select</b-button>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-card> -->

        <b-card class="card-table">
          <b-form-group>
            <!-- group for search bar -->
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search Customer"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
            bordered
            hover
            :items="customersState"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template #cell(actions)="row">
              <b-button
                size="sm"
                @click="info(row.customer, row.index, $event.target)"
                class="mr-1"
                variant="primary"
                pill
                title="View Customer Details"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="edit" />
              </b-button>
              <!-- <b-button
                size="sm"
                @click="deleteEvent(row.index)"
                class="mr-1"
                variant="danger"
                pill
              >
                <font-awesome-icon icon="trash-alt" />
              </b-button> -->
            </template>
            <template v-slot:cell(autoReleaseDate)="row">{{
              formatDate(row.item)
            }}</template></b-table
          >
          <b-modal
            :header-bg-variant="modalheadbg"
            :id="customerModal.id"
            :title="customerModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ customerModal.content }}</pre>
          </b-modal>

          <div class="mt-3">
            <b-pagination
              v-model="currentPage"
              pills
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="supplier-table"
              align="center"
              size="sm"
              limit="3"
            ></b-pagination>
          </div>
        </b-card>
      </b-col>

      <!-- <b-col cols="3">
        <div>
          <b-card class="bg-dark">
            <b-card class="bg-white">
              <h4>Order Summary</h4>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>Total: $89 //autocompletethis!</b>
                </li>
                <li class="list-group-item">
                  <b>{{ selected }}</b>
                </li>
                <li class="list-group-item">
                  Customer Name: <b>{{ customer_name | capitalize }}</b>
                </li>
                <li class="list-group-item">
                  Customer Address: {{ customer_address | capitalize }}
                </li>
                <li class="list-group-item">
                  Customer Contact: {{ customer_number }}
                </li>
              </ul>
            </b-card>

            <br />
            <b-button type="submit" variant="primary">Print</b-button>
            <b-button class="reset" type="reset" variant="danger"
              >Cancel</b-button
            >
          </b-card>

          <br />
        </div>
      </b-col> -->
    </b-form-row>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      customer_name: "",
      customer_address: "",
      customer_number: "",
      options: [],
      // rows: 100,
      perPage: 8,
      currentPage: 1,
      item: [],
      filter: null,
      filterOn: [],
      sortBy: " ",
      sortDesc: false,

      customer: [],
      customers: [],
      customerModal: {
        id: "customer-modal",
        title: "",
        content: ""
      },

      select_barcode: "",
      product: [],
      order: [],
      fields: [
        { key: "customer_id", sortable: true, label: "Customer ID" },
        { key: "fullname", sortable: true, label: "Full Name" },
        { key: "contact", sortable: false, label: "Address" },
        { key: "address", sortable: true, label: "Contact Number" },
        { key: "dateCreated", sortable: true, label: "Date Created" }
        // { key: "Actions", sortable: false, label: "Actions" }
      ],
      resetInfo: "",
      modalheadbg: "",
      onFiltered: []
    };
  },

  // created() {
  //   axios
  //     .get("http://172.16.4.168:3000/customers")
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
  beforeCreate() {
    this.$store.dispatch("loadCustomers", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {
    console.log("yow", this.customers);
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    }
  },
  info(customer, index, button) {
    this.customerModal.title = `${customer.product_name}`;
    this.customerModal.content = JSON.stringify(customer, null, 2);
    this.$root.$emit("bv::show::modal", this.customerModal.id, button);
  },
  onFiltered(filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  },
  resetInfoModal() {
    this.customerModal.title = "";
    this.customerModal.content = "";
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  //
  computed: {
    rows() {
      return this.customersState.length;
    },
    ...mapGetters({
      customersState: "allCustomers"
    })
  }
  // computed: mapState(["customers"]),

  // methods: {
  //   ...mapMutations(["ADD_PRODUCT"]),
  //   addproduct: function() {
  //     this.ADD_PRODUCT(this.product);
  //     this.product = [];
  //   },
  //   ...mapMutations(["ADD_CUSTOMER"]),
  //   addcustomers: function() {
  //     this.ADD_CUSTOMER(this.customers);
  //     this.customers = [];
  //   }
  // }
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
</style>
