<template>
  <div class="confirm-modal">
      <div class="delete">
          <i class="fas fa-trash"></i>
      </div>
      <h4>Are you sure?</h4>
      <h6>You want to delete saved card</h6>
      <p class="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, eligendi! Autem ad ullam ipsa laudantium itaque recusandae laboriosam.</p>
      <div class="action mt-4">
        <b-button variant="secondary" class="mr-3" @click="cancel()"
          >Cancel</b-button
        >
        <b-button variant="danger" @click="confirm()">Yes, delete</b-button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ConfirmModal extends Vue {
  //emitting confirm event
  confirm() {
    this.$emit("confirm");
  }

  //emitting cancel event
  cancel() {
    this.$emit("cancel");
  }
}
</script>

<style scoped>   
</style>
