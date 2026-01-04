<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale } = useI18n()

const { data: projects } = await useAsyncData('projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).all() as Collections['projects_en'][] | Collections['projects_fr'][]
}, {
  watch: [locale],
})
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-4 sm:p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-2xl sm:text-4xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-base sm:text-lg font-extralight italic text-muted mt-2">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-6 sm:mb-8 mt-2" />
    <div class="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project
      />
    </div>
  </section>
</template>
