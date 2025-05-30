<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" v-if="isOpen">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Notları Kaydet</h2>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Not Adı</label>
        <input
          v-model="noteName"
          type="text"
          placeholder="Not adını girin"
          class="w-full p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400
                 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 border border-gray-300 dark:border-gray-600
                 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notlar</label>
        <div class="space-y-2">
          <div v-for="(component, index) in gradeComponents" :key="index" 
               class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span>{{ component.name }}:</span>
            <span>{{ component.value }} ({{ component.weight }}%)</span>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Harf Notu</label>
        <div class="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{{ letterGrade }}</div>
      </div>

      <div class="flex justify-end gap-2">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          İptal
        </button>
        <button
          @click="saveNote"
          class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          :disabled="!noteName"
        >
          Kaydet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    gradeComponents: {
      type: Array,
      required: true
    },
    letterGrade: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      noteName: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.noteName = ''
    },
    saveNote() {
      if (!this.noteName) return

      const savedNotes = JSON.parse(localStorage.getItem('savedNotes') || '[]')
      const newNote = {
        id: Date.now(),
        name: this.noteName,
        components: this.gradeComponents,
        letterGrade: this.letterGrade,
        date: new Date().toISOString()
      }

      savedNotes.push(newNote)
      localStorage.setItem('savedNotes', JSON.stringify(savedNotes))
      
      this.closeModal()
      this.$emit('saved')
    }
  }
}
</script> 