<template>
  <div class="">
    <b-form-row>
      <b-col>
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
            head-variant="light"
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
                @click="getOrderDetails(row.item, row.index, $event.target)"
                class="mr-1"
                variant="secondary"
                pill
                title="View Order Details"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="archive" />
              </b-button>
            </template>
            <template v-slot:cell(created_at)="row">{{
              formatDate(row.item)
            }}</template></b-table
          >

          <b-modal
            size="lg"
            :header-bg-variant="modalheadbg"
            :id="customerModal.id"
            :title="customerModal.title"
            ok-only
            @hide="resetcustomerModal"
            scrollable
          >
            <p><b>Order Details</b></p>
            <p>
              Customer Name: <b>{{ customerName }} </b>
            </p>
            <p>
              Total Number of Transactions:
              <b>{{ customerModal.content.length }} </b>
            </p>
            <b-list-group
              class="mb-2"
              v-for="details in customerModal.content"
              :key="details"
            >
              <b-row no-gutters>
                <b-col cols="4">
                  <b-list-group-item
                    variant="primary"
                    v-for="name in detailName"
                    :key="name"
                  >
                    <b>
                      {{ name }}
                    </b>
                  </b-list-group-item>
                </b-col>
                <b-col>
                  <b-list-group-item
                    variant="light"
                    v-for="items in details"
                    :key="items"
                  >
                    {{ formatItems(items) }}
                  </b-list-group-item>
                </b-col>
              </b-row>
            </b-list-group>
          </b-modal>
          <!-- </p> -->

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
    </b-form-row>
  </div>
</template>
<script>
import moment from "moment";
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
      perPage: 100,
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
        { key: "id", sortable: true, label: "Customer ID" },
        { key: "username", sortable: true, label: "Username" },
        { key: "address", sortable: false, label: "Address" },
        // { key: "contact", sortable: true, label: "Contact Number" },
        { key: "created_at", sortable: true, label: "Date Created" },
        // { key: "order_id", sortable: true, label: "Order ID" }
        // { key: "order_id", sortable: true, label: "S" }
        { key: "Actions", sortable: false, label: "Actions" }
      ],
      resetInfo: "",
      modalheadbg: "",
      onFilteredData: [],
      customerName: "",
      detailName: [
        "Order ID: ",
        "Customer ID: ",
        "Price: ",
        "Address:",
        "Approved at: ",
        "Shipping Type: ",
        "Approved by: ",
        "Created at: ",
        "Order Status: ",
        "Status: "
      ]
    };
  },

  beforeCreate() {
    this.$store.dispatch("loadCustomers", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {},
  methods: {
    formatItems(item) {
      if (item == null) {
        return "null";
      }
      return item;
    },
    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
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
    resetcustomerModal() {
      this.customerModal.title = "";
      this.customerModal.content = "";
    },
    async getOrderDetails(item, index, button) {
      console.log("item", item);
      this.customerModal.title = "Transactions by " + item.first_name;
      this.customerName = item.first_name + " " + item.last_name;
      this.totalPaid = item.total_price;
      this.customerPaid = item.customer_name;
      this.paidDate = moment(item.created_at).format("LL");
      await this.$store
        .dispatch("loadSalesDetails", {
          id: item.id,
          SecretKey: localStorage.SecretKey
        })
        .then(res => {
          console.log("res custom", res);
          this.customerModal.content = res;

          this.$root.$emit("bv::show::modal", this.customerModal.id, button);
        });
    }
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
