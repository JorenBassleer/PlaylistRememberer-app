<template>
  <section>
    Dashboard
    {{ isAuthenticated }}
  </section>
</template>
<script setup>
import useBaseStore from '@/stores/base';

const { isAuthenticated } = useBaseStore();
</script>
