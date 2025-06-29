<script setup lang="ts">
const verticalBorderRefs = useTemplateRef<HTMLDivElement>('verticalBorders')
const horizontalBorder = ref<HTMLDivElement | null>(null)
</script>

<template>
  <header
    class="text-ps bg-off-white sticky top-0 left-0 z-1 grid h-16 w-full grid-cols-3 font-sans font-medium uppercase lg:h-18"
  >
    <div class="menu-wrapper relative flex items-center justify-center">
      <div ref="verticalBorders" class="absolute top-0 right-0 h-full w-[1px] bg-black" />
      <NuxtLink to="#works" class="" aria-label="Works anchor link">Works</NuxtLink>
    </div>
    <div class="menu-wrapper relative flex items-center justify-center">
      <div ref="verticalBorders" class="absolute top-0 right-0 h-full w-[1px] bg-black" />
      <NuxtLink
        href="https://github.com/leogenot"
        target="_blank"
        class=""
        aria-label="Go to my Github"
        >@leogenot</NuxtLink
      >
    </div>
    <div class="menu-wrapper flex items-center justify-center">
      <NuxtLink href="mailto:leogenot@gmail.com" class="" aria-label="Link to send me an email"
        >let's chat</NuxtLink
      >
    </div>
    <div ref="horizontalBorder" class="absolute bottom-0 left-0 h-[1px] w-full bg-black" />
  </header>
</template>
