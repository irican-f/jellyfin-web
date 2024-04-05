import { useQuery } from '@tanstack/react-query';
import { IPlexBotPaginatedResponse, ICrawlLink } from 'apps/stable/routes/plexbot/types';

const BASE_URL = '/plexbot/api/crawl-links';

const fetchCrawlLinks = async (
    page: number,
    limit: number
) => {
    if (!window) throw new Error('Window is not available');

    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const response = await window.ApiClient
        .getJSON(window.ApiClient.getUrl(`${BASE_URL}?page=${page}&limit=${limit}`), true)
        .then((res) => res);

    return response as IPlexBotPaginatedResponse<ICrawlLink>;
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
