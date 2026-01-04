<script setup lang="ts">
import { ref, onMounted } from 'vue'

const containerRef = ref<HTMLElement | null>(null)

const tools = {
  software: [
    { title: 'Visual Studio Code', description: 'Best code editor for development', label: 'Editor', icon: 'vscode-icons:file-type-vscode' },
    { title: '1Password', description: 'Enterprise-grade password manager', label: 'Security', icon: 'simple-icons:1password' },
    { title: 'Arc Browser', description: 'The best web browser for productivity', label: 'Browser', icon: 'simple-icons:arc' },
    { title: 'ChatGPT', description: 'AI-powered coding assistant', label: 'AI', icon: 'simple-icons:openai' },
    { title: 'CleanShot X', description: 'Professional screenshot and video tool', label: 'Tools', icon: 'lucide:camera' },
    { title: 'Discord', description: 'Team communication platform', label: 'Communication', icon: 'simple-icons:discord' },
    { title: 'Figma', description: 'Collaborative design tool', label: 'Design', icon: 'logos:figma' },
    { title: 'Linear', description: 'Modern issue tracking system', label: 'Project Mgmt', icon: 'simple-icons:linear' },
    { title: 'Raycast', description: 'Powerful productivity launcher', label: 'Launcher', icon: 'simple-icons:raycast' },
    { title: 'Spotify', description: 'Music streaming service', label: 'Entertainment', icon: 'logos:spotify-icon' },
    { title: 'Ghostty', description: 'Modern GPU-accelerated terminal', label: 'Terminal', icon: 'lucide:terminal' },
    { title: 'OrbStack', description: 'Docker container management', label: 'DevOps', icon: 'simple-icons:docker' },
  ],
  frontend: [
    { title: 'Vue 3', description: 'Progressive JavaScript framework', label: 'Framework', icon: 'logos:vue' },
    { title: 'Nuxt', description: 'Vue meta-framework for SSR & SSG', label: 'Meta Framework', icon: 'logos:nuxt-icon' },
    { title: 'TypeScript', description: 'Typed JavaScript superset', label: 'Language', icon: 'logos:typescript-icon' },
    { title: 'Tailwind CSS', description: 'Utility-first CSS framework', label: 'Styling', icon: 'logos:tailwindcss-icon' },
    { title: 'UnoCSS', description: 'Instant on-demand atomic CSS', label: 'CSS', icon: 'logos:unocss' },
    { title: 'Vite', description: 'Next generation build tool', label: 'Build Tool', icon: 'logos:vitejs' },
    { title: 'pnpm', description: 'Fast, disk space efficient package manager', label: 'Package Mgr', icon: 'logos:pnpm' },
    { title: 'ESLint', description: 'JavaScript linting utility', label: 'Linting', icon: 'logos:eslint' },
    { title: 'Vitest', description: 'Unit testing framework', label: 'Testing', icon: 'logos:vitest' },
    { title: 'Cypress', description: 'End-to-end testing framework', label: 'E2E Testing', icon: 'logos:cypress-icon' },
    { title: 'Storybook', description: 'Component development environment', label: 'Components', icon: 'logos:storybook-icon' },
    { title: 'Next.js', description: 'React framework for production', label: 'Framework', icon: 'logos:nextjs-icon' },
  ],
  backend: [
    { title: 'Node.js', description: 'JavaScript runtime', label: 'Runtime', icon: 'logos:nodejs-icon' },
    { title: 'Nitro', description: 'Nuxt server framework', label: 'Server', icon: 'simple-icons:nuxtdotjs' },
    { title: 'Express.js', description: 'Minimal and flexible Node framework', label: 'Framework', icon: 'simple-icons:express' },
    { title: 'NestJS', description: 'Progressive Node.js framework', label: 'Framework', icon: 'logos:nestjs' },
    { title: 'PostgreSQL', description: 'Advanced open source database', label: 'Database', icon: 'logos:postgresql' },
    { title: 'MongoDB', description: 'NoSQL document database', label: 'Database', icon: 'logos:mongodb-icon' },
    { title: 'Redis', description: 'In-memory data structure store', label: 'Cache', icon: 'logos:redis' },
    { title: 'Prisma', description: 'Next-generation ORM', label: 'ORM', icon: 'logos:prisma' },
    { title: 'GraphQL', description: 'API query language', label: 'API', icon: 'logos:graphql' },
    { title: 'REST API', description: 'RESTful web services', label: 'API', icon: 'mdi:api' },
    { title: 'JWT', description: 'JSON Web Token authentication', label: 'Auth', icon: 'simple-icons:jsonwebtokens' },
    { title: 'Docker', description: 'Container platform', label: 'DevOps', icon: 'logos:docker-icon' },
  ],
  design: [
    { title: 'Figma', description: 'Collaborative interface design tool', label: 'Design', icon: 'logos:figma' },
    { title: 'Adobe XD', description: 'UI/UX design and prototyping', label: 'Design', icon: 'logos:adobe-xd' },
    { title: 'Framer', description: 'Interactive design and code tool', label: 'Interactive', icon: 'logos:framer' },
    { title: 'Sketch', description: 'Professional UI design tool', label: 'Design', icon: 'logos:sketch' },
    { title: 'Blender', description: '3D modeling and animation', label: '3D', icon: 'logos:blender' },
    { title: 'Photoshop', description: 'Digital image editing', label: 'Image Edit', icon: 'logos:adobe-photoshop' },
    { title: 'Illustrator', description: 'Vector graphic design', label: 'Vector', icon: 'logos:adobe-illustrator' },
    { title: 'After Effects', description: 'Motion graphics and animation', label: 'Animation', icon: 'simple-icons:adobeaftereffects' },
    { title: 'Protopie', description: 'Interactive prototype tool', label: 'Prototyping', icon: 'simple-icons:protodotio' },
    { title: 'Penpot', description: 'Open-source design platform', label: 'Open Source', icon: 'simple-icons:penpot' },
    { title: 'Material Design', description: 'Design system and guidelines', label: 'System', icon: 'simple-icons:materialdesign' },
    { title: 'Accessibility', description: 'WCAG standards compliance', label: 'A11y', icon: 'mdi:human-handsup' },
  ],
}

