<template>
  <div class="protab">
    <!-- <b-form-row>
      <b-col cols="3">
        <b-card class="bg-secondary">
          <h3 class="formTitle">
            <font-awesome-icon icon="boxes" /> Add Product
          </h3>
        </b-card>
        <b-card>
          <b-form class="modalmargin">
            <label for="productcode">Product Barcode</label>
            <b-form-input
              class="form-control"
              type="text"
              placeholder="Enter Product Barcode"
              v-model="product.product_barcode"
              required
            />
            <label for="productname">Product Name</label>
            <b-form-input
              class="form-control"
              type="text"
              placeholder="Enter Product Name"
              v-model="product.product_name"
              required
            />
            <label for="productdesc">Product Description</label>
            <b-form-input
              class="form-control"
              type="text"
              placeholder="Enter Product Description"
              v-model="product.product_description"
              required
            />
            <b-form class="">
              <label for="unitcost">Cost per unit</label>
              <input
                class="form-control"
                type="number"
                placeholder="Enter cost per unit"
                v-model="product.cost_unit"
                required
              />
              <label for="unitcost">Price</label>
              <input
                class="form-control"
                type="number"
                placeholder="Enter cost per unit"
                v-model="product.price"
                required
              />
              <label for="productname">Stocks</label>
              <b-form-input
                class="form-control"
                type="number"
                placeholder="Enter product quantity"
                v-model="product.stocks"
                required
              />
              <label for="productname">Expiry Date</label>
              <b-form-datepicker
                class="form-control col-sm"
                type="date"
                v-model="product.Expiry_date"
                required
              />
              <label for="companyname">Select Delivery Code: </label>

              <b-form-select v-model="product.delivery_code">
                <option
                  v-for="delivery in deliveriesState"
                  :key="delivery.delivery_code"
                  >{{ delivery.delivery_code }}
                </option></b-form-select
              >
            </b-form>
            <br />
            <b-button @click="$bvModal.show('confirmproduct')" variant="primary"
              >Submit</b-button
            >
            <b-button class="reset" type="reset" variant="danger"
              >Reset</b-button
            >
          </b-form>
        </b-card>
      </b-col> -->
    <b-modal
      id="productmodal"
      size="huge"
      class="product-modal"
      hide-footer
      title="Add Product"
      scrollable
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
                      v-model="Supplier"
                    >
                      <option
                        v-for="(supplier, supplier_id) in suppliersState"
                        :key="supplier_id"
                        >{{ supplier.companyname }}
                      </option></b-form-select
                    >
                  </b-col>
                  <label for="">Date Received: </label>
                  <b-col>
                    <b-form-datepicker
                      class="form-control col-sm"
                      type="date"
                      placeholder="Select Delivery Date"
                      v-model="Date_Received"
                      required
                    />
                  </b-col>
                </b-row>
              </b-form>
            </b-card>
            <b-row>
              <b-card
                bg-variant="light"
                title="Product Details"
                class="productcard"
              >
                <b-form class="modalmargin">
                  <!-- <label for="">Enter Delivery Code: </label>
                    <b-form-input
                      id="input-delivery-code"
                      v-model="delivery_code"
                      required
                    ></b-form-input> -->

                  <!-- <label for="companyname">Select Supplier: </label> -->

                  <label for="productcode">Product Barcode</label>
                  <b-form-input
                    class="form-control"
                    type="text"
                    placeholder="Enter Product Barcode"
                    v-model="product_barcode"
                    required
                  />
                  <label for="productname">Product Name</label>
                  <b-form-input
                    class="form-control"
                    type="text"
                    placeholder="Enter Product Name"
                    v-model="product_name"
                    required
                  />
                  <label for="productdesc">Product Description</label>
                  <b-form-input
                    class="form-control"
                    type="text"
                    placeholder="Enter Product Description"
                    v-model="product_description"
                    required
                  />
                  <b-form class="">
                    <label for="unitcost">Cost per unit</label>
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Enter cost per unit"
                      v-model="cost_unit"
                      required
                    />
                    <label for="unitcost">Price</label>
                    <input
                      class="form-control"
                      type="number"
                      placeholder="Enter cost per unit"
                      v-model="price"
                      required
                    />
                    <label for="productname">Stocks</label>
                    <b-form-input
                      class="form-control"
                      type="number"
                      placeholder="Enter product quantity"
                      v-model="quantity"
                      required
                    />
                    <label for="productname">Expiry Date</label>
                    <b-form-datepicker
                      class="form-control col-sm"
                      type="date"
                      v-model="Expiry_date"
                      required
                    />
                    <!-- <label for="companyname">Select Delivery Code: </label>

              <b-form-select v-model="product.delivery_code">
                <option
                  v-for="delivery in deliveriesState"
                  :key="delivery.delivery_code"
                  >{{ delivery.delivery_code }}
                </option></b-form-select
              > -->
                  </b-form>
                  <br />
                  <b-button @click="add_product" variant="primary"
                    >Add</b-button
                  >
                  <!-- <b-button @click="$bvModal.show('confirmproduct')" variant="primary"
              >Add</b-button
            > -->
                  <b-button class="reset" type="reset" variant="danger"
                    >Reset</b-button
                  >
                </b-form>
              </b-card>
              <b-col>
                <b-card
                  bg-variant="white"
                  title="Pending Products"
                  class="paper"
                >
                  <!-- <b-table
                  responsive="sm"
                  show-empty
                  :items="productsStates"
                  :fields="fields"
                >
                  <template #cell(productDesc)>
                    {{ supplier.productDesc }}
                  </template>
                </b-table> -->

                  <table class="table mt-5">
                    <thead>
                      <tr>
                        <th scope="col">List</th>
                        <th scope="col">Barcode</th>
                        <th scope="col">Name</th>
                        <th scope="col">Details</th>
                        <th scope="col">Unit Cost</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Expiration Date</th>
                        <!-- <th scope="col">Delivery Code</th> -->
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product, index) in list" :key="index">
                        <th scope="row">{{ ++index }}</th>
                        <td>{{ product.product_barcode }}</td>
                        <td>{{ product.product_name }}</td>
                        <td>{{ product.product_description }}</td>
                        <td>{{ product.cost_unit }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.Expiry_date }}</td>
                      </tr>
                    </tbody>
                  </table>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <div class="btngrp">
          <b-button @click="$bvModal.show('confirmproduct')" variant="primary"
            >Submit</b-button
          >
          <b-button @click="clearpending()" variant="danger">Clear</b-button>
        </div>
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
          <!-- <b-button
                size="sm"
                @click="deleteEvent(row.index)"
                class="mr-1"
                variant="danger"
                pill
              >
                <font-awesome-icon icon="trash-alt" />
              </b-button>  -->
        </template></b-table
      >
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
      <div class="d-block text-center"></div>
      d
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
import { mapState, mapMutations, mapGetters, createLogger } from "vuex";
export default {
  data() {
    return {
      // rows: 100,
      perPage: 8,
      currentPage: 1,
      product: [],
      filter: null,
      filterOn: [],
      options: [],
      products: [],
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
      fields: [
        { key: "product_barcode", sortable: true, label: "Barcode" },
        { key: "product_name", sortable: true, label: "Product Name" },
        { key: "product_description", sortable: true, label: "Details" },
        { key: "cost_unit", sortable: true, label: "Unit Cost" },
        { key: "price", label: "Price" },
        { key: "stocks", sortable: true, label: "Quantity" },
        { key: "Expiry_date", sortable: true, label: "Expiration Date" },
        // { key: "supplierID", sortable: true, label: "Supplier ID" },
        // { key: "delivery_code", sortable: true, label: "Delivery Code" },
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
      product: []
      //  onFiltered:[]
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
  // created() {
  //   console.log("prod", this.products);
  // },

  // addProduct() {
  //   console.log("yowww", productsState.produ cts);
  // },
  // computed: mapState({
  //   products: state => state.products,
  //   items: state => state.items
  // }),
  computed: {
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
    addtoproduct() {
      console.log("newprod", this.products[0], this.Supplier);

      this.$store

        .dispatch("addProduct", {
          SecretKey: localStorage.SecretKey,
          products: this.allDetails,
          Supplier: this.Supplier,
          Date_Received: this.Date_Received
        })
        .then(res => {
          console.log("heere");

          if (res == "Error: Request failed with status code 406") {
            if (res == "Error: Network Error") {
              this.showAlert("Network Error", "danger");
            }
            this.showAlert("Error: Please check product details", "danger");
          } else {
            this.showAlert(
              "Product details was submitted successfully",
              "success"
            );
          }
        })
        .catch(err => err);
    },
    add_product() {
      this.allDetails.push({
        // delivery_code: this.delivery_code,
        product_barcode: this.product_barcode,
        product_name: this.product_name,
        product_description: this.product_description,
        cost_unit: this.cost_unit,
        price: this.price,
        quantity: this.quantity,
        Expiry_date: this.Expiry_date
      });

      this.clear();
      console.log("tet", this.allDetails);
    },

    clear() {
      this.delivery_code = "";
      this.product_barcode = "";
      // this.supplier.companyname = "";
      // this.delivery_received_date = "";
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
        Supplier: this.Supplier,
        Date_Received: this.Date_Received
      });

      console.log("pend", this.products, this.Date_Received);
    },
    clearpending() {
      this.allDetails = [];
      this.supplier.Supplier = "";
      this.Date_Received = "";
    },

    // check() {
    //   console.log("heree", this.suppliersState);
    // },
    // ...mapMutations(["ADD_PRODUCT"]),
    // addtoproduct: function() {
    //   this.ADD_PRODUCT(this.product);
    //   this.product = [];
    // },
    // ...mapMutations(["ADD_ITEM"]),
    // additem: function() {
    //   this.ADD_ITEM(this.item);
    //   this.item = [];
    // },
    info(product, index, button) {
      this.productModal.title = `${product.product_name}`;
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
}
.btngrp {
  float: right;
  margin-top: 10px;
}
.modal-dialog {
  height: 90vh;
}
</style>
