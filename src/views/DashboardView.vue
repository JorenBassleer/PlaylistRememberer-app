<template>
  <section>
    Dashboard
    <div
      v-if="isLoading"
      class="flex items-center justify-center min-h-screen"
    >
      isLoading...
    </div>
    <template v-else-if="userPlaylists?.length">
      Already saved playlists
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-4">
        <PlaylistItem
          v-for="playlist in userPlaylists.filter((entry) => selectedPlaylists.includes(entry.id))"
          :key="playlist.id"
          :playlist="playlist"
          class="bg-white"
          @click="onSelectPlaylist(playlist.id)"
        />
      </section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PlaylistItem
          v-for="playlist in userPlaylists.filter((entry) => !selectedPlaylists.includes(entry.id))"
          :key="playlist.id"
          :playlist="playlist"
          class="cursor-pointer hover:border-2"
          @click="onSelectPlaylist(playlist.id)"
        />
      </div>
    </template>
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
const selectedPlaylists = ref([]);

// Have option to select all
const onSelectPlaylist = (playlistId) => {
  selectedPlaylists.value.push(playlistId);
  // Do call to backend
};

onMounted(async () => {
  isLoading.value = true;
  await store.getPlaylists();
  isLoading.value = false;
});
</script>
