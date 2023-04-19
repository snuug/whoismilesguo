<template>
    <div class="row justify-center">
        <q-img
        v-if="props.src !== null"
        :src="imgUrl"
        loading="lazy"
        class="q-mt-md rounded-borders"
        style="width: 90%"
        fit="cover"
        >
        <template v-slot:loading>
          <div class="text-subtitle1 text-dark">
            Loading...
          </div>
        </template>
        </q-img>
    </div>
</template>

<script setup lang="ts">
const $img = useImage()
const props = defineProps({
    src: { type: String, default: '' },
    alt: { type: String, default: 'Image' },
    quality: { type: String, default: '90' },
    format: { type: String, default: 'webp' },
})
const imgUrl = $img(props.src, { quality: props.quality, format: props.format })
</script>