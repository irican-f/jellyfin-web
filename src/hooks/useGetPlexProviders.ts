import { useQuery } from '@tanstack/react-query';
// import { IProvider } from 'apps/stable/routes/plexbot/types';
import { ServerConfiguration, createConfiguration } from 'utils/plex-bot-ts';
import { ProviderApiRequestFactory } from 'utils/plex-bot-ts/apis/ProviderApi';

const fetchProviders = async () => {
    if (!window) throw new Error('Window is not available');

    const serverConf = new ServerConfiguration<{ }>(window.ApiClient.getUrl('/plexbot'), { });

    const configuration = createConfiguration({
        baseServer: serverConf
    });

    const requestApi = new ProviderApiRequestFactory(configuration);

    console.log({ requestApi }, 'here2');

    return requestApi.providerGetAvailableProviders();
};

export const useGetPlexBotProviders = () => {
    return useQuery({
        queryKey: [ 'GetCrawlLinks'],
        queryFn: () => fetchProviders()
    });
};
