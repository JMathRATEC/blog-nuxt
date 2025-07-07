<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-darkbg dark:to-darkcard py-10 transition-colors">
    <form @submit.prevent="onSubmit" class="w-full max-w-lg bg-white dark:bg-darkcard p-10 rounded-2xl shadow-2xl space-y-7 border border-blue-100 dark:border-darkborder">
      <h2 class="text-3xl font-extrabold mb-2 text-center text-blue-700 dark:text-darkprimary">Novo Post</h2>
      <input v-model="title" placeholder="Título" required class="w-full border-2 border-blue-200 dark:border-darkborder dark:bg-darkbg dark:text-darktext rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-darkprimary transition" />
      <textarea v-model="body" placeholder="Conteúdo" required class="w-full border-2 border-blue-200 dark:border-darkborder dark:bg-darkbg dark:text-darktext rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-darkprimary transition min-h-[100px]" />
      <input v-model="image" placeholder="URL da imagem" required class="w-full border-2 border-blue-200 dark:border-darkborder dark:bg-darkbg dark:text-darktext rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-darkprimary transition" />
      <div v-if="image" class="flex justify-center mb-2">
        <img :src="image" alt="Preview" class="max-h-40 rounded-xl shadow border dark:border-darkborder" loading="lazy" />
      </div>
      <div v-if="error" class="text-red-600 text-sm text-center">{{ error }}</div>
      <button type="submit" :disabled="loading" class="w-full bg-blue-700 dark:bg-darkprimary text-white py-3 rounded-xl font-bold shadow hover:bg-blue-800 dark:hover:bg-blue-700 transition disabled:opacity-50">{{ loading ? 'Criando...' : 'Criar' }}</button>
      <div class="text-center mt-2">
        <NuxtLink to="/posts" class="text-blue-600 dark:text-darkprimary hover:underline">Voltar para posts</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useCreatePost } from '~/composables/useCreatePost';
import { usePosts } from '~/composables/usePosts';
const { title, body, image, error, loading, submit } = useCreatePost();
const { reset } = usePosts();

async function onSubmit() {
  const ok = await submit();
  if (ok) {
    reset();
    navigateTo('/posts');
  }
}
</script>
