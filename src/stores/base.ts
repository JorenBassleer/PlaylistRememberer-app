import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Playlist, SavedPlaylist, CombinedPlaylist } from '@/types/playlist';
import type { Video } from '@/types/video';
import useFetch from '@/composables/api';

const useBaseStore = defineStore('base', () => {
  const { fetch } = useFetch();

  const userPlaylists = ref<Playlist[]>([]);
  const savedPlaylists = ref<SavedPlaylist[]>([]);
  const isAuthenticated = ref(false);

  const allUserPlaylists = computed(() => userPlaylists.value.reduce<{ saved: CombinedPlaylist[], unsaved: Playlist[] }>(
    (acc, userPlaylist) => {
      const isSaved = savedPlaylists.value.find((savedPlaylist) => savedPlaylist.youtubeId === userPlaylist.id);
      if (isSaved) {
        acc.saved.push({ ...userPlaylist, ...isSaved });
      } else acc.unsaved.push(userPlaylist);
      return acc;
    },
    { saved: [], unsaved: [] },
  ));

  const getLoginUrl = async () => fetch<string>('/google', {
    method: 'GET',
  });

  const handleAuthCallback = async (payload: { code: string, state: string }) => fetch('/google/oauth2callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload }),
  });

  const checkAuth = async () => {
    try {
      const response = await fetch<{ authenticated: boolean }>('/google/validate', {
        method: 'GET',
      });
      isAuthenticated.value = response.authenticated;
    } catch (error) {
      isAuthenticated.value = false;
    }
  };

  const getPlaylists = async () => {
    try {
      const response = await fetch<{ items: Playlist[] }>('/playlist', {
        method: 'GET',
      });
      // TODO: use the pagination accessible in response.pageInfo & such
      userPlaylists.value = response.items;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e instanceof Error ? e.message : e);
    }
  };

  const getSavedPlaylists = async () => {
    try {
      savedPlaylists.value = await fetch('/playlist/saved', {
        method: 'GET',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e instanceof Error ? e.message : e);
    }
  };

  const savePlaylists = async (playlists: string[]) => {
    try {
      await fetch('/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlists),
      });
      await getSavedPlaylists();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e instanceof Error ? e.message : e);
    }
  };

  const getPlaylistVideos = async (youtubeId: string): Promise<Video[]> => {
    try {
      const response = await fetch(`/playlist/videos/${youtubeId}`);
      const returnValue: Video[] = response as Video[];
      return returnValue;
    } catch (e) {
      const tmp: Video[] = [];
      return tmp;
      // return e.message;
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
