<template>
  <div>
    <Sidelinks />
    <MainContentArea />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidelinks from "@/components/Sidelinks.vue";
import MainContentArea from "@/components/MainContentArea.vue";

@Component({
  components: {
    Sidelinks,
    MainContentArea
  },
})
export default class HomeView extends Vue {}
</script>
