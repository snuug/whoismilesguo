<template>
  <div>
    <NuxtLayout>
      <ContentDoc />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store/global";
const globalStore = useGlobalStore();

// const layout = "quasar";

onMounted(() => {
  const gError = globalStore.error?.message;
  // console.log(gError);
});
</script>

<style scoped></style>
