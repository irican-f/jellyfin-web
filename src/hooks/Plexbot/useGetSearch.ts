import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { ProviderApi, ApiMediaSearchRequest, PaginatedResponseOfIProviderSearchItemResult } from '@plex-bot/api';

interface GetSearchParams {
    providerId: string;
    query: ApiMediaSearchRequest;
}

const fetchSearch = async (
    providerId: string,
    query: ApiMediaSearchRequest
): Promise<PaginatedResponseOfIProviderSearchItemResult> => {
    if (!window) throw new Error('Window is not available');

    const configuration = getConfiguration();

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerSearch({
        providerId,
        apiMediaSearchRequest: query
    }).then((data) => {
        console.log({ data });
        return data;
    }).catch((error) => {
        console.error(error);
        throw error;
    });
};

export const useGetSearch = ():UseMutationResult<PaginatedResponseOfIProviderSearchItemResult, Error, GetSearchParams> => {
    return useMutation(({ providerId, query }: GetSearchParams) => fetchSearch(providerId, query));
};
