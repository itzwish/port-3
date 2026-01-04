<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  enableTilt?: boolean
  enableMagnetism?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableClickEffect?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  glowColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  enableTilt: true,
  enableMagnetism: true,
  enableStars: true,
  enableSpotlight: true,
  enableClickEffect: true,
  enableBorderGlow: true,
  disableAnimations: false,
  spotlightRadius: 300,
  particleCount: 12,
  glowColor: '132, 0, 255',
})

const gridRef = ref<HTMLDivElement | null>(null)
const spotlightRef = ref<HTMLDivElement | null>(null)
const isMobile = ref(false)

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement('div')
  el.className = 'particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
    will-change: transform, opacity;
  `
  return el
}

const createSpotlight = () => {
  if (spotlightRef.value) return

  const spotlight = document.createElement('div')
  spotlight.className = 'global-spotlight'
  spotlight.style.cssText = `
    position: fixed;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle,
      rgba(${props.glowColor}, 0.15) 0%,
      rgba(${props.glowColor}, 0.08) 15%,
      rgba(${props.glowColor}, 0.04) 25%,
      rgba(${props.glowColor}, 0.02) 40%,
      rgba(${props.glowColor}, 0.01) 65%,
      transparent 70%
    );
    z-index: 200;
    opacity: 0;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
    pointer-events: none;
    transition: opacity 0.3s ease-out;
  `
  document.body.appendChild(spotlight)
  spotlightRef.value = spotlight
}

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
})

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect()
  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty('--glow-x', `${relativeX}%`)
  card.style.setProperty('--glow-y', `${relativeY}%`)
  card.style.setProperty('--glow-intensity', glow.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

const animateParticles = (cardEl: HTMLElement) => {
  if (props.disableAnimations || isMobile.value) return

  for (let i = 0; i < props.particleCount; i++) {
    setTimeout(() => {
      const { width, height } = cardEl.getBoundingClientRect()
      const startX = Math.random() * width
      const startY = Math.random() * height
      const particle = createParticleElement(startX, startY, props.glowColor)

      if (!cardEl.contains(particle)) {
        cardEl.appendChild(particle)
      }

      // Scale in animation
      particle.animate(
        [
          { transform: 'scale(0)', opacity: '0' },
          { transform: 'scale(1)', opacity: '1' },
        ],
        { duration: 300, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' },
      )

      // Particle movement and rotation
      const vx = (Math.random() - 0.5) * 2
      const vy = (Math.random() - 0.5) * 2
      let x = startX
      let y = startY
      let rotation = 0

      const moveInterval = setInterval(() => {
        x += vx
        y += vy
        rotation += Math.random() * 10
        particle.style.transform = `translate(${x - startX}px, ${y - startY}px) rotate(${rotation}deg)`
      }, 16)

      // Opacity flicker
      particle.animate(
        [{ opacity: '1' }, { opacity: '0.3' }, { opacity: '1' }],
        {
          duration: 1500,
          iterations: Infinity,
          easing: 'ease-in-out',
          fill: 'forwards',
        },
      )

      // Cleanup after delay
      setTimeout(() => {
        clearInterval(moveInterval)
        const scaleOutAnimation = particle.animate(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(0)', opacity: '0' },
          ],
          { duration: 300, easing: 'cubic-bezier(0.6, 0, 0.35, 1)', fill: 'forwards' },
        )
        scaleOutAnimation.onfinish = () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }
      }, 6000 + Math.random() * 2000)
    }, i * 100)
  }
}

const handleCardMouseEnter = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  if (props.disableAnimations || isMobile.value) return

  if (props.enableStars) {
    animateParticles(card)
  }

  if (props.enableTilt) {
    card.animate(
      [
        { transform: 'perspective(1000px) rotateX(0) rotateY(0)' },
        { transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)' },
      ],
      { duration: 300, fill: 'forwards', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    )
  }
}

const handleCardMouseLeave = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  if (props.disableAnimations || isMobile.value) return

  // Clear particles
  const particles = card.querySelectorAll('.particle')
  particles.forEach((p) => {
    const animation = p.animate([{ opacity: '1' }, { opacity: '0' }], { duration: 300 })
    animation.onfinish = () => {
      if (p.parentNode) {
        p.parentNode.removeChild(p)
      }
    }
  })

  if (props.enableTilt) {
    card.animate(
      [{ transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)' }, { transform: 'perspective(1000px) rotateX(0) rotateY(0)' }],
      { duration: 300, fill: 'forwards', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    )
  }

  if (props.enableMagnetism) {
    card.animate([{ transform: 'translate(var(--mag-x), var(--mag-y))' }, { transform: 'translate(0, 0)' }], {
      duration: 300,
      fill: 'forwards',
    })
  }
}

const handleCardMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  if (props.enableTilt && !isMobile.value) {
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  if (props.enableMagnetism && !isMobile.value) {
    const magnetX = (x - centerX) * 0.05
    const magnetY = (y - centerY) * 0.05

    card.style.setProperty('--mag-x', `${magnetX}px`)
    card.style.setProperty('--mag-y', `${magnetY}px`)
    card.style.transform = `translate(${magnetX}px, ${magnetY}px)`
  }
}

const handleCardClick = (e: MouseEvent) => {
  if (!props.enableClickEffect || props.disableAnimations || isMobile.value) return

  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const maxDistance = Math.max(
    Math.hypot(x, y),
    Math.hypot(x - rect.width, y),
    Math.hypot(x, y - rect.height),
    Math.hypot(x - rect.width, y - rect.height),
  )

  const ripple = document.createElement('div')
  ripple.className = 'ripple-effect'
  ripple.style.cssText = `
    position: absolute;
    width: ${maxDistance * 2}px;
    height: ${maxDistance * 2}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${props.glowColor}, 0.4) 0%, rgba(${props.glowColor}, 0.2) 30%, transparent 70%);
    left: ${x - maxDistance}px;
    top: ${y - maxDistance}px;
    pointer-events: none;
    z-index: 1000;
  `

  card.appendChild(ripple)

  const animation = ripple.animate(
    [
      { transform: 'scale(0)', opacity: '1' },
      { transform: 'scale(1)', opacity: '0' },
    ],
    { duration: 800, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  )
  animation.onfinish = () => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple)
    }
  }
}

const updateSpotlight = (e: MouseEvent) => {
  if (!spotlightRef.value || !gridRef.value || !props.enableSpotlight || isMobile.value) return

  const grid = gridRef.value
  const section = grid.closest('.bento-section') as HTMLElement
  if (!section) return

  const rect = section.getBoundingClientRect()
  const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

  if (!mouseInside) {
    spotlightRef.value.style.opacity = '0'
    return
  }

  spotlightRef.value.style.left = `${e.clientX}px`
  spotlightRef.value.style.top = `${e.clientY}px`

  const { proximity, fadeDistance } = calculateSpotlightValues(props.spotlightRadius)
  let minDistance = Infinity

  const cards = grid.querySelectorAll('.magic-bento-card')
  cards.forEach((card) => {
    const cardEl = card as HTMLElement
    const cardRect = cardEl.getBoundingClientRect()
    const centerX = cardRect.left + cardRect.width / 2
    const centerY = cardRect.top + cardRect.height / 2
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2
    const effectiveDistance = Math.max(0, distance)

    minDistance = Math.min(minDistance, effectiveDistance)

    let glowIntensity = 0
    if (effectiveDistance <= proximity) {
      glowIntensity = 1
    }
    else if (effectiveDistance <= fadeDistance) {
      glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
    }

    updateCardGlowProperties(cardEl, e.clientX, e.clientY, glowIntensity, props.spotlightRadius)
  })

  const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0

  spotlightRef.value.style.opacity = targetOpacity.toString()
}

const checkMobileView = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobileView()
  if (props.enableSpotlight) {
    createSpotlight()
  }

  // Attach event handlers to cards
  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.magic-bento-card')
    cards.forEach((card) => {
      const cardEl = card as HTMLElement
      cardEl.addEventListener('mouseenter', handleCardMouseEnter as EventListener)
      cardEl.addEventListener('mouseleave', handleCardMouseLeave as EventListener)
      cardEl.addEventListener('mousemove', handleCardMouseMove as EventListener)
      cardEl.addEventListener('click', handleCardClick as EventListener)
    })
  }

  document.addEventListener('mousemove', updateSpotlight, { passive: true })
  window.addEventListener('resize', checkMobileView, { passive: true })
})

onUnmounted(() => {
  // Clean up event listeners
  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.magic-bento-card')
    cards.forEach((card) => {
      const cardEl = card as HTMLElement
      cardEl.removeEventListener('mouseenter', handleCardMouseEnter as EventListener)
      cardEl.removeEventListener('mouseleave', handleCardMouseLeave as EventListener)
      cardEl.removeEventListener('mousemove', handleCardMouseMove as EventListener)
      cardEl.removeEventListener('click', handleCardClick as EventListener)
    })
  }

  document.removeEventListener('mousemove', updateSpotlight)
  window.removeEventListener('resize', checkMobileView)
  if (spotlightRef.value?.parentNode) {
    spotlightRef.value.parentNode.removeChild(spotlightRef.value)
  }
})

onUnmounted(() => {
  // Clean up event listeners
  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.magic-bento-card')
    cards.forEach((card) => {
      const cardEl = card as HTMLElement
      cardEl.removeEventListener('mouseenter', handleCardMouseEnter as EventListener)
      cardEl.removeEventListener('mouseleave', handleCardMouseLeave as EventListener)
      cardEl.removeEventListener('mousemove', handleCardMouseMove as EventListener)
      cardEl.removeEventListener('click', handleCardClick as EventListener)
    })
  }

  document.removeEventListener('mousemove', updateSpotlight)
  window.removeEventListener('resize', checkMobileView)
  if (spotlightRef.value?.parentNode) {
    spotlightRef.value.parentNode.removeChild(spotlightRef.value)
  }
})
</script>

<template>
  <div class="bento-section w-full">
    <div
      ref="gridRef"
      class="magic-bento-grid"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bento-section {
  position: relative;
  width: 100%;
  touch-action: auto;
  overflow: visible;
  user-select: none;
}

.magic-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  position: relative;
}

:deep(.magic-bento-card) {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid rgba(132, 0, 255, 0.2);
  background: linear-gradient(135deg, rgba(6, 0, 16, 0.8) 0%, rgba(20, 0, 40, 0.6) 100%);
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 0;
  --glow-radius: 400px;
  --mag-x: 0px;
  --mag-y: 0px;
  cursor: pointer;
  touch-action: auto;
  perspective: 1000px;
  will-change: transform;
}

:deep(.magic-bento-card):hover {
  border-color: rgba(132, 0, 255, 0.5);
  background: linear-gradient(135deg, rgba(6, 0, 16, 0.95) 0%, rgba(20, 0, 40, 0.8) 100%);
  box-shadow: 0 4px 20px rgba(46, 24, 78, 0.4), 0 0 30px rgba(132, 0, 255, 0.2);
  transform: translateY(-2px);
}

/* Border glow effect */
:deep(.magic-bento-card)::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 6px;
  background: radial-gradient(
    var(--glow-radius) circle at var(--glow-x) var(--glow-y),
    rgba(132, 0, 255, calc(var(--glow-intensity) * 0.8)) 0%,
    rgba(132, 0, 255, calc(var(--glow-intensity) * 0.4)) 30%,
    transparent 60%
  );
  border-radius: inherit;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 1;
}

:deep(.magic-bento-card__header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

:deep(.magic-bento-card__label) {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(132, 0, 255, 0.8);
  background: rgba(132, 0, 255, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
}

:deep(.magic-bento-card__content) {
  position: relative;
  z-index: 2;
}

:deep(.magic-bento-card__title) {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

:deep(.magic-bento-card__description) {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* Particle styles */
:deep(.particle) {
  pointer-events: none;
  will-change: transform, opacity;
}

/* Ripple effect styles */
:deep(.ripple-effect) {
  pointer-events: none;
}

@media (max-width: 768px) {
  .magic-bento-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
