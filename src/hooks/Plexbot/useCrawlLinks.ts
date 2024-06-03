import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { CrawlLinkApi, ICrawlLink } from '@plex-bot/api';

interface FetchCrawlLinksParams {
    url: string;
}

const fetchCrawlLinks = async (url: string): Promise<ICrawlLink> => {
    if (typeof window === 'undefined') {
        throw new Error('Window is not available');
    }

    const configuration = getConfiguration();
    const apiInstance = new CrawlLinkApi(configuration);

    try {
        const response = await apiInstance.crawlLinkAddLink({
            extractMediaRequest: {
                url,
                fileHost: '1fichier',
                userName: 'so',
                userId: '164434413839450112'
            }
        });
        console.log({ response });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const useCrawlLinks = (): UseMutationResult<ICrawlLink, Error, FetchCrawlLinksParams> => {
    return useMutation(({ url }: FetchCrawlLinksParams) => fetchCrawlLinks(url));
};
