<script setup lang="ts">
import type { NuxtError } from '#app'

const route = useRoute()

const _props = defineProps<{ error: NuxtError }>()

if (import.meta.dev) {
  console.log('route', route)
  console.log(_props.error)
}

const handleError = () => clearError({ redirect: '/' })

watch(
  () => route.fullPath,
  () => {
    clearError()
  },
)

useHead({
  title: '404',
  htmlAttrs: { lang: 'en' },
  meta: [
    { property: 'og:title', content: '404' },
    { name: 'description', content: 'Error page' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
})
</script>

<template>
  <div v-if="error" class="flex h-dvh w-full justify-center py-20">
    <div class="flex flex-col items-center gap-6">
      <p class="font-display text-2xl uppercase font-stretch-expanded">
        {{ error.statusCode }}
      </p>
      <button @click="handleError">Go Home</button>
    </div>
  </div>
</template>
