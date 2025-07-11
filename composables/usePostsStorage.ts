import { useStorage } from '@vueuse/core'
import type { Post } from '~/stores/posts'

const posts = useStorage<Post[]>('posts', [
  { id: '1', title: 'Primeiro Post', body: 'Conteúdo do primeiro post.', image: '' },
  { id: '2', title: 'Segundo Post', body: 'Conteúdo do segundo post.', image: '' },
  { id: '3', title: 'Terceiro Post', body: 'Conteúdo do terceiro post.', image: '' },
  { id: '4', title: 'Quarto Post', body: 'Conteúdo do quarto post.', image: '' },
  { id: '5', title: 'Quinto Post', body: 'Conteúdo do quinto post.', image: '' },
  { id: '6', title: 'Sexto Post', body: 'Conteúdo do sexto post.', image: '' },
])

export function usePostsStorage() {
  function getAll() {
    return posts.value
  }
  function getById(id: string) {
    return posts.value.find(p => p.id === id)
  }
  function add(post: Omit<Post, 'id'>) {
    const newPost = { ...post, id: Date.now().toString() }
    posts.value.push(newPost)
    return newPost
  }
  function update(id: string, data: Partial<Post>) {
    const idx = posts.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      posts.value[idx] = { ...posts.value[idx], ...data }
      return posts.value[idx]
    }
    return null
  }
  return { posts, getAll, getById, add, update }
} 