<template>
    <div class="main-page-area">
      <div class="row align-items-center">
        <div class="col-md">
          <p>Available Balance</p>
          <div class="balance-detail">
            <b-badge variant="primary">S$</b-badge>
            <span class="balance-amount">3,000</span>
          </div>
        </div>
        <div class="col-md-auto">
          <b-button variant="secondary" v-b-modal.addNewCard>+ New Card</b-button>
        </div>
      </div>
      <div class="line-tabs">
        <b-tabs content-class="mt-5">
          <b-tab title="My debit cards" active>
            <div class="shadow-sm p-5 mb-5 bg-body rounded">
              <div class="row">
                <div class="col">
                  <!-- Hide Show Numbers -->
                  <p class="text-right">
                    <b-link class="show-link"><i class="fa fa-eye"></i> Show card number</b-link>                    
                  </p>
                  <!-- End Hide Show Numbers -->

                  <!-- Card carousel Start -->
                  <!-- <b-carousel id="carousel-1">
                    <b-carousel-slide
                      v-for="(card, c) in cardDetails"
                      :key="c"
                      class="123"
                      img-blank
                      img-alt="Blank image"
                      img-height="230"
                      img-width="480"
                    >
                      <div class="debit-card">
                        <div class="img-logo">
                          <img src="../assets/images/Visa Logo.svg" alt="" />
                        </div>
                        <div class="card-h-name">{{ card.cardName }}</div>
                        <div class="card-number">
                          <div class="row">
                            <div class="col">
                              <span v-if="isNumber == true">{{
                                card.CardNumber1
                              }}</span>
                              <span v-else>****</span>
                            </div>
                            <div class="col">
                              <span v-if="isNumber == true">{{
                                card.CardNumber2
                              }}</span>
                              <span v-else>****</span>
                            </div>
                            <div class="col">
                              <span v-if="isNumber == true">{{
                                card.CardNumber3
                              }}</span>
                              <span v-else>****</span>
                            </div>
                            <div class="col">
                              <span>1234</span>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col"><small>Thru:12/20</small></div>
                          <div class="col">
                            <small v-if="isNumber == true"
                              >CVV: {{ card.cvvNumber }}</small
                            ><small v-else>CVV: ***</small>
                          </div>
                        </div>
                        <div class="img-logo">
                          <img src="../assets/images/Visa Logo.svg" alt="" />
                        </div>
                      </div>
                    </b-carousel-slide>
                  </b-carousel> -->
                  <!-- End Card carousel -->

                  <!-- Card Action Button Start -->
                  <!-- <div class="custom-icon-box p-3">
                    <div class="row">
                      <div class="col">
                        <div>
                          <img src="../assets/images/Freeze card.svg" alt="" />
                        </div>
                        <div class="title">Freeze Card</div>
                      </div>
                      <div class="col">
                        <div>
                          <img src="../assets/images/Set spend limit.svg" alt="" />
                        </div>
                        <div class="title">Set spent limit</div>
                      </div>
                      <div class="col">
                        <div><img src="../assets/images/GPay.svg" alt="" /></div>
                        <div class="title">Add to Gpay</div>
                      </div>
                      <div class="col">
                        <div>
                          <img src="../assets/images/Replace card.svg" alt="" />
                        </div>
                        <div class="title">Replace card</div>
                      </div>
                      <div class="col" @click="showDeleteModal()">
                        <div>
                          <img src="../assets/images/Deactivate card.svg" alt="" />
                        </div>
                        <div class="title">Cancel Card</div>
                      </div>
                    </div>
                  </div> -->
                  <!-- Card Action Button End -->
                </div>

                <div class="col">
                  <div class="custom-accordion">
                    <!-- Start Card Detail Tab -->
                    <!-- <b-card no-body class="mt-3">
                      <b-card-header header-tag="header" class="p-0" role="tab">
                        <b-button
                          block
                          v-b-toggle.accordion-3
                          class="w-100 text-left"
                          ><img
                            src="../assets/images/Group 11889.svg"
                            class="accordian-icon"
                            alt=""
                          />Card details</b-button
                        >
                      </b-card-header>
                      <b-collapse
                        id="accordion-3"
                        accordion="my-accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <b-card-text></b-card-text>
                        </b-card-body>
                      </b-collapse>
                    </b-card> -->
                    <!-- End  Card Detail Tab -->

                    <!-- Start Transction Tab -->
                    <!-- <b-card no-body class="mt-3">
                      <b-card-header header-tag="header" class="p-0" role="tab">
                        <b-button
                          block
                          v-b-toggle.accordion-1
                          class="w-100 text-left"
                          ><img
                            src="../assets/images/transaction.svg"
                            class="accordian-icon"
                            alt=""
                          />Recent transcations
                        </b-button>
                      </b-card-header>
                      <b-collapse
                        id="accordion-1"
                        visible
                        accordion="my-accordion"
                        role="tabpanel"
                      >
                        <div class="px-3 py-3">
                          <ul class="custom-list-sm">
                            <li
                              v-for="(transcation, t) in recentTransactions"
                              :key="t"
                            >
                              <div class="row">
                                <div class="col-auto">
                                  <div
                                    v-if="transcation.type == 'credit'"
                                    class="list-icon color-one"
                                  >
                                    <img
                                      src="../assets/images/file-storage.svg"
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    v-if="transcation.type == 'debit'"
                                    class="list-icon color-two"
                                  >
                                    <img src="../assets/images/flights.svg" alt="" />
                                  </div>
                                  <div
                                    v-if="transcation.type == 'refund'"
                                    class="list-icon color-three"
                                  >
                                    <img src="../assets/images/megaphone.svg" alt="" />
                                  </div>
                                </div>
                                <div class="col">
                                  <div class="inner-list-content">
                                    <div class="w-100">
                                      <span class="card-data-title">{{
                                        transcation.name
                                      }}</span>
                                    </div>
                                    <div class="w-100">
                                      <span class="date">{{
                                        transcation.transcationDate
                                      }}</span>
                                    </div>
                                    <div class="w-100 mt-2">
                                      <div class="card-info">
                                        <b-badge class="mr-3"
                                          ><img
                                            src="../assets/images/business-and-finance.svg"
                                            alt="" /></b-badge
                                        >{{ transcation.transcationDesc }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-auto digit-box">
                                  <span
                                    class="pr-3"
                                    v-if="transcation.type == 'debit'"
                                    >- S$ {{ transcation.amount }}</span
                                  >
                                  <span class="pr-3 green-color" v-else
                                    >+ S${{ transcation.amount }}</span
                                  >
                                  <img src="../assets/images/next.svg" alt="" />
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </b-collapse>
                    </b-card> -->
                    <!-- End Transction Tab -->
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
          <!-- All Card Second Tab -->
          <b-tab title="All company cards"><p>All Company Cards</p></b-tab>
          <!-- End All Card Tab -->
        </b-tabs>
      </div>
      <!-- Popup for add New Card -->
      <!-- <b-modal
        id="addNewCard"
        ref="modal"
        title="Add New Card"
        @show="resetModal"
        @hidden="resetModal"
        hide-footer
        hide-header-close
      >
        <b-form @submit.prevent="addCard()">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              name="cardName"
              v-model="cardName"
              v-validate="{ required: true }"
            ></b-form-input>
          </b-form-group>
          <span v-show="errors.has('cardName')" class="text-danger m-0"
            >Name is required.</span
          >
          <div class="text-right mt-3">
            <b-button
              variant="outline-primary"
              class="mr-3"
              @click="$bvModal.hide('addNewCard')"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
        </b-form>
      </b-modal> -->
      <!-- End Popup for add New Card -->
      <!-- <b-modal id="deleteModal" title="Delete Card" hide-footer hide-header-close>
      <Confirmationmodel
        @confirm="removeCard()"
        @cancel="cancelCard"
      ></Confirmationmodel>
    </b-modal> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MainContentArea extends Vue {}
</script>

<style scoped></style>
