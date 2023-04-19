<script setup lang="ts">

const props = defineProps({
    image: { type: String, default: null },
    imageAlt: { type: String, default: 'Hero Image' },
    backgroundPosition: { type: String, default: 'center' },
    aspectRatio: { type: String, default: '16:9' },
})

const $img = useImage()
const backgroundImageStyle = computed(() => {
    if (props.image) {
        const imgUrl = $img(props.image, { quality: 90, format: 'webp' })
        return {
            backgroundImage: `url('${imgUrl}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${props.backgroundPosition}`,
            }
    }
})

// const backgroundImageStyle = computed(() => {
//     if (props.image) {
//         return {
//             backgroundImage: `url(${props.image})`,
//             backgroundSize: 'cover',
//             backgroundPosition: `${props.backgroundPosition}`,
//             backgroundRepeat: 'no-repeat',
//         }
//     }
// })

const aspectRatioStyle = computed(() => {
    const [width, height] = props.aspectRatio.split(':')
    return {
        paddingTop: `${(height / width) * 60}%`,
    }
})
</script>

<template>
    <section class="hero q-mb-md container justify-center" :style="[backgroundImageStyle, aspectRatioStyle]">
        <div class="layout">
            <div class="content1">
                <div class="title">
                    <ContentSlot :use="$slots.title" unwrap="p">
                        Hero title
                    </ContentSlot>
                </div>
                <div class="description">
                    <ContentSlot :use="$slots.description" unwrap="p">
                        Hero description
                    </ContentSlot>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.hero .layout{
    /* position: relative; */
    display: flex;
    flex-direction: column;
    /* grid-template-columns: repeat(1, minmax(0, 1fr)); */
    background: rgba(0, 0, 0, 0.5);
    color: white;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    /* gap: 1rem; */
}
.hero .layout .title {
    padding-top: 1rem;
    font-size: 2.25rem;
    line-height: 2.75rem;
    font-weight: 600;
}
.hero .layout .description {
    margin-top: 1rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
}

</style>