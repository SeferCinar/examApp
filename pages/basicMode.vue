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
  <div class="flex flex-col items-center bg-gradient-to-r from-gray-900 to-zinc-900 min-h-screen p-6">
    <!-- <button @click="navigateTo('/advancedMode')"
      class="mt-4 py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md transition">
      Detaylı Moda Geç
    </button> -->
    <div class="flex flex-col items-left bg-linear-to-t from-emerald-900/40 to-sky-900/50 p-6 rounded-xl border border-gray-600 hover:border-gray-400 hover:shadow-lg transition-all mt-6">
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
      <div class="text-yellow-400 mt-2 " >
        Toplam ağırlık 100 olmalıdır. <br>
        <span v-if="getTotalWeight() !== 100" >Şu anki toplam: {{ getTotalWeight() }}</span>
      </div>

      <GradeInfo
        gradeText="Şartlı geçmek için gereken not"
        :gradeValue="conditionalPass"
        infoTextColor="text-emerald-500"
        infoBgColor="bg-amber-500 dark:bg-sky-800"
        infoBgColorHover="hover:bg-sky-700"
        ></GradeInfo>

      <GradeInfo
        gradeText="Geçmek için gereken not"
        :gradeValue="neededFinalGrade"
        infoTextColor="text-emerald-500"
        infoBgColor="bg-amber-500 dark:bg-sky-800"
        infoBgColorHover="hover:bg-sky-700"></GradeInfo>
    </div>
  </div>
</template>
