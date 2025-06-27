<script setup lang="ts">
const props = defineProps<{
  sections: PageSection[]
}>()
</script>

<template>
  <section
    v-for="({ _type, data, id }, index) in sections || []"
    :id="'section-' + id"
    :key="index"
    :data-type="_type"
  >
    <SectionsHero v-if="_type === 'Hero'" :data="data || {}" />
  </section>
</template>
