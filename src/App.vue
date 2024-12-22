<script setup>
import { RouterView } from 'vue-router';
import useBaseStore from '@/stores/base';

const store = useBaseStore();

const testing = async () => {
  const resultOfTest = store.apiTest();
  console.log('resultOftest', resultOfTest);
};
await testing();
</script>

<template>
  <header>
    <div class="wrapper">

    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
