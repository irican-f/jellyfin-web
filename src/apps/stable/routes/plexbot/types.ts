export interface PlexBotLinksResponse {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    items: Item[];
}

export interface Item {
    mediaId: string;
    name: string;
    secondName: string;
    provider: Provider;
    providerId: string;
    providerItemId: string;
    providerCategory: string;
    category: number;
    url: string;
    fileHost: string;
    thumbnailUrl: string;
    airedEpisodesCount: number;
    totalEpisodesCount: number;
    season: number;
    quality: string;
    version: string;
    downloaded: boolean;
    hasError: boolean;
    createdBy: string;
    authorId: string;
    createdAt: Date;
    origin: number;
    mediaServerType: number;
    id: string;
}

export interface Provider {
    displayName: string;
    name: string;
    url: string;
    enabled: boolean;
    searchEnabled: boolean;
    id: string;
}

export type TProvider = 'Tirexo' | 'Wawacity';
// TODO  type TCategory = 'Film' | 'Serie';
export type TStatus = 'Downloaded' | 'Extracted' | 'Planed';

export interface Data {
    id: string;
    name: string;
    provider: TProvider;
    category: number;
    addedBy: string;
    status: TStatus;
  }
