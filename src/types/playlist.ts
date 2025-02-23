import type { Snippet } from './snippet';

export type Playlist = {
  id: string
  youtubeId: string
  snippet: Snippet
  contentDetails: {
    itemCount: number
  }
};
