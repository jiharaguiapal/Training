<template>
  <div>
    <b-row>
      <b-col cols="">
        <b-card bg-variant="white" class="card-outline">
          <b-form @submit.prevent="adddetail" class="form-inline">
            <b-row>
              <label for="">Select: </label>

              <b-col cols="" class="form-inline">
                <b-form-input
                  class="input"
                  list="input-list"
                  id="input-order-list"
                  placeholder="Enter Barcode"
                  v-model="barcode"
                  @change="selectBarcode"
                ></b-form-input>
              </b-col>

              <b-form-datalist id="input-list" class="option"
                ><option
                  class="option"
                  v-for="product in productsState"
                  :key="product.product_barcode"
                  :value="product.product_barcode"
                  >Name: {{ product.product_name }} | Price: ${{
                    product.price
                  }}
                </option>
              </b-form-datalist>

              <label for="">Name: </label>

              <b-col cols="" class="form-inline">
                <b-form-input
                  class="form-control"
                  type="text"
                  placeholder=""
                  v-model="Product_name"
                  readonly
                ></b-form-input>
              </b-col>

              <label for="">Price: </label>

              <b-col cols="" class="form-inline">
                <b-form-input
                  class="priceinput"
                  type="number"
                  placeholder=""
                  v-model="Price"
                  readonly
                ></b-form-input>
              </b-col>

              <label for="">Quantity: </label>

              <b-col cols="" class="form-inline">
                <b-form-input
                  class="priceinput"
                  type="number"
                  placeholder="0"
                  v-model="Quantity"
                  @input="totalPlusqty"
                ></b-form-input>
              </b-col>
              <b-button variant="primary" @click="add_table">Add</b-button>
              <b-col>
                <b-button variant="danger" @click="clear">Clear</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
        <b-row>
          <div class="customercard">
            <b-card bg-variant="white" title="Customer Details">
              <b-form class="modalmargin">
                <label for="productname">Customer Name</label>
                <b-form-input
                  class="form-control"
                  type="text"
                  placeholder="Enter Customer Name"
                  v-model="customer_name"
                  required
                />

                <label for="productdesc">Customer Address</label>
                <b-form-input
                  class="form-control"
                  type="text"
                  placeholder="Enter Customer Address"
                  v-model="customer_address"
                  required
                />
                <b-form class="">
                  <label for="unitcost">Contact Number</label>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="Enter Contact Number"
                    v-model="contact_number"
                    required
                  />
                  <b-col>
                    <b-button
                      variant="danger"
                      @click="clearCustomer"
                      class="clearBtn"
                      >Clear</b-button
                    >
                  </b-col>
                  <!-- <label for="unitcost">Total Payment</label>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="Enter Contact Number"
                    v-model="total_payment"
                    required
                  /> -->
                </b-form>
                <br />
                <!-- <b-button @click="addtocustomer()" variant="primary"
                  >Continue</b-button
                >
                <b-button class="reset" type="reset" variant="danger"
                  >Reset</b-button
                > -->
              </b-form>
            </b-card>
            <div class="totals">
              <b-card bg-variant="white">
                <b-row>
                  <b-col cols="">
                    <label for="">Initial Total: </label>
                  </b-col>
                  <b-col cols="">
                    <b-form-input
                      type="number"
                      placeholder="0"
                      v-model="Total"
                      readonly
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="">
                    <label for="unitcost">Total Payment: </label>
                  </b-col>
                  <b-col cols="">
                    <b-form-input
                      placeholder="0"
                      type="number"
                      v-model="total_payment"
                      required
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </div>

          <b-col>
            <b-card bg-variant="white" class="paper">
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

              <!-- <b-button type="submit" variant="primary">End Sale</b-button>
              <b-button class="cancel" variant="danger">Cancel </b-button> -->

              <table class="table mt-5">
                <thead>
                  <tr>
                    <th scope="col">List</th>
                    <th scope="col">Barcode</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>

                    <!-- <th scope="col">Actions</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in list" :key="i">
                    <th scope="row">{{ ++i }}</th>
                    <td>{{ item.barcode }}</td>
                    <td>{{ item.Product_name }}</td>
                    <td>{{ item.Quantity }}</td>
                    <td>{{ item.Price }}</td>
                    <td>{{ item.Total }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <b-table
              
                :fields="fields"
                v-for="(item, i) in list"
                :key="i"
                >
               <template #cell(barcode)="item"> 
                  {{item.barcode}}

               </template>



                </b-table> -->
            </b-card>
          </b-col>
        </b-row>

        <!-- <b-col cols="">
          <b-button v-b-modal.modal-1 class="addBtn"
            >Add Customer Detail</b-button
          >
        </b-col> -->

        <!-- <div class="mt-3">
          <b-pagination
            v-model="currentPage"
            pills
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="supplier-table"
            align="center"
          ></b-pagination>
        </div> -->
        <b-col>
          <div class="btngrp">
            <b-button
              class="mr-2"
              @click="$bvModal.show('orderconfirm')"
              variant="primary"
              >Submit</b-button
            >
            <b-button @click="clearpending()" variant="danger">Clear</b-button>
          </div>
        </b-col>
      </b-col>
      <!-- <b-col cols="4"> -->
      <!-- <b-col cols="">
          <b-button v-b-modal.modal-1 class="addBtn"
            >Add Customer Detail</b-button
          >
        </b-col> -->
      <!-- <b-card bg-variant="white" title="Order #XXX">
            <b-table
              responsive="sm"
              show-empty
              :items="productsStates"
              :fields="fields"
            >
              <template #cell(productDesc)>
                {{ supplier.productDesc }}
              </template>
            </b-table> -->

      <!-- <b-button type="submit" variant="primary">End Sale</b-button>
          <b-button class="cancel" variant="danger">Cancel </b-button> -->
      <!-- </b-card> -->
      <!-- </b-col> -->
    </b-row>

    <b-modal id="orderconfirm" centered hide-footer>
      <template #modal-title> Confirm submit</template>
      <div class="d-block text-center"></div>

      <template #default="{ hide }">
        <b-button
          type="submit"
          class="mt-3"
          block
          @click="$bvModal.hide('orderconfirm'), addtocustomer(), addtoorder()"
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
      options: [],
      rows: 100,
      perPage: 10,
      currentPage: 1,

      filter: null,
      filterOn: [],
      sortBy: " ",
      sortDesc: false,

      customer: [],
      select_barcode: "",
      product: [],
      detail: [],
      order: [],
      customermodal: false,

      fields: [
        { key: "barcode", label: "Barcode" },
        { key: "Product_name", label: "Product Name" },
        { key: "Quantity" },
        { key: "Price", label: "Price" },
        { key: "Total" }
      ],
      selectedfields: [
        { key: "barcode" },
        { key: "productDesc", label: "Product Name" },
        // { key: "quantity" },
        { key: "costPerUnit", label: "Price" }
        // { key: "Total" }
      ],

      value: "",
      itemSelect: [],
      showselect: "",
      allDetails: [],
      barcode: "",
      Product_name: "",
      Quantity: "",
      Price: "",
      Total: "",
      item: "",
      customer_name: "",
      customer_address: "",
      contact_number: "",
      total_payment: "0",
      initial_total: "0",
      items: [],
      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      }
    };
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadProducts", {
      SecretKey: localStorage.SecretKey
    });
    this.$store.dispatch("loadCustomers", {
      SecretKey: localStorage.SecretKey
    });
  },
  computed: {
    ...mapGetters({
      productsState: "allProducts",
      customersState: "allCustomers"
    }),

    list() {
      console.log("teeeet", this.allDetails);

      return this.allDetails;
    }
  },

  methods: {
    addtocustomer() {
      this.$store
        .dispatch("addCustomer", {
          SecretKey: localStorage.SecretKey,
          fullname: this.customer_name,
          address: this.customer_address,
          contact: this.contact_number
        })
        .then(res => {
          console.log("hoyhoy");
        })
        .catch(err => err);
      this.customer = [];
    },
    addtoorder() {
      console.log("iii", this.allDetails, this.customer_name);

      this.$store
        .dispatch("addOrder", {
          product_table: this.allDetails,
          SecretKey: localStorage.SecretKey,
          customer_name: this.customer_name,
          customer_address: this.customer_address,
          contact_number: this.contact_number,
          total_payment: this.total_payment
        })
        .then(res => {
          console.log("orderinfo");
          if (res == "Error: Request failed with status code 406") {
            if (res == "Error: Network Error") {
              this.showAlert("Network Error", "danger");
            }
            this.showAlert("Error: Please check order details", "danger");
          } else {
            this.showAlert(
              "Order details was submitted successfully",
              "success"
            );
          }
        })
        .catch(err => err);
    },

    totalPlusqty() {
      this.Total = this.Quantity * this.Price;
      console.log("totaltest", this.Total);
    },
    totalAll() {
      this.total_payment = this.Quantity * this.Price;
      console.log("totaltest", this.item.Total);
    },

    add_table() {
      this.allDetails.push({
        barcode: this.barcode,
        Product_name: this.Product_name,
        Quantity: this.Quantity,
        Price: this.Price,
        Total: this.Total
      });

      this.initial_total = parseInt(this.initial_total) + parseInt(this.Total);

      this.total_payment = this.initial_total;
      console.log("totaltest", this.initial_total);
      console.log(this.allDetails);
      this.clear();
    },
    clear() {
      (this.barcode = ""),
        (this.Product_name = ""),
        (this.Price = ""),
        (this.Quantity = ""),
        (this.Total = "");
    },
    clearCustomer() {
      (this.customer_name = ""),
        (this.customer_address = ""),
        (this.customer_number = "");
    },
    clearpending() {
      this.allDetails = "";
      this.total_payment = "";
    },

    selectBarcode() {
      console.log("hooy", this.barcode);
      console.log("haay", this.productsState);

      let barcode = this.productsState.find(
        barcode => barcode.product_barcode == this.barcode
      );
      this.Product_name = barcode.product_name;
      this.Price = barcode.price;
      console.log("heyy", this.Product_name);
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
.card {
  background-color: #95abc1;
}
.card h4 {
  text-align: center;
}
.modal_header {
  background-color: red;
}
.addBtn {
  margin: 0 10px 15px -15px;
}
.customercard {
  height: 350px;
  width: 350px;
  margin: 15px 0 0 15px;
}
.input {
  width: 200px;
}
.option {
  width: 500px;
  font-size: 20px;
}
.paper {
  margin: 15px 0 0 0;
  height: 460px;
}
.btngrp {
  align-items: flex-end;
  float: right;
  margin-top: 10px;
  /* align-items: bo; */
  position: relative;
  /* bottom: 20px; */
  left: 15px;
}
.priceinput {
  width: 100px;
}
.totals {
  margin: 15px 0 0 0;
}
.alert {
  z-index: 10;
  width: 500px;
  float: right;
}
.clearBtn {
  margin: 10px -15px 0 0;
  float: right;
}
</style>
