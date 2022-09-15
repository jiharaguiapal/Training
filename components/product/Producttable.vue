<template>
  <div class="protab">
    <b-modal
      id="productmodal"
      size="huge"
      class="product-modal"
      hide-footer
      title="Add Product"
      scrollable
      no-close-on-backdrop
    >
      <div>
        <b-row>
          <b-col cols="">
            <b-card>
              <b-form @submit.prevent="adddetail">
                <b-row class="form-inline">
                  <label for="">Select: </label>
                  <b-col cols="4">
                    <b-form-select
                      class="input"
                      list="sup-list"
                      id="input-product-list"
                      v-model="delivery.supplier_name"
                    >
                      <option
                        v-for="(supplier, supplier_id) in suppliersState"
                        :key="supplier_id"
                        >{{ supplier.supplier_name }}
                      </option></b-form-select
                    >
                  </b-col>
                  <label for="">Date Received: </label>
                  <b-col>
                    <b-form-datepicker
                      class="form-control col-sm"
                      type="date"
                      placeholder="Select Delivery Date"
                      v-model="delivery.date_received"
                      required
                    />
                  </b-col>
                </b-row>
              </b-form>
            </b-card>
            <b-row>
              <b-card title="Product Details" class="productcard">
                <b-form class="modalmargin">
                  <label for="productcode">Product Barcode</label>
                  <b-form-input
                    size="sm"
                    class="form-control"
                    type="text"
                    placeholder="Enter Product Barcode"
                    v-model="product_barcode"
                    required
                  />
                  <label class="mt-2" for="productname">Product Name</label>
                  <b-form-input
                    size="sm"
                    class="form-control"
                    type="text"
                    placeholder="Enter Product Name"
                    v-model="product_name"
                    required
                  />
                  <label class="mt-2" for="productdesc"
                    >Product Description</label
                  >
                  <b-form-input
                    size="sm"
                    class="form-control"
                    type="text"
                    placeholder="Enter Product Description"
                    v-model="product_description"
                    required
                  />
                  <label class="mt-2" for="unitcost">Cost per unit</label>
                  <b-form-input
                    size="sm"
                    class="form-control"
                    type="number"
                    placeholder="Enter cost per unit"
                    v-model="cost_unit"
                    required
                  />
                  <label class="mt-2" for="unitcost">Price</label>
                  <b-form-input
                    size="sm"
                    class="form-control"
                    type="number"
                    placeholder="Enter cost per unit"
                    v-model="price"
                    required
                  />
                  <label class="mt-2" for="productname">Stocks</label>
                  <b-form-input
                    size="sm"
                    class="form-control"
                    type="number"
                    placeholder="Enter product quantity"
                    v-model="quantity"
                    required
                  />
                  <label class="mt-2" for="productname">Expiry Date</label>
                  <b-form-datepicker
                    size="sm"
                    class="form-control col-sm"
                    type="date"
                    v-model="Expiry_date"
                    required
                  />

                  > -->
                </b-form>
                <br />
                <b-button @click="pushProducts" variant="primary">Add</b-button>

                <b-button class="reset" type="reset" variant="danger"
                  >Reset</b-button
                >
              </b-card>
              <b-col>
                <b-card
                  bg-variant="white"
                  title="Pending Products"
                  class="paper"
                >
                  <b-table
                    hover
                    :fields="pendingFields"
                    :per-page="perPagePending"
                    :current-page="currentPagePending"
                    show-empty
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :items="list"
                  >
                  </b-table>
                  <b-row class="pagination-bottom">
                    <b-col>
                      <div size="sm">
                        {{ bottomLabelModal(list) }}
                      </div>
                    </b-col>
                    <b-col>
                      <b-pagination
                        v-model="currentPagePending"
                        pills
                        :total-rows="rowsPending"
                        :per-page="perPagePending"
                        aria-controls="delivery-table"
                        align="right"
                        size="sm"
                        limit="3"
                      ></b-pagination>
                    </b-col>
                  </b-row>

                  <div class="btngrp ">
                    <b-button
                      @click="$bvModal.show('confirmproduct')"
                      variant="primary"
                      >Submit</b-button
                    >
                    <b-button @click="clearpending()" variant="danger"
                      >Clear</b-button
                    >
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-card class="card-table">
      <b-form-group>
        <b-row>
          <b-col cols="4">
            <b-button v-b-modal.productmodal variant="primary" size="sm">
              <font-awesome-icon icon="plus-circle" /> Add product</b-button
            >
          </b-col>
          <b-col>
            <b-input-group size="sm">
              <b-form-input
                id="filter-product"
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
        id="supplier-table"
        :per-page="perPage"
        :current-page="currentPage"
        :items="productsState"
        :filter="filter"
        @filtered="onFiltered"
        show-empty
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
            variant="primary"
            pill
            title="View Product Details"
            v-b-tooltip.hover
          >
            <font-awesome-icon icon="edit" />
          </b-button>
        </template>
        <template v-slot:cell(date_received)="row">{{
          formatDate(row.item)
        }}</template>
        <template v-slot:cell(cost_per_unit)="row">{{
          formatAmount(row.item.cost_per_unit)
        }}</template>
        <template v-slot:cell(price)="row">{{
          formatAmount(row.item.price)
        }}</template>
      </b-table>
      <b-modal
        :header-bg-variant="modalheadbg"
        :id="productModal.id"
        :title="productModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ productModal.content }}</pre>
      </b-modal>
      <div class="mt-3">
        <b-pagination
          v-model="currentPagePending"
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
    <!-- <Product /> -->

    <!-- </b-form-row> -->
    <b-modal id="confirmproduct" centered hide-footer>
      <template #modal-title> Confirm submit</template>

      <template #default="{ hide }">
        <b-button
          type="submit"
          class="mt-3"
          block
          @click="
            $bvModal.hide('confirmproduct'), addpendingProduct(), addtoproduct()
          "
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
    >
      {{ alert.message }}
    </b-alert>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapMutations, mapGetters, createLogger } from "vuex";
