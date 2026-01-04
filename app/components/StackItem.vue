<script setup lang="ts">
interface StackItem {
  name: string
  icon: string
  link: string
}

defineProps<{
  item: StackItem
}>()
</script>

<template>
  <label class="text-gray-400 cursor-pointer">
    <input type="checkbox" class="hidden peer" />
    <NuxtLink
      :to="item.link"
      target="_blank"
      :aria-label="item.name + ' link'"
    >
      <div
        class="group flex flex-col gap-4 w-32 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 shadow-xl border-2 border-transparent transition-all duration-300 ease-in-out hover:border-indigo-500 hover:shadow-indigo-500/20 peer-checked:border-indigo-500 peer-checked:from-indigo-900/50 peer-checked:to-gray-900 peer-checked:translate-y-[-0.5rem]"
      >
        <div class="relative">
          <div
            class="w-12 h-12 mx-auto bg-indigo-500/20 rounded-lg border-2 border-indigo-500/40 group-hover:border-indigo-400 group-hover:bg-indigo-500/30 peer-checked:border-indigo-400 peer-checked:bg-indigo-500/30 transition-all duration-300 flex items-center justify-center"
          >
            <UIcon
              :name="item.icon"
              class="w-8 h-8 text-white"
              :font-controlled="false"
              :alt="item.name + ' logo'"
              :aria-label="item.name + ' logo'"
            />
          </div>

          <div
            class="absolute top-0 right-6 w-3 h-3 rounded-full bg-gray-600 group-hover:bg-indigo-400 group-hover:animate-pulse peer-checked:bg-indigo-400 peer-checked:animate-pulse transition-all duration-300"
          />
        </div>

        <div class="text-center">
          <p
            class="font-medium text-sm group-hover:text-indigo-400 peer-checked:text-indigo-400 transition-colors duration-300"
          >
            {{ item.name }}
          </p>
          <p
            class="text-xs mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          >
            Tool
          </p>
        </div>

        <div
          class="h-1 w-0 bg-indigo-500 rounded-full mx-auto group-hover:w-full peer-checked:w-full transition-all duration-300"
        />
      </div>
    </NuxtLink>
  </label>
</template>

<style scoped>
.peer:checked ~ a > div {
  border-color: rgb(99 102 241);
  background: linear-gradient(to bottom, rgba(49, 46, 129, 0.5), rgb(17 24 39));
  transform: translateY(-0.5rem);
}
</style>
