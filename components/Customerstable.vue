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
                @click="info(row.customer, row.index, $event.target)"
                class="mr-1"
                variant="primary"
                pill
                title="View Customer Details"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="edit" />
              </b-button>
            </template>
            <template v-slot:cell(created_at)="row">{{
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
        { key: "name", sortable: true, label: "Full Name" },
        { key: "contact", sortable: false, label: "Address" },
        { key: "address", sortable: true, label: "Contact Number" },
        { key: "created_at", sortable: true, label: "Date Created" },
        { key: "order_id", sortable: true, label: "Order ID" }
        // { key: "order_id", sortable: true, label: "S" }
        // { key: "Actions", sortable: false, label: "Actions" }
      ],
      resetInfo: "",
      modalheadbg: "",
      onFilteredData: []
    };
  },

  beforeCreate() {
    this.$store.dispatch("loadCustomers", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {},
  methods: {
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
    resetInfoModal() {
      this.customerModal.title = "";
      this.customerModal.content = "";
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
