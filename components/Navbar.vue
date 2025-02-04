<template>
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-center h-16">
          
          <div class="flex items-center">
            <div class="hidden sm:flex sm:space-x-8 mr-4">
              <NuxtLink to="/" 
                       class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                Ana Sayfa
              </NuxtLink>
              
              <NuxtLink to="/basicMode" 
                       class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                Basit Mod
              </NuxtLink>
  
              <NuxtLink to="/advancedMode" 
                       class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                Detaylı Mod
              </NuxtLink>

            </div>
  
            <button @click="toggleColorMode" 
                    class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
              <svg v-if="colorMode === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
  
            <div class="ml-3 relative md:hidden">
              <button @click="isOpen = !isOpen" 
                      class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div v-show="isOpen" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <NuxtLink to="/" 
                   class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Ana Sayfa
          </NuxtLink>
          
          <NuxtLink to="/basicMode" 
                   class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Basit Mod
          </NuxtLink>
  
          <NuxtLink to="/advancedMode" 
                   class="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Detaylı Mod
          </NuxtLink>
  
        
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useColorMode } from '@vueuse/core'
  
  const colorMode = useColorMode()
  const isOpen = ref(false)
  
  function toggleColorMode() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  }
  </script> 