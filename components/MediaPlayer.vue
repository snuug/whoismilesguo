<template>
    <div>
        <audio ref="audio" />
        <q-dialog v-model="show" seamless position="bottom">
            <q-card style="width: 350px">
                <q-linear-progress :value="currentTime/duration" size="10px" color="accent" />
                <q-card-section class="row items-center no-wrap bg-secondary">
                    <div>
                        <div class="text-weight-bold">Background Music</div>
                        <div class="text-grey-3">Play for full experience</div>
                    </div>
                    <q-space />
                    <q-btn flat round @click="playing = !playing">
                        <q-icon v-if="!playing" name="play_arrow" />
                        <q-icon v-else name="pause" />
                    </q-btn>
                    <q-btn flat round icon="close" @click="show = false" />
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-page-sticky position="bottom" :offset="[10, 10]">
            <q-btn id="musicIcon" v-if="!show" fab-mini class="bg-secondary" icon="music_note" @click="show = true" />
        </q-page-sticky>
    </div>
</template>

<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'
const props = defineProps({
    mediaSrc: { type: String, required: true, default: '/music/bgMusic01.mp3' },
    mediaCtl: { type: String, required: false, default: 'Play' },
})
const show = ref(true)
const audio = ref()
const { playing, currentTime, duration, volume } = useMediaControls(audio, {
    src: props.mediaSrc,
})

// Change initial media properties
onMounted(() => {
    volume.value = 0.5
    currentTime.value = 0

})
</script>
<style scoped>
#musicIcon {
  position: relative;
  animation: mymove 1s infinite;
  /* animation-iteration-count: 2; */
}

@keyframes mymove {
  from {top: 0px;}
  to {top: 2px;}
}
</style>