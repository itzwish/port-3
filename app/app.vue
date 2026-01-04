<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const isInitialLoading = ref(true)
const { isLoading: isHeavyOperationLoading } = usePageLoader()

// Show initial loading screen
onMounted(() => {
  const timer = setTimeout(() => {
    isInitialLoading.value = false
  }, 500)

  onBeforeUnmount(() => clearTimeout(timer))
})
</script>

<template>
  <ClickSpark
    spark-color="#5AFE73"
    :spark-size="10"
    :spark-radius="15"
    :spark-count="8"
    :duration="400"
    easing="ease-out"
    class="w-screen"
  >
    <Html
      :lang="locale"
      class="font-geist text-[var(--ui-text)] transition-colors duration-300 selection:bg-[#5333EC]/60 selection:text-[#5AFE73] select-none h-full"
    >
      <Body class="select-none w-full">
        <LoadingScreen :is-visible="isInitialLoading" />
        <HeavyOperationLoader :is-visible="isHeavyOperationLoading" />
        <LayoutScrollToTop />
        <NuxtLayout>
          <UApp :locale="locales[locale]">
            <NuxtPage />
          </UApp>
        </NuxtLayout>
        <Toaster close-button />
        <DotPattern class="absolute inset-0 -z-10 size-full fill-[#5333EC]/20 [mask-image:radial-gradient(white,transparent_85%)]" />
      </Body>
    </Html>
  </ClickSpark>
</template>
