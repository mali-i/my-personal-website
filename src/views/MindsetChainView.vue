<script setup>
import SvgTree from './../components/SvgTree.vue'
import HeatMap from './../components/Heatmap.vue'
</script>

<template>
 <div class="mindset-chain-container">
  <HeatMap />
  <SvgTree />
 </div>
</template>
<style scoped>
.mindset-chain-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>