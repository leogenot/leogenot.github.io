<script setup lang="ts">
const props = defineProps<{ data: FeaturedProjectsProps }>()
</script>

<template>
  <section class="h-fit w-full overflow-clip pb-10">
    <h1 class="px-bleed block w-full text-center font-sans text-[calc((100vw-2rem)/5)] font-light">
      {{ data.title }}
    </h1>
  </section>
</template>
