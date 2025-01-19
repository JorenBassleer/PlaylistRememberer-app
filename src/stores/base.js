import { ref } from 'vue';
import { defineStore } from 'pinia';
import useFetch from '../composables/fetch';

const useBaseStore = defineStore('base', () => {
  const { fetch } = useFetch();

  const userPlaylists = ref([]);
  const isAuthenticated = ref(false);

  const getLoginUrl = async () =>
    fetch('/google', {
      method: 'GET',
    });

  const handleAuthCallback = async (payload) =>
    fetch('/google/oauth2callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload }),
    });

  const checkAuth = async () => {
    try {
      const response = await fetch('/google/validate', {
        method: 'GET',
      });
      isAuthenticated.value = response.authenticated;
    } catch (error) {
      isAuthenticated.value = false;
    }
  };

  const getPlaylists = async () => {
    try {
      userPlaylists.value = await fetch('/playlist', {
        method: 'GET',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return {
    getLoginUrl,
    handleAuthCallback,
    isAuthenticated,
    checkAuth,
    getPlaylists,
    userPlaylists,
  };
});

export default useBaseStore;
