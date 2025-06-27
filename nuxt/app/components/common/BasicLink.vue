<script lang="ts" setup>
const _props = defineProps<{
  link?: LinkProps
}>()

const target = computed(() =>
  typeof _props.link?.target === 'string'
    ? _props.link?.target
    : _props.link?.target
      ? '_blank'
      : '_self',
)
const route = useRoute()
</script>

<template>
  <NuxtLink
    v-if="link"
    :target="target"
    :href="link?.url || link?.page?.url"
    :aria-label="link?.title"
  >
    <slot />
  </NuxtLink>
</template>
