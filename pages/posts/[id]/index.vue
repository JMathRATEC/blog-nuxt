<script setup lang="ts">
import type { Post } from '~/stores/posts';
import { ref, onMounted } from 'vue';
import { useRoute } from '#imports';
import { NuxtLink } from '#components';
import { usePostsStorage } from '~/composables/usePostsStorage';
const route = useRoute();
const { getById } = usePostsStorage();
const post = ref<Post|null>(null);

onMounted(() => {
  post.value = getById(route.params.id as string) ?? null;
});
</script>

<template>
  <div v-if="post" class="max-w-2xl mx-auto mt-16 bg-white dark:bg-darkcard p-10 rounded-2xl shadow-2xl flex flex-col items-center border border-gray-100 dark:border-darkborder transition-colors">
    <img v-if="post.image" :src="post.image" alt="Imagem do post" class="w-full max-h-80 object-cover rounded-xl mb-6 shadow border dark:border-darkborder" loading="lazy" />
    <h1 class="text-3xl font-extrabold mb-4 text-blue-700 dark:text-darkprimary text-center">{{ post.title }}</h1>
    <p class="mb-8 text-gray-700 dark:text-darktext text-lg text-center">{{ post.body }}</p>
    <div class="flex gap-4">
      <NuxtLink to="/posts" class="px-6 py-2 bg-blue-700 dark:bg-darkprimary text-white rounded-xl font-bold shadow hover:bg-blue-800 dark:hover:bg-blue-700 transition">Voltar para posts</NuxtLink>
      <NuxtLink :to="`/posts/${post.id}/edit`" class="px-6 py-2 bg-yellow-500 text-white rounded-xl font-bold shadow hover:bg-yellow-600 transition">Editar</NuxtLink>
    </div>
  </div>
  <div v-else class="text-center mt-10 text-gray-500 dark:text-darktext">Post não encontrado.</div>
</template> 