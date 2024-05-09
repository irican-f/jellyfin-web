import { useQuery } from '@tanstack/react-query';
import { IProvider } from 'apps/stable/routes/plexbot/types';

const BASE_URL = '/plexbot/api/providers';

const fetchProviders = async () => {
    if (!window) throw new Error('Window is not available');

    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const response = await window.ApiClient
        .getJSON(window.ApiClient.getUrl(`${BASE_URL}`), true)
        .then((res) => res);

    return response as IProvider[];
};

export const useGetPlexBotProviders = () => {
    return useQuery({
        queryKey: [ 'GetCrawlLinks'],
        queryFn: () => fetchProviders()
    });
};
