import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({storage: window.localStorage, key:'aspire'});

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
    cardDetails: <any>[],
  },
  getters: {},
  mutations: {    
    [types.SET_TRANSACTION_HISTORY_LIST](state, transactionHistoryList) {
      state.transactionHistoryList = transactionHistoryList;
    },
    [types.SET_CARD_DETAILS](state, cardDetails) {
      state.cardDetails.push(cardDetails);
    },
    [types.REMOVE_CARD_DETAILS](state, index) {
      state.cardDetails.splice(index,1);
    },
    [types.FREEZE_CARD](state, index) {
      const isFreeze = state.cardDetails[index].ifIsFreeze;
      Vue.set(state.cardDetails[index], "ifIsFreeze", !isFreeze)
    },
  },
  actions: {
    changeTransactionHistoryList({ commit }, transactionHistoryList) {
      commit(types.SET_TRANSACTION_HISTORY_LIST, transactionHistoryList);
    },
    addCardDetails({ commit }, cardDetails) {
      commit(types.SET_CARD_DETAILS, cardDetails);
    },
    cancelCardDetails({ commit }, index) {      
      commit(types.REMOVE_CARD_DETAILS, index);
    },
    freezeCard({ commit }, index) {
      commit(types.FREEZE_CARD, index);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
