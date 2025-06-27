<script lang="ts" setup>
import { useMouseInElement } from '@vueuse/core'

type Props = {
  label: string
  hideTag?: boolean
}

defineProps<Props>()

const container = ref(null)

const { elementX, elementY, isOutside } = useMouseInElement(container)

const x = computed(() => elementX.value)
const y = computed(() => elementY.value)
const isInside = computed(() => !isOutside.value)
</script>

<template>
  <div
    ref="container"
    class="e-cursor-label pointer-events-none absolute inset-0 z-1 hidden h-full w-full overflow-hidden lg:flex"
  >
    <transition mode="out-in" name="fade">
      <span
        v-if="isInside && !hideTag"
        class="bg-grey/20 absolute -top-2 left-4 flex items-center px-2 py-2 text-xs font-light text-black uppercase backdrop-blur-xs"
        :style="{
          transform: `translate(${x}px, ${y}px)`,
        }"
      >
        [ {{ label }} ]
      </span>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
