import { defineStore } from 'pinia';

const useBaseStore = defineStore('base', () => {
  const getLoginUrl = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/google`);

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
  return { getLoginUrl, handleAuthCallback };
});

export default useBaseStore;
