import type { Snippet } from './snippet';
import type { Video } from './video';

export type Playlist = {
  id: string
  snippet: Snippet
  contentDetails: {
    itemCount: number
  }
};

export type SavedPlaylist = {
  _id: string
  youtubeId: string
  videos: Video[]
};

export type CombinedPlaylist = Playlist & SavedPlaylist;
