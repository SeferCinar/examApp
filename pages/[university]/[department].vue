<script setup>
import BasicCalculator from '~/components/BasicCalculator.vue'
import AdvancedCalculator from '~/components/AdvancedCalculator.vue'

const route = useRoute()
const universitySlug = String(route.params.university ?? '')
const departmentSlug = String(route.params.department ?? '')
const id = `${universitySlug}-${departmentSlug}`

const config = await useUniversityConfig(id)

if (!config && import.meta.server) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

const lastUsed = useLastUsedConfig()
const mode = ref('basic')

onMounted(() => {
  if (config) {
    lastUsed.set({ id, university: universitySlug, department: departmentSlug })
  }
})

useHead({
  title: config
    ? `${config.university.shortCode} ${config.department.tr} — ExamApp`
    : 'Bulunamadı — ExamApp',
})

const router = useRouter()
function changeConfig() {
  lastUsed.clear()
  router.push('/')
}

const tabClass = (active) =>
  [
    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
    active
      ? 'bg-sky-500 text-white dark:bg-sky-700'
      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
  ]
</script>

<template>
  <div v-if="config" class="min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
    <div class="max-w-3xl mx-auto">
      <header class="text-center mb-6">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
          {{ config.university.shortCode }} — {{ config.department.tr }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ config.university.tr }}</p>
      </header>

      <div class="flex justify-center gap-2 mb-6">
        <button :class="tabClass(mode === 'basic')" @click="mode = 'basic'">Basit</button>
        <button :class="tabClass(mode === 'advanced')" @click="mode = 'advanced'">Detaylı</button>
      </div>

      <BasicCalculator v-if="mode === 'basic'" :config="config" />
      <AdvancedCalculator v-else :config="config" />

      <div class="text-center mt-8">
        <button
          type="button"
          @click="changeConfig"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
        >
          ← Üniversite / bölüm değiştir
        </button>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-6 text-center"
  >
    <div class="text-6xl mb-4">404</div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
      Bu bölüm için bir yapılandırma bulunamadı
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-1">
      İstenen kimlik:
      <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{{ id }}</code>
    </p>
    <p class="text-gray-600 dark:text-gray-400">
      URL:
      <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
        /{{ universitySlug }}/{{ departmentSlug }}
      </code>
    </p>

    <div class="mt-10 p-6 bg-white dark:bg-gray-700 rounded-xl shadow max-w-md">
      <p class="text-gray-800 dark:text-gray-200 mb-4">
        Bu üniversite/bölüm için katkıda bulunmak ister misin?
      </p>
      <a
        href="https://github.com/SeferCinar/examApp/blob/master/CONTRIBUTING.md"
        target="_blank"
        rel="noopener"
        class="inline-block py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
      >
        Katkı rehberi →
      </a>
      <NuxtLink
        to="/"
        class="ml-2 inline-block py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition"
      >
        Ana sayfa
      </NuxtLink>
    </div>
  </div>
</template>
