import axios from "axios";

export default {
  async loadCustomers({ commit }, { SecretKey }) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/customer`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        console.log(res);
        commit("SET_CUSTOMER", res.data);
        console.log("testCustomer", res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getUsers({ commit }, { SecretKey }) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/users`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        console.log(res);
        commit("SET_USER", res.data);
        console.log("testCustomer", res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  async addUser(
    { commit },
    { username, password, first_name, last_name, role, SecretKey }
  ) {
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/users`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      },

      data: {
        username,
        password,
        first_name,
        last_name,
        role
      }
    }).then(res => {
      console.log("actionnew", res);

      commit("ADD_USER", res.data);

      return res.data;
    });
    // .catch(err => err);
  },
  async addCustomer({ commit }, { fullname, contact, address, SecretKey }) {
    console.log("look", contact);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}customers/add/`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      },

      data: {
        fullname,
        contact,
        address
      }
    }).then(res => {
      console.log("actionnew", res);

      commit("ADD_CUSTOMER", res.data.posted);

      return res;
    });
    // .catch(err => err);
  },
  // async loadProducts({ commit }, {}) {
  //   console.log("loadProductsss");
  //   await axios({
  //     method: "GET",
  //     url: `${this.$axios.defaults.baseURL}/product`
  //   })
  //     .then(res => {
  //       console.log("product", res);
  //       commit("SET_PRODUCT", res.data);
  //       console.log("prod", res.data);
  //       return res.data;
  //     })
  //     .catch(err => {
  //       console.log("loadProducts error", err);
  //     });
  // },

  async loadProducts({ commit }, { SecretKey }) {
    console.log("loadProducts", SecretKey);
    await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/product`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        console.log("product", res);
        commit("SET_PRODUCT", res.data);
        console.log("prod", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("loadProducts error", err.response);
      });
  },

  async addProduct({ commit }, { products, delivery, SecretKey }) {
    console.log("look", products, delivery);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/product-delivery`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      },

      data: {
        products,
        delivery
        // Date_Received
      }
    })
      .then(res => {
        console.log("at here", res);

        commit("ADD_PRODUCT", res.data);

        return res.data;
      })
      .catch(err => err);
  },
  // async addProduct(
  //   { commit },
  //   { products, Supplier, Date_Received, SecretKey }
  // ) {
  //   console.log("look", products, Supplier, Date_Received);
  //   return await axios({
  //     method: "POST",
  //     url: `${this.$axios.defaults.baseURL}/products/insert/`,
  //     headers: {
  //       Authorization: `Bearer ${SecretKey}`
  //     },

  //     data: {
  //       products,
  //       Supplier,
  //       Date_Received
  //     }
  //   })
  //     .then(res => {
  //       console.log("at here");

  //       commit("ADD_PRODUCT", res.data.posted);

  //       return res;
  //     })
  //     .catch(err => err);
  // },

  async loadDeliveries({ commit }, { SecretKey }) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/delivery`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        console.log("del", res);
        commit("SET_DELIVERY", res.data);
        console.log("del2", res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  async loadSuppliers({ commit }, { SecretKey }) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/supplier`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        console.log(res);
        commit("SET_SUPPLIER", res.data);
        console.log("supp", res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  async addSupplier(
    { commit },
    { supplier_name, contact, address, SecretKey }
  ) {
    console.log("look", supplier_name);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/supplier`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      },

      data: {
        supplier_name,
        contact,
        address
      }
    })
      .then(res => {
        console.log("supnew", res);

        commit("ADD_SUPPLIER", res.data);

        return res.data;
      })
      .catch(err => err);
  },

  async addOrder(
    { commit },
    {
      product_table,
      SecretKey,
      customer_name,
      customer_address,
      contact_number,
      total_payment
    }
  ) {
    console.log(
      "ADDORDER",
      product_table,
      customer_name,
      customer_address,
      contact_number,
      total_payment
    );
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/order/insert`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      },

      data: {
        product_table,
        customer_name,
        customer_address,
        contact_number,
        total_payment
      }
    })
      .then(res => {
        console.log("supnew", res);

        commit("ADD_SALES", res.data.posted);

        return res;
      })
      .catch(err => err);
  },
  async addDelivery(
    { commit },
    { delivery_code, suppliername, delivery_received_date }
  ) {
    console.log("look", delivery_code);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/delivery`,

      data: {
        delivery_code,
        suppliername,
        delivery_received_date
      }
    })
      .then(res => {
        console.log("supnew", res);

        commit("ADD_DELIVERY", res.data.posted);

        return res;
      })
      .catch(err => err);
  },
  async loginUser({ commit }, { username, password }) {
    console.log("look");
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/users/login`,

      data: {
        username,
        password
      }
    })
      .then(res => {
        console.log("supnew", res);

        commit("LOGIN_USER", res.data);

        return res.data;
      })
      .catch(err => err);
  },
  async loadSales({ commit }, { SecretKey }) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/order`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        console.log(res);
        commit("SET_SALES", res.data.view);
        console.log("sales", res.data.view);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
