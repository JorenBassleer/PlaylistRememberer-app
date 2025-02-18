import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import useFetch from '../composables/fetch';

const useBaseStore = defineStore('base', () => {
  const { fetch } = useFetch();

  const userPlaylists = ref([]);
  const savedPlaylists = ref([]);
  const isAuthenticated = ref(false);

  const allUserPlaylists = computed(() => userPlaylists.value.reduce(
    (acc, userPlaylist) => {
      const isSaved = savedPlaylists.value.find((savedPlaylist) => savedPlaylist.youtubeId === userPlaylist.id);
      acc[isSaved ? 'saved' : 'unsaved'].push(isSaved ? { ...userPlaylist, ...isSaved } : userPlaylist);
      return acc;
    },
    { saved: [], unsaved: [] },
  ));

  const getLoginUrl = async () => fetch('/google', {
    method: 'GET',
  });

  const handleAuthCallback = async (payload) => fetch('/google/oauth2callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });

  const checkAuth = async () => {
    try {
      const response = await fetch('/google/validate', {
        method: 'GET',
      });
      isAuthenticated.value = response.authenticated;
    } catch (error) {
      isAuthenticated.value = false;
    }
  };

  const getPlaylists = async () => {
    try {
      const response = await fetch('/playlist', {
        method: 'GET',
      });
      // TODO: use the pagination accessible in response.pageInfo & such
      userPlaylists.value = response.items;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const getSavedPlaylists = async () => {
    try {
      savedPlaylists.value = await fetch('/playlist/saved', {
        method: 'GET',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const savePlaylists = async (playlists) => {
    try {
      await fetch('/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlists),
      });
      await getSavedPlaylists();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const getPlaylistVideos = async (youtubeId) => {
    try {
      return fetch(`/playlist/videos/${youtubeId}`);
    } catch (e) {
      return e.message;
    }
  };

  return {
    getLoginUrl,
    handleAuthCallback,
    checkAuth,
    getPlaylists,
    savePlaylists,
    getSavedPlaylists,
    getPlaylistVideos,
    isAuthenticated,
    allUserPlaylists,
  };
});

export default useBaseStore;
