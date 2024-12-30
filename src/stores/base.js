import { defineStore } from 'pinia';

const useBaseStore = defineStore('base', () => {
  const getLoginUrl = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/google`);

    return response.json();
  };
  return { getLoginUrl };
});

export default useBaseStore;
