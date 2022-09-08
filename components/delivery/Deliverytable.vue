<template>
  <div class="protab">
    <!-- <b-form-row>
      <b-col cols="3">
        <b-card class="bg-secondary">
          <h3 class="formTitle">
            <font-awesome-icon icon="truck" /> Receive Delivery
          </h3>
        </b-card>
        <b-card>
          <b-form class="modalmargin">
            <label for="">Enter Delivery Code: </label>
            <b-form-input
              id="input-delivery-code"
              v-model="delivery.delivery_code"
              required
            ></b-form-input>

            <label for="companyname">Select Supplier: </label>

            <b-form-select
              list="sup-list"
              id="input-product-list"
              v-model="delivery.suppliername"
            >
              <option
                v-for="supplier in suppliersState"
                :key="supplier.companyname"
                >{{ supplier.companyname }}
              </option></b-form-select
            > -->
    <!-- :value="supplier.supplier_id" -->
    <!-- <label for="companyname"> Supplier Code: </label>
            <b-form-input
              list="supplier-list"
              id="select-supplier"
              v-model="delivery.suppliername"
              required
            > -->
    <!-- <b-form-datalist id="select-supplier">
                <option v-for="supplier in suppliersState" :key="supplier"
                  >{{ item }}
                </option>
              </b-form-datalist> -->
    <!-- </b-form-input> -->

    <!-- <label for="supplieraddress">Delivery Number: </label>
            <b-form-input
              class="form-control "
              type="text"
              placeholder=" Enter delivery number "
              v-model="delivery.deliveryID"
              required
            /> -->
    <!-- <label for="companycontact">Date Received: </label>
            <b-form-datepicker
              class="form-control col-sm"
              type="date"
              placeholder="Select Delivery Date"
              v-model="delivery.delivery_received_date"
              required
            />

            <b-form-datalist id="sup-list" v-model="selected">
              <option v-for="item in items" :key="item"
                >{{ item.company_name }}
              </option>
            </b-form-datalist> -->

    <!-- <label for="">Add Delivered Item:</label>
            <b-row>
              <b-col cols="10">
                <b-form-input
                  v-model="barcode"
                  placeholder="Enter barcode"
                ></b-form-input
              ></b-col>

              <b-button v-on:click="add()">Add</b-button> -->
    <!-- </b-row> -->
    <!-- <li v-for="barcode in barcodes" :key="barcode">
              <span>{{ barcode.text }}</span>
            </li> -->

    <!-- <br />
            <b-button
              @click="$bvModal.show('confirmdelivery')"
              variant="primary"
              >Submit</b-button
            >
            <b-button class="reset" type="reset" variant="danger"
              >Reset</b-button
            >
          </b-form>
        </b-card> -->
    <!-- <div>
          <b-alert
            class="alert"
            variant="info"
            dismissible
            fade
            :show="showDismissibleAlert"
            @dismissed="showDismissibleAlert = false"
          >
            Successful!
          </b-alert>
        </div> -->
    <!-- </b-col> -->

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
          <!-- <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
              variant="primary"
              pill
            >
              <font-awesome-icon icon="edit" />
            </b-button> -->
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
      </b-table>
      <b-modal
        :header-bg-variant="modalheadbg"
        :id="deliveryModal.id"
        :title="deliveryModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ deliveryModal.content }}</pre>
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
      <div class="d-block text-center"></div>

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
      // range: ["2020-01-01", "2021-02-02"],
      options: {
        startDate: moment(),
        endDate: moment(),
        autoUpdateInput: true,
        showDropdowns: true
      },
      sortBy: " ",
      sortDesc: false,
      fields: [
        { key: "delivery_code", sortable: true, label: "Delivery Code" },
        // { key: "delivery_id", sortable: true, label: "Delivery ID" },
        { key: "suppliername", sortable: true, label: "Supplier" },
        {
          key: "delivery_received_date",
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
      resetInfo: ""
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
  // computed: mapState({
  //   deliveries: state => state.deliveries,
  //   items: state => state.items
  // }),
  methods: {
    addtodelivery() {
      console.log("newdel", this.delivery);
      this.$store
        .dispatch("addDelivery", {
          delivery_code: this.delivery.delivery_code,
          suppliername: this.delivery.suppliername,
          delivery_received_date: this.delivery.delivery_received_date,
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          console.log(res);
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
        .catch(err => {
          console.log("errhere", err.data.posted);
        });
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

    // ...mapMutations(["ADD_DELIVERY"]),
    // adddelivery: function() {
    //   this.ADD_DELIVERY(this.delivery);
    //   this.delivery = [];
    // },
    // ...mapMutations(["ADD_ITEM"]),
    // additem: function() {
    //   this.ADD_ITEM(this.item);
    //   this.item = [];
    // },

    info(delivery, index, button) {
      this.deliveryModal.title = `${delivery.company_name}`;
      this.deliveryModal.content = JSON.stringify(delivery, null, 2);
      this.$root.$emit("bv::show::modal", this.deliveryModal.id, button);
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
