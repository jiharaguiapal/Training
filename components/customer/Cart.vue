<template>
  <div>
    <b-container>
      <b-row>
        <h3 class="my-cart-title">My Shopping Cart</h3>
      </b-row>
      <b-row>
        <b-col>
          <b-row>
            <b-col class="table-col">
              <b-table
                borderless
                show-empty
                :fields="fields"
                :items="cartState"
                @row-selected="onRowSelected"
                selectable
              >
                <!-- <template v-slot:cell(select)="row">
                  <b-form-checkbox
                    id="checkbox-1"
                    name="selected-item"
                    :value="row.item"
                    v-model="selectedItems"
                  >
                  </b-form-checkbox>
                </template> -->
                <template v-slot:cell(product_img)="row">
                  <b-img
                    class="prod-img"
                    :src="api + '/images/' + row.item.product_img"
                    rounded
                    alt="Rounded image"
                  ></b-img>
                </template>
                <template v-slot:cell(quantity)="row">
                  <b-row no-gutters>
                    <b-button
                      size="sm"
                      class="sqrBtn"
                      variant="white"
                      v-b-tooltip.hover
                      @click="minusToCart(row.item)"
                    >
                      <font-awesome-icon icon="minus" />
                    </b-button>
                    <b-card class="sm-card" no-body>
                      <b>
                        {{ row.item.quantity }}
                      </b>
                    </b-card>
                    <b-button
                      size="sm"
                      class="sqrBtn"
                      variant="primary"
                      v-b-tooltip.hover
                      @click="editToCart(row.item)"
                    >
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-row>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <!-- <b-row>
            <b-button
              variant="outline-primary"
              v-b-modal.ordermodal
              class="co-btn"
            >
              <font-awesome-icon icon="cart-plus" /> Checkout</b-button
            >
          </b-row> -->
        </b-col>
        <b-col cols="4">
          <b-card title="Order Summary">
            <b-row>
              <!-- <b-col><p>Shipping Information</p></b-col> -->
            </b-row>

            <b-row>
              <b-col><p>Shipping Address</p> </b-col>
            </b-row>
            <b-row>
              <b-col
                ><b-input v-model="shippingAddress" size="sm"></b-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col
                ><label class="mt-3" for=""> Select Shipping Type</label>
                <b-form-select size="sm" v-model="shippingType" class="input">
                  <!-- <b-form-select-option disabled :value="null"
                    >Please select an option</b-form-select-option
                  > -->
                  <b-form-select-option value="pick-up"
                    >Pickup</b-form-select-option
                  >
                  <b-form-select-option disabled value="delivery"
                    >Delivery</b-form-select-option
                  >
                </b-form-select></b-col
              >

              <!-- <b-col><p>Test</p> </b-col> -->
            </b-row>

            <br />
            <br />
            <b-row>
              <b-col><p>Total Items</p> </b-col>
              <b-col
                ><p>{{ formatAmount(subTotal) }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col><p>Subtotal</p> </b-col>
              <b-col
                ><p>{{ formatAmount(subTotal) }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col><p>Shipping Fee</p> </b-col>
              <b-col
                ><p>{{ formatAmount(shippingFee) }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col><p>Total Amount</p></b-col>
              <b-col
                ><p>{{ formatAmount(totalAmount) }}</p></b-col
              >
            </b-row>
            <br />
            <b-row>
              <b-col class="btn-col">
                <b-button
                  variant="primary"
                  @click="openPayment()"
                  class="co-btn"
                >
                  Proceed to Payment</b-button
                >
              </b-col>
            </b-row>
          </b-card></b-col
        >
      </b-row>
    </b-container>
    <div>
      <b-modal
        id="ordermodal"
        size="huge"
        class="order-modal"
        title="New Order"
        hide-footer
        scrollable
        no-close-on-backdrop
      >
        <Neworder />
      </b-modal>
    </div>
    <b-modal id="orderconfirm" centered hide-footer>
      <template #modal-title> Confirm Order</template>

      <template #default="{ hide }">
        <b-button
          type="submit"
          class="mt-3"
          block
          @click="
            $bvModal.hide('orderconfirm'),
              $bvModal.hide('payment-modal'),
              addtoorder()
          "
          >Confirm</b-button
        >

        <b-button @click="hide()" block variant="danger"> Cancel</b-button>
      </template>
    </b-modal>
    <b-modal
      class="paymentModal"
      size="lg"
      id="payment-modal"
      centered
      hide-footer
      hide-header
    >
      <b-row class="payment-div" no-gutters>
        <!-- <template #modal-title class="headerBG"> Confirm Order</template> -->
        <b-col cols="8">
          <b-card>
            <b-row>
              <b-col>
                <b-card class="selectCard" no-body>
                  <img
                    class="visa"
                    src="~/static/imgs/card/icons8-visa.svg"
                    alt="visa"
                /></b-card>
              </b-col>
              <b-col>
                <b-card class="selectCard" no-body>
                  <img
                    class="paypal"
                    src="~/static/imgs/card/icons8-paypal.svg"
                    alt="paypal"
                  />
                </b-card>
              </b-col>
              <b-col>
                <b-card class="selectCard" no-body>
                  <img
                    class="gcash"
                    src="~/static/imgs/card/icons8-gcash.svg"
                    alt="gcash"
                /></b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label class="label-name" for="">Name on card</label>
                <b-input size="sm" placeholder="Jose Mari Chan"></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label class="label-name" for="">Card Number</label>
                <b-input size="sm" placeholder="0000 0000 0000 0000"></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label class="label-name" for="">Month</label>
                <b-select
                  :options="months"
                  size="sm"
                  placeholder="0000 0000 0000 0000"
                ></b-select>
              </b-col>
              <b-col>
                <label class="label-name" for="">Year</label>
                <b-select
                  :options="years"
                  size="sm"
                  placeholder="0000 0000 0000 0000"
                ></b-select>
              </b-col>
              <b-col>
                <label class="label-name" for="">CVV</label>
                <b-input size="sm" placeholder=""></b-input>
              </b-col>
            </b-row>

            <!-- <b-row>
          <b-col>
            <b-button
              type="submit"
              class=""
              block
              @click="$bvModal.hide('orderconfirm'), addtoorder()"
              >Confirm</b-button
            >
          </b-col>
          <b-col>
            <b-button @click="hide()" block variant="danger"> Cancel</b-button>
          </b-col>
        </b-row> -->
          </b-card>
        </b-col>
        <b-col>
          <b-card class="side-card" no-body>
            <b-row class="center-text">
              <b>Payment Summary</b>
            </b-row>

            <b-row no-gutters>
              <b-col><p>Subtotal</p> </b-col>
              <b-col
                ><p>{{ formatAmount(subTotal) }}</p>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col><p>Shipping Fee</p> </b-col>
              <b-col
                ><p>{{ formatAmount(shippingFee) }}</p>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col><p>Total Amount</p></b-col>
              <b-col
                ><p>{{ formatAmount(totalAmount) }}</p></b-col
              >
            </b-row>
            <br />
            <b-row no-gutters>
              <b-col class="btn-col">
                <b-button
                  variant="primary"
                  @click="clickSubmit()"
                  class="co-btn2"
                >
                  Checkout</b-button
                >
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col class="btn-col">
                <b-button
                  variant="danger"
                  @click="closePayment()"
                  class="co-btn3"
                >
                  Back</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- <template #default="{ hide }">
        <b-row>
          <b-col>
            <b-button
              type="submit"
              class=""
              block
              @click="$bvModal.hide('orderconfirm'), addtoorder()"
              >Confirm</b-button
            >
          </b-col>
          <b-col>
            <b-button @click="hide()" block variant="danger"> Cancel</b-button>
          </b-col>
        </b-row>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      fields: [
        // {
        //   key: "select",
        //   label: "Select",
        //   thStyle: { width: "5%" }
        // },
        {
          key: "product_img",
          label: "Product",
          thStyle: { width: "10%" }
        },
        {
          key: "product_name",
          label: ""
        },
        {
          key: "quantity",
          label: "Quantity"
        },
        {
          key: "product_price_per_unit",
          label: "Price"
        },
        {
          key: "total_price",
          label: "Total"
        }
        // {
        //   key: "Action",
        //   label: "Action"
        // }
      ],
      items: [
        {
          isActive: true,
          price: 40,
          quantity: 40,
          first_name: "Dickerson",
          total: "4324"
        },
        {
          isActive: false,
          price: 21,
          quantity: 40,
          first_name: "Larsen",
          total: "21"
        },
        {
          isActive: false,
          price: 89,
          quantity: 40,
          first_name: "Geneva",
          total: "234"
        },
        {
          isActive: true,
          price: 38,
          quantity: 40,
          first_name: "Jami",
          total: "321"
        }
      ],
      options: [
        { value: null, text: "Please select shipping type" },
        { value: "pick-up", text: "Pick-up" },
        { value: null, text: "Delivery" }
      ],
      selectedItems: [],
      subTotal: 0,
      totalAmount: 0,
      shippingFee: 150,
      shippingAddress: localStorage.address,
      shippingType: "",
      allDetails: [],
      api: "",
      months: [
        { value: "January", text: "January" },
        { value: "February", text: "February" },
        { value: "March", text: "March" },
        { value: "April", text: "April" },
        { value: "May", text: "May" },
        { value: "June", text: "June" },
        { value: "July", text: "July" },
        { value: "August", text: "August" },
        { value: "September", text: "September" },
        { value: "October", text: "October" },
        { value: "November", text: "November" },
        { value: "December", text: "December" }
      ],
      years: [
        { value: "2020", text: "2020" },
        { value: "2021", text: "2021" },
        { value: "2022", text: "2022" },
        { value: "2023", text: "2023" },
        { value: "2024", text: "2024" },
        { value: "2025", text: "2025" },
        { value: "2026", text: "2026" },
        { value: "2027", text: "2027" },
        { value: "2028", text: "2028" }
      ]
    };
  },
  beforeCreate() {
    this.$store.dispatch("getCart", {
      id: localStorage.id,
      SecretKey: localStorage.SecretKey
    });
  },
  computed: {
    ...mapGetters({
      cartState: "allCart"
    })
  },
  watch: {
    selectedItems() {
      this.allDetails = [];
      if (this.selectedItems.length == 0) {
        this.subTotal = 0;
        this.totalAmount = 0;
        this.shippingFee = 150;
      } else {
        for (let index = 0; index < this.selectedItems.length; index++) {
          const element = this.selectedItems[index];
          console.log("element.total_price", element);
          this.subTotal += element.total_price;
          this.allDetails.push({
            barcode: element.product_barcode,
            product_name: element.product_name,
            quantity: element.quantity,
            price: element.product_price_per_unit,
            total_price: element.total_price,
            details: element.product_details,
            cart_id: element.cart_id,
            product_id: element.product_id
          });
        }
        this.totalAmount = this.subTotal + this.shippingFee;
        console.log("  this.allDetails ", this.allDetails);
      }
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
    onRowSelected(items) {
      this.subTotal = 0;
      this.totalAmount = 0;
      this.shippingFee = 150;
      this.selectedItems = items;
      console.log("items", items);

      console.log(" this.selectedItems", this.selectedItems);
    },
    closePayment() {
      this.$root.$emit("bv::hide::modal", "payment-modal", "payment-modal");
    },
    openPayment() {
      this.$root.$emit("bv::show::modal", "payment-modal", "payment-modal");
    },
    async editToCart(row) {
      console.log("id", row);
      await this.$store
        .dispatch("editCartItem", {
          // customer_id: localStorage.id,
          cart_id: row.cart_id,
          quantity: 1
          // product_images: this.fileName
        })
        .then(res => {
          console.log("res", res);
          let msg = res.message;
          this.toast(
            "b-toaster-bottom-right",
            true,
            "success",
            msg,
            "Added to Cart"
          );
          this.$store.dispatch("getCart", {
            id: localStorage.id
          });

          // this.showAlert(res.message, "success");
        })
        .catch(err => {
          console.log(err);
        });
    },
    async minusToCart(row) {
      console.log("id", row);
      await this.$store
        .dispatch("editCartItem", {
          // customer_id: localStorage.id,
          cart_id: row.cart_id,
          quantity: -1
          // product_images: this.fileName
        })
        .then(res => {
          console.log("res", res);
          let msg = res.message;
          this.toast(
            "b-toaster-bottom-right",
            true,
            "success",
            msg,
            "Added to Cart"
          );
          this.$store.dispatch("getCart", {
            id: localStorage.id
          });

          // this.showAlert(res.message, "success");
        })
        .catch(err => {
          console.log(err);
        });
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
    getData() {
      let cartArr = {};
      cartArr = { ...this.cartState };
      return cartArr;
    },
    async getCart(item, index, button) {
      // this.infoModal.title = "Order Details of Receipt No. " + item.order_id;
      // this.totalPaid = item.total_price;
      // this.customerPaid = item.customer_name;
      // this.paidDate = moment(item.created_at).format("LL");
      await this.$store
        .dispatch("getCart", {
          id: localStorage.id,
          SecretKey: localStorage.SecretKey
        })
        .then(res => {
          // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        });
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
    clickSubmit() {
      if (this.subTotal == 0) {
        let errMsg = "No product selected.";
        this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
      }
      if (this.shippingType == "") {
        let errMsg = "Please select shipping type.";
        this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
      } else {
        // $bvModal.show("orderconfirm"),
        this.$root.$emit("bv::show::modal", "orderconfirm", "orderconfirm");
      }
    },
    addQ() {},

    addtoorder() {
      console.log("this.allDetails", this.allDetails);
      this.$store
        .dispatch("addOrder", {
          // order_details: this.allDetails,
          SecretKey: localStorage.SecretKey,
          order: {
            customer_id: localStorage.id,
            total_price: this.totalAmount,
            address: this.shippingAddress,
            shipping_type: this.shippingType
          },
          customerDetails: {
            customer_name: localStorage.firstname + " " + localStorage.lastname,
            address: localStorage.address
          },
          order_details: this.allDetails
        })
        .then(res => {
          console.log("ress add to order", res);
          let msg = res.data.order;
          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");
          // this.showAlert("Order details was submitted successfully", "success");
          this.$store.dispatch("loadSales", {
            SecretKey: localStorage.SecretKey
          });
          this.$store.dispatch("getCart", {
            id: localStorage.id
          });
          this.addToLogs(
            `Customer ${localStorage.firstname} ${localStorage.lastname} Checkout`,
            localStorage.id
          );
          this.allDetails = [];
          this.subTotal = 0;
          this.totalAmount = 0;
          this.shippingFee = 150;
          this.shippingType = "";
        })
        .catch(err => {
          console.log(err);
          let errMsg = err;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
          // console.log("new order", err.response);
        });
    }
  }
};
</script>