export default {
  data() {
    return {
      // rows: 100,
      perPage: 8,
      perPagePending: 8,
      currentPagePending: 1,
      currentPage: 1,
      product: [],
      filter: null,
      filterOn: [],
      options: [],
      // products: [],
      suppliers: [],
      supplier: [],
      productModal: {
        id: "product-modal",
        title: "",
        content: ""
      },
      modalheadbg: "info",
      sortBy: " ",
      sortDesc: false,
      pendingFields: [
        { key: "barcode", sortable: true, label: "Barcode" },
        { key: "product_name", sortable: true, label: "Product Name" },
        { key: "details", sortable: true, label: "Details" },
        { key: "cost_per_unit", sortable: true, label: "Unit Cost" },
        { key: "price", label: "Price" },
        { key: "stocks", sortable: true, label: "Quantity" },
        { key: "date_received", sortable: true, label: "Date Received" },
        { key: "actions", sortable: false }
      ],
      fields: [
        { key: "barcode", sortable: true, label: "Barcode" },
        { key: "product_name", sortable: true, label: "Product Name" },
        { key: "details", sortable: true, label: "Details" },
        { key: "cost_per_unit", sortable: true, label: "Unit Cost" },
        { key: "price", label: "Price" },
        { key: "quantity", sortable: true, label: "Quantity" },
        { key: "delivery_id", sortable: true, label: "Delivery ID" },
        { key: "date_received", sortable: true, label: "Date Received" },
        { key: "actions", sortable: false }
      ],
      isBusy: false,
      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      allDetails: [],
      delivery_code: "",
      Supplier: "",
      barcode: "",
      Date_Received: "",
      product_barcode: "",
      product_name: "",
      product_description: "",
      cost_unit: "",
      price: "",
      quantity: "",
      Expiry_date: "",
      products: [],
      product: [],
      delivery: {
        supplier_name: null,
        date_received: null
      },
      products: [],
      counter: 0
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadProducts", {
      SecretKey: localStorage.SecretKey
    });
    this.$store.dispatch("loadDeliveries", {
      SecretKey: localStorage.SecretKey
    });
    this.$store.dispatch("loadSuppliers", {
      SecretKey: localStorage.SecretKey
    });
  },

  computed: {
    rowsPending() {
      return this.list.length;
    },
    rows() {
      return this.productsState.length;
    },
    ...mapGetters({
      productsState: "allProducts",
      deliveriesState: "allDeliveries",
      suppliersState: "allSuppliers"
    }),

    list() {
      return this.allDetails;
    }
  },

  methods: {
    formatAmount(amount) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "Php"
      }).format(amount);
    },
    toast(toaster, append = false, variant, message, title) {
      this.counter++;
      this.$bvToast.toast(message, {
        title: title,
        toaster: toaster,
        solid: true,
        variant: variant,
        appendToast: append
      });
    },
    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },
    bottomLabelModal(Code) {
      let end = this.perPagePending * this.currentPagePending;

      if (!Code) {
        return;
      }

      if (end > Code.length) {
        end = Code.length;
      }

      let entry = "";
      if (Code.length <= 1) {
        entry = "entry";
      } else {
        entry = "entries";
      }

      return `Showing a total of ${Code.length} ${entry}`;
    },
    async addtoproduct() {
      await this.$store
        .dispatch("addProduct", {
          delivery: this.delivery,
          SecretKey: localStorage.SecretKey,
          products: this.allDetails
        })
        .then(res => {
          if (this.allDetails.length == 0) {
            let errMsg = "Please add products to submit";
            this.toast(
              "b-toaster-bottom-right",
              true,
              "warning",
              errMsg,
              "Warning"
            );
          } else {
            this.$root.$emit(
              "bv::hide::modal",
              "productmodal",
              "#productmodal"
            );
            this.$store.dispatch("loadProducts", {
              SecretKey: localStorage.SecretKey
            });
            this.$store.dispatch("loadDeliveries", {
              SecretKey: localStorage.SecretKey
            });
            // this.showAlert(res.message, "success");
            let msg = res.message;
            this.toast(
              "b-toaster-bottom-right",
              true,
              "success",
              msg,
              "Success"
            );
          }
        })
        .catch(err => {
          // this.showAlert(res, "danger");
          let errMsg = res;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
        });
    },
    pushProducts() {
      this.allDetails.push({
        // delivery_code: this.delivery_code,
        barcode: this.product_barcode,
        product_name: this.product_name,
        details: this.product_description,
        cost: this.cost_unit,
        price: this.price,
        quantity: this.quantity,
        date_expire: this.Expiry_date,
        date_received: this.delivery.date_received
      });

      this.clear();
    },

    clear() {
      this.delivery_code = "";
      this.product_barcode = "";
      this.product_name = "";
      this.product_description = "";
      this.cost_unit = "";
      this.price = "";
      this.quantity = "";
      this.Expiry_date = "";
    },
    addpendingProduct() {
      this.products.push({
        products: this.allDetails,
        Supplier: this.delivery.supplier_name,
        Date_Received: this.delivery.date_received
      });
    },
    clearpending() {
      this.allDetails = [];
      this.delivery.supplier_name = "";
      this.delivery.date_received = "";
    },

    info(product, index, button) {
      this.productModal.title = product.product_name;
      this.productModal.content = JSON.stringify(product, null, 2);
      this.$root.$emit("bv::show::modal", this.productModal.id, button);
    },
    resetInfoModal() {
      this.productModal.title = "";
      this.productModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
      this.products.splice(index, 1);
    },
    showAlert(message, variant) {
      this.dismissCountDown = this.dismissSecs;
      this.alert = {
        showAlert: 3,
        variant,
        message
      };
    }
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
  z-index: 100;
  width: 500px;
  float: right;
}

.card h4 {
  text-align: center;
}
.addBtn {
  margin: 0 10px 15px -15px;
}
.productcard {
  width: 350px;
  margin: 15px 0 0 15px;
}
.input {
  width: 400px;
}
.option {
  width: 500px;
  font-size: 20px;
}
.paper {
  margin: 15px 0 0 0;
  height: 65vh;
}
.btngrp {
  /* float: left; */
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin: 15px;
}
.pagination-bottom {
  margin-top: 30px;
}
.modal-dialog {
  height: 90vh;
}
</style>
