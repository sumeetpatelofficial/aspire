<template>
  <div class="main-page-area">
    <div class="row" :class="$screen.width<576 ? 'align-items-end' : 'align-items-center'">
      <div class="col">
        <p class="avilable-balance">Available Balance</p>
        <div class="balance-detail">
          <b-badge variant="primary">S$</b-badge>
          <span class="balance-amount">3,000</span>
        </div>
      </div>
      <div class="col-auto">
        <img class="d-md-none d-sm-block mobile-logo" src="@/assets/images/favicon.svg" alt="" srcset="">
        <div class="add-new-card">
        <b-link v-if="$screen.width<576" v-b-modal.addNewCard class="text-info"><i class="fa fa-plus-circle"></i> New Card</b-link>
        <b-button v-else variant="secondary" v-b-modal.addNewCard>
          <i class="fa fa-plus-circle"></i> New Card</b-button>
        </div>
      </div>
    </div>

    <div class="line-tabs">
      <b-tabs>
        <b-tab title="My debit cards" active>
          <div :class="{'p-4 bg-body rounded':$screen.width>576}">
            <div class="row" :class="{'no-gutters':$screen.width<576}">
              <div class="col-md-6 col-lg-6 col-xl-6">
                <div class="card-area">                  
                  <div class="position-relative" v-if="$store.state.cardDetails.length">
                    <!-- Card carousel -->
                    <swiper
                      ref="swiper"
                      class="swiper swiper-slider"
                      :options="swiperSliderOption"
                    >
                      <swiper-slide v-for="(card, c) in $store.state.cardDetails" :key="c">
                        <p class="show-number-toggle">                   
                            <b-link @click="ifIsNumber = !ifIsNumber">
                              <i class="fas" :class="ifIsNumber ? 'fa-eye-slash' : 'fa-eye'"></i> 
                              {{ifIsNumber ? 'Hide card number':'Show card number'}}
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
                        <b-link class="text-white" v-b-modal.addNewCard>Click here to add a card</b-link>
                      </h4>
                    </div>
                  </div>
                  <!-- Card Action Button Start -->
                  <div class="icon-box-area p-3">
                    <div :class="$screen.width > 576 ? 'row':'form-row'">
                      <div class="col cursor-pointer">
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
                            <TransactionListItem :transaction="transaction" :index="t" />
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
      @show="resetModal"
      @hidden="resetModal"
      hide-footer
      hide-header-close
      centered
    >
      <b-form @submit.prevent="addNewCard()">
        <b-form-group label-for="name">
          <label for="" class="control-label">Name</label>
          <b-form-input
            id="name"
            name="cardHolderName"
            v-model="cardHolderName"
            placeholder="Enter Name"
            v-validate="{ required: true }"
            :class="[{'is-invalid': errors.has('cardHolderName') }]"
          ></b-form-input>
          <span v-show="errors.has('cardHolderName')" class="text-danger m-0"
          >Name is required.</span>
        </b-form-group>        
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
import extend from 'vee-validate';
@Component({
  components: {
    Swiper,
    SwiperSlide,
    ConfirmModal,
    Card, 
    TransactionListItem
  },
})
export default class MainContentArea extends Vue {
  recentTransactionsList: any = this.$store.state.transactionHistoryList;
  cardHolderName: any = "";
  ifIsNumber: any = false;

  mounted() {
    this.$store.dispatch("addCardDetails", 
      {
        id: this.randomCVV(),
        cardHolderName: "Sumeet Patel",
        CardChunk1: this.randomCardNumber(),
        CardChunk2: this.randomCardNumber(),
        CardChunk3: this.randomCardNumber(),
        CardChunk4: this.randomCardNumber(),
        cvvNumber: this.randomCVV(),
        expireDate: this.randomDate(new Date(2012, 0, 1), new Date()),
        ifIsFreeze: false,  
        ifIsCancel: false,
      },
    );
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
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  // adding new start only with user's name for now
  addNewCard() {
    this.$validator.validateAll().then((result) => {
      if (result) {
        let cardDetails = {
          id: this.randomCVV(),
          cardHolderName: this.cardHolderName,
          CardChunk1: this.randomCardNumber(),
          CardChunk2: this.randomCardNumber(),
          CardChunk3: this.randomCardNumber(),
          CardChunk4: this.randomCardNumber(),
          cvvNumber: this.randomCVV(),
          expireDate: this.randomDate(new Date(2012, 0, 1), new Date()),
          ifIsFreeze: false,
          ifIsCancel: false,
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

  // Generate 4 digits of 16 digit for card.
  randomCardNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  
  // Random CVV
  randomCVV() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  // Random Card Validity
  randomDate(start: any, end: any) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  removeCard() {
    this.$store.dispatch("cancelCardDetails");
    this.$toasted.show("Card removed sucessfully", {
      type: "success",
      theme: "toasted-primary",
      position: "top-right",
      duration: 3000,
    });
    this.$bvModal.hide("deleteModal");
  }

  resetModal() {
    this.cardHolderName = "";
  }

  cancelCard() {
    this.$bvModal.hide("deleteModal");
  }

  showDeleteModal() {
    this.$bvModal.show("deleteModal");
  }
}
</script>

<style scoped></style>
