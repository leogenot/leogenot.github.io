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
</script>

<template>
  <div class="embla relative h-[50vh]">
    <div class="pointer-events-none absolute inset-0">
      <ElementsCursorLabel :label="data.projects[selectedIndex]?.title ?? 'View project'" />
    </div>
    <div class="embla__viewport h-full" ref="emblaRef">
      <div class="embla__container">
        <div v-for="(project, index) in data.projects" :key="index" class="embla__slide relative">
          {{ project.seo.image }}
          <!-- <CommonImage :media="project.seo.image" :alt="project.title" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
</style>
