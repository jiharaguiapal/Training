import axios from "axios";
import vue from "vuex";
import VueAxios from "vue-axios";

export const strict = false;

// export const state = () => ({
//   title: "store open",
//   items: [
//     {
//       supplier_code: 40,
//       company_name: "Cargill Phil",
//       company_address: "Bawing, General Santos City",
//       contact_number: 950123576,
//       Actions: ""
//     },
//     {
//       supplier_code: 21,
//       company_name: "PhilBest Canning Corp.",
//       company_address: "Tambler, General Santos City",
//       contact_number: 950145857,
//       Actions: ""
//     },
//     {
//       supplier_code: 259,
//       company_name: "DOLE",
//       company_address: "Philippines",
//       contact_number: 950165757,
//       Actions: ""
//     },
//     {
//       supplier_code: 809,
//       company_name: "Kablon Farms",
//       company_address: "Philippines",
//       contact_number: 950165757,
//       Actions: ""
//     },
//     {
//       supplier_code: 619,
//       company_name: "Face Republic",
//       company_address: "Korea",
//       contact_number: 950165757,
//       Actions: ""
//     },
//     {
//       supplier_code: 38,
//       company_name: "RD Fishing",
//       company_address: "Gensan",
//       contact_number: 950123576,
//       Actions: ""
//     }
//   ],
//   deliveries: [
//     {
//       delivery_number: 101,
//       company_name: "Cargill Phil",
//       delivery_date: "2021-01-18",
//       Actions: ""
//     },
//     {
//       delivery_number: 103,
//       company_name: "PhilBest Canning Corp.",
//       delivery_date: "2021-01-21",
//       Actions: ""
//     },
//     {
//       delivery_number: 104,
//       company_name: "DOLE",
//       delivery_date: "2021-02-11",
//       Actions: ""
//     },
//     {
//       delivery_number: 105,
//       company_name: "RD Fishing",
//       delivery_date: "2021-01-23",
//       Actions: ""
//     },
//     {
//       delivery_number: 106,
//       company_name: "Samsung",
//       delivery_date: "2021-01-10",
//       Actions: ""
//     },
//     {
//       delivery_number: 107,
//       company_name: "Dickerson",
//       delivery_date: "2021-01-01",
//       Actions: ""
//     }
//   ],
//   products: [
//     {
//       barcode: 1200040,
//       product_name: "Coconut Milk",
//       product_description: "1L Coconut Milk",
//       price: "$3",
//       stocks: 51,
//       supplier: "Cargill",
//       Actions: ""
//     },
//     {
//       barcode: 1300040,
//       product_name: "Palm Oil",
//       product_description: "1L Palm Oil ",
//       price: "$7",
//       stocks: 21,
//       supplier: "Cargill",
//       Actions: ""
//     },
//     {
//       barcode: 1400040,
//       product_name: "Fish Oil",
//       product_description: "250ml Fish oil",
//       price: "$3",
//       stocks: 56,
//       supplier: "PhilBest",
//       Actions: ""
//     },
//     {
//       barcode: 1500040,
//       product_name: "Pineapple Chunks",
//       product_description: "1L Pineapple Chucks",
//       price: "$16",
//       stocks: 91,
//       supplier: "DOLE",
//       Actions: ""
//     },
//     {
//       barcode: 1600040,
//       product_name: "Banana Peel",
//       product_description: "Yellow Banana Peel",
//       price: "$1",
//       stocks: 1,
//       supplier: "Maitum Plant",
//       Actions: ""
//     }
//   ],
//   orders: [
//     {
//       order_code: "1321",
//       order_date: "2020-01-02",
//       total_payment: "$205",
//       customer_name: "Sherlock",
//       Actions: ""
//     },
//     {
//       order_code: "1021",
//       order_date: "2020-01-02",
//       total_payment: "$200",
//       customer_name: "Mycroft",
//       Actions: ""
//     }
//   ],
//   customers: [
//     // {
//     //   fullname: "Enola Holmes",
//     //   address: "London",
//     //   contactnumber: 553154,
//     //   Actions: ""
//     // }
//     // {
//     //   name: "John Watson",
//     //   address: "London",
//     //   contact_number: 553154,
//     //   Actions: ""
//     // },
//     // {
//     //   name: "Irene Adler",
//     //   address: "UK",
//     //   contact_number: 553154,
//     //   Actions: ""
//     // },
//     // {
//     //   name: "Daphne Bridgerton",
//     //   address: "London",
//     //   contact_number: 553154,
//     //   Actions: ""
//     // }
//   ],
//   details: [
//     {
//       barcode: 1243123,
//       product_name: "Banana Peel",
//       price: "$4",
//       qty: ""
//     },
//     {
//       barcode: 21323,
//       product_name: "Banana Juice",
//       price: "",
//       qty: ""
//     }
//   ],
//   users: [
//     {
//       username: "",
//       password: ""
//     }
//   ]
// });

// export const actions = {
//   loadCustomers({ commit }) {
//     axios.get("http://172.16.4.168:3000/customers").then(response => {
//       commit("SET_CUSTOMER", response.data);
//     });
//   }
// };

// // export const actions = {
// //   async get({ commit }) {
// //     await this.$axios.get('customers')
// //       .then((response) => {
// //       commit ('SET', response.data)
// //     })
// //   }
// // },

// export const mutations = {
//   ADD_ITEM: (state, item) => {
//     state.items.push(item);
//   },
//   ADD_DELIVERY: (state, delivery) => {
//     state.deliveries.push(delivery);
//   },
//   ADD_PRODUCT: (state, product) => {
//     state.products.push(product);
//   },
//   ADD_CUSTOMER: (state, customer) => {
//     state.customers.push(customer);
//   },
//   ADD_ORDER: (state, order) => {
//     state.orders.push(order);
//   },
//   ADD_DETAIL: (state, detail) => {
//     state.details.push(detail);
//   },
//   SET_CUSTOMER: (state, customer) => {
//     state.customers = customer;
//   }
// };
