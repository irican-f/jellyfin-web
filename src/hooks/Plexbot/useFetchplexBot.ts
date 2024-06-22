import { useQuery } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { CrawlLinkApi } from '@plex-bot/api';

const fetchCrawlLinks = async (
    page: number,
    limit: number
) => {
    const configuration = getConfiguration();
    const apiInstance = new CrawlLinkApi(configuration);

    return apiInstance.crawlLinkGet({ page, limit });
};

export const useFetchplexBot = (
    page: number,
    limit: number
) => {
    return useQuery({
        queryKey: [ 'GetCrawlLinks', page, limit],
        queryFn: () => fetchCrawlLinks(page, limit)
    });
};
