<script setup lang="ts">
defineProps<{ data: HeroProps }>()
const borderRefs = useTemplateRef<HTMLDivElement>('borders')

// ------- GSAP ANIMATION -------
const { $SplitText, $gsap } = useNuxtApp()
const titleTarget = ref<HTMLElement | null>(null)
const textTarget = ref<HTMLElement | null>(null)

let scrollTriggers: gsap.core.ScrollTrigger[] = []
let splitInstances: SplitText[] = []

function animateSplitText(
  target: HTMLElement,
  options: {
    type?: string
    linesClass?: string
    yPercent?: number
    stagger?: number
  } = {},
) {
  const instance = $SplitText.create(target, {
    type: options.type || 'words,lines',
    linesClass: options.linesClass || 'line',
    mask: 'lines',
    autoSplit: true,
  })

  splitInstances.push(instance)

  $gsap.set(target, { opacity: 1 })

  const tween = $gsap.fromTo(
    instance.words,
    { yPercent: options.yPercent ?? 100 },
    {
      yPercent: 0,
      ease: 'power2.out',
      stagger: options.stagger ?? 0.15,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: `top 90%`,
        end: `bottom top`,
        toggleActions: 'play reverse play reverse',
        // markers: true,
      },
    },
  )

  scrollTriggers.push(tween.scrollTrigger!)
}

onMounted(() => {
  if (import.meta.server) return
  if (titleTarget.value) {
    animateSplitText(titleTarget.value, {
      type: 'words,lines',
      linesClass: 'line',
      yPercent: -100,
      stagger: 0.15,
    })
  }
  if (textTarget.value) {
    animateSplitText(textTarget.value, {
      type: 'words,lines',
      linesClass: 'line',
      yPercent: -100,
      stagger: 0.15,
    })
  }
})

onBeforeUnmount(() => {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  splitInstances.forEach((inst) => inst.revert?.())
  splitInstances = []
})
</script>

<template>
  <div class="h-fit w-full overflow-clip">
    <h1
      v-if="data.title"
      ref="titleContainer"
      class="px-bleed split-container block w-full overflow-clip text-center font-sans text-[calc((100vw-2rem)/5)] font-light"
    >
      <span ref="titleTarget" class="split">{{ data.title }}</span>
    </h1>
    <div class="content grid border-black lg:grid lg:grid-cols-3 lg:border-t lg:border-b">
      <div class="text px-bleed text-pl py-5 lg:col-start-1 lg:col-end-3">
        <div
          ref="borders"
          class="absolute right-0 h-[1px] w-full bg-black max-lg:bottom-0 lg:top-0 lg:h-full lg:w-[1px]"
        />
        <div class="portable-text-inner lg:max-w-2/3">
          <ElementsPortableTextWrapper v-if="data.text" :content="data.text" />
        </div>
      </div>
      <ul
        class="px-bleed text-ps grid gap-2 py-5 font-medium uppercase lg:col-start-3 lg:col-end-4"
      >
        <li v-for="(link, index) in data.links" :key="index">
          <CommonBasicLink :link="link"
            ><span>[ {{ link.title }} ]</span></CommonBasicLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.split {
  opacity: 0;
  will-change: transform;
}

.split * {
  will-change: transform;
}
</style>
