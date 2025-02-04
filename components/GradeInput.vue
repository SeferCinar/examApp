<template>
  <div class="flex flex-row justify-between items-center gap-6">
    <div class="flex flex-1 flex-col  items-left">
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
    <div class="flex flex-col  my-1 items-left max-w-[80px]">
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