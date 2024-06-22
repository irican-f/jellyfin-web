import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { ISearchFilter, ProviderApi, ProviderGetProviderFiltersRequest } from '@plex-bot/api';

import { getConfiguration } from 'utils/getConfiguration';

const fetchSearchFilters = async ({
    providerId,
    mediaCategory
}: ProviderGetProviderFiltersRequest) => {
    if (!window) throw new Error('Window is not available');
    const configuration = getConfiguration();

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerGetProviderFilters({
        providerId,
        mediaCategory
    });
};

export const useGetSearchFilters = (): UseMutationResult<ISearchFilter[] | void, Error, ProviderGetProviderFiltersRequest> =>
    useMutation((request: ProviderGetProviderFiltersRequest) => fetchSearchFilters(request)
    );

