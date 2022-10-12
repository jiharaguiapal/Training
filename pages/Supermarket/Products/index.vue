<template>
  <div>
    <Nav />
    <b-row no-gutters> </b-row>
    <b-card class="prod-card" no-body>
      <!-- <b-container fluid class="m-2, "> -->
      <b-row> </b-row>
      <b-row>
        <b-col cols="2">
          <b-card header="SHOP BY" class="filter-side-card">
            <b-form-checkbox>Accessories</b-form-checkbox>
            <b-form-checkbox>Components and Power</b-form-checkbox>
            <b-form-checkbox>Data Storage</b-form-checkbox>
            <b-form-checkbox>Displays and Media</b-form-checkbox>
            <b-form-checkbox>Laptops and Desktops</b-form-checkbox>
          </b-card>
        </b-col>
        <b-col>
          <b-row cols>
            <b-input></b-input>
          </b-row>
          <b-row no-gutters>
            <b-card
              v-for="product in productsState"
              :key="product.product_id"
              class="product-card"
              no-body
            >
              <b-img
                class="img-item"
                :src="api + '/images/' + product.img"
                fluid
                alt="Responsive image"
              ></b-img>

              <div class="product-name">
                <h5>{{ product.product_name }}</h5>
                <p>{{ formatAmount(product.price) }}</p>
                <p>{{ "Stock: " + product.quantity }}</p>

                <div class="quantity-card">
                  <b-row no-gutters class="item-quantity">
                    <b-col>
                      <b-button
                        @click="minusBtn(product.product_id)"
                        variant="plus"
                        class="plus-btn"
                      >
                        <font-awesome-icon icon="minus" />
                      </b-button>
                    </b-col>
                    <b-col
                      ><b-input
                        disabled
                        :ref="'input' + product.product_id"
                        :id="'input' + product.product_id"
                        class="input-quantity"
                        placeholder="0"
                        type="number"
                        value="0"
                      ></b-input
                    ></b-col>
                    <b-col>
                      <b-button
                        @click="plusBtn(product.product_id)"
                        variant="plus"
                        class="plus-btn"
                      >
                        <font-awesome-icon icon="plus" />
                      </b-button>
                    </b-col>
                  </b-row>
                </div>
                <b-button
                  variant="outline-primary"
                  @click="addToCart(product.product_id)"
                  class="add-cart-btn"
                >
                  Add to cart
                </b-button>
              </div>

              <!-- <template #footer>
                  <em>16 items available</em>
                </template> -->
            </b-card>
          </b-row>
        </b-col>
      </b-row>
      <!-- <div class="line-break"></div> -->
      <b-row no-gutters>
        <div class="center-title">
          <!-- <p class="title-categ"><b>Featured Products</b></p> -->
          <!-- <p>This is a test</p> -->
        </div>
      </b-row>

      <!-- </b-container> -->
    </b-card>
    <b-card no-body class="div-card">
      <b-pagination-nav
        size="sm"
        pills
        number-of-pages="10"
        base-url="#"
      ></b-pagination-nav>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState, mapMutations, mapGetters, createLogger } from "vuex";
import backgroundUrl from "@/static/imgs/categ/veges.jpg";
export default {
  props: {},

  data() {
    return {
      backgroundUrl,
      quantity: 0,
      api: ""
    };
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
  created() {
    this.api = this.$axios.defaults.baseURL;
  },
  methods: {
    plusBtn(id) {
      let btnid = document.getElementById("input" + id);
      btnid.value = parseInt(btnid.value) + 1;
      this.quantity = btnid.value;
      // this.quantity = this.quantity + 1;
    },
    minusBtn(id) {
      let btnid = document.getElementById("input" + id);
      if (btnid.value <= 0) {
        btnid.value = 0;
        this.quantity = btnid.value;
      } else {
        btnid.value = parseInt(btnid.value) - 1;
        this.quantity = btnid.value;
      }
    },
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
    async addToCart(id) {
      await this.$store
        .dispatch("addCart", {
          customer_id: localStorage.id,
          product_id: id,
          quantity: this.quantity
          // product_images: this.fileName
        })
        .then(res => {
          console.log("res", res);
          if (res.response.data.error == "Product is already exist") {
            console.log("here");
            this.editToCart(res.response.data.cart_id);
          }
          if (res.response.data.error == "quantity is required.") {
            let errMsg = res.response.data.error;
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
          console.log(err);
        });
    },
    async editToCart(id) {
      console.log("id", id, this.quantity);
      await this.$store
        .dispatch("editCartItem", {
          // customer_id: localStorage.id,
          cart_id: id,
          quantity: this.quantity
          // product_images: this.fileName
        })
        .then(res => {
          console.log("res", res);
          let msg = res.message;
          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");
          this.$store.dispatch("loadProducts", {
            SecretKey: localStorage.SecretKey
          });

          // this.showAlert(res.message, "success");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
