<template class="supplierTable">
  <div>
    <b-form-row>
      <b-modal
        id="suppliermodal"
        size=""
        class="supplier-modal"
        hide-footer
        title="Add Supplier"
        no-close-on-backdrop
      >
        <div class="supborder">
          <b-form class="supplierform" id="app">
            <div class="form-group">
              <!-- second input field -->
              <label for="companyname">Company Name: </label>
              <b-form-input
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
              <label for="companycontact">Company Contact Number: </label>
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
        </div>
        <!-- </b-card> -->
      </b-modal>
      <!-- </b-col> -->

      <b-modal id="confirm" centered hide-footer>
        <template #modal-title> Confirm submit</template>

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
      <b-modal id="confirmEdit" centered hide-footer>
        <template #modal-title> Confirm submit</template>

        <template #default="{ hide }">
          <b-button
            type="submit"
            class="mt-3"
            block
            @click="$bvModal.hide('confirmEdit'), editSupplier()"
            >Confirm</b-button
          >

          <b-button @click="hide()" block variant="danger"> Cancel</b-button>
        </template>
      </b-modal>
      <b-col cols="">
        <b-card class="card-table" id="suppliertable">
          <!-- card for whole table -->
          <b-form-group>
            <!-- group for search bar -->
            <b-row>
              <b-col cols="4">
                <b-button
                  v-b-modal.suppliermodal
                  variant="primary"
                  class="btnadd"
                  size="sm"
                >
                  <font-awesome-icon icon="plus-circle" /> &nbsp; Add Supplier
                </b-button>
              </b-col>
              <b-col>
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-supplier"
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
              </b-col>
            </b-row>
          </b-form-group>

          <!-- supplier table starts here -->

          <b-table
            head-variant="light"
            bordered
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
                @click="openEditModal(row.item)"
                class="mr-1 mt-1"
                variant="edit"
                pill
                title="Edit Supplier Details"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="edit" />
              </b-button>
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1 mt-1"
                variant="secondary"
                pill
                title="View Supplier Details"
                v-b-tooltip.hover
              >
                <font-awesome-icon icon="archive" />
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
          </b-table>

          <!-- modal for edit button-->
          <b-modal
            :header-bg-variant="modalheadbg"
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
            size="lg"
          >
            <b-row no-gutters>
              <b-col cols="4">
                <b-list-group-item
                  variant="primary"
                  v-for="name in detailName"
                  :key="name"
                >
                  <b>
                    {{ name }}
                  </b>
                </b-list-group-item>
              </b-col>
              <b-col>
                <b-list-group-item
                  variant="light"
                  v-for="items in infoModal.content"
                  :key="items"
                >
                  {{ items }}
                </b-list-group-item>
              </b-col>
            </b-row>
            <!-- </b-list-group> -->
          </b-modal>
          <b-modal
            title="Edit Supplier"
            :header-bg-variant="modalheadbg"
            id="editsupplier"
            hide-footer
          >
            <div class="form-group">
              <!-- second input field -->
              <label for="companyname">Company Name: </label>
              <b-form-input
                type="text"
                placeholder="Enter Company or Supplier name"
                id=" company_name"
                v-model="supplier.companyname"
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
              @click="$bvModal.show('confirmEdit')"
              variant="primary"
            >
              Submit</b-button
            >
            <b-button type="reset" variant="danger" class="reset"
              >Reset</b-button
            >
          </b-modal>

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
      perPage: 4,
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
        {
          key: "supplier_id",
          sortable: true,
          label: "Code"
          // thStyle: { background: "rgb(148, 201, 197)" }
        },
        {
          key: "supplier_name",
          sortable: true,
          label: "Company Name"
        },
        {
          key: "address",
          sortable: true,
          label: "Company Address"
        },
        {
          key: "contact",
          sortable: false,
          label: "Company Contact"
        },
        {
          key: "status",
          sortable: false,
          label: "Status"
        },
        {
          key: "Actions",
          sortable: false,
          label: "Actions"
        }
      ],
      boxOne: "",
      supplier: [],
      suppliers: [],
      supplier: {
        companyname: "",
        contact: "",
        address: "",
        id: null
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      counter: 0,
      detailName: [
        "Supplier ID:",
        "Supplier Name: ",
        "Address: ",
        "Contact: ",
        "Date Added: ",
        "Status: "
      ]
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadSuppliers", {
      SecretKey: localStorage.SecretKey
    });
  },
  validations: {
    form: {
      companyname: { required },
      contact: { required },
      address: { required }
    }
  },

  computed: {
    rows() {
      return this.suppliersState.length;
    },
    ...mapGetters({
      suppliersState: "allSuppliers"
    })
  },

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
    openEditModal(item) {
      console.log("edit sup", item);
      this.supplier.companyname = item.supplier_name;
      this.supplier.address = item.address;
      this.supplier.contact = item.contact;
      this.supplier.id = item.supplier_id;
      setTimeout(() => {
        this.$root.$emit("bv::show::modal", "editsupplier", "#editsupplier");
      }, 500);
    },
    editSupplier() {
      this.$store
        .dispatch("editSupplier", {
          supplier_name: this.supplier.companyname,
          contact: this.supplier.contact,
          address: this.supplier.address,
          id: this.supplier.id,
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          // this.showAlert(res.message, "success");
          let msg = res.message;
          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");
          this.$store.dispatch("loadSuppliers", {
            SecretKey: localStorage.SecretKey
          });
          this.$root.$emit("bv::hide::modal", "editsupplier", "#editsupplier");
          this.addToLogs(
            `Edited details of supplier ${this.supplier.companyname}`,
            localStorage.id
          );
        })
        .catch(err => {
          console.log(err);
          // this.showAlert(err, "danger");
          let errMsg = err;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
        });
    },
    addtosupplier() {
      this.$store
        .dispatch("addSupplier", {
          supplier_name: this.supplier.companyname,
          contact: this.supplier.contact,
          address: this.supplier.address,
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          // this.showAlert(res.message, "success");
          let msg = res.message;
          this.toast("b-toaster-bottom-right", true, "success", msg, "Success");
          this.$store.dispatch("loadSuppliers", {
            SecretKey: localStorage.SecretKey
          });
          this.$root.$emit(
            "bv::hide::modal",
            "suppliermodal",
            "#suppliermodal"
          );
          this.addToLogs(
            `Added Supplier ${this.supplier.companyname}`,
            localStorage.id
          );
          this.supplier = [];
        })
        .catch(err => {
          console.log(err);
          // this.showAlert(err, "danger");
          let errMsg = err;
          this.toast("b-toaster-bottom-right", true, "danger", errMsg, "Error");
        });
    },
    addToLogs(action, id) {
      console.log("action, id", action, id);
      this.$store
        .dispatch("addLog", {
          action_made: action,
          user_id: id,
          SecretKey: localStorage.SecretKey
        })

        .then(res => {
          console.log("res log", res);
          this.$store.dispatch("getLog", {
            SecretKey: localStorage.SecretKey
          });
        })
        .catch(err => {
          console.log("err log", err);
        });
    },

    info(item, index, button) {
      this.infoModal.title = item.supplier_name; // modal title for selected item
      this.infoModal.content = item; //row contentc to string
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

.supborder {
  margin: 10px;
}
</style>
