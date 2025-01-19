<template>
  <article class="flex flex-col md:flex-row item-start md:items-center border p-2 rounded gap-4">
    <img
      :src="playlist.snippet.thumbnails.medium.url"
      :alt="playlist.snippet.title"
    >
    <div>
      <h2 class="text-lg md:text-3xl font-semibold">
        {{ playlist.snippet.title }}
      </h2>
      <div>
        {{ new Date(playlist.snippet.publishedAt).toLocaleDateString() }}
      </div>
    </div>
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
