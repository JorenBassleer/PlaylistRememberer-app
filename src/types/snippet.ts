export type Snippet = {
  title: string
  videoOwnerChannelTitle: string
  thumbnails: Thumbnail
  publishedAt: string
};

type Thumbnail = {
  medium: {
    url: string
  }
};
