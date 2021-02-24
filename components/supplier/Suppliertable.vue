<template class="supplierTable">
  <div>
    <b-form-row>
      <b-col cols="3">
        <b-card class="bg-secondary">
          <h3 class="formTitle">
            <font-awesome-icon icon="store" /> Add Supplier
          </h3>
        </b-card>
        <b-card>
          <b-form class="supplierform" id="app">
            <!-- form starts here-->
            <!-- <div class="form-group">
              <label for="companycontact">Supplier Code: </label>
              <b-form-input
                class="form-control"
                type="number"
                placeholder="Enter Company contact number"
                id="supplier_code"
                v-model.trim="suppliersState.supplier_id"
                required
              />
            </div>
           -->
            <div class="form-group">
              <!-- second input field -->
              <label for="companyname">Company Name: </label>
              <b-form-input
                :state="
                  $v.form.companyname.$dirty
                    ? !$v.form.companyname.$error
                    : null
                "
                type="text"
                placeholder="Enter Company or Supplier name"
                id=" company_name"
                v-model.trim="supplier.companyname"
                required
              />
            </div>
            <div class="form-group">
              <!-- third input field -->
              <label for="supplieraddress"> Company Address: </label>
              <b-form-input
                class="form-control"
                type="text"
                placeholder=" Enter Company address"
                id="company_address"
                v-model.trim="supplier.address"
                required
              />
            </div>
            <div class="form-group">
              <!-- fourth input field -->
              <label for="companycontact">Company Contact: </label>
              <b-form-input
                class="form-control"
                type="tel"
                placeholder="Enter Company contact number"
                id="contact_number"
                v-model.trim="supplier.contact"
                required
              />
            </div>
            <br />
            <b-button
              :class="$v.form.$invalid ? 'supplier-disabled' : 'supplier'"
              @click="$bvModal.show('confirm')"
              variant="primary"
            >
              Submit</b-button
            >
            <b-button type="reset" variant="danger" class="reset"
              >Reset</b-button
            >
          </b-form>
        </b-card>
      </b-col>

      <b-modal id="confirm" centered hide-footer>
        <template #modal-title> Confirm submit</template>
        <div class="d-block text-center"></div>

        <template #default="{ hide }">
          <b-button
            type="submit"
            class="mt-3"
            block
            @click="$bvModal.hide('confirm'), addtosupplier()"
            >Confirm</b-button
          >

          <b-button @click="hide()" block variant="danger"> Cancel</b-button>
        </template>
      </b-modal>
      <b-col cols="9">
        <!-- column for whole table -->
        <!-- <b-card bg-variant="info"> -->
        <!-- card for nav card -->
        <!-- <b-form-row>
            <b-col cols="6 form-inline">
              <b-form-group label-align="end" label-size="sm" class="mb-0">
                <b-input-group size=""> </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-card> -->

        <b-card
          class="card bg-info shadow p-4 mb-5 bg-white rounded"
          id="suppliertable"
        >
          <!-- card for whole table -->
          <b-form-group>
            <!-- group for search bar -->
            <b-input-group size="">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <!-- supplier table starts here -->
          <b-table
            hover
            id="supplier-table"
            :items="suppliersState"
            :busy.sync="isBusy"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            @filtered="onFiltered"
            show-empty
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template #cell(actions)="row">
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="primary"
                pill
              >
                <font-awesome-icon icon="edit" />
              </b-button>
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="secondary"
                pill
              >
                <font-awesome-icon icon="archive" />
              </b-button>
              <!-- <b-button
                size="sm"
                @click="deleteEvent(row.index)"
                class="mr-1"
                variant="danger"
                pill
              >
                <font-awesome-icon icon="trash-alt" />
              </b-button> -->
            </template>
          </b-table>
          <!-- modal for edit button-->
          <b-modal
            :header-bg-variant="modalheadbg"
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
          </b-modal>

          <!-- <b-table hover :items="items"></b-table> -->

          <!-- <Pagination /> -->
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

      <!-- column for add supplier form-->
    </b-form-row>
    <b-alert
      class="alert"
      :show="alert.showAlert"
      dismissible
      :variant="alert.variant"
      @dismissed="alert.showAlert = null"
      @dismiss-count-down="countDownChanged"
    >
      {{ alert.message }}
    </b-alert>
  </div>
</template>

<script>
name: "Suppliertable";
import { mapState, mapMutations, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Suppliertable",
  data() {
    return {
      alert: {
        showAlert: 0,
        dismissSecs: 0,
        variant: "success",
        message: ""
      },
      rows: 100,
      perPage: 8,
      currentPage: 1,
      item: [],
      filter: null,
      isBusy: false,
      filterOn: [],
      showDismissibleAlert: false,
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      modalheadbg: "info", //background color for modalhead
      endDate: "null",
      startDate: "null",
      sortBy: " ",
      sortDesc: false,
      fields: [
        { key: "supplier_id", sortable: true, label: "Code" },
        { key: "companyname", sortable: true, label: "Company Name" },
        { key: "address", sortable: true, label: "Company Address" },
        { key: "contact", sortable: false, label: "Company Contact" },
        { key: "Actions", sortable: false, label: "Actions" }
      ],
      boxOne: "",
      supplier: [],
      suppliers: [],
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadSuppliers");
  },
  validations: {
    form: {
      companyname: { required },
      contact: { required },
      address: { required }
    }
  },

  computed: {
    ...mapGetters({
      suppliersState: "allSuppliers"
    })
  },

  // computed: mapState({
  //   items: state => state.items //retrieve data from state
  // }),
  methods: {
    addtosupplier() {
      console.log("newsup", this.supplier);
      this.$store
        .dispatch("addSupplier", {
          companyname: this.supplier.companyname,
          contact: this.supplier.contact,
          address: this.supplier.address
        })

        .then(res => {
          console.log("err", res);
          this.supplier = [];
          if (res == "Error: Request failed with status code 406") {
            if (res == "Error: Network Error") {
              this.showAlert("Network Error", "danger");
            }
            this.showAlert("Error: Please check supplier details", "danger");
          } else {
            this.showAlert(
              "Supplier details was submitted successfully",
              "success"
            );
          }
        })
        .catch(err => {
          console.log(err);
          this.showAlert(err.response.data.msg, "danger");
        });
    },

    // ...mapMutations(["ADD_ITEM"]),
    // additem: function() {
    //   //additem function for adding item haha
    //   this.ADD_ITEM(this.item); //add new item from form to the table
    // },

    info(item, index, button) {
      this.infoModal.title = `${item.company_name}`; // modal title for selected item
      this.infoModal.content = JSON.stringify(item, null, 2); //row contentc to string
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    succesAlert() {
      //
      this.boxTwo = "";
      this.$bvModal
        .msgBoxOk("Data was submitted successfully", {
          title: "Confirmation",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        })
        .then(value => {
          this.boxTwo = value;
        })
        .catch(err => {
          // An error occurred
        });
    },
    deleteEvent(index, row) {
      this.items.splice(index, 1);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    showMsgBoxOne() {
      this.boxOne = "";
      this.$bvModal
        .msgBoxConfirm("Are you sure?", {
          title: "Please confirm submit",
          centered: true,
          okType: "submit"
        })
        .then(value => {
          this.boxOne = value;
        })
        .catch(err => {
          // An error occurred
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(message, variant) {
      this.dismissCountDown = this.dismissSecs;
      this.alert = {
        showAlert: 3,
        variant,
        message
      };
    },
    submitform() {}
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
.alert {
  z-index: 10;
  width: 500px;
  float: right;
}
</style>
