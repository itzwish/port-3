<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  encryptedClassName?: string
  animateOn?: 'hover' | 'view' | 'both'
}

const props = withDefaults(defineProps<Props>(), {
  speed: 50,
  maxIterations: 10,
  sequential: false,
  revealDirection: 'start',
  useOriginalCharsOnly: false,
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()',
  className: '',
  encryptedClassName: '',
  animateOn: 'hover',
})

const containerRef = ref<HTMLElement | null>(null)
const displayText = ref(props.text)
const isHovering = ref(false)
const isScrambling = ref(false)
const revealedIndices = ref(new Set<number>())
const hasAnimated = ref(false)

const availableChars = computed(() => {
  return props.useOriginalCharsOnly
    ? Array.from(new Set(props.text.split(''))).filter(char => char !== ' ')
    : props.characters.split('')
})

const getNextIndex = (revealedSet: Set<number>): number => {
  const textLength = props.text.length
  switch (props.revealDirection) {
    case 'start':
      return revealedSet.size
    case 'end':
      return textLength - 1 - revealedSet.size
    case 'center': {
      const middle = Math.floor(textLength / 2)
      const offset = Math.floor(revealedSet.size / 2)
      const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1

      if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
        return nextIndex
      }

      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) return i
      }
      return 0
    }
    default:
      return revealedSet.size
  }
}

const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {
  if (props.useOriginalCharsOnly) {
    const positions = originalText.split('').map((char, i) => ({
      char,
      isSpace: char === ' ',
      index: i,
      isRevealed: currentRevealed.has(i),
    }))

    const nonSpaceChars = positions
      .filter(p => !p.isSpace && !p.isRevealed)
      .map(p => p.char)

    for (let i = nonSpaceChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j]!, nonSpaceChars[i]!]
    }

    let charIndex = 0
    return positions
      .map((p) => {
        if (p.isSpace) return ' '
        if (p.isRevealed) return originalText[p.index]
        return nonSpaceChars[charIndex++]
      })
      .join('')
  }
  else {
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (currentRevealed.has(i)) return originalText[i]
        return availableChars.value[Math.floor(Math.random() * availableChars.value.length)]
      })
      .join('')
  }
}

let animationInterval: number | null = null

const startAnimation = () => {
  if (isHovering.value) return

  isHovering.value = true
  isScrambling.value = true
  let currentIteration = 0

  animationInterval = window.setInterval(() => {
    if (props.sequential) {
      if (revealedIndices.value.size < props.text.length) {
        const nextIndex = getNextIndex(revealedIndices.value)
        revealedIndices.value.add(nextIndex)
        displayText.value = shuffleText(props.text, new Set(revealedIndices.value))
      }
      else {
        if (animationInterval) clearInterval(animationInterval)
        isScrambling.value = false
        isHovering.value = false
      }
    }
    else {
      displayText.value = shuffleText(props.text, revealedIndices.value)
      currentIteration++
      if (currentIteration >= props.maxIterations) {
        if (animationInterval) clearInterval(animationInterval)
        isScrambling.value = false
        displayText.value = props.text
        isHovering.value = false
      }
    }
  }, props.speed)
}

const handleMouseEnter = () => {
  if (props.animateOn === 'hover' || props.animateOn === 'both') {
    startAnimation()
  }
}

const handleMouseLeave = () => {
  if (animationInterval) clearInterval(animationInterval)
  isHovering.value = false
  isScrambling.value = false
  displayText.value = props.text
  revealedIndices.value.clear()
}

onMounted(() => {
  if ((props.animateOn === 'view' || props.animateOn === 'both') && containerRef.value) {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          startAnimation()
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    })

    observer.observe(containerRef.value)

    onUnmounted(() => {
      if (containerRef.value) {
        observer.unobserve(containerRef.value)
      }
    })
  }
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <span
    ref="containerRef"
    class="inline-block whitespace-pre-wrap"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="sr-only">{{ displayText }}</span>
    <span aria-hidden="true">
      <span
        v-for="(char, index) in displayText"
        :key="index"
        :class="
          revealedIndices.has(index) || !isScrambling || !isHovering ? className : encryptedClassName
        "
      >
        {{ char }}
      </span>
    </span>
  </span>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
