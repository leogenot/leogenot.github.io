<script setup lang="ts">
const { data, error, status } = useLazySanityQuery<FrontpageResponse>(getFrontpage)

watch(
  status,
  () => {
    if (status.value === 'error' || (status.value === 'success' && !data.value)) {
      throw createError({
        statusCode: 404,
        stack: error.value?.stack,
        statusMessage: error.value?.message || 'Page Not Found',
        fatal: true,
      })
    }

    if (data.value) {
      useSanitySeo(data.value?.seo)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="bg-black">
    <PageSections v-if="data?.pageSections" :sections="data.pageSections" />
  </div>
</template>
