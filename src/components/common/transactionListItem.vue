<template>
  <div :class="$screen.width > 576 ? 'row' : 'form-row'">
    <div class="col-auto">
      <div class="list-icon" :class="'color' + index">
        <img
          :src="getImgUrl(transaction.transactionIcon)"
          :alt="transaction.transactionDesc"
        />
      </div>
    </div>
    <div class="col">
      <div class="inner-list-content">
        <h5 class="title">
          {{ transaction.transactionName }}
        </h5>
        <span class="date">{{ transaction.transactionDate }}</span>
        <div class="card-info">
          <b-badge
            ><img
              src="../../assets/images/business-and-finance.svg"
              :alt="transaction.transactionDesc" /></b-badge
          ><span>{{ transaction.transactionDesc }}</span>
        </div>
      </div>
    </div>
    <div class="col-auto digit-box">
      <h5
        :class="{
          'text-primary': transaction.transactionType == 'refund',
        }"
      >
        {{ transaction.transactionType == "charged" ? "-" : "+" }}
        S$ {{ transaction.transactionAmount }}
        <i class="fa fa-angle-right"></i>
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class transactionListItem extends Vue {
  @Prop() transaction: any;
  @Prop() index: any;

  // convert image URL
  getImgUrl(pic: any) {
    return require("../../assets/images/" + pic);
  }
}
</script>

<style scoped></style>
