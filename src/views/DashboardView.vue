<template>
  <section>
    Dashboard
    <template v-if="userPlaylists?.length">
      <PlaylistItem
        v-for="playlist in userPlaylists"
        :key="playlist.id"
        :playlist="playlist"
      />
    </template>
    <div v-else>No playlists found from the user</div>
  </section>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import useBaseStore from '@/stores/base';
import PlaylistItem from '../components/playlist/PlaylistItem.vue';

const store = useBaseStore();
const { userPlaylists } = storeToRefs(store);

onMounted(async () => {
  await store.getPlaylists();
});
</script>
