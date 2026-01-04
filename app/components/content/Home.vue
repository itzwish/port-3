<template>
  <section class="relative pt-12">
    <!-- grid -->
    <div class="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />

    <div class="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <!-- spotlight -->
      <div
        class="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#5333EC]/40 via-[#32D3D8]/30 to-[#5AFE73]/40 blur-[120px] lg:-top-8 lg:size-[32rem] lg:blur-[200px]"
      />

      <!-- profile picture -->
      <HomeProfilePicture />

      <div class="z-20 flex flex-col items-center justify-center">
        <!-- title -->
        <div
          class="font-geist"
          style="--stagger: 1; --delay: 10ms"
          data-animate
        >
          <h1 class="mx-auto font-medium text-center text-pretty bg-gradient-to-br from-[#CDCDCD] via-[#32D3D8] to-[#5AFE73] bg-clip-text text-3xl text-transparent lg:max-w-3xl lg:text-4xl">
            <slot
              name="hero_title"
              mdc-unwrap="p"
            />
          </h1>

          <!-- subtitle -->
          <h2 class="mx-auto mt-4 max-w-xl text-center text-lg antialiased text-[#CDCDCD]/80">
            <slot
              name="hero_subtitle"
              mdc-unwrap="p"
            />
          </h2>
        </div>

        <SettingsAvailability
          background
          class="mt-2"
          style="--stagger: 2"
          data-animate
        />

        <!-- social -->
        <HomeSocial
          style="--stagger: 3"
          data-animate
        />

        <!-- cta -->
        <HomeCTA
          style="--stagger: 4"
          data-animate
        />

        <div
          style="--stagger: 5"
          data-animate
          class="mt-12 flex w-full max-w-3xl flex-col gap-4 lg:mt-16 items-center"
        >
          <!-- 3D Work Card -->
          <HomeWorkCard3D />
        </div>
      </div>
    </div>
  </section>
</template>
