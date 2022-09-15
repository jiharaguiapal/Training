<template>
  <div class="">
    <b-form-row>
      <b-col cols="">
        <b-card class="card-table">
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
            bordered
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
                title="View Order Details"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="archive" />
              </b-button>
            </template>
            <template v-slot:cell(created_at)="row">{{
              formatDate(row.item)
            }}</template>
            <template v-slot:cell(total_price)="row">{{
              formatAmount(row.item.total_price)
            }}</template>
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
    </b-form-row>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      options: [],
      // rows: 100,
      perPage: 8,
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
        { key: "order_id", sortable: true, label: "Receipt Number" },
        { key: "created_at", sortable: true, label: "Order Date" },
        { key: "total_price", sortable: false, label: "Total Payment" },
        { key: "customer_name", sortable: true, label: "Customer Name" },
        { key: "Actions", sortable: false, label: "Order Date" }
      ],
      sale: [],
      sales: [],
      onFiltered: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadSales", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {},
  computed: {
    rows() {
      return this.salesState.length;
    },
    ...mapGetters({
      salesState: "allSales"
    }),

    getsales() {
      return this.salesState[0];
    }
  },

  methods: {
    formatAmount(amount) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "Php"
      }).format(amount);
    },

    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    }
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
