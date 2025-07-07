import { ref, computed } from 'vue';
import type { Post } from '~/stores/posts';

const posts = ref<Post[]>([]);
const isLoaded = ref(false);

export function usePosts() {
  // Busca todos os posts (com cache)
  async function fetchPosts() {
    if (!isLoaded.value) {
      const res = await $fetch<any>('/api/posts');
      posts.value = Array.isArray(res) ? res : res.posts ?? [];
      isLoaded.value = true;
    }
    return posts.value;
  }

  // Busca post por id
  async function fetchPostById(id: string) {
    const res = await $fetch<any>(`/api/posts/${id}`);
    return res?.post ?? res ?? null;
  }

  // Paginação
  function usePagination(pageSize = 5) {
    const page = ref(1);
    const totalPages = computed(() => Math.ceil(posts.value.length / pageSize));
    const paginated = computed(() => {
      const start = (page.value - 1) * pageSize;
      return posts.value.slice(start, start + pageSize);
    });
    function next() { if (page.value < totalPages.value) page.value++; }
    function prev() { if (page.value > 1) page.value--; }
    function setPage(p: number) { if (p >= 1 && p <= totalPages.value) page.value = p; }
    return { page, totalPages, paginated, next, prev, setPage };
  }

  // Reset cache (útil após criar post)
  function reset() { isLoaded.value = false; }

  return { posts, fetchPosts, fetchPostById, usePagination, reset };
} 