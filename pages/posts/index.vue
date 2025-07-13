<template>
  <div class="max-w-4xl mx-auto py-10 px-4 bg-white dark:bg-darkbg min-h-screen transition-colors">
    <h1 class="text-4xl font-extrabold mb-10 text-center text-blue-700 dark:text-darkprimary tracking-tight">Blog de Posts</h1>
    <div v-if="paginated.length" class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
      <div v-for="post in paginated" :key="post.id" class="bg-white dark:bg-darkcard rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col gap-4 border border-gray-100 dark:border-darkborder">
        <img v-if="post.image" :src="post.image" alt="Imagem do post" class="w-full h-40 object-cover rounded-xl mb-2" loading="lazy" />
        <NuxtLink :to="`/posts/${post.id}`" class="text-2xl font-bold text-blue-700 dark:text-darkprimary hover:underline mb-2">{{ post.title }}</NuxtLink>
        <p class="text-gray-600 dark:text-darktext line-clamp-3">{{ post.body }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-400 dark:text-darktext mb-10">Nenhum post encontrado.</div>
    <div v-if="totalPages > 1" class="flex justify-center gap-2 mb-8">
      <button @click="prev" :disabled="page === 1" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-darkborder hover:bg-gray-300 dark:hover:bg-darkcard disabled:opacity-50">Anterior</button>
      <button v-for="p in totalPages" :key="p" @click="setPage(p)" :class="['px-4 py-1 rounded-lg font-semibold', p === page ? 'bg-blue-600 dark:bg-darkprimary text-white' : 'bg-gray-100 dark:bg-darkcard text-blue-700 dark:text-darktext']">{{ p }}</button>
      <button @click="next" :disabled="page === totalPages" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-darkborder hover:bg-gray-300 dark:hover:bg-darkcard disabled:opacity-50">Próxima</button>
    </div>
    <div class="flex justify-center">
      <NuxtLink to="/create" class="px-6 py-3 bg-blue-700 dark:bg-darkprimary text-white rounded-xl font-bold shadow hover:bg-blue-800 dark:hover:bg-blue-700 transition">Novo Post</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
import { usePostsStorage } from '~/composables/usePostsStorage';
import { ref, computed } from 'vue';

const { posts } = usePostsStorage();

// Paginação
const page = ref(1);
const pageSize = 5;
const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));
const paginated = computed(() => {
  const start = (page.value - 1) * pageSize;
  return posts.value.slice(start, start + pageSize);
});
function next() { if (page.value < totalPages.value) page.value++; }
function prev() { if (page.value > 1) page.value--; }
function setPage(p: number) { if (p >= 1 && p <= totalPages.value) page.value = p; }
</script>
