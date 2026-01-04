<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Title',
  },
})
</script>

<template>
  <div class="card">
    <div class="boxshadow"></div>
    <div class="main">
      <div class="top"></div>
      <div class="left side"></div>
      <div class="right side"></div>
      <div class="title">{{ title }}</div>
      <div class="button-container">
        <button class="button">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="#f3f3f3"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="svg"
          >
            <rect ry="5" rx="5" y="2" x="2" height="20" width="20"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line y2="6.5" y1="6.5" x2="17.51" x1="17.5"></line>
          </svg>
        </button>
        <button class="button">
          <svg
            viewBox="0 0 512 512"
            fill="#f3f3f3"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            class="svg twitter"
          >
            <path
              d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
            ></path>
          </svg>
        </button>
        <button class="button">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            stroke="#f3f3f3"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="svg"
          >
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
            ></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  height: 250px;
  width: 180px;
}

@media (min-width: 640px) {
  .card {
    height: 300px;
    width: 230px;
  }
}

.card:nth-child(2) {
  filter: hue-rotate(300deg) brightness(1.3);
}

.card:nth-child(3) {
  filter: hue-rotate(200deg) brightness(1.5);
}

.card:nth-child(4) {
  filter: hue-rotate(60deg) brightness(3);
}

.card .boxshadow {
  position: absolute;
  height: 100%;
  width: 100%;
  border: 1px solid var(--border-primary);
  transform: scale(0.8);
  box-shadow: var(--border-primary) 0px 30px 70px 0px;
  opacity: 0.3;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.card .main {
  width: 180px;
  height: 250px;
  overflow: hidden;
  background: var(--ui-bg);
  background: linear-gradient(
    0deg,
    var(--ui-bg) 0%,
    var(--bg-secondary) 60%,
    var(--ui-bg) 100%
  );
  position: relative;
  clip-path: polygon(
    0 0,
    100% 0,
    100% 40px,
    100% calc(100% - 40px),
    calc(100% - 40px) 100%,
    40px 100%,
    0 calc(100% - 40px)
  );
  box-shadow: var(--border-primary) 0px 7px 29px 0px;
  opacity: 0.8;
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

@media (min-width: 640px) {
  .card .main {
    width: 230px;
    height: 300px;
  }
}

.card .main .top {
  position: absolute;
  top: 0px;
  left: 0;
  width: 0px;
  height: 0px;
  z-index: 2;
  border-top: 80px solid var(--bg-card);
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  will-change: top;
  transition: top 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

@media (min-width: 640px) {
  .card .main .top {
    border-top: 115px solid var(--bg-card);
    border-left: 115px solid transparent;
    border-right: 115px solid transparent;
  }
}

.card .main .side {
  position: absolute;
  width: 100%;
  top: 0;
  transform: translateX(-50%);
  height: 101%;
  background: var(--bg-card);
  clip-path: polygon(0% 0%, 50% 0, 95% 45%, 100% 100%, 0% 100%);
  will-change: left, right;
  transition: left 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s, right 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
}

.card .main .left {
  left: 0;
}

.card .main .right {
  right: 0;
  transform: translateX(50%) scale(-1, 1);
}

.card .main .title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 90px;
  font-weight: bold;
  font-size: 25px;
  opacity: 0;
  z-index: -1;
  color: var(--font-primary);
  will-change: opacity;
  transition: opacity 0.2s ease-out 0s;
}

.card .main .button-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.card .main .button-container .button {
  position: absolute;
  transform: translateX(-50%);
  padding: 5px 10px;
  clip-path: polygon(0 0, 100% 0, 81% 100%, 21% 100%);
  background: var(--bg-card);
  border: none;
  color: var(--font-primary);
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.card .main .button-container .button .svg {
  width: 15px;
  transition: all 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.card .main .button-container .button:nth-child(1) {
  bottom: 300px;
  transition-delay: 0.4s;
}

.card .main .button-container .button:nth-child(2) {
  bottom: 300px;
  transition-delay: 0.6s;
}

.card .main .button-container .button:nth-child(3) {
  bottom: 300px;
  transition-delay: 0.8s;
}

.card .main .button-container .button:hover .svg {
  transform: scale(1.2);
}

.card .main .button-container .button:active .svg {
  transform: scale(0.7);
}

.card:hover .main {
  transform: scale(1.1);
}

.card:hover .main .top {
  top: -50px;
}

.card:hover .main .left {
  left: -50px;
  transition: left 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
}

.card:hover .main .right {
  right: -50px;
  transition: right 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
}

.card:hover .main .title {
  opacity: 1;
  transition: all 0.2s ease-out 1.3s;
}

.card:hover .main .button-container .button:nth-child(1) {
  bottom: 80px;
  transition-delay: 0.8s;
}

.card:hover .main .button-container .button:nth-child(2) {
  bottom: 40px;
  transition-delay: 0.6s;
}

.card:hover .main .button-container .button:nth-child(3) {
  bottom: 0;
  transition-delay: 0.4s;
}
</style>
