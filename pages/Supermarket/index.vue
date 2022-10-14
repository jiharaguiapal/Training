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
        <b-row no-gutters>
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
          <b-col class="card-category">
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
            <b-col>
              <b-card class="home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/reddragon-mouse.png"
                  fluid
                  alt="Responsive image"
                ></b-img>

                <!-- <div class="home-product-name">
                  <h5>Product Name</h5>
                  <p>Price</p> -->
                <!-- 
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->

                <!-- <template #footer>
                  <em>16 items available</em>
                </template> -->
              </b-card>
            </b-col>
            <b-col>
              <div class="home-product-name ">
                <p>Gaming Mouse</p>
                <h5>Redragon NOTHOSAUR M606</h5>
                <p>{{ formatAmount(850) }}</p>
              </div>
            </b-col>
          </b-col>
          <b-col class="">
            <b-col>
              <b-card class="ml-2 home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/ssd.webp"
                  fluid
                  alt="Responsive image"
                ></b-img>

                <!-- <div class="home-product-name">
                <h5>Product Name</h5>
                <p>Price</p> -->

                <!-- <div class="quantity-card">
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Storage</p>
                <h5>A400 SATA SSD 2.5 240GB</h5>
                <p>{{ formatAmount(1280) }}</p>
              </div>
            </b-col>
          </b-col>
          <b-col class="">
            <b-col>
              <b-card class="ml-2 home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/razer-mamba-mouse.webp"
                  fluid
                  alt="Responsive image"
                ></b-img>

                <!-- <div class="home-product-name">
                  <h5>Product Name</h5>
                  <p>Price</p> -->

                <!-- <div class="quantity-card">
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
                </div> -->
                <!-- </div> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Gaming Mouse</p>
                <h5>Razer Mamba Elite</h5>
                <p>{{ formatAmount(2750) }}</p>
              </div>
            </b-col>
          </b-col>
          <b-col class="">
            <b-col>
              <b-card class="ml-2 home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/g903.webp"
                  fluid
                  alt="Responsive image"
                ></b-img>
                <!-- 
              <div class="home-product-name">
                <h5>Product Name</h5>
                <p>Price</p> -->
                <!-- 
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Wireless Gaming Mouse</p>
                <h5>Logitech G903</h5>
                <p>{{ formatAmount(3900) }}</p>
              </div>
            </b-col>
          </b-col>
          <!-- </b-row> -->
          <!-- <div class="line-break"></div> -->
          <b-row no-gutters>
            <!-- <div class="center-title">
            <p class="title-categ"><b>Featured Products</b></p>
          </div> -->
          </b-row>
          <!-- <b-row no-gutters> -->
          <b-col>
            <b-col class="">
              <b-card class="home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/kraken-kitty.png"
                  fluid
                  alt="Responsive image"
                ></b-img>

                <!-- <div class="home-product-name">
                <h5>Product Name</h5>
                <p>Price</p> -->

                <!-- <div class="quantity-card">
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->

                <!-- <template #footer>
                  <em>16 items available</em>
                </template> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Wired Over Ear (USB)</p>
                <h5>Razer Kraken Kitty Edition</h5>
                <p>{{ formatAmount(6000) }}</p>
              </div>
            </b-col>
          </b-col>
          <b-col class="">
            <b-col>
              <b-card class="ml-2 home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/Resin_Keycaps_Anime_Cat.jpg"
                  fluid
                  alt="Responsive image"
                ></b-img>

                <!-- <div class="home-product-name">
                <h5>Product Name</h5>
                <p>Price</p> -->

                <!-- <div class="quantity-card">
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Mechanical Keyboard Keycap</p>
                <h5>Custom Anime Cat Keycap</h5>
                <p>{{ formatAmount(183.46) + "/piece" }}</p>
              </div>
            </b-col>
          </b-col>
          <b-col class="">
            <b-col>
              <b-card class="ml-2 home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/Kuromi-Keycap-Set1.jpg"
                  fluid
                  alt="Responsive image"
                ></b-img>

                <!-- <div class="home-product-name">
                <h5>Product Name</h5>
                <p>Price</p> -->

                <!-- <div class="quantity-card">
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Keycap Set</p>

                <h5>Akko x Kuromi Keycap Set</h5>
                <p>{{ formatAmount(4131.82) }}</p>
              </div>
            </b-col>
          </b-col>
          <b-col class="">
            <b-col>
              <b-card class="ml-2 home-product-card" no-body>
                <b-img
                  class="img-item"
                  src="~/static/imgs/items/blue-switch.jpg"
                  fluid
                  alt="Responsive image"
                ></b-img>
                <!-- 
              <div class="home-product-name">
                <h5>Product Name</h5>
                <p>Price</p> -->

                <!-- <div class="quantity-card">
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
                </div> -->
                <!-- <b-button variant="outline-primary" class="add-cart-btn">
                  Add to cart
                </b-button> -->
                <!-- </div> -->
              </b-card>
            </b-col>

            <b-col>
              <div class="home-product-name">
                <p>Blue Switch</p>

                <h5>Outemo 3 pin Switch</h5>
                <p>{{ formatAmount(101) }}</p>
              </div>
            </b-col>
          </b-col>
        </b-row>
        <!-- </b-container> -->
      </b-card>
    </div>
    <!-- <div class="line-break"></div> -->

    <b-card class="info-card" no-body>
      <b-row no-gutters>
        <!-- <b-col>
          <b-card class="info-item">
            <b-img
              class="img-info"
              src="~/static/imgs/info/cart-empty.svg"
              fluid
              alt="Responsive image"
            ></b-img>
            <p class="info-text">Title Info</p>
            <p class="sub-text">
              Browse a range of branded products
            </p>
          </b-card>
        </b-col>
        <div class="hori-line"></div> -->

        <b-col>
          <b-card class="info-item">
            <!-- <font-awesome-icon icon="shopping-cart" /> -->
            <b-img
              class="img-info"
              src="~/static/imgs/info/select1.svg"
              fluid
              alt="Responsive image"
            ></b-img>
            <p class="info-text">Discounted price</p>
            <p class="sub-text">
              Lower prices on selected products
            </p>
          </b-card>
        </b-col>
        <div class="hori-line"></div>
        <b-col>
          <b-card class="info-item">
            <!-- <font-awesome-icon icon="shopping-cart" /> -->
            <b-img
              class="img-info"
              src="~/static/imgs/info/trust.svg"
              fluid
              alt="Responsive image"
            ></b-img>
            <p class="info-text">Trusted brands</p>
            <p class="sub-text">
              Your trusted gaming brands
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
          <b> EMAIL</b>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <p>FAQ</p>
        </b-col>
        <b-col>
          <p>J.Catolico Sr. Avenue, Lagao</p>
        </b-col>
        <b-col>
          <p>Mondays - Fridays</p>
        </b-col>
        <b-col>
          <p>lougehtech@getnada.com</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Store Policy</p>
        </b-col>
        <b-col>
          <p>9500, General Santos City Philippines</p>
        </b-col>
        <b-col>
          <p>8:00AM - 6:00PM</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
      </b-row>
      <!-- <b-row class="mb-3">
        <b-col>
          <p>FAQ</p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
        <b-col>
          <p></p>
        </b-col>
      </b-row> -->
      <!-- <template #footer>
        <em>Footer Slot</em>
      </template> -->
    </b-card>
    <b-card class="footer-card-sm" no-body>
      <b-row>
        <b-col>
          <p>&copy; 2022 &#9733; Troy Michael Garidos</p>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
// import backgroundUrl from "@/static/imgs/categ/veges.jpg";
export default {
  props: {},

  data() {
    return {};
  },
  methods: {
    formatAmount(amount) {
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "Php"
      }).format(amount);
    }
  }
};
</script>

<style scoped></style>
