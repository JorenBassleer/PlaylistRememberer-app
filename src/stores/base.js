import { defineStore } from 'pinia';

const useBaseStore = defineStore('base', () => {
  const apiTest = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/video`);
    // eslint-disable-next-line no-console
    if (!response.ok) console.log('resposne:', response);
    return response.json();
  };
  return { apiTest };
});

export default useBaseStore;
