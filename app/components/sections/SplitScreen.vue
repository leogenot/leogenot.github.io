<script setup lang="ts">
defineProps<{ data: SplitScreenProps }>()
</script>

<template>
  <div
    class="grid lg:min-h-screen lg:grid-cols-12"
    :class="{
      'bg-(--color-surface)': data.leftMedia,
    }"
  >
    <div
      class="media h-full w-full overflow-clip bg-red-500"
      :class="{
        'order-1 lg:order-0 lg:col-start-1 lg:col-end-5': data.leftMedia,
        'order-1 lg:order-1 lg:col-start-9 lg:col-end-13': !data.leftMedia,
      }"
    >
      <NuxtImg
        v-if="data.media?.type === 'image'"
        :src="data.media.src"
        sizes="100vw sm:70vw"
        format="webp"
        :alt="data.media.src || 'Image alt'"
        class="h-full w-full object-cover object-center"
      />
    </div>
    <div
      class="content px-bleed flex h-full w-full flex-col justify-between gap-9 py-12 lg:py-24 xl:py-32"
      :class="{
        'order-0 lg:order-1 lg:col-start-5 lg:col-end-12': data.leftMedia,
        'order-0 lg:order-0 lg:col-start-1 lg:col-end-8': !data.leftMedia,
      }"
    >
      <div class="heading">
        <h2
          v-if="data.title"
          class="text-heading-h2 lg:text-heading-h1 xl:text-heading-small font-display"
        >
          {{ data.title }}
        </h2>
        <p
          v-if="data.text"
          class="text-text-medium lg:text-heading-alt-h5 xl:text-heading-alt-h4 font-sans"
        >
          {{ data.text }}
        </p>
      </div>
      <div class="infos flex flex-col gap-2 lg:gap-8">
        <span v-if="data.projectType" class="text-text-meta font-mono text-(--color-muted)"
          >({{ data.projectType }})</span
        >
        <div class="more-infos flex items-end justify-between">
          <ul v-if="data.techStack" class="text-text-medium xl:text-heading-alt-h5 font-mono">
            <li v-for="(item, index) in data.techStack" :key="index">{{ item.title }}</li>
          </ul>
          <NuxtLink
            v-if="data.link"
            :href="data.link"
            target="_blank"
            :aria-label="`Link to ${data.link}`"
            class="text-text-medium xl:text-heading-alt-h5 font-mono"
            >{{ data.linkLabel }}</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
