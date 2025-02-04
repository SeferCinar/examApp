<script>
import GradeInputX from '~/components/GradeInputX.vue';
import GradeInfo from '~/components/GradeInfo.vue';
export default {
  components: {
    GradeInputX,
    GradeInfo
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
    ]
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
  <div class="flex flex-col items-center justify-center bg-gray-900 min-h-screen p-6">
   <div class="buttons flex flex-row gap-4">
    <button @click="navigateTo('/basicMode')" 
      class="py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md transition">
      Basit Moda Geç
    </button>

    <button @click="addGradeComponent" 
      class="py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md transition">
      Not Bileşeni Ekle
    </button>

   </div>
    <div class="flex-1 flex flex-col items-center bg-linear-to-t from-emerald-900/40 to-sky-900/50  p-6 rounded-xl border border-gray-600 hover:border-gray-400 hover:shadow-lg transition-all mt-6">
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
      <div class="text-yellow-400 mt-2 " >
        Toplam ağırlık 100 olmalıdır. <br>
        <span v-if="totalWeight !== 100" >Şu anki toplam: {{ totalWeight }}</span>
      </div>
      <GradeInfo
        gradeText="Notunuz"
        :gradeValue="totalGrade"></GradeInfo>
      <GradeInfo
        gradeText="Harf Notunuz"
        :gradeValue="letterGrade"></GradeInfo>
    </div>
  </div>
</template>
