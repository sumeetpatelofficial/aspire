<template>
  <div class="main-page-area">
    <div
      class="row"
      :class="$screen.width < 576 ? 'align-items-end' : 'align-items-center'"
    >
      <div class="col">
        <p class="avilable-balance">Available Balance</p>
        <div class="balance-detail">
          <b-badge variant="primary">S$</b-badge>
          <span class="balance-amount">3,000</span>
        </div>
      </div>
      <div class="col-auto">
        <img
          class="d-md-none d-sm-block mobile-logo"
          src="@/assets/images/favicon.svg"
          alt=""
          srcset=""
        />
        <div class="add-new-card">
          <b-link
            v-if="$screen.width < 576"
            v-b-modal.addNewCard
            class="text-info"
            ><i class="fa fa-plus-circle"></i> New Card</b-link
          >
          <b-button v-else variant="secondary" v-b-modal.addNewCard>
            <i class="fa fa-plus-circle"></i> New Card</b-button
          >
        </div>
      </div>
    </div>

    <div class="line-tabs">
      <b-tabs>
        <b-tab title="My debit cards" active>
          <div :class="{ 'p-4 bg-body rounded': $screen.width > 576 }">
            <div class="row" :class="{ 'no-gutters': $screen.width < 576 }">
              <div class="col-md-6 col-lg-6 col-xl-6">
                <div class="card-area">
                  <div
                    class="position-relative"
                    v-if="$store.state.cardDetails.length"
                  >
                    <!-- Card carousel -->
                    <swiper
                      ref="swiper"
                      class="swiper swiper-slider"
                      :options="swiperSliderOption"                      
                    >
                      <swiper-slide
                        v-for="(card, c) in $store.state.cardDetails"
                        :key="c"
                      >
                        <p class="show-number-toggle">
                          <b-link @click="ifIsNumber = !ifIsNumber">
                            <i
                              class="fas"
                              :class="ifIsNumber ? 'fa-eye-slash' : 'fa-eye'"
                            ></i>
                            {{
                              ifIsNumber
                                ? "Hide card number"
                                : "Show card number"
                            }}
                          </b-link>
                        </p>
                        <Card :card="card" :showNumber="ifIsNumber" />
                      </swiper-slide>
                    </swiper>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!-- Card carousel -->
                  </div>
                  <div v-else>
                    <div class="debit-card">
                      <p class="text-white">No Cards added Yet.</p>
                      <h4>
                        <b-link class="text-white stretched-link" v-b-modal.addNewCard
                          >Click here to add a card</b-link
                        >
                      </h4>
                    </div>
                  </div>
                  <!-- Card Action Button Start -->
                  <div class="icon-box-area p-3">
                    <div :class="$screen.width > 576 ? 'row' : 'form-row'">
                      <div class="col cursor-pointer" @click="$store.dispatch('freezeCard', checkIndex)">
                        <img src="../assets/images/Freeze card.svg" alt="" />
                        <p class="mb-0 icon-title">Freeze Card</p>
                      </div>
                      <div class="col cursor-pointer">
                        <img
                          src="../assets/images/Set spend limit.svg"
                          alt=""
                        />
                        <p class="mb-0 icon-title">Set spent limit</p>
                      </div>
                      <div class="col cursor-pointer">
                        <img src="../assets/images/GPay.svg" alt="" />
                        <p class="mb-0 icon-title">Add to Gpay</p>
                      </div>
                      <div class="col cursor-pointer">
                        <img src="../assets/images/Replace card.svg" alt="" />
                        <p class="mb-0 icon-title">Replace card</p>
                      </div>
                      <div
                        class="col cursor-pointer"
                        @click="showDeleteModal()"
                      >
                        <img
                          src="../assets/images/Deactivate card.svg"
                          alt=""
                        />
                        <p class="mb-0 icon-title">Cancel Card</p>
                      </div>
                    </div>
                  </div>
                  <!-- Card Action Button End -->
                </div>
              </div>

              <div class="col-md-6 col-lg-6 col-xl-6">
                <div class="accordion-area">
                  <!-- Start Card Detail Tab -->
                  <div class="panel">
                    <div class="panel-heading shadow-sm" v-b-toggle.accordion-3>
                      <img
                        src="../assets/images/Group 11889.svg"
                        class="accordian-icon"
                        alt=""
                      />
                      <h5>Card details</h5>
                      <i class="fas fa-chevron-circle-down"></i>
                    </div>
                    <b-collapse
                      id="accordion-3"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <div class="px-3 py-3">
                        <h5 class="text-muted">No card detail found.</h5>
                      </div>
                    </b-collapse>
                  </div>
                  <!-- End  Card Detail Tab -->

                  <!-- Start Transction Tab -->
                  <div class="panel mt-3">
                    <div
                      class="panel-heading shadow-sm"
                      v-b-toggle.accordion-transaction
                    >
                      <img
                        src="../assets/images/transaction.svg"
                        class="accordian-icon"
                        alt=""
                      />
                      <h5 class="text-secondary">Recent transcations</h5>
                      <i class="fas fa-chevron-circle-down"></i>
                    </div>

                    <b-collapse
                      id="accordion-transaction"
                      visible
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <div class="px-3 py-3">
                        <ul class="transition-list">
                          <li
                            v-for="(transaction, t) in recentTransactionsList"
                            :key="t"
                          >
                            <TransactionListItem
                              :transaction="transaction"
                              :index="t"
                            />
                          </li>
                        </ul>
                      </div>
                    </b-collapse>
                  </div>
                  <div class="more-link">
                    <b-link href="#" class="stretched-link"
                      >View all card transactions</b-link
                    >
                  </div>
                  <!-- End Transction Tab -->
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="All company cards">
          <div class="p-4 bg-body rounded"><p>All Company Cards</p></div>
        </b-tab>
      </b-tabs>
    </div>

    <!-- Popup for add New Card -->
    <b-modal
      id="addNewCard"
      ref="modal"
      title="Add New Card"
      @show="resetForm"
      @hidden="resetForm"
      hide-footer
      hide-header-close
      centered
    >
      <b-form @submit.prevent="addNewCard()">
        <div class="row">
          <div class="col-12">
            <b-form-group label-for="name">
              <label for="" class="control-label">Name</label>
              <b-form-input
                id="name"
                name="cardHolderName"
                v-model="cardDetails.cardHolderName"
                placeholder="Enter Name"
                v-validate="{ required: true }"
                :class="[{ 'is-invalid': errors.has('cardHolderName') }]"
              ></b-form-input>
              <span
                v-show="errors.has('cardHolderName')"
                class="text-danger m-0"
                >Name is required.</span
              >
            </b-form-group>
          </div>

          <div class="col-12">
            <b-form-group label-for="card number">
              <label for="" class="control-label">Card Number</label>
              <b-form-input
                id="name"
                name="cardNumber"
                maxlength="19"
                v-model="cardDetails.cardNumber"
                placeholder="**** **** **** ****"
                v-validate="{ required: true, min:19, max:19 }"
                :class="[{ 'is-invalid': errors.has('cardNumber') }]"
                @keyup="inputFormatCardNumber"
              ></b-form-input>
              <span v-show="errors.has('cardNumber')" class="text-danger m-0"
                >Card Number is required.</span
              >
            </b-form-group>
          </div>

          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <b-form-group>
                  <label for="" class="control-label">Expiry Month</label>
                  <b-form-select
                    name="month"
                    v-model="cardDetails.expireMonth"
                    v-validate="{ required: true }"
                    :options="monthOptions"
                    :class="[{ 'is-invalid': errors.has('month') }]"
                  ></b-form-select>
                  <span v-show="errors.has('month')" class="text-danger m-0"
                    >Month is required.</span
                  >
                </b-form-group>
              </div>
              <div class="col-6">
                <b-form-group>
                  <label for="" class="control-label">Expiry Year</label>
                  <b-form-select
                  name="year"
                    v-model="cardDetails.expireYear"
                    v-validate="{ required: true }"
                    :options="yearOptions"
                    :class="[{ 'is-invalid': errors.has('year') }]"
                  ></b-form-select>
                  <span v-show="errors.has('year')" class="text-danger m-0"
                    >Year is required.</span
                  >
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="col-4">
            <b-form-group>
              <label for="" class="control-label">CVV Number</label>
              <b-form-input
                id="name"
                name="cvvNumber"
                maxlength="3"
                placeholder="***"
                v-validate="{ required: true, max:3, min:3 }"
                v-model="cardDetails.cvvNumber"                
                :class="[{ 'is-invalid': errors.has('cvvNumber') }]"
              ></b-form-input>
              <span v-show="errors.has('cvvNumber')" class="text-danger m-0"
                >CVV Number is required.</span
              >
            </b-form-group>
          </div>
        </div>

        <div class="text-right mt-3">
          <b-button
            variant="light"
            class="mr-3 text-secondary"
            @click="$bvModal.hide('addNewCard')"
            >Cancel</b-button
          >
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </b-modal>
    <!-- End Popup for add New Card -->

    <!-- Delete Modal -->
    <b-modal
      id="deleteModal"
      centered
      hide-header
      hide-footer
      hide-header-close
    >
      <ConfirmModal @confirm="removeCard()" @cancel="cancelCard"></ConfirmModal>
    </b-modal>
    <!-- Delete Modal -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Card from "@/components/common/card.vue";
