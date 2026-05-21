<script setup>
const props = defineProps({
  size: { type: String, default: 'md' },
  tag: { type: String, default: 'span' },
})

const SIZE_CLASS = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl sm:text-5xl',
  xl: 'text-5xl sm:text-6xl',
}

const sizeClass = computed(() => SIZE_CLASS[props.size] ?? SIZE_CLASS.md)
</script>

<template>
  <component
    :is="tag"
    class="inline-block font-extrabold tracking-tight bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent leading-none select-none"
    :class="sizeClass"
    aria-label="ExamApp"
  >
    ExamApp
  </component>
</template>
