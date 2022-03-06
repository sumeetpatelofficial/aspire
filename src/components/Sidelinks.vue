<template>
  <div class="custom-navbar">
    <div class="logo-img">
      <img alt="Aspire" width="120" src="../assets/images/Logo.svg" />
        <span class="intro"
          >Trusted way of banking for 3,000+ SMEs and startups in
          Singapore.</span
        >
    </div>
    <div class="py-md-4 mt-md-4 w-100">
      <nav>
        <b-link href="#"><img :src="$screen.width > 576 ? getImgUrl('Home') : getImgUrl('logo-moible')" alt="" /><span>Home</span></b-link>
        <b-link href="#" class="active"><img src="../assets/images/Card.svg" alt="" /><span>Cards</span></b-link>
        <b-link href="#"><img :src="$screen.width > 576 ? getImgUrl('Payments') : getImgUrl('payments-moible')" alt="" /><span>Payments</span></b-link>
        <b-link href="#"><img :src="$screen.width > 576 ? getImgUrl('Credit') : getImgUrl('credit-moible')" alt="" /><span>Credit</span></b-link>
        <b-link href="#"><img :src="$screen.width > 576 ? getImgUrl('Account') : getImgUrl('account-moible')" alt="" /><span>Settings</span></b-link>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Sidelinks extends Vue {
  // convert image URL
  getImgUrl(pic: any) {
    return require("../assets/images/" + pic+'.svg');
  }
}
</script>
