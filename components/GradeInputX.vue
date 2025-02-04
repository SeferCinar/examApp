<template>
  <div class="flex flex-row justify-between items-center gap-4">
    <!-- Ana Input Alanı -->
    <div class="flex flex-1 flex-col items-left">
      <label class="text-gray-400 text-xs block mb-1">{{ label }}</label>
      <input
        :readonly="readOnly"
        min="0"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        type="number"
        :placeholder="placeholder"
        class="bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full border border-gray-500 focus:ring-2 focus:ring-cyan-400"
      />
    </div>

    <!-- Ağırlık Input Alanı -->
    <div class="flex flex-col items-left max-w-[80px]">
      <label class="text-gray-400 text-xs block mb-1">Ağırlık</label>
      <input
        min="0"
        :value="weight"
        @input="$emit('update:weight', $event.target.value)"
        type="number"
        placeholder="0(%)"
        class="bg-gray-700 text-white placeholder-gray-400 p-2 rounded border border-gray-500 focus:ring-2 focus:ring-cyan-400 text-center"
      />
    </div>

    <!-- Silme Butonu -->
    <button
      @click="$emit('delete')"
      class="bg-red-600 hover:bg-red-700 text-white mt-6 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:value', 'update:weight', 'delete'], // 'delete' emit'i eklendi
};
</script>