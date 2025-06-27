<template>
  <picture
    v-if="media"
    :style="aspectCSS"
    :class="[
      fill === 'h' ? 'h-full max-h-[inherit] w-auto' : '',
      fill === 'w' ? 'h-auto w-full' : '',
      fill === 'both' ? 'h-full w-full' : '',
    ]"
    class="select-none"
    :alt="media.altText"
  >
    <source :srcset="srcsetAttribute.srcset" :sizes="srcsetAttribute.sizes" />

    <NuxtImg
      :modifiers="{
        auto: 'format',
        crop: media.crop,
        hotspot: media.hotspot,
        dpr: 1,
        fm: 'webp',
        q: 70,
      }"
      provider="sanity"
      :src="media?.asset?._ref"
      :alt="media.altText || 'An image'"
      class="object-cover"
      :class="[
        aspect ? `aspect-(--aspect-mobile) lg:aspect-(--aspect-desktop)` : '',
        fill === 'h' ? 'h-full max-h-[inherit] w-auto' : '',
        fill === 'w' ? 'h-auto w-full' : '',
        fill === 'both' ? 'h-full w-full' : '',
      ]"
      :loading="loading || 'lazy'"
      :width="croppedSizes.width"
      :height="croppedSizes.height"
      :style="objectPosition"
      @load="emit('loaded')"
    />
  </picture>
</template>

<script setup lang="ts">
const props = defineProps<{
  media: ImageProps

  // :aspect="16/9" -> all screens
  // :aspect="[3/4, 16/9]" -> [mobile, desktop]
  aspect?: number | [number?, number?]

  // :sizes="'100vw'" -> all screens
  // :sizes="['100vw', '50vw']" -> [mobile, desktop]
  sizes?: string | [string?, string?]

  loading?: 'lazy' | 'eager' | undefined

  // makes image fill its container
  fill?: 'h' | 'w' | 'both'
}>()

const cSizes = computed(() => {
  if (!props.sizes) {
    return { mobile: '100vw', desktop: '100vw' }
  }

  if (typeof props.sizes === 'string') {
    return {
      mobile: props.sizes,
      desktop: props.sizes,
    }
  }

  return {
    mobile: props.sizes[0],
    desktop: props.sizes[1],
  }
})

const aspectCSS = computed(() => {
  if (!props.aspect) return

  if (typeof props.aspect === 'number') {
    return {
      '--aspect-mobile': `${props.aspect}/1`,
      '--aspect-desktop': `${props.aspect}/1`,
    }
  }

  return {
    '--aspect-mobile': `${props.aspect[0] ? props.aspect[0] : Math.round((props.media?.width / props.media?.height) * 10) / 10}`,
    '--aspect-desktop': `${props.aspect[1]}/1`,
  }
})

// TODO: this doesn't account for the crop..
const objectPosition = computed(() => {
  if (!props.media.hotspot) return {}

  return {
    'object-position': `${props.media.hotspot?.x * 100}% ${props.media.hotspot?.y * 100}%`,
  }
})

const img = useImage()

const srcsetAttribute = computed(() => {
  return img.getSizes(props.media.asset._ref, {
    provider: 'sanity',
    modifiers: {
      auto: 'format',
      crop: props.media.crop,
      hotspot: props.media.hotspot,
      dpr: 1,
      fm: 'webp',
      q: 70,
    },
    sizes: {
      xs: cSizes.value.mobile,
      sm: cSizes.value.mobile,
      md: cSizes.value.mobile,
      lg: cSizes.value.desktop,
      xl: cSizes.value.desktop,
      xxl: cSizes.value.desktop,
      '2xl': cSizes.value.desktop,
    },
  })
})

const croppedSizes = computed(() => {
  // Calculates image width after applying left/right cropping
  const originalWidth = props.media?.width ?? 0
  const cropLeft = props.media?.crop?.left ?? 0
  const cropRight = props.media?.crop?.right ?? 0
  const width = originalWidth - cropLeft * originalWidth - cropRight * originalWidth

  // Calculates image height after applying top/bottom cropping
  const originalHeight = props.media?.height ?? 0
  const cropTop = props.media?.crop?.top ?? 0
  const cropBottom = props.media?.crop?.bottom ?? 0
  const height = originalHeight - cropTop * originalHeight - cropBottom * originalHeight

  return {
    width,
    height,
  }
})

const emit = defineEmits(['loaded'])
</script>
