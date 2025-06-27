<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <header
    :class="{
      page: route.name === 'page-slug',
    }"
    class="px-bleed fixed top-0 left-0 z-99 flex h-14 w-full items-center justify-between font-mono text-xs uppercase select-none"
  >
    <div
      class="breadcrumbs ease-in-out-quint relative inline-flex h-full gap-2 py-2 transition-transform duration-1000"
      :class="{ 'max-lg:translate-x-[calc(50vw-50%-12px)]': route.name !== 'page-slug' }"
    >
      <NuxtLink to="/" class="flex h-full w-auto items-center" aria-label="Home"> Home </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.safari-blur:before {
  -webkit-backdrop-filter: blur(16px);
}
</style>
