<template>
    <div
      class="flex flex-col items-start my-4 py-4 px-3 rounded shadow-sm w-full border border-gray-300 dark:border-gray-700 transition-colors duration-200"
      :class="[bgColor, bgColorHover]"
    >
      <div class="font-bold" :class="textColor">{{ gradeText }}:</div>
      <div class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ gradeValue }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      gradeText: {
        type: String,
        required: true,
      },
      gradeValue: {
        type: [Number, String],
        required: true,
      },
      textColor: {
        type: String,
        required: false,
        default: 'text-emerald-500 dark:text-emerald-400',
      },
      bgColor: {
        type: String,
        required: false,
        default: 'bg-amber-100 dark:bg-sky-900',
      },
      bgColorHover: {
        type: String,
        required: false,
        default: 'hover:bg-amber-200 dark:hover:bg-sky-800',
      },
    },
  };
  </script>
  