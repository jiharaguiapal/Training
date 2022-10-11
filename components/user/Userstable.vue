<template>
  <div class="">
    <b-form-row>
      <b-modal
        id="addusermodal"
        size=""
        class="supplier-modal"
        hide-footer
        title="Add User"
        no-close-on-backdrop
      >
        <!-- <b-col cols="3"> -->
        <div class="supborder">
          <b-form class="supplierform" id="app">
            <div class="form-group">
              <!-- second input field -->
              <label for="companyname">Username: </label>
              <b-form-input
                size="sm"
                type="text"
                placeholder="Enter Username"
                id="user_name"
                required
                v-model="userName"
              />
            </div>
            <div class="form-group">
              <!-- third input field -->
              <label for="supplieraddress"> Password: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="text"
                placeholder="Create Password"
                id="password"
                required
                v-model="password"
              />
            </div>
            <div class="form-group">
              <!-- fourth input field -->
              <label for="companycontact">First Name: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="tel"
                placeholder="Enter First Name"
                id="first_name"
                required
                v-model="firstName"
              />
            </div>
            <div class="form-group">
              <!-- fourth input field -->
              <label for="companycontact">Last Name: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="tel"
                placeholder="Enter Last Name"
                id="last_name"
                required
                v-model="lastName"
              />
            </div>
            <div>
              <label for="supplieraddress"> Address: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="text"
                id="company_address"
                v-model.trim="address"
                required
              />
            </div>
            <!-- <div class="form-group">
              <label class="mt-3" for="">Select User Type</label>
              <b-form-select v-model="role" class="input">
                <b-form-select-option disabled :value="null"
                  >Please select an option</b-form-select-option
                >
                <b-form-select-option value="sales">Sales</b-form-select-option>
                <b-form-select-option value="warehouse"
                  >Warehouse</b-form-select-option
                >
              </b-form-select>
            </div> -->
            <br />
            <b-button @click="$bvModal.show('confirm-user')" variant="primary">
              Submit</b-button
            >
            <b-button type="reset" variant="danger" class="reset"
              >Reset</b-button
            >
          </b-form>
        </div>
        <!-- </b-card> -->
      </b-modal>
      <b-modal id="confirm-user" centered hide-footer>
        <template #modal-title> Confirm submit</template>

        <template #default="{ hide }">
          <b-button
            type="submit"
            class="mt-3"
            block
            @click="$bvModal.hide('confirm-user'), addToUser()"
            >Confirm</b-button
          >

          <b-button @click="hide()" block variant="danger"> Cancel</b-button>
        </template>
      </b-modal>
      <b-col>
        <b-card class="card-table">
          <b-row>
            <b-col cols="4">
              <b-button
                v-b-modal.addusermodal
                variant="primary"
                class="btnadd"
                size="sm"
              >
                <font-awesome-icon icon="plus-circle" /> &nbsp; Add User
              </b-button>
            </b-col>
            <b-col>
              <b-form-group>
                <!-- group for search bar -->
                <b-input-group size="sm">
                  <b-form-input
                    size="sm"
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search user"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-table
            bordered
            hover
            :items="usersState"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            head-variant="light"
          >
            <template #cell(actions)="row">
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="edit"
                pill
                title="Edit User"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="edit" />
              </b-button>
            </template>
            <template v-slot:cell(status)="row">
              <div class="badge-font-size" v-if="row.item.status">
                <b-badge pill variant="badge">Active</b-badge>
              </div>
              <div class="badge-font-size" v-else>
                <b-badge pill variant="gray">Inactive</b-badge>
              </div>
            </template>
            <template v-slot:cell(created_at)="row">{{
              formatDate(row.item)
            }}</template></b-table
          >
          <b-modal
            :header-bg-variant="modalheadbg"
            id="editUserModal"
            title="Edit User"
          >
            <div class="form-group">
              <!-- second input field -->
              <label for="companyname">Username: </label>
              <b-form-input
                size="sm"
                type="text"
                id=" company_name"
                v-model.trim="editUser.username"
                required
              />
            </div>
            <div class="form-group">
              <!-- third input field -->
              <label for="supplieraddress"> Password: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="text"
                id="company_address"
                v-model.trim="editUser.password"
                required
              />
            </div>
            <div class="form-group">
              <!-- third input field -->
              <label for="supplieraddress"> First Name: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="text"
                id="company_address"
                v-model.trim="editUser.first_name"
                required
              />
            </div>
            <div class="form-group">
              <!-- third input field -->
              <label for="supplieraddress"> Last Name: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="text"
                id="company_address"
                v-model.trim="editUser.last_name"
                required
              />
            </div>
            <div>
              <label for="supplieraddress"> Address: </label>
              <b-form-input
                size="sm"
                class="form-control"
                type="text"
                id="company_address"
                v-model.trim="editUser.address"
                required
              />
            </div>
            <!-- <div class="form-group">
              <label class="" for="">Select User Type</label>
              <b-form-select v-model="editUser.role" class="input">
                <b-form-select-option disabled :value="null"
                  >Please select an option</b-form-select-option
                >
                <b-form-select-option value="sales">Sales</b-form-select-option>
                <b-form-select-option value="warehouse"
                  >Warehouse</b-form-select-option
                >
              </b-form-select>
            </div> -->

            <div class="form-group">
              <!-- fourth input field -->
              <label class="" for="">Status: </label>
              <b-form-select size="sm" v-model="editUser.status" class="input">
                <b-form-select-option disabled :value="null"
                  >Please select an option</b-form-select-option
                >
                <b-form-select-option value="active"
                  >Active</b-form-select-option
                >
                <b-form-select-option value="inactive"
                  >Inactive</b-form-select-option
                >
              </b-form-select>
            </div>
            <template #modal-footer="{ ok, cancel, }">
              <!-- Emulate built in modal footer ok and cancel button actions -->
              <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
              </b-button>
              <b-button size="sm" variant="primary" @click="edit()">
                OK
              </b-button>
            </template>
          </b-modal>
          <b-modal
            :header-bg-variant="modalheadbg"
            :id="userModal.id"
            :title="userModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ userModal.content }}</pre>
          </b-modal>

          <div class="mt-3">
            <b-pagination
              v-model="currentPage"
              pills
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="supplier-table"
              align="center"
              size="sm"
              limit="3"
            ></b-pagination>
          </div>
        </b-card>
      </b-col>
    </b-form-row>
    <!-- <b-toast id="toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast> -->
    <b-alert
      class="alert"
      :show="alert.showAlert"
      dismissible
      :variant="alert.variant"
      @dismissed="alert.showAlert = null"
    >
      {{ alert.message }}
    </b-alert>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      counter: 0,
      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      },
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
      address: "",

      options: [],
      // rows: 100,
      perPage: 8,
      currentPage: 1,
      item: [],
      filter: null,
      filterOn: [],
      sortBy: " ",
      sortDesc: false,

      user: [],
      users: [],
      userModal: {
        id: "user-modal",
        title: "",
        content: ""
      },

      select_barcode: "",
      product: [],
      order: [],
      fields: [
        { key: "id", sortable: true, label: "User ID" },
        { key: "username", sortable: true, label: "Username" },
        { key: "first_name", sortable: false, label: "First Name" },
        { key: "last_name", sortable: true, label: "Last Name" },
        { key: "role", sortable: true, label: "Role" },
        { key: "status", sortable: true, label: "Status" },
        { key: "Actions", sortable: true, label: "Actions" }
        // { key: "Actions", sortable: false, label: "Actions" }
      ],
      resetInfo: "",
      modalheadbg: "",
      // onFilteredData: [],
      editUser: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "",
        status: "",
        address: ""
      }
    };
  },

  beforeCreate() {
    this.$store.dispatch("getUsers", {
      SecretKey: localStorage.SecretKey
    });
  },
  created() {},
  methods: {
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
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      console.log("teft");
    },
    addToUser() {
      this.$store
        .dispatch("addUser", {
          username: this.userName,
          password: this.password,
          first_name: this.firstName,
          last_name: this.lastName,
          address: this.address,
          role: "admin",
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          // this.showAlert(res.message, "success");
          let msg = res;
          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");
          this.$store.dispatch("getUsers", {
            SecretKey: localStorage.SecretKey
          });
          this.$root.$emit("bv::hide::modal", "addusermodal", "#addusermodal");
          this.userName = "";
          this.password = "";
          this.firstName = "";
          this.lastName = "";
          this.role = "";
        })
        .catch(err => {
          let errMsg = err.response.data.error;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
          // this.showAlert(err, "danger");
        });
    },
    showAlert(message, variant) {
      this.dismissCountDown = this.dismissSecs;
      this.alert = {
        showAlert: 3,
        variant,
        message
      };
    },
    formatDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },

    info(user, index, button) {
      this.userModal.title = `${user.username}`;
      this.userModal.content = JSON.stringify(user, null, 2);
      this.editUser.id = user.id;
      this.editUser.username = user.username;
      this.editUser.password = user.password;
      this.editUser.role = user.role;
      this.editUser.status = user.status;
      this.editUser.last_name = user.last_name;
      this.editUser.first_name = user.first_name;
      this.$root.$emit("bv::show::modal", "editUserModal", "#editUser");
    },
    async edit() {
      await this.$store
        .dispatch("editUserDetail", {
          userDetails: this.editUser,
          SecretKey: localStorage.SecretKey
        })
        .then(res => {
          console.log(res);
          // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
          this.$store.dispatch("getUsers", {
            SecretKey: localStorage.SecretKey
          });
          let msg = res.message;
          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");
          this.$root.$emit("bv::hide::modal", "editUserModal", "#editUser");
        })
        .catch(err => {
          console.log(err);
          let errMsg = err.response.data.error;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    resetInfoModal() {
      this.userModal.title = "";
      this.userModal.content = "";
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  //
  computed: {
    rows() {
      return this.usersState.length;
    },
    ...mapGetters({
      usersState: "allUsers"
    })
  }
};
</script>

<style scoped>
.formTitle {
  color: white;
  text-align: center;
}
.reset {
  float: right;
}
</style>
