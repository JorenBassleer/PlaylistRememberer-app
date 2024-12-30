<template>
  <div class="flex justify-center items-center h-screen">
      <div
        class="border bg-white rounded p-4 text-center text-gray-600 font-semibold cursor-pointer"
        @click="onLogin"
      >
        Login
      </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import useBaseStore from '@/stores/base';

const { getLoginUrl } = useBaseStore();

const onLogin = async () => {
  const url = await getLoginUrl();
  window.location.href = url;
};

const handleCallback = async () => {
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get('code');
  const state = queryParams.get('state');

  if (code && state) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/google/oauth2callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state }),
      });

      const data = await response.json();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during token exchange:', error);
    }
  }
};

// Call this function on the front-end's callback route
handleCallback();
</script>
