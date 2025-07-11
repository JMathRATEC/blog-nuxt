<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, navigateTo } from '#imports';
import { NuxtLink } from '#components';
import { usePostsStorage } from '~/composables/usePostsStorage';

const route = useRoute();
const id = route.params.id as string;
const { getById, update } = usePostsStorage();

const title = ref('');
const body = ref('');
const image = ref('');
const errorMessage = ref('');
const isSaving = ref(false);
const isLoaded = ref(false);

onMounted(() => {
  const post = getById(id);
  if (!post) {
    errorMessage.value = 'Post não encontrado.';
    return;
  }
  title.value = post.title;
  body.value = post.body;
  image.value = post.image || '';
  isLoaded.value = true;
});

async function submit() {
  errorMessage.value = '';
  isSaving.value = true;
  try {
    update(id, { title: title.value, body: body.value, image: image.value });
    navigateTo(`/posts/${id}`);
  } catch (e) {
    errorMessage.value = 'Erro ao salvar as alterações.';
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div v-if="errorMessage" class="min-h-screen flex items-center justify-center">
    <div class="bg-red-100 text-red-800 p-6 rounded-xl shadow text-center text-lg">
      {{ errorMessage }}
      <div class="mt-4">
        <NuxtLink to="/posts" class="text-blue-700 hover:underline">Voltar para posts</NuxtLink>
      </div>
    </div>
  </div>
  <div v-else-if="isLoaded" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-darkbg dark:to-darkcard py-10 transition-colors">
    <form @submit.prevent="submit" class="w-full max-w-lg bg-white dark:bg-darkcard p-10 rounded-2xl shadow-2xl space-y-7 border border-blue-100 dark:border-darkborder">
      <h1 class="text-3xl font-extrabold mb-2 text-center text-blue-700 dark:text-darkprimary">Editar Post</h1>
      <input v-model="title" placeholder="Título" required class="w-full border-2 border-blue-200 dark:border-darkborder dark:bg-darkbg dark:text-darktext rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-darkprimary transition" />
      <textarea v-model="body" placeholder="Conteúdo" required class="w-full border-2 border-blue-200 dark:border-darkborder dark:bg-darkbg dark:text-darktext rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-darkprimary transition min-h-[100px]" />
      <input v-model="image" placeholder="URL da imagem" required class="w-full border-2 border-blue-200 dark:border-darkborder dark:bg-darkbg dark:text-darktext rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-darkprimary transition" />
      <div v-if="image" class="flex justify-center mb-2">
        <img :src="image" alt="Preview" class="max-h-40 rounded-xl shadow border dark:border-darkborder" loading="lazy" />
      </div>
      <button type="submit" :disabled="isSaving" class="w-full bg-blue-700 dark:bg-darkprimary text-white py-3 rounded-xl font-bold shadow hover:bg-blue-800 dark:hover:bg-blue-700 transition disabled:opacity-50">
        {{ isSaving ? 'Salvando...' : 'Salvar' }}
      </button>
      <div class="text-center mt-2">
        <NuxtLink :to="`/posts/${id}`" class="text-blue-600 dark:text-darkprimary hover:underline">Cancelar</NuxtLink>
      </div>
    </form>
  </div>
</template>