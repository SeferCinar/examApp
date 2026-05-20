<script setup>
import GradeInput from '~/components/GradeInput.vue'
import GradeInfo from '~/components/GradeInfo.vue'

const config = await useUniversityConfig('adu-bilgisayar-muh')
if (!config) {
  throw createError({ statusCode: 500, statusMessage: 'Yapılandırma yüklenemedi.' })
}

const { passingThreshold, conditionalPassingThreshold } = useGradeCalculator(config)

const gradeComponents = reactive([
  { name: 'Midterm', weight: config.examWeights.midterm * 100, value: 0 },
  { name: 'Final', weight: config.examWeights.final * 100, value: 0 },
])

function getTotalWeight() {
  return gradeComponents.reduce((sum, c) => sum + Number(c.weight), 0)
}

function neededForThreshold(threshold) {
  const total = gradeComponents.reduce(
    (sum, c) => sum + (Number(c.value) * Number(c.weight)) / 100,
    0
  )
  const finalWeight = Number(gradeComponents[1].weight)
  if (finalWeight === 0) return '0.00'
  return ((threshold - total) / (finalWeight / 100)).toFixed(2)
}

const neededFinalGrade = computed(() => neededForThreshold(passingThreshold))
const conditionalPass = computed(() => neededForThreshold(conditionalPassingThreshold))
</script>

<template>
  <div class="flex flex-col items-center bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
    <div class="flex flex-col items-left bg-gray-200 dark:bg-gray-700 p-6 rounded-xl border border-gray-300 dark:border-gray-500 hover:border-gray-400 hover:shadow-lg transition-all mt-6">
      <GradeInput
        v-model:value="gradeComponents[0].value"
        v-model:weight="gradeComponents[0].weight"
        label="Vize"
        placeholder="Vize notunuzu girin"
      />
      <GradeInput
        :readOnly="true"
        v-model:value="neededFinalGrade"
        v-model:weight="gradeComponents[1].weight"
        label="Final"
        placeholder="Final notunuzu girin"
      />
      <div class="text-sky-800 dark:text-teal-600 font-bold text-m mt-2">
        Toplam ağırlık 100 olmalıdır. <br>
        <span v-if="getTotalWeight() !== 100">Şu anki toplam: {{ getTotalWeight() }}</span>
      </div>

      <GradeInfo
        gradeText="Şartlı geçmek için gereken not"
        :gradeValue="conditionalPass"
        textColor="text-purple-400 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"
      />

      <GradeInfo
        gradeText="Geçmek için gereken not"
        :gradeValue="neededFinalGrade"
        textColor="'text-emerald-500 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"
      />
    </div>
  </div>
</template>
