export interface IPlexBotPaginatedResponse<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    items: T[];
}

export interface ICrawlLink {
    mediaId: string;
    name: string;
    secondName: string;
    provider: IProvider;
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

export interface IProviderSearch {
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
}

export interface IProvider {
    displayName: string;
    name: string;
    url: string;
    enabled: boolean;
    searchEnabled: boolean;
    id: string;
}

export type TCategory = 'Film' | 'Série' | 'Animé' | 'Auto';
export type TStatus = 'Downloaded' | 'Active';

export interface ICollabsibleData {
    season: number
    quality: string
    version: string
    hasError: boolean
    url: string
    airedEpisodesCount: number
    totalEpisodesCount: number
}

export interface IData {
    id: string;
    name: string;
    provider: string;
    category: number;
    addedBy: string;
    status: TStatus;
    collabsibleData: ICollabsibleData;
  }
