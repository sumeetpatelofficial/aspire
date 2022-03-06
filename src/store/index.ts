import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({ storage: window.localStorage });

export default new Vuex.Store({
  state: {
    transactionHistoryList: [
      {
        transactionName: "Hamleys",
        transactionDate: "20 May 2021",
        transactionDesc: "Refund on debit card",
        transactionAmount: 150,
        cardType: "credit",
        transactionIcon:'file-storage.svg',
        transactionType:'refund',
      },
      {
        transactionName: "Hamleys",
        transactionDate: "20 May 2021",
        transactionDesc: "Charged on debit card",
        transactionAmount: 150,
        cardType: "debit",
        transactionIcon:'flights.svg',
        transactionType:'charged',
      },
      {
        transactionName: "Hamleys",
        transactionDate: "20 May 2021",
        transactionDesc: "Refund on debit card",
        transactionAmount: 150,
        cardType: "debit",
        transactionIcon:'megaphone.svg',
        transactionType:'charged',
      },
      {
        transactionName: "Hamleys",
        transactionDate: "20 May 2021",
        transactionDesc: "Refund on debit card",
        transactionAmount: 150,
        cardType: "credit",
        transactionIcon:'file-storage.svg',
        transactionType:'charged',
      },
    ],
    cardDetails: [],
  },
  getters: {},
  mutations: {
    [types.SET_TRANSACTION_HISTORY_LIST](state, transactionHistoryList) {
      state.transactionHistoryList = transactionHistoryList;
    },
    [types.SET_CARD_DETAILS](state, cardDetails) {
      state.cardDetails = cardDetails;
    },
  },
  actions: {
    changeTransactionHistoryList({ commit }, transactionHistoryList) {
      commit(types.SET_TRANSACTION_HISTORY_LIST, transactionHistoryList);
    },
    setCardDetails({ commit }, cardDetails) {
      commit(types.SET_CARD_DETAILS, cardDetails);
    },
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin],
});
