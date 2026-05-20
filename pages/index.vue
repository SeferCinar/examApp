<script setup>
import ConfigPicker from '~/components/ConfigPicker.vue'

const lastUsed = useLastUsedConfig()
const router = useRouter()

onMounted(() => {
  const last = lastUsed.get()
  if (last) {
    router.replace(`/${last.university}/${last.department}`)
  }
})

useHead({ title: 'ExamApp — Üniversite seçimi' })
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">ExamApp</h1>
      <p class="text-gray-600 dark:text-gray-400">Üniversiteni ve bölümünü seç</p>
    </header>

    <ConfigPicker class="w-full max-w-md" />

    <p class="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
      Bölümün listede yok mu?
      <a
        href="https://github.com/SeferCinar/examApp/blob/master/CONTRIBUTING.md"
        target="_blank"
        rel="noopener"
        class="text-emerald-600 dark:text-emerald-400 hover:underline"
      >
        Katkıda bulun
      </a>
      — bir JSON dosyası ekleyip PR aç.
    </p>
  </div>
</template>
