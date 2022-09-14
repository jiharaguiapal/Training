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
        commit("SET_CUSTOMER", res.data);
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
        commit("SET_USER", res.data);
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
      commit("ADD_USER", res.data);

      return res.data;
    });
    // .catch(err => err);
  },
  async addCustomer({ commit }, { fullname, contact, address, SecretKey }) {
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
      commit("ADD_CUSTOMER", res.data.posted);

      return res;
    });
    // .catch(err => err);
  },

  async loadProducts({ commit }, { SecretKey }) {
    await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/product`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        commit("SET_PRODUCT", res.data);
        return res.data;
      })
      .catch(err => {
        console.log("loadProducts error", err.response);
      });
  },

  async addProduct({ commit }, { products, delivery, SecretKey }) {
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
        commit("ADD_PRODUCT", res.data);

        return res.data;
      })
      .catch(err => err);
  },

  async loadDeliveries({ commit }, { SecretKey }) {
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/delivery`,
      headers: {
        Authorization: `Bearer ${SecretKey}`
      }
    })
      .then(res => {
        commit("SET_DELIVERY", res.data);
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
        commit("SET_SUPPLIER", res.data);
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
        commit("ADD_SALES", res.data.posted);

        return res;
      })
      .catch(err => err);
  },
  async addDelivery(
    { commit },
    { delivery_code, suppliername, delivery_received_date }
  ) {
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
        commit("ADD_DELIVERY", res.data.posted);

        return res;
      })
      .catch(err => err);
  },
  async loginUser({ commit }, { username, password }) {
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/users/login`,

      data: {
        username,
        password
      }
    })
      .then(res => {
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
        commit("SET_SALES", res.data.view);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
