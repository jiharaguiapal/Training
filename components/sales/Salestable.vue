<template>
  <div class="">
    <b-form-row>
      <!-- <b-col cols="3">
        <b-card class="bg-secondary">
          <h3 class="formTitle">New Order</h3>
        </b-card>
        <b-card>
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
        </b-card>
      </b-col> -->

      <b-col cols="">
        <b-card class="card bg-info shadow p-4 mb-5 bg-white rounded">
          <b-form-group>
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to search successful orders"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
            id="order-table"
            striped
            hover
            :items="getsales"
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
            <template #cell(actions)="row">
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="secondary"
                pill
              >
                <font-awesome-icon icon="archive" />
              </b-button>
            </template>
          </b-table>

          <div class="mt-3">
            <b-pagination
              size="sm"
              v-model="currentPage"
              pills
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="supplier-table"
              align="center"
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
      order: [],
      fields: [
        // { key: "order_id", sortable: true },
        { key: "order_code", sortable: true },
        { key: "order_date", sortable: true },
        { key: "total_payment", sortable: false },
        { key: "customer_name", sortable: true },
        { key: "Actions", sortable: false }
      ],
      sale: [],
      sales: [],
      onFiltered: []
    };
  },
  beforeCreate() {
    console.log("hereee");
    this.$store.dispatch("loadSales", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {
    console.log("sal");
  },
  computed: {
    ...mapGetters({
      salesState: "allSales"
    }),

    getsales() {
      console.log("sales", this.salesState[0]);

      return this.salesState[0];
    }
  },

  // filters: {
  //   capitalize: function(value) {
  //     if (!value) return "";
  //     value = value.toString();
  //     return value.charAt(0).toUpperCase() + value.slice(1);
  //   }
  // },

  // computed: mapState({
  //   customers: state => state.customers,
  //   orders: state => state.orders
  // }),
  methods: {
    // ...mapMutations(["ADD_CUSTOMER"]),
    // addcustomer: function() {
    //   this.ADD_CUSTOMER(this.customer);
    //   this.customer = [];
    // },
    // ...mapMutations(["ADD_ORDER"]),
    // addorder: function() {
    //   this.ADD_ORDER(this.order);
    //   this.order = [];
    // }
  },
  onFiltered(filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
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
</style>
