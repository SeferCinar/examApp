<script setup>
const { data: configs, error, pending } = await useFetch('/api/configs', {
  default: () => [],
})

const selectedUni = ref(null)
const selectedDept = ref(null)

const universities = computed(() => {
  if (!configs.value?.length) return []
  const seen = new Map()
  for (const c of configs.value) {
    if (!seen.has(c.universitySlug)) {
      seen.set(c.universitySlug, {
        slug: c.universitySlug,
        shortCode: c.university.shortCode,
        name: c.university.tr,
      })
    }
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, 'tr'))
})

const departments = computed(() => {
  if (!configs.value?.length || !selectedUni.value) return []
  return configs.value
    .filter((c) => c.universitySlug === selectedUni.value)
    .map((c) => ({ slug: c.departmentSlug, name: c.department.tr }))
    .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
})

watch(selectedUni, () => {
  selectedDept.value = null
})

const canContinue = computed(() => Boolean(selectedUni.value && selectedDept.value))

const router = useRouter()
function go() {
  if (canContinue.value) {
    router.push(`/${selectedUni.value}/${selectedDept.value}`)
  }
}

const baseSelectClass =
  'w-full p-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed'
</script>

<template>
  <form class="space-y-4" @submit.prevent="go">
    <div>
      <label for="picker-university" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Üniversite
      </label>
      <select
        id="picker-university"
        v-model="selectedUni"
        :class="baseSelectClass"
        :disabled="pending || !!error"
      >
        <option :value="null" disabled>
          {{ pending ? 'Yükleniyor…' : 'Bir üniversite seç' }}
        </option>
        <option v-for="u in universities" :key="u.slug" :value="u.slug">
          {{ u.shortCode }} — {{ u.name }}
        </option>
      </select>
    </div>

    <div>
      <label for="picker-department" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Bölüm
      </label>
      <select
        id="picker-department"
        v-model="selectedDept"
        :class="baseSelectClass"
        :disabled="!selectedUni"
      >
        <option :value="null" disabled>
          {{ selectedUni ? 'Bir bölüm seç' : 'Önce üniversite seç' }}
        </option>
        <option v-for="d in departments" :key="d.slug" :value="d.slug">
          {{ d.name }}
        </option>
      </select>
    </div>

    <button
      type="submit"
      :disabled="!canContinue"
      class="w-full py-3 px-6 bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sky-500 dark:disabled:hover:bg-sky-700"
    >
      Devam et →
    </button>

    <p v-if="error" class="text-sm text-red-500 dark:text-red-400">
      Yapılandırmalar yüklenemedi. Sayfayı yenilemeyi dene.
    </p>
  </form>
</template>
