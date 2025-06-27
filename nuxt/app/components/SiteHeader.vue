<script setup lang="ts"></script>

<template>
  <header
    class="text-ps bg-off-white sticky top-0 left-0 z-1 grid h-16 w-full grid-cols-3 border-b border-black font-sans font-medium uppercase lg:h-18"
  >
    <div class="menu-wrapper flex items-center justify-center border-r border-black">
      <NuxtLink to="#works" class="" aria-label="Works anchor link">Works</NuxtLink>
    </div>
    <div class="menu-wrapper flex items-center justify-center border-r border-black">
      <NuxtLink
        href="https://github.com/leogenot"
        target="_blank"
        class=""
        aria-label="Go to my Github"
        >@leogenot</NuxtLink
      >
    </div>
    <div class="menu-wrapper flex items-center justify-center">
      <NuxtLink href="mailto:leogenot@gmail.com" class="" aria-label="Link to send me an email"
        >let's chat</NuxtLink
      >
    </div>
  </header>
</template>
