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
            :items="logState[0]"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template #cell(action)="row">
              <b-button
                size="sm"
                @click="getLogDetails(row.item, row.index)"
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
              formatDate(row.item.created_at)
            }}</template></b-table
          >

          <b-modal
            size="lg"
            :header-bg-variant="modalheadbg"
            :id="logModal.id"
            :title="logModal.title"
            ok-only
            @hide="resetcustomerModal"
            scrollable
          >
            <!-- <p><b>Order Details</b></p>
            <p>
              Customer Name: <b>{{ customerName }} </b>
            </p>
            <p>
              Total Number of Transactions:
              <b>{{ logModal.content.length }} </b>
            </p> -->
            <b-list-group
              class="mb-2"
              v-for="details in logModal.content"
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
      logModal: {
        id: "logModal",
        title: "",
        content: ""
      },
      select_barcode: "",
      product: [],
      order: [],
      fields: [
        { key: "log_id", sortable: true, label: "Log ID" },
        { key: "action_made", sortable: true, label: "Action Made" },
        { key: "created_at", sortable: false, label: "Date" },
        // { key: "contact", sortable: true, label: "Contact Number" },
        { key: "username", sortable: true, label: "Username" },
        // { key: "order_id", sortable: true, label: "Order ID" }
        { key: "role", sortable: false, label: "Role" },
        { key: "action", sortable: true, label: "Actions" }
      ],
      resetInfo: "",
      modalheadbg: "",
      onFilteredData: [],
      customerName: "",
      detailName: [
        "Log ID: ",
        "Action: ",
        "User ID: ",
        "Date Created: ",
        "Status: ",
        "First Name: ",
        "Last Name ",
        "Username: ",
        "Role: "
      ]
    };
  },

  beforeCreate() {
    this.$store.dispatch("getLog", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {},
  methods: {
    formatItems(item) {
      if (item == null) {
        console.log("null:" + item);
        return "null";
      }
      return item;
    },
    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },

    info(customer, index, button) {
      this.logModal.title = `${customer.product_name}`;
      this.logModal.content = JSON.stringify(customer, null, 2);
      this.$root.$emit("bv::show::modal", this.logModal.id, button);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    resetcustomerModal() {
      this.logModal.title = "";
      this.logModal.content = "";
    },
    async getLogDetails(item, index, button) {
      console.log("item", item);
      this.logModal.title = "Activity Log " + item.log_id;
      // this.customerName = item.first_name + " " + item.last_name;
      // this.totalPaid = item.total_price;
      // this.customerPaid = item.customer_name;
      // this.paidDate = moment(item.created_at).format("LL");
      await this.$store
        .dispatch("loadLogsDetails", {
          id: item.log_id,
          SecretKey: localStorage.SecretKey
        })
        .then(res => {
          this.logModal.content = res;

          this.$root.$emit("bv::show::modal", this.logModal.id, button);
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
      return this.logState.length;
    },
    ...mapGetters({
      logState: "allLog"
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
