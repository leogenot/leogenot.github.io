<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug)

const { data, error } = await useSanityQuery<PageProps>(getPage, { slug })

if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

useSanitySeo(data.value?.seo)

if (data.value?.title) {
  route.meta.pageTitle = data.value.title
}
</script>

<template>
  <div class="bg-light-grey h-fit pt-14">
    <!-- <SiteHeader /> -->

    <PageSections v-if="data?.pageSections" :sections="data.pageSections" />
  </div>
</template>
