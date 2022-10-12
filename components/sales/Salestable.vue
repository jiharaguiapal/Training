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
            id="sales-table"
            head-variant="light"
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
            }}</template>
            <template v-slot:cell(total_price)="row">{{
              formatAmount(row.item.total_price)
            }}</template>
          </b-table>
          <div class="mt-3">
            <!-- {{ rows }} {{ perPage }} -->
            <b-pagination
              size="sm"
              v-model="currentPage"
              pills
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="sales-table"
              align="center"
              limit="3"
            ></b-pagination>
          </div>
        </b-card>
        <b-modal
          size="lg"
          scrollable
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
        >
          <p><b>Order Details</b></p>
          <p>
            Customer Name: <b>{{ customerPaid }} </b>
          </p>
          <p>
            Order Date: <b>{{ paidDate }} </b>
          </p>
          <p class="mb-2">
            Total Payment: <b> {{ formatAmount(totalPaid) }}</b>
          </p>
          <!-- <pre>{{ infoModal.content }}</pre> -->
          <!-- <b-col>
            <li v-for="name in detailName" :key="name">{{ name }}</li>
          </b-col> -->
          <!-- <b-col> -->
          <b-list-group
            class="mb-2"
            v-for="details in infoModal.content"
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
                  variant="secondary"
                  v-for="items in details"
                  :key="items"
                >
                  {{ items }}
                </b-list-group-item>
              </b-col>
            </b-row>
          </b-list-group>
          <!-- </b-col> -->
        </b-modal>
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
      infoModal: {
        id: "info-modalSales",
        title: "",
        content: ""
      },
      fields: [
        { key: "order_id", sortable: true, label: "Receipt Number" },
        { key: "created_at", sortable: true, label: "Order Date" },
        { key: "total_price", sortable: false, label: "Total Payment" },
        { key: "customer_name", sortable: true, label: "Customer Name" },
        { key: "Actions", sortable: false, label: "Order Date" }
      ],
      sale: [],
      sales: [],
      // onFilteredData: [],
      totalPaid: "",
      customerPaid: "",
      paidDate: "",
      detailName: [
        "Order Detail ID:",
        "Receipt Number: ",
        "Barcode: ",
        "Product Name: ",
        "Quantity: ",
        "Price: ",
        "Order Date: ",
        "Status: ",
        "Total Price: "
      ]
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
    // info(item, index, button) {
    //   console.log("item", item);
    //   this.infoModal.title = "Order: " + item.order_id; // modal title for selected item
    //   // this.infoModal.content = JSON.stringify(item, null, 2); //row contentc to string
    //   this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    //   this.getOrderDetails(item.order_id);
    // },
    async getOrderDetails(item, index, button) {
      this.infoModal.title = "Order Details of Receipt No. " + item.order_id;
      this.totalPaid = item.total_price;
      this.customerPaid = item.customer_name;
      this.paidDate = moment(item.created_at).format("LL");
      await this.$store
        .dispatch("loadSalesDetailsByOrder", {
          id: item.order_id,
          SecretKey: localStorage.SecretKey
        })
        .then(res => {
          this.infoModal.content = res;

          this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        });
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    formatAmount(amount) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "Php"
      }).format(amount);
    },

    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },
    formatAmount(amount) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "Php"
      }).format(amount);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.formTitle {
  color: white;
  text-align: center;
}
.reset {
  float: right;
}
p {
  margin: 0;
}
</style>
