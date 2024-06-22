import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getConfiguration } from 'utils/getConfiguration';
import { CrawlLinkApi, ExtractMediaConfirmationRequest, ICrawlLink } from '@plex-bot/api';

interface FetchConfirmAddParams {
    extractMediaConfirmationRequest: ExtractMediaConfirmationRequest
}

const fetchConfirmAdd = async (extractMediaConfirmationRequest: ExtractMediaConfirmationRequest): Promise<ICrawlLink> => {
    if (typeof window === 'undefined') {
        throw new Error('Window is not available');
    }

    const configuration = getConfiguration();
    const apiInstance = new CrawlLinkApi(configuration);

    return apiInstance.crawlLinkConfirmMediaExtract({
        extractMediaConfirmationRequest
    });
};

export const useConfirmAdd = (): UseMutationResult<ICrawlLink, Error, FetchConfirmAddParams> => {
    return useMutation(({ extractMediaConfirmationRequest }: FetchConfirmAddParams) => fetchConfirmAdd(extractMediaConfirmationRequest));
};
