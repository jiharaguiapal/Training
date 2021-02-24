import axios from "axios";

export default {
  async loadCustomers({ commit }) {
    console.log(this.$axios);
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/customers`
    })
      .then(res => {
        console.log(res);
        commit("SET_CUSTOMER", res.data.view);
        console.log("test", res.data.view);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  async addCustomer({ commit }, { fullname, contact, address }) {
    console.log("look", contact);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/customers/add`,

      data: {
        fullname,
        contact,
        address
      }
    })
      .then(res => {
        console.log("actionnew", res);

        commit("ADD_CUSTOMER", res.data.posted);

        return res;
      })
      .catch(err => console.log(err));
  },

  async loadProducts({ commit }) {
    console.log(this.$axios);
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/products`
    })
      .then(res => {
        console.log("product", res);
        commit("SET_PRODUCT", res.data.view);
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  async addProduct(
    { commit },
    {
      product_barcode,
      product_name,
      product_description,
      cost_unit,
      price,
      stocks,
      Expiry_date,
      delivery_code
    }
  ) {
    console.log("look", product_name);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/products/add/`,

      data: {
        product_barcode,
        product_name,
        product_description,
        cost_unit,
        price,
        stocks,
        Expiry_date,
        delivery_code
      }
    })
      .then(res => {
        console.log("actionnew", res);

        commit("ADD_PRODUCT", res.data.posted);

        return res;
      })
      .catch(err => console.log(err));
  },

  async loadDeliveries({ commit }) {
    console.log(this.$axios);
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/deliveries/fetch`
    })
      .then(res => {
        console.log("del", res);
        commit("SET_DELIVERY", res.data.view);
        console.log("del2", res.data.view);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  async loadSuppliers({ commit }) {
    console.log(this.$axios);
    return await axios({
      method: "GET",
      url: `${this.$axios.defaults.baseURL}/supplier`
    })
      .then(res => {
        console.log(res);
        commit("SET_SUPPLIER", res.data.view);
        console.log("supp", res.data.view);
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  async addSupplier({ commit }, { companyname, contact, address }) {
    console.log("look", companyname);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/supplier`,

      data: {
        companyname,
        contact,
        address
      }
    })
      .then(res => {
        console.log("supnew", res);

        commit("ADD_SUPPLIER", res.data.posted);

        return res;
      })
      .catch(err => console.log("this", err.data.posted));
  },
  async addOrder({ commit }, { barcode, quantity }) {
    console.log("look", barcode);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/orders`,

      data: {
        barcode,
        quantity
      }
    })
      .then(res => {
        console.log("supnew", res);

        commit("ADD_SUPPLIER", res.data.result.order);

        return res;
      })
      .catch(err => console.log(err));
  },
  async addDelivery(
    { commit },
    { delivery_code, suppliername, delivery_received_date }
  ) {
    console.log("look", delivery_code);
    return await axios({
      method: "POST",
      url: `${this.$axios.defaults.baseURL}/deliveries`,

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
      .catch(err => console.log(err));
  }
};
