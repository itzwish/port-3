<script setup lang="ts">
import { ref } from 'vue'

interface SoftwareTool {
  title: string
  description: string
  label: string
  icon?: string
}

defineProps<{
  tool: SoftwareTool
}>()

const isFlipped = ref(false)

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}
</script>

<template>
  <div class="flip-card" @click="toggleFlip">
    <div class="flip-card-inner" :class="{ 'is-flipped': isFlipped }">
      <div class="flip-card-front">
        <div v-if="tool.icon" class="icon-container">
          <UIcon :name="tool.icon" class="tool-icon" />
        </div>
        <p class="title">{{ tool.title }}</p>
        <p class="label-text">{{ tool.label }}</p>
      </div>
      <div class="flip-card-back">
        <p class="back-title">{{ tool.title }}</p>
        <p class="description">{{ tool.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: 150px;
  height: 200px;
  perspective: 1000px;
  font-family: sans-serif;
}

@media (min-width: 640px) {
  .flip-card {
    width: 190px;
    height: 254px;
  }
}

.title {
  font-size: 1em;
  font-weight: 900;
  text-align: center;
  margin: 0;
  padding: 0 0.75rem;
}

@media (min-width: 640px) {
  .title {
    font-size: 1.25em;
    padding: 0 1rem;
  }
}

.icon-container {
  margin-bottom: 0.75rem;
}

@media (min-width: 640px) {
  .icon-container {
    margin-bottom: 1rem;
  }
}

.tool-icon {
  width: 2rem;
  height: 2rem;
  color: #5AFE73;
}

@media (min-width: 640px) {
  .tool-icon {
    width: 3rem;
    height: 3rem;
  }
}

.label-text {
  font-size: 0.75em;
  margin-top: 0.375rem;
  opacity: 0.8;
}

@media (min-width: 640px) {
  .label-text {
    font-size: 0.875em;
    margin-top: 0.5rem;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card-inner.is-flipped {
  transform: rotateY(180deg);
}

@media (hover: hover) and (pointer: fine) {
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
}

.flip-card {
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(83, 51, 236, 0.3), 0 0 15px rgba(50, 211, 216, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid #5333EC;
  border-radius: 1rem;
}

.flip-card-front {
  background: linear-gradient(
    120deg,
    #0E0A1B 60%,
    #5333EC 88%,
    #32D3D8 40%,
    rgba(50, 211, 216, 0.6) 48%
  );
  color: #5AFE73;
}

.flip-card-back {
  background: linear-gradient(
    120deg,
    #5333EC 30%,
    #32D3D8 88%,
    #0E0A1B 40%,
    #5AFE73 78%
  );
  color: #CDCDCD;
  transform: rotateY(180deg);
  padding: 1rem;
}

@media (min-width: 640px) {
  .flip-card-back {
    padding: 1.5rem;
  }
}

.back-title {
  font-size: 0.9em;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

@media (min-width: 640px) {
  .back-title {
    font-size: 1.1em;
    margin: 0 0 1rem 0;
  }
}

.description {
  font-size: 0.75em;
  line-height: 1.4;
  margin: 0;
}

@media (min-width: 640px) {
  .description {
    font-size: 0.875em;
    line-height: 1.5;
  }
}
</style>
