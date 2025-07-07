<template>
  <div v-if="post" class="max-w-2xl mx-auto mt-16 bg-white dark:bg-darkcard p-10 rounded-2xl shadow-2xl flex flex-col items-center border border-gray-100 dark:border-darkborder transition-colors">
    <img v-if="post.image" :src="post.image" alt="Imagem do post" class="w-full max-h-80 object-cover rounded-xl mb-6 shadow border dark:border-darkborder" loading="lazy" />
    <h1 class="text-3xl font-extrabold mb-4 text-blue-700 dark:text-darkprimary text-center">{{ post.title }}</h1>
    <p class="mb-8 text-gray-700 dark:text-darktext text-lg text-center">{{ post.body }}</p>
    <NuxtLink to="/posts" class="px-6 py-2 bg-blue-700 dark:bg-darkprimary text-white rounded-xl font-bold shadow hover:bg-blue-800 dark:hover:bg-blue-700 transition">Voltar para posts</NuxtLink>
  </div>
  <div v-else class="text-center mt-10 text-gray-500 dark:text-darktext">Post não encontrado.</div>
</template>

<script setup lang="ts">
import type { Post } from '~/stores/posts';
import { ref, onMounted } from 'vue';
const route = useRoute();
const post = ref<Post|null>(null);

onMounted(async () => {
  const res = await $fetch<any>(`/api/posts/${route.params.id}`);
  post.value = res?.post ?? res ?? null;
});
</script>
