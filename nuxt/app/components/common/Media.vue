<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    media?: MediaProps
    fill?: 'h' | 'w' | 'both'

    // image props
    aspect?: number | [number?, number?]
    sizes?: string | [string?, string?]
    loading?: 'lazy' | 'eager' | undefined

    // video props
    controls?: boolean
    loop?: boolean
    autoplay?: boolean
    muted?: boolean
  }>(),
  {
    media: undefined,
    fill: undefined,
    aspect: undefined,
    sizes: undefined,
    loading: undefined,
    controls: false,
    loop: true,
    autoplay: true,
    muted: true,
  },
)
</script>

<template>
  <div v-if="media" class="media">
    <video v-if="media.video" v-bind="{ ...props, ...media.video, sizes: undefined }" />
    <CommonImage v-if="media.image" v-bind="{ ...props, media: media.image }" />
    <div
      v-if="media.svgIcon"
      v-dompurify-html="media.svgIcon"
      class="svg-media-icon"
      :class="{
        'h-full max-h-[inherit] w-auto': fill === 'h',
        'h-auto w-full': fill === 'w',
        'h-full w-full': fill === 'both',
      }"
    />
  </div>
</template>

<style lang="postcss">
.svg-media-icon {
  svg {
    width: inherit;
    height: inherit;
  }
}
</style>
