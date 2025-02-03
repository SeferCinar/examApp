<script>
export default {
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
      return this.gradeComponents.reduce((sum, component) => sum + component.weight, 0);
    }
  },
  computed: {
    conditionalPass() {
      const total = this.gradeComponents.reduce((sum, component) => 
        sum + (component.value * component.weight / 100), 0);
      return total * 0.5;
    },
    pass() {
      return this.gradeComponents.reduce((sum, component) => 
        sum + (component.value * component.weight / 100), 0);
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center bg-gray-800 min-h-screen p-6">
    <div class="flex flex-col items-left bg-gray-700 p-6 rounded-xl border border-gray-600 hover:border-gray-400 hover:shadow-lg transition-all mt-6">
      <div class="flex flex-row justify-between items-center gap-10">
        <div class="flex flex-1 flex-col border items-left ">
          <label class="text-gray-400 text-xs block mb-1"> Vize</label>
          <input v-model.number="gradeComponents[0].value" type="number" :placeholder="'test'"
           class="bg-gray-600 text-white placeholder-gray-400 p-2 rounded w-full border border-gray-500 focus:ring-2 focus:ring-cyan-400">
        </div>
        <div class="flex flex-col border items-left max-w-[80px]">
            <label class="text-gray-400 text-xs block mb-1"> Ağırlık</label>
            <input type="number" placeholder="0(%)"
            class="bg-gray-600 text-white placeholder-gray-400 p-2 rounded border border-gray-500 focus:ring-2 focus:ring-cyan-400  text-center">
        </div>
      </div>

      <div class="text-yellow-400 mb-4" v-if="getTotalWeight() !== 100">
        Toplam ağırlık 100 olmalıdır. Şu anki toplam: {{ getTotalWeight() }}
      </div>

      <div class="flex flex-col items-start border  border-gray-600 my-4 py-4 px-3 bg-sky-800 hover:bg-sky-700 transition-colors rounded w-full">
        <div class="font-bold  text-emerald-500">Puanın:</div>
        <div class="text-lg text font-semibold text-gray-300">{{ pass }}</div>
      </div>
      <div class="flex flex-col items-start border  border-gray-600 my-4 py-4 px-3 bg-sky-800 hover:bg-sky-700 transition-colors rounded w-full">
        <div class="font-bold  text-emerald-500">Şartlı geçmek için finalden alman gereken not:</div>
        <div class="text-lg text font-semibold text-gray-300">83.33</div>
      </div>

      <div class="flex flex-col items-start border border-gray-600 my-4 py-4 px-3 text-white bg-sky-800 hover:bg-sky-700 transition-colors rounded w-full">
        <div class="font-semibold">Geçmek için finalden alman gereken not:</div>
        <div class="text-lg font-bold">test</div>
      </div>
    </div>
  </div>
</template>
