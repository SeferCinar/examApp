<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 gap-4">
        <NuxtLink to="/" class="shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-md">
          <Wordmark size="md" />
        </NuxtLink>

        <div class="hidden sm:flex sm:items-center sm:space-x-2 sm:ml-auto">
          <NuxtLink to="/"
            :class="linkClass(isHomeActive)"
            class="focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
            Ana Sayfa
          </NuxtLink>

          <NuxtLink to="/savedNotes"
            :class="linkClass(route.path === '/savedNotes')"
            class="focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
            Kayıtlı Notlarım
          </NuxtLink>

          <button @click="toggleColorMode"
            aria-label="Tema değiştir"
            class="ml-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors duration-300">
            <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        <div class="flex items-center gap-1 sm:hidden">
          <button @click="toggleColorMode"
            aria-label="Tema değiştir"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300">
            <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <button @click="isOpen = !isOpen"
            aria-label="Menü"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="isOpen" class="sm:hidden border-t border-gray-200 dark:border-gray-700">
      <div class="pt-2 pb-3 space-y-1 px-2">
        <NuxtLink to="/" @click="isOpen = false" :class="mobileLinkClass(isHomeActive)">
          Ana Sayfa
        </NuxtLink>

        <NuxtLink to="/savedNotes" @click="isOpen = false" :class="mobileLinkClass(route.path === '/savedNotes')">
          Kayıtlı Notlarım
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Wordmark from '~/components/Wordmark.vue'

const colorMode = useColorMode()
const route = useRoute()
const isOpen = ref(false)

const isHomeActive = computed(() => route.path === '/' || /^\/[^/]+\/[^/]+$/.test(route.path))

function linkClass(active: boolean) {
  return [
    'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
    active
      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
  ]
}

function mobileLinkClass(active: boolean) {
  return [
    'block pl-3 pr-4 py-2 text-base font-medium rounded-md transition-colors duration-200',
    active
      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
  ]
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
