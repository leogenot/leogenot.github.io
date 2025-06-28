<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

const props = defineProps<{ data: FeaturedProjectsProps }>()

const options: any = { loop: true }
const [emblaRef, emblaApi] = emblaCarouselVue(options, [Autoplay(), WheelGesturesPlugin()])

const selectedIndex = ref(0)

function updateSelectedIndex() {
  const index = emblaApi.value?.selectedScrollSnap()
  if (typeof index === 'number') {
    selectedIndex.value = index
  }
}

onMounted(() => {
  emblaApi.value?.on('select', updateSelectedIndex)
  updateSelectedIndex()
})

watchEffect(() => {
  if (emblaApi.value) updateSelectedIndex()
})

function scrollNext() {
  emblaApi.value?.scrollNext()
}

function scrollPrev() {
  emblaApi.value?.scrollPrev()
}

const currentImagePaletteDominantColor = computed(() => {
  console.log(
    props.data.projects[selectedIndex.value]?.featuredMedia?.image?.palette?.dominant?.foreground,
  )
  return props.data.projects[selectedIndex.value]?.featuredMedia?.image?.palette?.dominant
    ?.foreground
})
</script>

<template>
  <div class="embla relative">
    <div class="pointer-events-none absolute inset-0">
      <ElementsCursorLabel
        :label="data.projects[selectedIndex]?.title ?? 'View project'"
        :label-color="currentImagePaletteDominantColor"
      />
    </div>
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div
          v-for="(project, index) in data.projects"
          :key="index"
          class="embla__slide relative aspect-[4/5] lg:aspect-video"
        >
          <CommonMedia
            :sizes="'80vw'"
            :media="project.featuredMedia"
            fill="both"
            class="absolute top-0 left-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.embla {
  --slide-size: 100%;
}
.embla__container {
  display: flex;
  touch-action: pan-y pinch-zoom;
}
.embla__slide {
  transform: translate3d(0, 0, 0);
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
}
</style>
