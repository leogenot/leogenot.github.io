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
  <div class="embla relative" :style="{ '--current-color': currentImagePaletteDominantColor }">
    <div
      class="px-bleed text-off-white absolute right-0 bottom-0 z-[1] flex h-16 w-full items-center justify-between font-medium uppercase backdrop-blur-lg lg:hidden"
    >
      <div class="absolute top-0 left-0 h-[1px] w-full bg-black" />
      <span class="current-project-title transform-right">
        [ {{ data.projects[selectedIndex]?.title ?? 'View project' }} ]
      </span>
      <NuxtLink :to="data.projects[selectedIndex]?.slug" class="current-project-link">
        <IconsArrowExternal />
      </NuxtLink>
    </div>
    <div class="pointer-events-none absolute inset-0">
      <ElementsCursorLabel
        :label="data.projects[selectedIndex]?.title ?? 'View project'"
        :label-color="currentImagePaletteDominantColor"
      />
    </div>
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container relative">
        <NuxtLink
          v-for="(project, index) in data.projects"
          :key="index"
          :to="project.slug"
          class="embla__slide relative aspect-[4/5] w-full lg:max-h-[80vh]"
        >
          <CommonMedia
            :sizes="'80vw'"
            :media="project.featuredMedia"
            fill="both"
            class="absolute top-0 left-0 size-full object-cover"
          />
        </NuxtLink>
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
