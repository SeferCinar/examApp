<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-zinc-900 text-white">
      <!-- Başlık ve Açıklama -->
      <div class="text-center space-y-4">
        <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
          Welcome to Exam App V2
        </h1>
        <p class="text-lg text-gray-300">
          This is the home page. Get started by selecting a mode below.
        </p>
      </div>
  
      <!-- Butonlar -->
      <div class="mt-8  space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
        <!-- Basic Mode Butonu -->
        <button
          @click="navigateTo('/basicMode')"
          class="w-full sm:w-auto px-8 py-4 bg-amber-900 hover:bg-amber-800 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Start Basic Mode
        </button>
  
        <!-- Advanced Mode Butonu -->
        <button
          @click="navigateTo('/advancedMode')"
          class="w-full sm:w-auto px-8 py-4 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Start Advanced Mode
        </button>
  
        <!-- About Page Butonu -->
        <button
          @click="navigateTo('/about')"
          class="w-full sm:w-auto px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        message: 'Hello, welcome to the Exam App V2!'
      };
    },
    methods: {
      navigateTo(path) {
        this.$router.push(path); // Vue Router ile sayfa yönlendirmesi yapılır.
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ekstra stil tanımlamaları */
  </style>