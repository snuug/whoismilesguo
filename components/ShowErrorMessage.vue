<template>
    <div>
        <span class="error-message" v-if="globalStore.error?.show">{{ globalStore.error?.message }}</span>
    </div>
</template>

<script setup>
import { useGlobalStore } from "@/store/global";
const globalStore = useGlobalStore();
</script>

<style scoped>
.error-message {
  color: wheat;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
  background-color: brown;
  padding: 4px;
  border-radius: 10px;
}
</style>