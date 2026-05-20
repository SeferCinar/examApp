<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-screen p-6">
    <div class="w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Kayıtlı Notlarım</h1>
      
      <div v-if="savedNotes.length === 0" class="text-center py-8 text-gray-600 dark:text-gray-400">
        Henüz kayıtlı not bulunmamaktadır.
      </div>

      <div v-else class="grid gap-6">
        <div v-for="note in savedNotes" :key="note.id" 
             class="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-sky-700 dark:to-emerald-700 p-4">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-semibold text-white">{{ note.name }}</h2>
                <p class="text-sm text-white/80">
                  {{ new Date(note.date).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) }}
                </p>
              </div>
              <div class="flex gap-2">
                <button @click="openEditModal(note)"
                        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deleteNote(note.id)"
                        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Notlar -->
              <div class="space-y-3">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Notlar</h3>
                <div v-for="(component, index) in note.components" :key="index"
                     class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ component.name }}</span>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 dark:text-emerald-400 font-semibold">{{ component.value }}</span>
                    <span class="text-gray-500 dark:text-gray-400 text-sm">({{ component.weight }}%)</span>
                  </div>
                </div>
              </div>

              <!-- Harf Notu -->
              <div class="flex flex-col justify-center items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Harf Notu</h3>
                <div class="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {{ note.letterGrade }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Notu Düzenle</h2>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Not Adı</label>
          <input
            v-model="editingNote.name"
            type="text"
            placeholder="Not adını girin"
            class="w-full p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400
                   bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   border border-gray-300 dark:border-gray-600
                   placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notlar</label>
          <div class="space-y-3">
            <div v-for="(component, index) in editingNote.components" :key="index" class="space-y-2">
              <div class="flex items-center gap-2">
                <input
                  v-model="component.name"
                  type="text"
                  placeholder="Not adı"
                  class="flex-1 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400
                         bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         border border-gray-300 dark:border-gray-600
                         placeholder-gray-500 dark:placeholder-gray-400"
                />
                <input
                  v-model.number="component.value"
                  type="number"
                  placeholder="Not"
                  class="w-20 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400
                         bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         border border-gray-300 dark:border-gray-600
                         placeholder-gray-500 dark:placeholder-gray-400"
                />
                <input
                  v-model.number="component.weight"
                  type="number"
                  placeholder="Ağırlık"
                  class="w-20 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400
                         bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         border border-gray-300 dark:border-gray-600
                         placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <div class="text-sky-800 dark:text-teal-600 font-bold text-sm mb-2">
            Toplam ağırlık 100 olmalıdır. <br>
            <span v-if="editingNoteTotalWeight !== 100" class="text-red-500">
              Şu anki toplam: {{ editingNoteTotalWeight }}
            </span>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Harf Notu</label>
          <div class="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {{ editingNoteLetterGrade }}
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button
            @click="closeEditModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            İptal
          </button>
          <button
            @click="saveEditedNote"
            class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            :disabled="!editingNote.name || editingNoteTotalWeight !== 100"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = await useUniversityConfig('adu-bilgisayar-muh')
if (!config) {
  throw createError({ statusCode: 500, statusMessage: 'Yapılandırma yüklenemedi.' })
}

const { letterFromScore } = useGradeCalculator(config)

const savedNotes = ref([])
const isEditModalOpen = ref(false)
const editingNote = ref(null)

const editingNoteLetterGrade = computed(() => {
  if (!editingNote.value) return ''
  const totalGrade = editingNote.value.components.reduce(
    (sum, c) => sum + (Number(c.value) * Number(c.weight)) / 100,
    0
  )
  return letterFromScore(totalGrade)
})

const editingNoteTotalWeight = computed(() => {
  if (!editingNote.value) return 0
  return editingNote.value.components.reduce(
    (sum, c) => sum + Number(c.weight),
    0
  )
})

function loadSavedNotes() {
  const notes = JSON.parse(localStorage.getItem('savedNotes') || '[]')
  savedNotes.value = notes.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function deleteNote(id) {
  if (confirm('Bu notu silmek istediğinizden emin misiniz?')) {
    const notes = JSON.parse(localStorage.getItem('savedNotes') || '[]')
    const updatedNotes = notes.filter((note) => note.id !== id)
    localStorage.setItem('savedNotes', JSON.stringify(updatedNotes))
    loadSavedNotes()
  }
}

function openEditModal(note) {
  editingNote.value = JSON.parse(JSON.stringify(note))
  isEditModalOpen.value = true
}

function closeEditModal() {
  isEditModalOpen.value = false
  editingNote.value = null
}

function saveEditedNote() {
  if (!editingNote.value.name) return

  const notes = JSON.parse(localStorage.getItem('savedNotes') || '[]')
  const index = notes.findIndex((note) => note.id === editingNote.value.id)

  if (index !== -1) {
    notes[index] = {
      ...editingNote.value,
      letterGrade: editingNoteLetterGrade.value,
      date: new Date().toISOString(),
    }
    localStorage.setItem('savedNotes', JSON.stringify(notes))
    loadSavedNotes()
    closeEditModal()
  }
}

onMounted(() => {
  loadSavedNotes()
})
</script> 