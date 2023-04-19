<script setup lang="ts">
const props = defineProps({
  songUrl: { type: String, required: true },
  songText: { type: String, required: false, default: 'Play' },
})
const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const play = () => {
  if (audio.value) {
    audio.value.play()
    isPlaying.value = true
  }
}

const pause = () => {
  if (audio.value) {
    audio.value.pause()
    isPlaying.value = false
  }
}

const togglePlay = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

onMounted(() => {
  audio.value = new Audio(props.songUrl)
})

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
})
</script>

<template>
  <div class="music-player">
    <button @click="togglePlay">
      <span v-if="!isPlaying">▶️ {{songText}}</span>
      <span v-else>⏸️ Pause</span>
    </button>
  </div>
</template>

<style scoped>
.music-player {
  display: flex;
  /* justify-content: center;
  align-items: center; */
  margin-top: 1rem;
}

.music-player button {
  background: transparent;
  border: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}
</style>
