<script setup>
import GradeInputX from '~/components/GradeInputX.vue'
import GradeInfo from '~/components/GradeInfo.vue'
import SaveNotes from '~/components/SaveNotes.vue'

const config = await useUniversityConfig('adu-bilgisayar-muh')
if (!config) {
  throw createError({ statusCode: 500, statusMessage: 'Yapılandırma yüklenemedi.' })
}

const { letterFromScore } = useGradeCalculator(config)

const gradeComponents = ref([
  { name: 'Midterm', weight: config.examWeights.midterm * 100, value: 0 },
  { name: 'Final', weight: config.examWeights.final * 100, value: 0 },
])
const isSaveModalOpen = ref(false)

const totalWeight = computed(() =>
  gradeComponents.value.reduce((sum, c) => sum + Number(c.weight), 0)
)
const totalGrade = computed(() =>
  gradeComponents.value.reduce(
    (sum, c) => sum + (Number(c.value) * Number(c.weight)) / 100,
    0
  )
)
const letterGrade = computed(() => letterFromScore(totalGrade.value))

function addGradeComponent() {
  gradeComponents.value.push({
    name: 'Not ' + (gradeComponents.value.length + 1),
    weight: 0,
    value: 0,
  })
}

function removeGradeComponent(index) {
  if (gradeComponents.value.length > 1) {
    gradeComponents.value.splice(index, 1)
  } else {
    gradeComponents.value = []
  }
}

function openSaveModal() {
  isSaveModalOpen.value = true
}

function closeSaveModal() {
  isSaveModalOpen.value = false
}

function onNoteSaved() {}
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
    <div class="buttons flex flex-row gap-4">
      <button
        @click="addGradeComponent"
        class="py-3 px-6 bg-sky-400 hover:bg-sky-500 text-white dark:bg-sky-800 dark:hover:bg-sky-900 dark:text-gray-100 font-semibold rounded-xl shadow-md transition"
      >
        Not Bileşeni Ekle
      </button>

      <button
        @click="openSaveModal"
        class="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:text-gray-100 font-semibold rounded-xl shadow-md transition"
      >
        Notları Kaydet
      </button>
    </div>
    <div class="flex-1 flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-6 rounded-xl border border-gray-300 dark:border-gray-500 hover:border-gray-400 hover:shadow-lg transition-all mt-6">
      <GradeInputX
        v-for="(component, index) in gradeComponents"
        :key="index"
        v-model:value="component.value"
        v-model:weight="component.weight"
        :label="component.name"
        placeholder="Notunuzu girin"
        class="mb-4"
        @delete="removeGradeComponent(index)"
      />
      <div class="text-sky-800 dark:text-teal-600 font-bold text-m mt-2">
        Toplam ağırlık 100 olmalıdır. <br>
        <span v-if="totalWeight !== 100">Şu anki toplam: {{ totalWeight }}</span>
      </div>
      <GradeInfo
        gradeText="Notunuz"
        :gradeValue="totalGrade"
        textColor="text-purple-400 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"
      />
      <GradeInfo
        gradeText="Harf Notunuz"
        :gradeValue="letterGrade"
        textColor="text-purple-400 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"
      />
    </div>

    <SaveNotes
      :is-open="isSaveModalOpen"
      :grade-components="gradeComponents"
      :letter-grade="letterGrade"
      @close="closeSaveModal"
      @saved="onNoteSaved"
    />
  </div>
</template>
