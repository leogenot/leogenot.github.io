<script setup lang="ts">
const props = defineProps<{ data: HeroProps }>()
</script>

<template>
  <section class="px-bleed h-fit w-full overflow-clip pb-10">
    <h1
      class="font-display max-w-[12.5em] pt-11 text-3xl uppercase font-stretch-expanded lg:pt-16 lg:text-6xl"
      v-html="data.title"
    ></h1>

    <!-- <CommonMedia
      :sizes="['80vw', '66vw']"
      class="mt-10 h-auto w-full"
      :media="data.media"
      :aspect="[4 / 5, 16 / 9]"
      :fill="'both'"
      :loading="'eager'"
    /> -->
  </section>
</template>
