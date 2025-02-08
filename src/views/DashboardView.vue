<template>
  <section>
    Dashboard
    <div
      v-if="isLoading"
      class="flex items-center justify-center min-h-screen"
    >
      isLoading...
    </div>
    <template v-else-if="allUserPlaylists.unsaved.length || allUserPlaylists.saved.length">
      Already saved playlists
      <button
        v-show="selectedPlaylists.length"
        class="bg-white text-gray-600 px-4 py-2 rounded cursor-pointer "
        @click="onSavePlaylists"
      >
        Save selected
      </button>
      <section
        v-if="allUserPlaylists.saved.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-4"
      >
        <PlaylistItem
          v-for="playlist in allUserPlaylists.saved"
          :key="playlist.id"
          :playlist="playlist"
          class="bg-green-500 text-white cursor-pointer"
        />
      </section>
      <template v-if="allUserPlaylists.unsaved.length">
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-4">
          <PlaylistItem
            v-for="playlist in allUserPlaylists.unsaved.filter((entry) => selectedPlaylists.includes(entry.id))"
            :key="playlist.id"
            :playlist="playlist"
            class="bg-white"
            @click="onDeselectPlaylist(playlist.id)"
          />
        </section>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PlaylistItem
            v-for="playlist in allUserPlaylists.unsaved.filter((entry) => !selectedPlaylists.includes(entry.id))"
            :key="playlist.id"
            :playlist="playlist"
            class="cursor-pointer hover:border-2"
            @click="onSelectPlaylist(playlist.id)"
          />
        </div>
      </template>
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
const { allUserPlaylists } = storeToRefs(store);

const isLoading = ref(false);
const selectedPlaylists = ref([]);

// Have option to select all
const onSelectPlaylist = (playlistId) => {
  selectedPlaylists.value.push(playlistId);
};

const onDeselectPlaylist = (playlistId) => {
  const toDeleteIndex = selectedPlaylists.value.findIndex((entry) => entry.id === playlistId);
  selectedPlaylists.value.splice(toDeleteIndex, 1);
};

const onSavePlaylists = async () => {
  await store.savePlaylists(selectedPlaylists.value);
};

onMounted(async () => {
  isLoading.value = true;

  await Promise.all([
    store.getPlaylists(),
    store.getSavedPlaylists(),
  ]);

  isLoading.value = false;
});
</script>
