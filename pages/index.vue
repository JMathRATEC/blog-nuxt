<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkbg">
    <form @submit.prevent="login" class="bg-white dark:bg-darkcard p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-6">
      <h1 class="text-3xl font-bold text-center text-blue-700 dark:text-darkprimary mb-4">Login</h1>
      <div>
        <label class="block mb-1 font-semibold text-gray-700 dark:text-darktext">E-mail</label>
        <input v-model="email" type="email" required class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-darkborder focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkbg dark:text-darktext" />
      </div>
      <div>
        <label class="block mb-1 font-semibold text-gray-700 dark:text-darktext">Senha</label>
        <input v-model="password" type="password" required class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-darkborder focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkbg dark:text-darktext" />
      </div>
      <button type="submit" class="w-full py-3 bg-blue-700 dark:bg-darkprimary text-white rounded-lg font-bold hover:bg-blue-800 dark:hover:bg-blue-700 transition">Entrar</button>
      <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const validEmail = 'admin@exemplo.com';
const validPassword = '123456';

const isLoggedIn = useStorage('isLoggedIn', false);

function login() {
  if (email.value === validEmail && password.value === validPassword) {
    isLoggedIn.value = true;
    router.push('/posts');
  } else {
    error.value = 'E-mail ou senha inválidos.';
  }
}
</script> 