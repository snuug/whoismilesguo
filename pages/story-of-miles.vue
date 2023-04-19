<template>
  <div>
    <NuxtLayout>
      <ContentDoc />
      <MediaPlayer mediaSrc="/music/bgMusic01.mp3" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// import { useGlobalStore } from "@/store/global";
// const globalStore = useGlobalStore();

const dialogShow = ref(true)
</script>

<style lang="scss" scoped></style>
