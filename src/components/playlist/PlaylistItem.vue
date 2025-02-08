<template>
  <article class="flex flex-col item-start border p-2 rounded gap-4 relative">
    <img
      v-if="playlist.snippet.thumbnails"
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
    <span class="absolute py-2 px-3 rounded-full top-0 right-0 bg-white text-gray-600">{{ playlist.contentDetails.itemCount }}</span>
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
