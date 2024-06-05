interface Genre {
    name: string;
    id: string;
}

export interface Episode {
    country: string;
    collectionViewUrl: string;
    closedCaptioning: string;
    collectionId: number;
    collectionName: string;
    artworkUrl160: string;
    episodeContentType: string;
    episodeFileExtension: string;
    genres: Genre[];
    episodeGuid: string;
    description: string;
    shortDescription: string;
    releaseDate: string;
    trackId: number;
    trackName: string;
    artistIds: number[];
    feedUrl: string;
    artworkUrl600: string;
    previewUrl: string;
    episodeUrl: string;
    trackTimeMillis: number;
    trackViewUrl: string;
    artworkUrl60: string;
    artistViewUrl: string;
    kind: string;
    wrapperType: string;
}
