<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="cursor-pointer rounded border bg-white p-4 text-center font-semibold text-gray-600"
      @click="onLogin"
    >
      Login
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import useBaseStore from '@/stores/base';

const { getLoginUrl, handleAuthCallback } = useBaseStore();

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
      await handleAuthCallback({ code, state });
      localStorage.setItem('oauthState', state);
      router.push('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during token exchange:', error);
    }
  }
};
// TODO only check this if certain params in URL
handleCallback();
</script>
