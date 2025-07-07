# Blog Nuxt 3 - Desafio Técnico

Aplicação de blog desenvolvida em Nuxt 3 com TypeScript, Pinia, TailwindCSS, VueUse e MirageJS (mock backend). Permite listar, visualizar, criar posts (com imagem), paginação, dark mode e validação de formulário.

## Funcionalidades
- Listagem de posts com paginação
- Visualização individual do post
- Criação de novo post com validação e preview de imagem
- Mock de backend com MirageJS e persistência em localStorage
- Dark mode global (toggle no topo direito)
- Layout responsivo e moderno com Tailwind
- Composables reutilizáveis para posts

## Tecnologias
- [Nuxt 3](https://nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [VueUse](https://vueuse.org/)
- [MirageJS](https://miragejs.com/)

## Instalação

```bash
# Clone o repositório
https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# Instale as dependências
npm install
```

## Rodando o projeto

```bash
npm run dev
```
Acesse: [http://localhost:3000/posts](http://localhost:3000/posts)

> **Atenção:** O mock de backend (MirageJS) só funciona em modo desenvolvimento (`npm run dev`).

## Scripts úteis
- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — build de produção (sem mock MirageJS)
- `npm run preview` — preview do build

## Mock de Backend
- O MirageJS simula as rotas `/api/posts` e `/api/posts/:id`.
- Os posts são persistidos no localStorage do navegador.
- Sempre que recarregar, os posts criados permanecem salvos.
- Para resetar, limpe o localStorage pelo DevTools.

## Dark Mode
- Botão no topo direito alterna entre claro e escuro
- Cores customizadas para dark mode no Tailwind

## Extras implementados
- Validação de formulário com feedback
- Paginação (5 posts por página)
- Lazy loading de imagens
- Preview da imagem ao criar post
- Composables reutilizáveis (`usePosts`, `useCreatePost`)

## Estrutura de pastas
```
├── pages/
│   ├── posts/
│   │   ├── index.vue      # Listagem e paginação
│   │   └── [id].vue      # Visualização individual
│   └── create.vue        # Formulário de novo post
├── composables/
│   ├── usePosts.ts       # Listagem, paginação, busca
│   └── useCreatePost.ts  # Criação e validação
├── stores/
│   └── posts.ts          # Store Pinia
├── plugins/
│   └── mirage.ts         # Mock MirageJS
├── tailwind.config.js    # Tailwind + dark mode
├── app.vue               # Layout global + toggle dark
```

## Exemplo de uso dos composables

```ts
// Buscar posts e paginação
import { usePosts } from '~/composables/usePosts';
const { posts, fetchPosts, usePagination } = usePosts();
await fetchPosts();
const { paginated, page, totalPages, next, prev } = usePagination(5);

// Criar post com validação
import { useCreatePost } from '~/composables/useCreatePost';
const { title, body, image, error, submit } = useCreatePost();
// ...
await submit();
```

## Licença
MIT
