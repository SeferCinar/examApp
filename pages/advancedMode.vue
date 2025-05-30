<script>
import GradeInputX from '~/components/GradeInputX.vue';
import GradeInfo from '~/components/GradeInfo.vue';
import SaveNotes from '~/components/SaveNotes.vue';
export default {
  components: {
    GradeInputX,
    GradeInfo,
    SaveNotes
  },
  data() {
    return {
      gradeComponents: [
        { name: 'Midterm', weight: 40, value: 0 },
        { name: 'Final', weight: 60, value: 0 }
      ],
      gradeRanges: [
      { min: 95, grade: 'A1' },
      { min: 90, grade: 'A2' },
      { min: 85, grade: 'A3' },
      { min: 80, grade: 'B1' },
      { min: 75, grade: 'B2' },
      { min: 70, grade: 'B3' },
      { min: 65, grade: 'C1' },
      { min: 60, grade: 'C2' },
      { min: 55, grade: 'C3' },
      { min: 50, grade: 'D1' },
      { min: 0, grade: 'F1' }
    ],
    isSaveModalOpen: false
    };
  },
  methods: {
    addGradeComponent() {
      this.gradeComponents.push({
        name: 'Not ' + (this.gradeComponents.length + 1),
        weight: 0,
        value: 0
      });
    },
    removeGradeComponent(index) {
      if (this.gradeComponents.length > 1) {
        this.gradeComponents.splice(index, 1);
      }
      else {
        this.gradeComponents = [];
      }
    },
    openSaveModal() {
      this.isSaveModalOpen = true;
    },
    closeSaveModal() {
      this.isSaveModalOpen = false;
    },
    onNoteSaved() {
      // You can add a notification or feedback here if needed
    }
  },
  computed: {
    letterGrade() {
      const grade = this.totalGrade;
      const range = this.gradeRanges.find(range => grade >= range.min);
      return range ? range.grade : 'Geçersiz';
    },
    totalWeight() {
      return this.gradeComponents.reduce((sum, component) => sum + Number(component.weight), 0);
    },
    totalGrade() {
      return this.gradeComponents.reduce((sum, component) => 
        sum + (Number(component.value) * Number(component.weight) / 100), 0);
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
   <div class="buttons flex flex-row gap-4">
    <!-- <button @click="navigateTo('/basicMode')" 
      class="py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md transition">
      Basit Moda Geç
    </button> -->

    <button @click="addGradeComponent" 
      class="py-3 px-6 bg-sky-400 hover:bg-sky-500 text-white dark:bg-sky-800 dark:hover:bg-sky-900 dark:text-gray-100 font-semibold rounded-xl shadow-md transition">
      Not Bileşeni Ekle
    </button>

    <button @click="openSaveModal" 
      class="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:text-gray-100 font-semibold rounded-xl shadow-md transition">
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
      <div class="text-sky-800 dark:text-teal-600 font-bold text-m mt-2" >
        Toplam ağırlık 100 olmalıdır. <br>
        <span v-if="totalWeight !== 100" >Şu anki toplam: {{ totalWeight }}</span>
      </div>
      <GradeInfo
        gradeText="Notunuz"
        :gradeValue="totalGrade"
        textColor="text-purple-400 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"></GradeInfo>
      <GradeInfo
        gradeText="Harf Notunuz"
        :gradeValue="letterGrade"
        textColor="text-purple-400 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"></GradeInfo>
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
