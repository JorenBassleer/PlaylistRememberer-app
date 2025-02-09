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
    <span
      class="absolute py-2 px-3 rounded-full top-0 right-0  text-gray-600 font-semibold"
      :class="{'bg-white' : !withVideos}"
    >
      <template v-if="withVideos">
        ✅
      </template>
      <template v-else>
        {{ playlist.contentDetails.itemCount }}
      </template>
    </span>
    <section v-if="withVideos">
      <div
        class="cursor-pointer select-none"
        @click="showVideos = !showVideos"
      >
        Show videos
      </div>
      <div v-show="showVideos">
        <article
          v-for="video in videos"
          :key="video.id"
          class="flex justify-between items-center"
        >
          <div> {{ video.snippet.title }}</div>
          <div>{{ video.snippet.videoOwnerChannelTitle }}</div>
        </article>
      </div>
    </section>
  </article>
</template>
<script setup>
import { onMounted, shallowRef } from 'vue';
import useBaseStore from '@/stores/base';

const props = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
  withVideos: {
    type: Boolean,
    default: false,
  },
});

const store = useBaseStore();

const videos = shallowRef([]);
const showVideos = shallowRef(false);

onMounted(async () => {
  if (props.withVideos) videos.value = await store.getPlaylistVideos(props.playlist.youtubeId);
});
</script>
