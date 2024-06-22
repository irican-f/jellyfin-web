import { useQuery } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { ProviderApi } from '@plex-bot/api';

const fetchProviders = async () => {
    const configuration = getConfiguration();

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerGetAvailableProviders({ searchEnabled: true });
};

export const useGetProviders = () => {
    return useQuery({
        queryKey: [ 'GetProviders'],
        queryFn: () => fetchProviders()
    });
};
