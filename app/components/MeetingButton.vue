<script setup lang="ts">
const instagramLink = useAppConfig().socials.instagram
</script>

<template>
  <div class="flex gap-4 sm:gap-2">
    <SpotlightButton>
      <NuxtLink
        class="font-mona relative flex items-center justify-center gap-2 bg-gradient-to-b from-[#5AFE73]/25 to-[#5AFE73] bg-clip-text text-lg font-medium text-transparent transition-all duration-200"
        :to="instagramLink"
        target="_blank"
      >
        Instagram
        <UIcon
          name="simple-icons:instagram"
          class="size-5 text-[#5AFE73]/80"
        />
      </NuxtLink>
    </SpotlightButton>
  </div>
</template>
