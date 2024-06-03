import { useQuery } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { ProviderApi } from '@plex-bot/api';

const fetchProviders = async () => {
    if (!window) throw new Error('Window is not available');

    const configuration = getConfiguration();

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerGetAvailableProviders({ searchEnabled: true })
        .then((data) => data)
        .catch((error) => console.error(error));
};

export const useGetPlexBotProviders = () => {
    return useQuery({
        queryKey: [ 'GetPlexBotProviders'],
        queryFn: () => fetchProviders()
    });
};
