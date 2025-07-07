<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
    <div class="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <h1 class="text-2xl font-bold">Blog de postagens</h1>
      <button @click="() => toggleDark()" class="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-xl shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition font-bold">
        {{ isDark ? '🌙 Dark' : '☀️ Light' }}
      </button>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark({ selector: 'html' });
const toggleDark = useToggle(isDark);
</script>

<style global>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
