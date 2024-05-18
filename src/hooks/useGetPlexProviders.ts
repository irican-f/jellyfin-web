import { useQuery } from '@tanstack/react-query';
// import { IProvider } from 'apps/stable/routes/plexbot/types';
import { ProviderApi, ServerConfiguration, createConfiguration } from 'utils/plex-bot-ts';

const fetchProviders = async () => {
    if (!window) throw new Error('Window is not available');

    const apiClient = window.ApiClient;

    const serverConf = new ServerConfiguration(apiClient.getUrl('/plexbot'), { });

    const apiClientHeaders = {
        client: 'Jellyfin Web',
        device: apiClient.deviceName(),
        deviceId: apiClient.deviceId(),
        version: apiClient.appVersion(),
        token: apiClient.accessToken()
    };

    const authorizationString = `MediaBrowser Client="${apiClientHeaders.client}", Device="${apiClientHeaders.device}", DeviceId="${apiClientHeaders.deviceId}", Version="${apiClientHeaders.version}", Token="${apiClientHeaders.token}"`;

    const configuration = createConfiguration({
        baseServer: serverConf,
        authString: authorizationString
        // authMethods: authorizationString
    });

    console.log({ client: apiClient.getUrl('/plexbot') }, '>>>>>>>>>>>>>>>');

    const apiInstance = new ProviderApi(configuration);

    return apiInstance.providerGetAvailableProvidersWithHttpInfo(false).then((data:any) => {
        console.log({ data }, 'here');
        return data;
    }).catch((error:any) => console.error(error));

    // return apiInstance.providerGetAvailableProviders(false).then((data:any) => {
    //     console.log({ data }, 'here');
    //     return data;
    // }).catch((error:any) => console.error(error));
};

export const useGetPlexBotProviders = () => {
    return useQuery({
        queryKey: [ 'GetCrawlLinks'],
        queryFn: () => fetchProviders()
    });
};
