export default {
  SET_CUSTOMER(state, customer) {
    state.customersState = customer;
  },
  SET_PRODUCT(state, product) {
    state.productsState = product;
  },
  ADD_PRODUCT(state, product) {
    // console.log("mute", product);
    // console.log("state", state);

    state.productsState.push(product);
  },

  SET_DELIVERY(state, delivery) {
    state.deliveriesState = delivery;
    console.log("mute", delivery);
  },
  SET_SUPPLIER(state, supplier) {
    state.suppliersState = supplier;
  },
  ADD_SUPPLIER(state, supplier) {
    state.suppliersState.push(supplier);
  },
  ADD_SALES(state, sale) {
    state.salesState.push(sale);
  },
  ADD_CUSTOMER(state, customer) {
    state.customersState.push(customer);
  },
  ADD_DELIVERY(state, delivery) {
    state.deliveriesState.push(delivery);
  },
  SET_SALES(state, sale) {
    state.salesState.push(sale);
  },
  NEW_LOGIN(state, user) {
    state.usersState.push(user);
  }
};
