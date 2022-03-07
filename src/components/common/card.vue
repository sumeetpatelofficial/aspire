<template>
  <div class="debit-card" :class="{'bg-blue':card.ifIsFreeze}">
    <div class="card-logo">
      <img :src="aspireLogo" alt="" />
    </div>
    <h3 class="card-holder-name">{{ card.cardHolderName }}</h3>
    <div class="card-number">
      <div :class="$screen.width > 576 ? 'row':'form-row'">
        <div class="col-auto">
          <span v-if="showNumber" v-html="card.cardNumber"></span>
          <span v-else v-html="relacedValue"></span>
        </div>
        <!-- <i class="fas fa-circle"></i> -->
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span class="validity">Thru:12/20</span>
      </div>
      <div class="col">
        <span class="cvv" v-if="showNumber">CVV : {{ card.cvvNumber }}</span>
        <span class="cvv" v-else
          >CVV : <i class="fas fa-star-of-life mr-2"></i
          ><i class="fas fa-star-of-life mr-2"></i
          ><i class="fas fa-star-of-life"></i
        ></span>
      </div>
    </div>
    <div class="card-provider-logo pb-0">
      <img :src="visaLogo" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class card extends Vue {
    @Prop() card:any;
    @Prop({type:Boolean}) showNumber:any;    

    aspireLogo:any=require("@/assets/images/LogoWhite.svg");
    visaLogo:any=require("@/assets/images/Visa Logo.svg");

    get relacedValue(){      
      let newValue = this.card.cardNumber.replace(/\d{4}(?= \d{1})/g, '<i class="fas fa-circle dot"></i><i class="fas fa-circle dot"></i><i class="fas fa-circle dot"></i><i class="fas fa-circle dot"></i>')
      return newValue;
    }
}
</script>

<style scoped></style>
