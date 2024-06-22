import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ProviderApi, ApiMediaSearchRequest, PaginatedResponseOfIProviderSearchItemResult } from '@plex-bot/api';

import { getConfiguration } from 'utils/getConfiguration';

interface GetSearchParams {
    providerId: string;
    query: ApiMediaSearchRequest;
}

const fetchSearch = async (
    providerId: string,
    query: ApiMediaSearchRequest
) => {
    if (!window) throw new Error('Window is not available');

    const configuration = getConfiguration();

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerSearch({
        providerId,
        apiMediaSearchRequest: query
    });
};

export const useGetSearch = ():UseMutationResult<PaginatedResponseOfIProviderSearchItemResult, Error, GetSearchParams> => {
    return useMutation(({ providerId, query }: GetSearchParams) => fetchSearch(providerId, query));
};