import TransactionListItem from "@/components/common/transactionListItem.vue";

@Component({
  components: {
    Swiper,
    SwiperSlide,
    ConfirmModal,
    Card,
    TransactionListItem,
  },
})
export default class MainContentArea extends Vue {
  recentTransactionsList: any = this.$store.state.transactionHistoryList;
  cardHolderName: any = "";
  ifIsNumber: any = false;

  cardDetails: any = {
    id: "",
    cardHolderName: "",
    cardNumber: "",
    cvvNumber: "",
    expireMonth: "",
    expireYear: "",
    ifIsFreeze: false,
  };

  // getting the curremt index
  get checkIndex(){
    return (this.$refs as any).swiper.$swiper.activeIndex
  }

  // slider's options
  swiperSliderOption: any = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      1367: {
        slidesPerView: 1,
      },
      1280: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      560: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  // adding new start only with user's name for now
  addNewCard() {
    this.$validator.validateAll().then((result) => {
      if (result) {
        let cardDetails = {
          id: this.randomId(),
          cardHolderName: this.cardDetails.cardHolderName,
          cardNumber: this.cardDetails.cardNumber,
          cvvNumber: this.cardDetails.cvvNumber,
          expireDate:
            this.cardDetails.expireMonth + " / " + this.cardDetails.expireYear,
          ifIsFreeze: false,
        };
        this.$store.dispatch("addCardDetails", cardDetails);
        this.$toasted.show("Card added sucessfully", {
          type: "success",
          theme: "toasted-primary",
          position: "top-right",
          duration: 3000,
        });
        this.$bvModal.hide("addNewCard");
      }
    });
  }

