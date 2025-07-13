import { useStorage } from '@vueuse/core';
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useStorage('isLoggedIn', false);
  if (!isLoggedIn.value) {
    return navigateTo('/');
  }
}); 