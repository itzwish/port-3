<script lang="ts" setup>
defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
})

const navigation = getNavigation('home') as Record<string, Navigation>

const route = useRoute()
const localePath = useLocalePath()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="mx-auto my-2 flex w-full items-center justify-center">
    <header class="rounded-full flex items-center gap-3">
      <!-- Hamburger Menu Toggle -->
      <label class="menu-container" @click="toggleMenu">
        <input type="checkbox" :checked="isMenuOpen" />
        <div class="line" />
        <div class="line line-indicator" />
      </label>

      <SpotlightButton
        rounded
        transparent
        :animate="false"
        class="border border-[#e1e1e1]/10"
      >
        <nav class="z-10 flex h-[50px] justify-around gap-2 p-1 transition-all duration-300 ease-in-out sm:h-[45px] sm:hover:gap-4">
          <NuxtLink
            v-for="item in navigation"
            :id="item.name.toLowerCase()"
            :key="item.name"
            :aria-label="item.name + ' navigation link'"
            :class="[
              localePath(item.to) === route.path
                ? 'border border-[#e1e1e1]/5 bg-[#1b1b1b]/10 text-[#f3f3f3]/75 shadow-2xl shadow-[#e1e1e1]/50 backdrop-blur-3xl text-shadow-sm'
                : 'text-muted',
            ]"
            :to="localePath(item.to)"
            class="flex items-center rounded-full border border-transparent px-4 py-1 transition-all duration-300 ease-in-out hover:border-[#e1e1e1]/5 hover:bg-[#1b1b1b]/50 hover:backdrop-blur-3xl sm:px-6"
          >
            <UIcon
              :name="item.icon"
              class="size-7 font-light sm:size-6"
            />
          </NuxtLink>
        </nav>
      </SpotlightButton>
    </header>

    <!-- Popup Menu -->
    <Transition name="fade">
      <div v-if="isMenuOpen" class="menu-popup-overlay" @click="toggleMenu">
        <div class="menu-popup" @click.stop>
          <div class="playlist-header">
            <h2 class="playlist-title">One of my loves</h2>
            <p class="playlist-subtitle">3 songs</p>
          </div>
          <div class="radio-container">
            <input checked="" id="radio-co2" name="menu-radio" type="radio" />
            <label for="radio-co2">
              <div class="song-info">
                <span class="song-name">Co2</span>
                <span class="song-duration">3:24</span>
              </div>
            </label>
            <input id="radio-blackfriday" name="menu-radio" type="radio" />
            <label for="radio-blackfriday">
              <div class="song-info">
                <span class="song-name">BlackFriday</span>
                <span class="song-duration">4:12</span>
              </div>
            </label>
            <input id="radio-raastah" name="menu-radio" type="radio" />
            <label for="radio-raastah">
              <div class="song-info">
                <span class="song-name">Raastah (AUR)</span>
                <span class="song-duration">3:48</span>
              </div>
            </label>

            <div class="glider-container">
              <div class="glider" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Hide the default checkbox */
.menu-container input {
  opacity: 0;
  cursor: pointer;
  width: 0;
  height: 0;
}

.menu-container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background: rgba(216, 216, 216, 0.603);
}

.menu-container:hover {
  background: rgba(197, 197, 197, 0.527);
}

.line {
  width: calc(100% - 8px);
  height: 3px;
  left: 4px;
  background: rgb(58, 58, 58);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.7s transform cubic-bezier(0, 1, 0.33, 1.2), background 0.4s;
}

.line-indicator {
  transform: translateY(-50%) rotate(90deg);
}

.menu-container input:checked ~ .line-indicator {
  transform: translateY(-50%);
}

/* Popup Overlay */
.menu-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-popup {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.7), rgba(15, 15, 15, 0.7));
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  min-width: 280px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@media (min-width: 640px) {
  .menu-popup {
    border-radius: 24px;
    padding: 2.5rem;
    min-width: 400px;
  }
}

.playlist-header {
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 640px) {
  .playlist-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }
}

.playlist-title {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #f7e479, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
}

@media (min-width: 640px) {
  .playlist-title {
    font-size: 1.75rem;
  }
}

.playlist-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

@media (min-width: 640px) {
  .playlist-subtitle {
    font-size: 0.875rem;
  }
}

/* Radio Container Styles */
.radio-container {
  --main-color: #f7e479;
  --main-color-opacity: #f7e4791c;
  --total-radio: 3;

  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 0.5rem;
}

.radio-container input {
  cursor: pointer;
  appearance: none;
}

.radio-container .glider-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(27, 27, 27, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 1px;
}

.radio-container .glider-container .glider {
  position: relative;
  height: calc(100% / var(--total-radio));
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    var(--main-color) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  transition: transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
}

.radio-container .glider-container .glider::before {
  content: "";
  position: absolute;
  height: 60%;
  width: 300%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--main-color);
  filter: blur(10px);
}

.radio-container .glider-container .glider::after {
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    var(--main-color-opacity) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.radio-container label {
  cursor: pointer;
  padding: 0.75rem 1rem;
  position: relative;
  color: grey;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
}

@media (min-width: 640px) {
  .radio-container label {
    padding: 1rem 1.5rem;
    border-radius: 12px;
  }
}

.radio-container label:hover {
  background: rgba(255, 255, 255, 0.03);
}

.radio-container input:checked + label {
  color: var(--main-color);
  background: rgba(247, 228, 121, 0.05);
}

.song-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.song-name {
  font-size: 0.9rem;
  font-weight: 500;
}

@media (min-width: 640px) {
  .song-name {
    font-size: 1.125rem;
  }
}

.song-duration {
  font-size: 0.75rem;
  opacity: 0.6;
  font-weight: 400;
}

@media (min-width: 640px) {
  .song-duration {
    font-size: 0.875rem;
  }
}

.radio-container input:nth-of-type(1):checked ~ .glider-container .glider {
  transform: translateY(0);
}

.radio-container input:nth-of-type(2):checked ~ .glider-container .glider {
  transform: translateY(100%);
}

.radio-container input:nth-of-type(3):checked ~ .glider-container .glider {
  transform: translateY(200%);
}

.radio-container input:nth-of-type(4):checked ~ .glider-container .glider {
  transform: translateY(300%);
}

.radio-container input:nth-of-type(5):checked ~ .glider-container .glider {
  transform: translateY(400%);
}

.radio-container input:nth-of-type(6):checked ~ .glider-container .glider {
  transform: translateY(500%);
}

.radio-container input:nth-of-type(7):checked ~ .glider-container .glider {
  transform: translateY(600%);
}

.radio-container input:nth-of-type(8):checked ~ .glider-container .glider {
  transform: translateY(700%);
}

.radio-container input:nth-of-type(9):checked ~ .glider-container .glider {
  transform: translateY(800%);
}

.radio-container input:nth-of-type(10):checked ~ .glider-container .glider {
  transform: translateY(900%);
}

/* Transition for popup */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
