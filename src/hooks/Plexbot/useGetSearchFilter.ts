import { useQuery } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { ProviderApi, MediaCategory } from '@plex-bot/api';

const fetchSearchFilters = async (
    providerId: string,
    mediaSearchRequest: MediaCategory
) => {
    if (!window) throw new Error('Window is not available');

    const configuration = getConfiguration();

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerGetProviderFilters({
        providerId,
        mediaCategory: mediaSearchRequest

    }).then((data) => {
        console.log({ data });
        return data;
    }).catch((error) => console.error(error));
};

export const useGetSearchFilters = (
    providerId: string,
    mediaSearchRequest: MediaCategory,
    shouldFetch: boolean
) => {
    return useQuery({
        queryKey: [ 'GetSearchFilters', providerId, mediaSearchRequest],
        queryFn: () => fetchSearchFilters(providerId, mediaSearchRequest),
        enabled: shouldFetch
    });
};
