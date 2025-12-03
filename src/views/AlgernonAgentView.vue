<script setup>
import { computed } from 'vue'
import SvgTree from './../components/SvgTree.vue'
import HeatMap from './../components/Heatmap.vue'
import { useSvgsStore } from '../stores/svgs'

const store = useSvgsStore()
const selectedDate = computed(() => store.selectedDate)
</script>

<template>
 <div class="algernon-agent-container">
  <div class="roadmap-title">My {{ selectedDate }} 's Algernon Agent</div>
  <HeatMap />
  <SvgTree />
 </div>
</template>
<style scoped>
.algernon-agent-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.roadmap-title {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  margin-top:0;
  color: #34495e;
  border-radius: 8px;
}
</style>