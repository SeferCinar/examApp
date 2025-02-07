<template>
  <div class="flex flex-row justify-between items-center gap-6">
    <div class="flex flex-1 flex-col items-start">
      <label class="block text-xs mb-1 font-medium text-gray-700 dark:text-gray-300">{{ label }}</label>
      <input
        :readonly="readOnly"
        min="0"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        type="number"
        :placeholder="placeholder"
        class="w-full p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400
               bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
               border border-gray-300 dark:border-gray-700
               placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
    <div class="flex flex-col my-1 items-start max-w-[80px]">
      <label class="block text-xs mb-1 font-medium text-gray-700 dark:text-gray-300">Ağırlık</label>
      <input
        min="0"
        :value="weight"
        @input="$emit('update:weight', $event.target.value)"
        type="number"
        placeholder="0(%)"
        class="w-full p-2 rounded shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-cyan-400
               bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
               border border-gray-300 dark:border-gray-700
               placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
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
  emits: ['update:value', 'update:weight'],
};
</script>
