<template>
  <article class="item-start relative flex flex-col gap-4 rounded border p-2">
    <img
      v-if="playlist.snippet.thumbnails"
      :src="playlist.snippet.thumbnails.medium.url"
      :alt="playlist.snippet.title"
    >
    <div>
      <h2 class="text-lg font-semibold md:text-3xl">
        {{ playlist.snippet.title }}
      </h2>
      <div>
        {{ new Date(playlist.snippet.publishedAt).toLocaleDateString() }}
      </div>
    </div>
    <span
      class="absolute right-0 top-0 rounded-full px-3 py-2 font-semibold text-gray-600"
      :class="{ 'bg-white': !withVideos }"
    >
      <template v-if="withVideos"> ✅ </template>
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
          class="flex items-center justify-between"
        >
          <div>{{ video.snippet.title }}</div>
          <div>{{ video.snippet.videoOwnerChannelTitle }}</div>
        </article>
      </div>
    </section>
  </article>
</template>
<script setup lang="ts">
import { onMounted, shallowRef, computed } from 'vue';
import type { Playlist, CombinedPlaylist } from '@/types/playlist';
import useBaseStore from '@/stores/base';
import type { Video } from '@/types/video';

// Handle it differently than combined
type Props = {
  playlist: Playlist | CombinedPlaylist
  withVideos?: boolean
};

const props = withDefaults(defineProps<Props>(), {
  withVideos: false,
});

const store = useBaseStore();

const videos = shallowRef<Video[]>([]);
const showVideos = shallowRef(false);

const combinedPlaylist = computed<CombinedPlaylist | null>(() => props.playlist as CombinedPlaylist);

onMounted(async () => {
  if (props.withVideos && combinedPlaylist.value) videos.value = await store.getPlaylistVideos(combinedPlaylist.value.youtubeId);
});
</script>
