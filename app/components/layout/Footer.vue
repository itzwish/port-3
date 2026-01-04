<template>
  <div class="mt-6 pb-20">
    <Divider />
    <footer class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
      <Logo :size="8" />
      <span class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }} Revy - Portfolio
      </span>
      <span class="text-center text-xs text-muted">
        Made by <ULink to="https://itzwish.me" target="_blank" class="hover:text-[#f3f3f3] transition-colors">itzwish.me</ULink>
      </span>
      <span class="text-center text-xs text-muted">
        📧 <ULink to="mailto:me@itzwish.me" class="hover:text-[#f3f3f3] transition-colors">me@itzwish.me</ULink>
      </span>
    </footer>
  </div>
</template>
