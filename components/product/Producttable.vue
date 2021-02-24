<template>
  <div class="protab">
    <b-form-row>
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
      </b-col>
      <b-col cols="9">
        <b-card class="card bg-info shadow p-3 mb-5 bg-white rounded">
          <b-form-group>
            <b-input-group size="">
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
          </b-form-group>
          <b-table
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
      </b-col>
    </b-form-row>
    <b-modal id="confirmproduct" centered hide-footer>
      <template #modal-title> Confirm submit</template>
      <div class="d-block text-center"></div>
      d
      <template #default="{ hide }">
        <b-button
          type="submit"
          class="mt-3"
          block
          @click="$bvModal.hide('confirmproduct'), addtoproduct()"
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
export default {
  data() {
    return {
      rows: 100,
      perPage: 7,
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
        { key: "product_name", sortable: true, label: "Product Description" },
        { key: "product_description", sortable: true, label: "Details" },
        { key: "cost_unit", sortable: true, label: "Unit Cost" },
        { key: "price", label: "Price" },
        { key: "stocks", sortable: true, label: "Quantity" },
        { key: "Expiry_date", sortable: true, label: "Expiration Date" },
        // { key: "supplierID", sortable: true, label: "Supplier ID" },
        { key: "delivery_code", sortable: true, label: "Delivery Code" },
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
      dismissCountDown: 0
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadProducts");
    this.$store.dispatch("loadDeliveries");
  },
  // created() {
  //   console.log("prod", this.products);
  // },

  // addProduct() {
  //   console.log("yowww", productsState.products);
  // },
  // computed: mapState({
  //   products: state => state.products,
  //   items: state => state.items
  // }),
  computed: {
    ...mapGetters({
      productsState: "allProducts",
      deliveriesState: "allDeliveries"
    })
  },

  methods: {
    addtoproduct() {
      console.log("newprod", this.product);
      this.isBusy = true;

      this.$store

        .dispatch("addProduct", {
          product_barcode: this.product.product_barcode,
          product_name: this.product.product_name,
          product_description: this.product.product_description,
          cost_unit: this.product.cost_unit,
          price: this.product.price,
          stocks: this.product.stocks,
          Expiry_date: this.product.Expiry_date,
          delivery_code: this.product.delivery_code
        })
        .then(res => {
          console.log(res);
          this.product = [];
          this.isBusy = false;
          if (res == "Error: Request failed with status code 406") {
            this.showAlert("Error: Please check product details", "danger");
          } else {
            this.showAlert(
              "Product details was submitted successfully",
              "success"
            );
          }
        });
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
  z-index: 10;
  width: 500px;
  float: right;
}
</style>
