<template>
  <div class="protab">
    <b-card class="card-table">
      <b-form-group>
        <b-row>
          <b-col cols="4 form-inline">
            <b-input-group size="sm">
              <b-input-group-append>
                <b-button class="select-date">Select date</b-button>
              </b-input-group-append>
              <!-- <label for=""> Select date: </label> -->
              <date-range-picker
                :options="options"
                format="YYYY-MM-DD"
                class=" form-control"
              />
            </b-input-group>
          </b-col>
          <b-col>
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-form-group>
      <b-table
        head-variant="light"
        bordered
        hover
        :items="deliveriesState"
        id="delivery-table"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        @filtered="onFiltered"
        show-empty
        primary-key=""
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index)"
            class="mr-1"
            variant="secondary"
            pill
            title="View Delivery Details"
            v-b-tooltip.hover
          >
            <font-awesome-icon icon="archive" />
          </b-button>
        </template>
        <template v-slot:cell(date_received)="row">{{
          formatDate(row.item)
        }}</template>
      </b-table>
      <b-modal
        size="lg"
        :header-bg-variant="modalheadbg"
        :id="deliveryModal.id"
        :title="deliveryModal.title"
        ok-only
        @hide="resetInfoModal"
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
              v-for="items in deliveryModal.content[0]"
              :key="items"
            >
              {{ formatItem(items) }}
            </b-list-group-item>
          </b-col>
        </b-row>
      </b-modal>
      <div class="mt-3">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="delivery-table"
          align="center"
          size="sm"
          limit="3"
          @input="updatePage(currentPage)"
        ></b-pagination>
      </div>
    </b-card>
    <!-- </b-form-row> -->
    <b-modal id="confirmdelivery" centered hide-footer>
      <template #modal-title> Confirm submit</template>

      <template #default="{ hide }">
        <b-button
          class="mt-3"
          block
          @click="$bvModal.hide('confirmdelivery'), addtodelivery()"
          >Confirm</b-button
        >

        <b-button @click="hide()" block variant="danger"> Cancel</b-button>
      </template>
    </b-modal>
    <b-alert
      class="alert"
      :show="alert.showAlert"
      dismissible
      :variant="alert.variant"
      @dismissed="alert.showAlert = null"
      @dismiss-count-down="countDownChanged"
    >
      {{ alert.message }}
    </b-alert>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment";
import DateRangePicker from "@gravitano/vue-date-range-picker";

export default {
  data() {
    return {
      // rows: 100,
      // detailName: [
      //   "Delivery ID:",
      //   "Supplier Name: ",
      //   "Date Received: ",
      //   "Date Created: ",
      //   "Status: "
      // ],
      perPage: 8,
      currentPage: 1,
      delivery: [],
      deliveries: [],
      filter: null,
      filterOn: [],
      options: [],
      deliveryModal: {
        id: "delivery-modal",
        title: "",
        content: ""
      },
      modalheadbg: "info",
      options: {
        startDate: moment(),
        endDate: moment(),
        autoUpdateInput: true,
        showDropdowns: true
      },
      sortBy: " ",
      sortDesc: false,
      fields: [
        { key: "delivery_id", sortable: true, label: "Delivery Code" },
        { key: "supplier_name", sortable: true, label: "Supplier" },
        {
          key: "date_received",
          sortable: true,
          label: "Delivery Date"
        },

        { key: "Actions", sortable: false, label: "Actions" }
      ],
      barcode: "",
      barcodes: [
        {
          text: "1100002152"
        }
      ],
      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      // onFiltered:[],
      resetInfo: "",
      detailName: [
        "Product ID: ",
        "Product Name: ",
        "Barcode:",
        "Product Details: ",
        "Quantity: ",
        "Price: ",
        "Status: ",
        "Date Created: ",
        "Cost per unit: ",
        "Date Received: ",
        "Expiry Date: ",
        "Delivery ID: ",
        "Image: ",
        "Category: "
      ]
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadDeliveries", {
      SecretKey: localStorage.SecretKey
    });
    this.$store.dispatch("loadSuppliers", {
      SecretKey: localStorage.SecretKey
    });
  },
  computed: {
    rows() {
      return this.deliveriesState.length;
    },
    ...mapGetters({
      deliveriesState: "allDeliveries",
      suppliersState: "allSuppliers"
    })
  },

  methods: {
    formatItem(item) {
      console.log(item);
      if (item == null) {
        return "null";
      }
      if (item instanceof Date) {
        return formatDate(item);
      }
      return item;
    },
    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },
    addtodelivery() {
      this.$store
        .dispatch("addDelivery", {
          delivery_code: this.delivery.delivery_code,
          suppliername: this.delivery.suppliername,
          delivery_received_date: this.delivery.delivery_received_date,
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          this.delivery = [];
          if (res == "Error: Request failed with status code 406") {
            this.showAlert("Error: Please check delivery details", "danger");
          } else {
            this.showAlert(
              " Delivery details was submitted successfully",
              "success"
            );
          }
        })
        .catch(err => {});
    },

    add: function() {
      var newbarcode = this.barcode.trim();
      if (!newbarcode) {
        return;
      }
      this.barcodes.push({ text: newbarcode });
      this.barcode = "";
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showAlert(message, variant) {
      this.dismissCountDown = this.dismissSecs;
      this.alert = {
        showAlert: 3,
        variant,
        message
      };
    },

    info(delivery, index, button) {
      this.deliveryModal.title = delivery.supplier_name;
      // this.deliveryModal.content = delivery;
      this.getOrderDetails(delivery);
      // this.$root.$emit("bv::show::modal", this.deliveryModal.id, button);
    },
    async getOrderDetails(item, index, button) {
      console.log("itemsdel", item);
      this.deliveryModal.title =
        "Order Details of Receipt No. " + item.delivery_id;
      // this.totalPaid = item.total_price;
      // this.customerPaid = item.customer_id;
      // this.paidDate = moment(item.created_at).format("LL");
      await this.$store
        .dispatch("loadDeliveriesDetails", {
          id: item.delivery_id,
          SecretKey: localStorage.SecretKey
        })
        .then(res => {
          this.deliveryModal.content = res;
          this.$root.$emit("bv::show::modal", this.deliveryModal.id, button);

          // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        });
    },
    resetInfoModal() {
      this.deliveryModal.title = "";
      this.deliveryModal.content = "";
    },
    showMsgBoxTwo() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxOk("Data was submitted successfully", {
          title: "Confirmation",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        })
        .then(value => {
          this.boxTwo = value;
        })
        .catch(err => {
          // An error occurred
        });
    },
    deleteEvent(index) {
      this.deliveries.splice(index, 1);
    },
    updatePage() {}
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
.alert {
  z-index: 10;
  width: 500px;
  float: right;
}
</style>
