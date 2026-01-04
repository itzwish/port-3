<script setup lang="ts">
interface Props {
  isVisible: boolean
}

defineProps<Props>()
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000]"
    >
      <div class="preloader">
        <div class="crack crack1"></div>
        <div class="crack crack2"></div>
        <div class="crack crack3"></div>
        <div class="crack crack4"></div>
        <div class="crack crack5"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.preloader {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px #5333EC);
}

.crack {
  position: absolute;
  width: 10%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #5333EC 0%, #32D3D8 50%, #5AFE73 100%);
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  animation: rotate 6s infinite;
}

.crack2 {
  width: 12%;
  animation-delay: 1s;
}

.crack3 {
  width: 14%;
  animation-delay: 1.5s;
}

.crack4 {
  width: 16%;
  animation-delay: 2s;
}

.crack5 {
  width: 18%;
  animation-delay: 2.5s;
}

@keyframes rotate {
  to {
    rotate: 360deg;
  }
}
</style>
