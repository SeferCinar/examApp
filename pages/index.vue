<script setup>
const lastUsed = useLastUsedConfig()
const router = useRouter()

const AVAILABLE_CONFIGS = [
  {
    id: 'adu-bilgisayar-muh',
    universitySlug: 'adu',
    departmentSlug: 'bilgisayar-muh',
    universityShort: 'ADÜ',
    universityName: 'Aydın Adnan Menderes Üniversitesi',
    departmentName: 'Bilgisayar Mühendisliği',
  },
]

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

    <div class="w-full max-w-md space-y-3">
      <NuxtLink
        v-for="entry in AVAILABLE_CONFIGS"
        :key="entry.id"
        :to="`/${entry.universitySlug}/${entry.departmentSlug}`"
        class="block p-4 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
      >
        <div class="font-semibold text-gray-800 dark:text-gray-200">
          {{ entry.universityShort }} — {{ entry.departmentName }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ entry.universityName }}
        </div>
      </NuxtLink>
    </div>

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
