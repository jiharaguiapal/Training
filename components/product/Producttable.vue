<template>
  <div class="">
    <b-card class="card-table">
      <b-form-group>
        <b-row>
          <b-col cols="">
            <b-button v-b-modal.productmodal variant="primary" size="sm">
              <font-awesome-icon icon="plus-circle" /> Add Product</b-button
            >
          </b-col>
          <!-- {{ categoryState[0] }} -->
          <b-col cols="4">
            <b-input-group size="sm">
              <b-form-select
                id="select"
                v-model="selected"
                :options="categoryState[0]"
                size="sm"
                value-field="name"
                text-field="name"
              ></b-form-select>
              <b-input-group-append>
                <b-button disabled>Filter Category</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="6">
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
        head-variant="light"
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
            <font-awesome-icon icon="archive" />
          </b-button>
        </template>
        <template v-slot:cell(status)="row">
          <div class="badge-font-size" v-if="row.item.status">
            <b-badge pill variant="badge">Active</b-badge>
          </div>
          <div class="badge-font-size" v-else>
            <b-badge pill variant="gray">Inactive</b-badge>
          </div>
        </template>
        <template v-slot:cell(img)="row">
          <b-img
            class="prod-img"
            :src="api + '/images/' + row.item.img"
            rounded
            alt="Rounded image"
          ></b-img>
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
    <b-modal
      size="lg"
      scrollable
      :header-bg-variant="modalheadbg"
      :id="productModal.id"
      :title="productModal.title"
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
            v-for="items in productModal.content"
            :key="items"
          >
            {{ items }}
          </b-list-group-item>
        </b-col>
      </b-row>
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
            <b-form @submit.prevent="adddetail">
              <b-row>
                <label class="ml-3 mt-2" for="select-supplier"
                  >Select Supplier:
                </label>
                <b-col>
                  <b-form-select
                    size="sm"
                    class="input "
                    list="sup-list"
                    id="select-supplier"
                    v-model="delivery.supplier_name"
                  >
                    <option
                      v-for="(supplier, supplier_id) in suppliersState"
                      :key="supplier_id"
                      >{{ supplier.supplier_name }}
                    </option></b-form-select
                  >
                </b-col>
                <label class="ml-3 mt-2" for="">Date Received: </label>
                <b-col>
                  <b-form-datepicker
                    size="sm"
                    class="form-control col-sm"
                    type="date"
                    placeholder="Select Delivery Date"
                    v-model="delivery.date_received"
                    required
                  />
                </b-col>
              </b-row>
            </b-form>

            <b-row>
              <b-card header="Product Details" class="productcard">
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
                  <label class="mt-2" for="productdesc">Product Category</label>

                  <b-form-select
                    :options="categoryState[0]"
                    size="sm"
                    value-field="category_id"
                    text-field="name"
                    v-model="category"
                  >
                  </b-form-select>
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
                  <label class="mt-2" for="productname">Product Image</label>

                  <b-form-file
                    v-model="fileName"
                    :state="Boolean(fileName)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                </b-form>
                <br />
                <b-button @click="pushProducts()" variant="primary"
                  >Add</b-button
                >

                <b-button class="reset" type="reset" variant="danger"
                  >Reset</b-button
                >
              </b-card>
              <b-col>
                <b-card
                  header="Pending Products"
                  bg-variant="white"
                  class="paper"
                >
                  <b-table
                    borderless
                    hover
                    :fields="pendingFields"
                    :per-page="perPagePending"
                    :current-page="currentPagePending"
                    show-empty
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :items="list"
                  >
                    <template #cell(actions)="row">
                      <b-button
                        size="sm"
                        @click="remove(row.item, row.index, $event.target)"
                        class="mr-1 removeBtn"
                        variant="danger"
                        pill
                        title="Remove"
                        v-b-tooltip.hover
                      >
                        <font-awesome-icon icon="times" />
                      </b-button>
                    </template>
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
  </div>
</template>

<script>
import axios from "axios";