onMounted(() => {
  // Event handlers are now attached by MagicBento component automatically
})
</script>

<template>
  <section ref="containerRef" class="mx-auto mt-2 flex max-w-7xl flex-col p-3 sm:p-7 sm:mt-20">
    <h1 class="font-newsreader italic bg-gradient-to-r from-[#32D3D8] via-[#5333EC] to-[#5AFE73] bg-clip-text text-transparent text-center text-xl sm:text-4xl drop-shadow-[0_0_15px_rgba(83,51,236,0.5)]">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-sm sm:text-lg font-extralight italic text-[#CDCDCD] mt-1 sm:mt-2">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-4 mt-1 sm:mb-8 sm:mt-2" />

    <div class="space-y-6 sm:space-y-12">
      <!-- Software Section -->
      <div class="space-y-3 sm:space-y-6">
        <h3 class="font-newsreader italic bg-gradient-to-r from-[#5AFE73] to-[#32D3D8] bg-clip-text text-transparent text-lg sm:text-2xl drop-shadow-[0_0_10px_rgba(90,254,115,0.3)]">
          Software & Tools
        </h3>
        <div class="flex flex-wrap gap-3 sm:gap-6 justify-center">
          <SoftwareFlipCard
            v-for="tool in tools.software"
            :key="tool.title"
            :tool="tool"
          />
        </div>
      </div>

      <!-- Frontend Stack Section -->
      <div class="space-y-3 sm:space-y-6">
        <h3 class="font-newsreader italic bg-gradient-to-r from-[#5AFE73] to-[#32D3D8] bg-clip-text text-transparent text-lg sm:text-2xl drop-shadow-[0_0_10px_rgba(90,254,115,0.3)]">
          Frontend Stack
        </h3>
        <div class="flex flex-wrap gap-3 sm:gap-6 justify-center">
          <SoftwareFlipCard
            v-for="tech in tools.frontend"
            :key="tech.title"
            :tool="tech"
          />
        </div>
      </div>

      <!-- Backend Stack Section -->
      <div class="space-y-3 sm:space-y-6">
        <h3 class="font-newsreader italic bg-gradient-to-r from-[#5AFE73] to-[#32D3D8] bg-clip-text text-transparent text-lg sm:text-2xl drop-shadow-[0_0_10px_rgba(90,254,115,0.3)]">
          Backend Stack
        </h3>
        <div class="flex flex-wrap gap-3 sm:gap-6 justify-center">
          <SoftwareFlipCard
            v-for="tech in tools.backend"
            :key="tech.title"
            :tool="tech"
          />
        </div>
      </div>

      <!-- Design Tools Section -->
      <div class="space-y-3 sm:space-y-6">
        <h3 class="font-newsreader italic bg-gradient-to-r from-[#5AFE73] to-[#32D3D8] bg-clip-text text-transparent text-lg sm:text-2xl drop-shadow-[0_0_10px_rgba(90,254,115,0.3)]">
          Design Tools
        </h3>
        <div class="flex flex-wrap gap-3 sm:gap-6 justify-center">
          <SoftwareFlipCard
            v-for="design in tools.design"
            :key="design.title"
            :tool="design"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  position: relative;
  overflow: visible;
}

