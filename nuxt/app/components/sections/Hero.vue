<script setup lang="ts">
defineProps<{ data: HeroProps }>()
</script>

<template>
  <div class="h-fit w-full overflow-clip pb-10">
    <h1 class="px-bleed block w-full text-center font-sans text-[calc((100vw-2rem)/5)] font-light">
      {{ data.title }}
    </h1>
    <div class="content grid border-black lg:grid lg:grid-cols-3 lg:border-t lg:border-b">
      <div
        class="text px-bleed text-pl border-black py-5 max-lg:border-b lg:col-start-1 lg:col-end-3 lg:border-r"
      >
        <div class="portable-text-inner lg:max-w-2/3">
          <ElementsPortableTextWrapper v-if="data.text" :content="data.text" />
        </div>
      </div>
      <ul
        class="px-bleed text-ps grid gap-2 py-5 font-medium uppercase lg:col-start-3 lg:col-end-4"
      >
        <li v-for="(link, index) in data.links" :key="index">
          <CommonBasicLink :link="link"
            ><span>[ {{ link.title }} ]</span></CommonBasicLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
