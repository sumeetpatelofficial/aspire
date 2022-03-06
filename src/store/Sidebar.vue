<template>
  <div>
    <div class="w-100 p-3 text-left">
      <img alt="Aspire" width="120" src="../assets/Logo.svg" />
      <p class="mt-3">
        <small class="dark-txt-sm"
          >Trusted way of banking for 3,000+ SMEs and startups in
          Singapore.</small
        >
      </p>
    </div>
    <div class="px-3 py-2 mt-5">
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#"
          ><img src="../assets/Home.svg" alt="" />Home</b-nav-item
        >
        <b-nav-item href="#" class="active"
          ><img src="../assets/Card.svg" alt="" />Cards</b-nav-item
        >
        <b-nav-item href="#"
          ><img src="../assets/Payments.svg" alt="" />Payments</b-nav-item
        >
        <b-nav-item href="#"
          ><img src="../assets/Credit.svg" alt="" />Credit</b-nav-item
        >
        <b-nav-item href="#"
          ><img src="../assets/Account.svg" alt="" />Settings</b-nav-item
        >
      </b-navbar-nav>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "@/assets/scss/_sidebar.scss";

@Component
export default class Sidebar extends Vue {}
</script>
