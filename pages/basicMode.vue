<script>
import GradeInput from '~/components/GradeInput.vue';
import GradeInfo from '~/components/GradeInfo.vue';
export default {
  components: {
    GradeInput,
    GradeInfo
  },
  data() {
    return {
      gradeComponents: [
        { name: 'Midterm', weight: 40, value: 0 },
        { name: 'Final', weight: 60, value: 0 }
      ],
    };
  },
  methods: {
    getTotalWeight() {
    return this.gradeComponents.reduce((sum, component) => sum + Number(component.weight), 0);
  },
  },
  computed: {
    neededFinalGrade(){
      const total = this.gradeComponents.reduce((sum, component) => 
        sum + (component.value * component.weight / 100), 0);
      var result = (55 - total) / (this.gradeComponents[1].weight / 100);
      return result.toFixed(2);
    },
    conditionalPass() {
      const total = this.gradeComponents.reduce((sum, component) => 
        sum + (component.value * component.weight / 100), 0);
      var result = (50 - total) / (this.gradeComponents[1].weight / 100);
      return result.toFixed(2);
    },
    pass() {
      return this.gradeComponents.reduce((sum, component) => 
        sum + (component.value * component.weight / 100), 0);
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
    <!-- <button @click="navigateTo('/advancedMode')"
      class="mt-4 py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md transition">
      Detaylı Moda Geç
    </button> -->
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
      <div class="text-sky-800 dark:text-teal-600 font-bold text-m mt-2 " >
        Toplam ağırlık 100 olmalıdır. <br>
        <span v-if="getTotalWeight() !== 100" >Şu anki toplam: {{ getTotalWeight() }}</span>
      </div>

      <GradeInfo
        gradeText="Şartlı geçmek için gereken not"
        :gradeValue="conditionalPass"
        textColor="text-purple-400 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800"
        ></GradeInfo>

      <GradeInfo
        gradeText="Geçmek için gereken not"
        :gradeValue="neededFinalGrade"
        textColor="'text-emerald-500 dark:text-emerald-400"
        bgColor="bg-gray-100 dark:bg-sky-900"
        bgColorHover="hover:bg-teal-50 dark:hover:bg-sky-800">
      </GradeInfo>
    </div>
  </div>
</template>
