import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { CrawlLinkApi, ICrawlLink } from '@plex-bot/api';

export interface FetchCrawlLinksParams {
    url: string;
}

const fetchCrawlLinks = async (url: string): Promise<ICrawlLink> => {
    if (typeof window === 'undefined') {
        throw new Error('Window is not available');
    }

    const configuration = getConfiguration();
    const apiInstance = new CrawlLinkApi(configuration);

    const user = await window.ApiClient.getUser(window.ApiClient.getCurrentUserId());

    return apiInstance.crawlLinkAddLink({
        extractMediaRequest: {
            url,
            fileHost: '1fichier',
            userName: user.Name || 'Unknown',
            userId: user.Id || 'Unknown'
        }
    });
};

export const useCrawlLinks = (): UseMutationResult<ICrawlLink, Error, FetchCrawlLinksParams> => {
    return useMutation(({ url }: FetchCrawlLinksParams) => fetchCrawlLinks(url));
};