  // Random Id
  randomId() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  removeCard() {
    this.$store.dispatch("cancelCardDetails", this.checkIndex);
    this.$toasted.show("Card removed sucessfully", {
      type: "success",
      theme: "toasted-primary",
      position: "top-right",
      duration: 3000,
    });
    this.$bvModal.hide("deleteModal");
  }

  resetForm() {
    this.cardDetails = {
      id: "",
      cardHolderName: "",
      cardNumber: "",
      cvvNumber: "",
      expireMonth: "",
      expireYear: "",
      ifIsFreeze: false,
    };
  }

  cancelCard() {
    this.$bvModal.hide("deleteModal");
  }

  showDeleteModal() {
    this.$bvModal.show("deleteModal");
  }

  yearOptions: any = [
    { text: "-- select a year ---", value: "" },
    { text: "2022", value: "2022" },
    { text: "2023", value: "2023" },
    { text: "2024", value: "2024" },
    { text: "2025", value: "2025" },
    { text: "2026", value: "2026" },
    { text: "2027", value: "2027" },
    { text: "2028", value: "2028" },
  ];
  monthOptions: any = [
    { text: "-- select a month ---", value: "" },
    { text: "01", value: "01" },
    { text: "02", value: "02" },
    { text: "03", value: "03" },
    { text: "04", value: "04" },
    { text: "05", value: "05" },
    { text: "06", value: "06" },
    { text: "07", value: "07" },
    { text: "08", value: "08" },
    { text: "09", value: "09" },
    { text: "10", value: "10" },
    { text: "11", value: "11" },
    { text: "12", value: "12" },
  ];

  inputFormatCardNumber() {
      let text = this.cardDetails.cardNumber.split(" ").join("") 
      if (text.length > 0) {
        text = text.match(new RegExp(/.{1,4}/, 'g')).join(" ").replace(new RegExp(/[^\d]/, 'ig'), " ");
      }
      this.cardDetails.cardNumber = text       
  }
}
</script>

<style scoped></style>
