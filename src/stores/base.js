import { ref } from 'vue';
import { defineStore } from 'pinia';

const useBaseStore = defineStore('base', () => {
  const isAuthenticated = ref(false);

  const getLoginUrl = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/google`, {
      method: 'GET',
      credentials: 'include',
    });

    return response.json();
  };

  const handleAuthCallback = async (payload) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/google/oauth2callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload }),
      credentials: 'include',
    });
    return response.json();
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/google/validate`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      isAuthenticated.value = data.authenticated;
    } catch (error) {
      isAuthenticated.value = false;
    }
  };

  return {
    getLoginUrl,
    handleAuthCallback,
    isAuthenticated,
    checkAuth,
  };
});

export default useBaseStore;
