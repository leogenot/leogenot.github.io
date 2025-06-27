<script setup lang="ts">
import { h } from 'vue'
import { PortableText, type _PortableTextComponent } from '@portabletext/vue'
import { NuxtLink } from '#components'
type Props = {
  classes?: string
  content: unknown
  animate?: boolean
}

defineProps<Props>()

const serializers = {
  listItem: {
    bullet: (_: unknown, { slots }: unknown) => h('li', { class: 'pl-base' }, slots.default?.()),
    number: (_: unknown, { slots }: unknown) => h('li', { class: 'pl-base' }, slots.default?.()),
    checkmarks: (_: unknown, { slots }: unknown) => h('li', ['✅', ...(slots.default?.() || [])]),
  },
  marks: {
    internalLink: ({ value }, { slots }) => h(NuxtLink, { to: value.url }, slots.default?.()),
    externalLink: ({ value }, { slots }) =>
      h(
        'a',
        {
          href: value.url,
          target: '_blank',
          title: value.title || value.url,
          rel: 'noindex nofollow',
        },
        slots.default?.(),
      ),
  },
}
</script>

<template>
  <div class="e-portable-text rte">
    <PortableText v-if="content" :value="content" :components="serializers" />
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.rte :deep(blockquote) {
  @apply my-6 text-xl italic lg:my-10 lg:text-2xl;
}
.rte :deep(strong) {
  @apply font-sans font-normal uppercase;
}

.rte :deep(> ul) {
  @apply list-[square];
}

.rte :deep(.e-button) {
  @apply mt-7;
}
.rte :deep(a:not(.e-button)) {
  @apply underline;
}

.rte :deep(> ul),
.rte :deep(> ol) {
  @apply mt-4 ml-4;
}
</style>
