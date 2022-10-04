<template>
  <div>
    <Nav />
    <b-row no-gutters> </b-row>
    <b-card class="prod-card" no-body>
      <!-- <b-container fluid class="m-2, "> -->
      <b-row no-gutters>
        <div class="center-title">
          <p class="title-categ"><b> Products</b></p>
          <!-- <p>This is a test</p> -->
        </div>
      </b-row>
      <b-row no-gutters>
        <b-col class="">
          <b-card class="product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/tuf-mouse.png"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>

            <!-- <template #footer>
                  <em>16 items available</em>
                </template> -->
          </b-card>
        </b-col>
        <b-col class="">
          <b-card class="ml-2 product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/ssd.webp"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>
          </b-card>
        </b-col>
        <b-col class="">
          <b-card class="ml-2 product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/razer-mamba-mouse.webp"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>
          </b-card>
        </b-col>
        <b-col class="">
          <b-card class="ml-2 product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/ram.jpg"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!-- <div class="line-break"></div> -->
      <b-row no-gutters>
        <div class="center-title">
          <!-- <p class="title-categ"><b>Featured Products</b></p> -->
          <!-- <p>This is a test</p> -->
        </div>
      </b-row>
      <b-row no-gutters>
        <b-col class="">
          <b-card class="product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/keycaps.jpg"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>

            <!-- <template #footer>
                  <em>16 items available</em>
                </template> -->
          </b-card>
        </b-col>
        <b-col class="">
          <b-card class="ml-2 product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/Resin_Keycaps_Anime_Cat.jpg"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>
          </b-card>
        </b-col>
        <b-col class="">
          <b-card class="ml-2 product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/mario-keycaps.webp"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>
          </b-card>
        </b-col>
        <b-col class="">
          <b-card class="ml-2 product-card" no-body>
            <b-img
              class="img-item"
              src="~/static/imgs/items/razer-hs.png"
              fluid
              alt="Responsive image"
            ></b-img>

            <div class="product-name">
              <h5>Product Name</h5>
              <p>Price</p>

              <div class="quantity-card">
                <b-row no-gutters class="item-quantity">
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="minus" />
                    </b-button>
                  </b-col>
                  <b-col
                    ><b-input class="input-quantity" value="2"></b-input
                  ></b-col>
                  <b-col>
                    <b-button variant="plus" class="plus-btn">
                      <font-awesome-icon icon="plus" />
                    </b-button>
                  </b-col>
                </b-row>
              </div>
              <b-button variant="outline-primary" class="add-cart-btn">
                Add to cart
              </b-button>
            </div>
          </b-card>
        </b-col>
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
import backgroundUrl from "@/static/imgs/categ/veges.jpg";
export default {
  props: {},

  data() {
    return { backgroundUrl };
  }
};
</script>
