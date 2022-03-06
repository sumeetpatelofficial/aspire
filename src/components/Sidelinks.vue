<template>
  <div class="custom-navbar">
    <div class="logo-img">
      <img alt="Aspire" width="120" src="../assets/images/Logo.svg" />
        <small class="intro"
          >Trusted way of banking for 3,000+ SMEs and startups in
          Singapore.</small
        >
    </div>
    <div class="py-md-4 mt-md-4 w-100">
      <nav>
        <b-link href="#"><img src="../assets/images/Home.svg" alt="" /><span>Home</span></b-link>
        <b-link href="#" class="active"><img src="../assets/images/Card.svg" alt="" /><span>Cards</span></b-link>
        <b-link href="#"><img src="../assets/images/Payments.svg" alt="" /><span>Payments</span></b-link>
        <b-link href="#"><img src="../assets/images/Credit.svg" alt="" /><span>Credit</span></b-link>
        <b-link href="#"><img src="../assets/images/Account.svg" alt="" /><span>Settings</span></b-link>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Sidelinks extends Vue {}
</script>
