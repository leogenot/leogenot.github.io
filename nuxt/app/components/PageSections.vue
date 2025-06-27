<script setup lang="ts">
defineProps<{
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
    <SectionsFeaturedProjects v-else-if="_type === 'FeaturedProjects'" :data="data || {}" />
  </section>
</template>
