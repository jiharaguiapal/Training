<template>
  <div class="bg-color">
    <Nav />
    <div>
      <b-row no-gutters>
        <!-- <b-img
            class="img-banner"
            src="~/static/imgs/banner/rows2.jpg"
            alt="Responsive image"
          ></b-img> -->
        <!-- <b-img
            class="img-con"
            src="~/static/imgs/banner/Better-Farms_Parallux.jpg"
            fluid
            alt="Responsive image"
          ></b-img> -->

        <b-carousel
          id="carousel-fade"
          style="text-shadow: 0px 0px 2px #000; "
          fade
          indicators
        >
          <b-carousel-slide img-src="~/static/imgs/banner/retro-bg.jpg">
            <!-- <template #img>
              <img
                class="d-block img-fluid w-100"
                width="500"
                height="500"
                src="~/static/imgs/banner/retro-bg.jpg"
                alt="image slot"
              /> </template
          > -->
          </b-carousel-slide>
          <b-carousel-slide
            img-src="~/static/imgs/banner/kb-bg.jpg"
          ></b-carousel-slide>
          <b-carousel-slide
            img-src="~/static/imgs/banner/ryzen-bg.jpg"
          ></b-carousel-slide>
        </b-carousel>
      </b-row>

      <b-card class="card-categ" no-body>
        <b-row class="mt-3">
          <div class="center-title">
            <!-- <p class="title-categ"><b>Categories</b></p> -->
            <!-- <p>This is a test</p> -->
          </div>
        </b-row>
        <b-row>
          <b-col class="card-category">
            <b-img
              class="img-categ"
              src="~/static/imgs/categ/mouse-categ.png"
              fluid
              alt="Responsive image"
            >
            </b-img>
          </b-col>
          <b-col class="card-category">
            <b-img
              class="img-categ"
              src="~/static/imgs/categ/kb-categ.png"
              fluid
              alt="Responsive image"
            ></b-img>
          </b-col>
          <b-col class="card-category">
            <b-img
              class="img-categ"
              src="~/static/imgs/categ/monitor-categ.png"
              fluid
              alt="Responsive image"
            ></b-img>
          </b-col>
          <b-col class="card-category">
            <b-img
              class="img-categ"
              src="~/static/imgs/categ/ssd-categ.png"
              fluid
              alt="Responsive image"
            ></b-img>
          </b-col>
          <b-col class="card-category ml-2">
            <b-img
              class="img-categ"
              src="~/static/imgs/categ/more-categ.png"
              fluid
              alt="Responsive image"
            ></b-img>
          </b-col>
        </b-row>
      </b-card>

      <b-card class="prod-card" no-body>
        <!-- <b-container fluid class="m-2, "> -->
        <b-row no-gutters>
          <div class="center-title">
            <p class="title-categ"><b>Featured Products</b></p>
            <!-- <p>This is a test</p> -->
          </div>
        </b-row>
        <b-row no-gutters>
          <b-col class="">
            <b-card class="product-card" no-body>
              <b-img
                class="img-item"
                src="~/static/imgs/items/reddragon-mouse.png"
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
            <p class="title-categ"><b>Featured Products</b></p>
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
    </div>
    <!-- <div class="line-break"></div> -->

    <b-card class="info-card" no-body>
      <b-row no-gutters>
        <b-col>
          <b-card class="info-item">
            <!-- <font-awesome-icon icon="shopping-cart" /> -->
            <b-img
              class="img-info"
              src="~/static/imgs/info/cart-empty.svg"
              fluid
              alt="Responsive image"
            ></b-img>
            <p class="info-text">Title Info</p>
            <p class="sub-text">
              This is a sentence. More information here.
            </p>
          </b-card>
        </b-col>
        <div class="hori-line"></div>

        <b-col>
          <b-card class="info-item">
            <!-- <font-awesome-icon icon="shopping-cart" /> -->
            <b-img
              class="img-info"
              src="~/static/imgs/info/select.svg"
              fluid
              alt="Responsive image"
            ></b-img>
            <p class="info-text">Title Info</p>
            <p class="sub-text">
              This is a sentence. More information here.
            </p>
          </b-card>
        </b-col>
        <div class="hori-line"></div>
        <b-col>
          <b-card class="info-item">
            <!-- <font-awesome-icon icon="shopping-cart" /> -->
            <b-img
              class="img-info"
              src="~/static/imgs/info/deliver.svg"
              fluid
              alt="Responsive image"
            ></b-img>
            <p class="info-text">Title Info</p>
            <p class="sub-text">
              This is a sentence. More information here.
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="footer-card" no-body>
      <b-row no-gutters>
        <b-col>
          <b>LOUGEHTECH</b>
        </b-col>
        <b-col>
          <b>ADDRESS</b>
        </b-col>
        <b-col>
          <b>OPERATING HOURS</b>
        </b-col>
        <b-col>
          <b>EMAIL</b>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <p>Shipping and Returns</p>
        </b-col>
        <b-col>
          <p>Lagao, General Santos City</p>
        </b-col>
        <b-col>
          <p>Opening Hours</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Store Policy</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
        <b-col>
          <p>Opening Hours</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col>
          <p>FAQ</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
        <b-col>
          <p>Opening Hours</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
      </b-row>
      <!-- <template #footer>
        <em>Footer Slot</em>
      </template> -->
    </b-card>
    <b-card class="footer-card-sm" no-body>
      <b-row>
        <b-col>
          <p>2022</p>
        </b-col>
      </b-row>
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

<style scoped></style>
