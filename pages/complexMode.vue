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
    addGradeComponent() {
      this.gradeComponents.push({
        name: 'Grade Component ' + (this.gradeComponents.length + 1),
        weight: 0,
        value: 0
      });
    },
    removeGradeComponent(index) {
      if (this.gradeComponents.length > 1) {
        this.gradeComponents.splice(index, 1);
      }
    },
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
  <div class="flex flex-col items-center justify-center bg-gray-800 min-h-screen p-6">
    <button @click="addGradeComponent" 
      class="py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-md transition">
      Not Bileşeni Ekle
    </button>

    <div class="flex-1 flex flex-col items-center bg-gray-700 p-6 rounded-xl border border-gray-600 hover:border-gray-400 hover:shadow-lg transition-all mt-6">
      <div v-for="(component, index) in gradeComponents" :key="index" class="w-full mb-4">
        <div class="flex border gap-4 items-center py-2 w-full">
          <div class="flex flex-col ">
            <label class="text-gray-400 text-xs block mb-1 ">Not Bileşeni {{ index + 1 }}</label> 
            <input v-model="component.name" type="text" 
              class="bg-gray-600 text-white placeholder-gray-400 p-2 rounded border border-gray-500 focus:ring-2 focus:ring-cyan-400 ">
          </div>
         <div class="flex flex-col border w-16">
            <label class="text-gray-400 text-xs block mb-1"> Ağırlık</label>
            <input v-model.number="component.weight" type="number" placeholder="Ağırlık (%)"
            class="bg-gray-600 text-white placeholder-gray-400 p-2 rounded border border-gray-500 focus:ring-2 focus:ring-cyan-400  text-center">
          </div>
          <button v-if="index >= 1" @click="removeGradeComponent(index)"
            class="h-10 w-8 flex items-center justify-center self-end p-2 bg-red-600 hover:bg-red-500 text-white rounded">
            X
          </button>
        </div>
        <input v-model.number="component.value" type="number" :placeholder="component.name + ' notu'"
          class="bg-gray-600 text-white placeholder-gray-400 p-2 mt-2 rounded w-full border border-gray-500 focus:ring-2 focus:ring-cyan-400">
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
