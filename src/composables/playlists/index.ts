import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import useFetch from '../fetch';

const { fetch } = useFetch();

const usePlaylists = () => {
  const queryClient = useQueryClient();

  const playlistQuery = useQuery({
    queryKey: ['playlists'],
    queryFn: () => fetch('/playlist', {
      method: 'GET',
    }),
  });

  const savedPlaylistQuery = useQuery({
    queryKey: ['savedPlaylists'],
    queryFn: () => fetch('/playlist/saved', {
      method: 'GET',
    }),
  });

  const addSavedPlaylistMutation = useMutation({
    mutationFn: (newPlaylists: string[]) => fetch('/playlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlaylists),
    }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['savedPlaylists'] });
    },
  });

  return { ...playlistQuery, savedPlaylists: savedPlaylistQuery, savePlaylist: addSavedPlaylistMutation };
};

export default usePlaylists();