/* Stars Effect */
:deep(.magic-bento-card)::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(2px 2px at 20% 30%, rgba(83, 51, 236, 0.6), rgba(255, 255, 255, 0)),
    radial-gradient(2px 2px at 60% 70%, rgba(50, 211, 216, 0.5), rgba(255, 255, 255, 0)),
    radial-gradient(1px 1px at 50% 50%, rgba(90, 254, 115, 0.4), rgba(255, 255, 255, 0)),
    radial-gradient(1px 1px at 80% 10%, rgba(83, 51, 236, 0.5), rgba(255, 255, 255, 0)),
    radial-gradient(2px 2px at 90% 60%, rgba(50, 211, 216, 0.6), rgba(255, 255, 255, 0)),
    radial-gradient(1px 1px at 30% 80%, rgba(90, 254, 115, 0.4), rgba(255, 255, 255, 0));
  background-repeat: no-repeat;
  background-size: 200% 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  animation: twinkle 3s ease-in-out infinite;
}

:deep(.magic-bento-card):hover::after {
  opacity: 1;
}

/* Tilt Effect */
:deep(.magic-bento-card) {
  perspective: 1000px;
  transform-style: preserve-3d;
}

:deep(.magic-bento-card):hover {
  animation: tiltEffect 0.3s ease-out forwards;
}

/* Click Ripple Effect */
:deep(.magic-bento-card) {
  position: relative;
  overflow: hidden;
}

/* Magnetism Effect - Pull towards cursor */
:deep(.magic-bento-card__content) {
  position: relative;
  transition: transform 0.2s ease-out;
}

:deep(.magic-bento-card):hover .magic-bento-card__content {
  animation: magneticPulse 0.5s ease-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes tiltEffect {
  0% {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }
  100% {
    transform: rotateX(-2deg) rotateY(3deg) rotateZ(1deg);
  }
}

@keyframes magneticPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Spotlight glow intensification */
:deep(.magic-bento-card):hover::before {
  animation: spotlightPulse 2s ease-in-out infinite;
}

@keyframes spotlightPulse {
  0%, 100% {
    opacity: var(--glow-intensity);
  }
  50% {
    opacity: calc(var(--glow-intensity) * 1.5);
  }
}

/* Enhanced border glow on click */
:deep(.magic-bento-card):active {
  box-shadow: 0 0 20px rgba(83, 51, 236, 0.6),
              inset 0 0 20px rgba(50, 211, 216, 0.2);
  animation: clickFlash 0.3s ease-out;
}

@keyframes clickFlash {
  0% {
    box-shadow: 0 0 30px rgba(83, 51, 236, 0.8),
                inset 0 0 30px rgba(90, 254, 115, 0.4);
  }
  100% {
    box-shadow: 0 0 20px rgba(83, 51, 236, 0.6),
                inset 0 0 20px rgba(50, 211, 216, 0.2);
  }
}

/* Smooth scroll support */
* {
  scroll-behavior: smooth;
}
</style>
