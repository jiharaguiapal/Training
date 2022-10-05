export default {
  SET_CUSTOMER(state, customer) {
    state.customersState = customer;
  },
  SET_USER(state, user) {
    state.usersState = user;
  },
  ADD_USER(state, user) {
    state.usersState.push(user);
  },

  SET_PRODUCT(state, product) {
    state.productsState = product;
  },
  ADD_PRODUCT(state, product) {
    state.productsState.push(product);
  },

  SET_DELIVERY(state, delivery) {
    state.deliveriesState = delivery;
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
  SET_CART(state, cart) {
    state.cartState.push(cart);
  },
  ADD_CART(state, cart) {
    state.cartState.push(cart);
  },
  LOGIN_USER(state, user) {
    state.usersState.push(user);
  }
};
