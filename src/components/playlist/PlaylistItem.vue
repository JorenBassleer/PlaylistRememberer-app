<template>
  <article class="flex items-center">
    <img
      :src="playlist.snippet.tumbnails.medium.url"
      :alt="playlist.snippet.title"
    />
  </article>
</template>
<script setup>
defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});
</script>
