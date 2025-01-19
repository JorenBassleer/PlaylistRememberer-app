<template>
  <section>
    Dashboard
    <div
      v-if="isLoading"
      class="flex items-center justify-center min-h-screen"
    >
      isLoading...
    </div>
    <div
      v-else-if="userPlaylists?.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md gap-4"
    >
      <PlaylistItem
        v-for="playlist in userPlaylists"
        :key="playlist.id"
        :playlist="playlist"
      />
    </div>
    <div v-else>
      No playlists found from the user
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useBaseStore from '@/stores/base';
import PlaylistItem from '../components/playlist/PlaylistItem.vue';

const store = useBaseStore();
const { userPlaylists } = storeToRefs(store);

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await store.getPlaylists();
  isLoading.value = false;
});
</script>
