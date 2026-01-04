<script setup lang="ts">
const stack = await queryCollection('stack').first()
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-4 sm:p-7 sm:mt-20 text-[#CDCDCD]">
    <h1 class="font-newsreader italic bg-gradient-to-r from-[#32D3D8] via-[#5333EC] to-[#5AFE73] bg-clip-text text-transparent text-center text-2xl sm:text-4xl drop-shadow-[0_0_15px_rgba(83,51,236,0.5)]">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-base sm:text-lg font-extralight italic text-[#CDCDCD] mt-2">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-6 sm:mb-8 mt-2" />
    <div class="flex flex-col gap-4 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
      <AboutProfilePicture />
      <div class="relative flex flex-col gap-3 sm:ml-4">
        <h3 class="text-base sm:text-lg">
          Intro
        </h3>
        <div class="flex flex-col gap-4 text-primary text-sm sm:text-base">
          <slot
            name="intro"
            mdc-unwrap="p"
          />
        </div>
        <AboutSignature class="absolute -bottom-24 right-0 hidden w-40 sm:block" />
        <AboutSignature class="black absolute -bottom-20 -right-2 w-28 sm:hidden" />
      </div>
    </div>
    <Divider class="my-6 sm:my-8" />
    <slot
      name="experiences"
      mdc-unwrap="p"
    />
    <Divider class="my-6 sm:my-8" />
    <div class="flex flex-col gap-3">
      <div class="mb-4 sm:mb-6 flex flex-col gap-1">
        <h3 class="bg-gradient-to-r from-[#5AFE73] to-[#32D3D8] bg-clip-text text-transparent font-newsreader italic text-xl sm:text-3xl drop-shadow-[0_0_10px_rgba(90,254,115,0.3)]">
          <slot
            name="stack_title"
            mdc-unwrap="p"
          />
        </h3>
        <p class="text-sm sm:text-base">
          <slot
            name="stack_description"
            mdc-unwrap="p"
          />
        </p>
      </div>
      <div class="flex flex-wrap gap-6 sm:gap-8">
        <StackItem
          v-for="item in stack!.items"
          :key="item.name"
          :item="item"
        />
      </div>
    </div>
    <Divider class="my-6 sm:my-8" />
    <div class="flex flex-col gap-3">
      <div class="mb-4 sm:mb-6 flex flex-col gap-1">
        <h3 class="bg-gradient-to-r from-[#5AFE73] to-[#32D3D8] bg-clip-text text-transparent font-newsreader italic text-xl sm:text-3xl drop-shadow-[0_0_10px_rgba(90,254,115,0.3)]">
          <slot
            name="connect_title"
            mdc-unwrap="p"
          />
        </h3>
        <p class="text-sm sm:text-base">
          <slot
            name="connect_description"
            mdc-unwrap="p"
          />
        </p>
      </div>
      <div class="flex flex-wrap gap-4 justify-center">
        <SocialCard title="Connect With Me" />
      </div>
    </div>
  </section>
</template>
