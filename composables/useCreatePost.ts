import { ref } from 'vue';
import type { Post } from '~/stores/posts';

export function useCreatePost() {
  const title = ref('');
  const body = ref('');
  const image = ref('');
  const error = ref('');
  const loading = ref(false);

  function validate() {
    if (!title.value.trim()) {
      error.value = 'Título é obrigatório.';
      return false;
    }
    if (!body.value.trim()) {
      error.value = 'Conteúdo é obrigatório.';
      return false;
    }
    if (!image.value.trim()) {
      error.value = 'URL da imagem é obrigatória.';
      return false;
    }
    error.value = '';
    return true;
  }

  async function submit() {
    if (!validate()) return false;
    loading.value = true;
    try {
      await $fetch('/api/posts', {
        method: 'POST',
        body: { title: title.value, body: body.value, image: image.value },
      });
      title.value = '';
      body.value = '';
      image.value = '';
      error.value = '';
      return true;
    } catch (e) {
      error.value = 'Erro ao criar post.';
      return false;
    } finally {
      loading.value = false;
    }
  }

  return { title, body, image, error, loading, validate, submit };
} 