import moment from "moment";
import { mapState, mapMutations, mapGetters, createLogger } from "vuex";
export default {
  data() {
    return {
      // rows: 100,
      perPage: 4,
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
      api: "",
      sortDesc: false,
      pendingFields: [
        { key: "img", sortable: true, label: "Image" },
        { key: "barcode", sortable: true, label: "Barcode" },
        { key: "product_name", sortable: true, label: "Product Name" },
        { key: "details", sortable: true, label: "Details" },
        { key: "cost_per_unit", sortable: true, label: "Unit Cost" },
        { key: "price", label: "Price" },
        { key: "quantity", sortable: true, label: "Quantity" },
        // { key: "date_received", sortable: true, label: "Date Received" },
        { key: "actions", sortable: false }
      ],
      fields: [
        {
          key: "img",
          sortable: true,
          label: "Image",
          thStyle: { width: "10%" }
        },
        { key: "barcode", sortable: true, label: "Barcode" },
        { key: "product_name", sortable: true, label: "Product Name" },
        // { key: "details", sortable: true, label: "Details" },
        // { key: "cost_per_unit", sortable: true, label: "Unit Cost" },
        { key: "price", label: "Price" },
        { key: "quantity", sortable: true, label: "Quantity" },
        { key: "delivery_id", sortable: true, label: "Delivery ID" },
        // { key: "date_received", sortable: true, label: "Date Received" },
        // { key: "status", sortable: true, label: "Status" },
        { key: "actions", sortable: false }
      ],
      detailName: [
        "Product ID: ",
        "Product Name: ",
        "Barcode: ",
        "Details: ",
        "Quantity: ",
        "Price: ",
        "Status: ",
        "Date Created: ",
        "Cost Per Unit: ",
        "Date Received: ",
        "Expiration Date: ",
        "Delivery ID: ",
        "Image: ",
        "Category ID: "
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
      fileName: null,
      imageArr: [],
      Supplier: "",
      barcode: "",
      Date_Received: "",
      product_barcode: "",
      product_name: "",
      product_description: "",
      category: "",
      cost_unit: "",
      selected: "",
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
    this.$store.dispatch("getCategory", {
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
      suppliersState: "allSuppliers",
      categoryState: "allCategory"
    }),

    list() {
      return this.allDetails;
    }
  },
  created() {
    this.api = this.$axios.defaults.baseURL;
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
    async uploadImage() {
      console.log("file", this.fileName);
      const formData = new FormData();
      this.imageArr.forEach(file => {
        formData.append("product_images", file);
      });
      // this.allDetails.forEach(product => formData.append("products", product));
      // formData.append("delivery", this.delivery);
      // formData.append("product_images", this.fileName, this.fileName.name);
      // console.log(...formData);
      await axios
        .post(`${this.$axios.defaults.baseURL}/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Content-Type": formData.type
            // accept: "application/json",
            // "Accept-Language": "en-US,en;q=0.8",
            // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
            Authorization: `Bearer ${localStorage.SecretKey}`
          }
        })
        .then(
          result => {
            console.log("upload imge", result);
            this.clear();
          },
          error => {
            console.log("errr", error);
          }
        );
      // this.register(this.token);
      // console.log("Done Upload");
    },
    addToLogs(action, id) {
      console.log("action, id", action, id);
      this.$store
        .dispatch("addLog", {
          action_made: action,
          user_id: id,
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          console.log("res log", res);
          this.$store.dispatch("getLog", {
            SecretKey: localStorage.SecretKey
          });
        })
        .catch(err => {
          console.log("err log", err);
        });
    },
    // },
    remove(item, index) {
      this.allDetails.splice(index, 1);
    },
    async addtoproduct() {
      // this.uploadImage();
      await this.$store
        .dispatch("addProduct", {
          delivery: this.delivery,
          SecretKey: localStorage.SecretKey,
          products: this.allDetails
          // product_images: this.fileName
        })
        .then(res => {
          console.log("res", res);
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
            this.uploadImage();
            let msg = res.success;
            this.toast(
              "b-toaster-bottom-right",
              true,
              "success",
              msg,
              "Success"
            );
            this.addToLogs(
              `Added Product ${this.allDetails.product_name}`,
              localStorage.id
            );
          }
        });

      //     .catch(err => {
      //       // this.showAlert(res, "danger");
      //       console.log(err);
      //       let errMsg = err;
      //       this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
      //     });
    },
    pushProducts() {
      console.log("fileName", this.category);
      if (this.product_barcode == "") {
        let msg = "Please enter product barcode";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.product_name == "") {
        let msg = "Please enter product name";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.product_description == "") {
        let msg = "Please enter product description";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.category == "") {
        let msg = "Please select category";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.cost_unit == "") {
        let msg = "Please enter cost per unit";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.price == "") {
        let msg = "Please enter price";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.quantity == "") {
        let msg = "Please enter quantity";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.date_expire == "") {
        let msg = "Please enter expiration date";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.date_received == "") {
        let msg = "Please enter delivery date";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      }
      if (this.fileName == null) {
        let msg = "Please upload product image";
        this.toast("b-toaster-bottom-right", true, "danger", msg, "Error");
      } else {
        this.allDetails.push({
          // delivery_code: this.delivery_code,
          barcode: this.product_barcode,
          product_name: this.product_name,
          details: this.product_description,
          category: this.category,
          cost: this.cost_unit,
          price: this.price,
          quantity: this.quantity,
          date_expire: this.Expiry_date,
          date_received: this.delivery.date_received,
          img: this.fileName.name
        });
        this.imageArr.push(this.fileName);
        console.log("this.allDetails", this.imageArr);
      }
    },

    clear() {
      this.delivery_code = "";
      this.product_barcode = "";
      this.product_name = "";
      this.product_description = "";
      this.category = "";
      this.cost_unit = "";
      this.price = "";
      this.quantity = "";
      this.Expiry_date = "";
      this.fileName = null;
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
      console.log("pr", product);
      this.productModal.title = product.product_name;
      // this.productModal.content = JSON.stringify(product, null, 2);
      this.productModal.content = product;
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
