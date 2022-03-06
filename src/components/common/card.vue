<template>
  <div class="debit-card">
    <div class="card-logo">
      <img :src="aspireLogo" alt="" />
    </div>
    <h3 class="card-holder-name">{{ card.cardHolderName }}</h3>
    <div class="card-number">
      <div class="row">
        <div class="col-auto">
          <span v-if="showNumber">{{ card.CardChunk1 }}</span>
          <span v-else
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
          ></span>
        </div>
        <div class="col-auto">
          <span v-if="showNumber">{{ card.CardChunk3 }}</span>
          <span v-else
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
          ></span>
        </div>
        <div class="col-auto">
          <span v-if="showNumber">{{ card.CardChunk3 }}</span>
          <span v-else
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
          ></span>
        </div>
        <div class="col-auto">
          <span v-if="showNumber">{{ card.CardChunk4 }}</span>
          <span v-else
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
            ><i class="fas fa-circle"></i
          ></span>
        </div>
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
}
</script>

<style scoped></style>
