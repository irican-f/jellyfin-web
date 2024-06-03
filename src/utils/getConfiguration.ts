import { Configuration } from '@plex-bot/api';

export const getConfiguration = () => {
    if (!window) throw new Error('Window is not available');

    const apiClient = window.ApiClient;

    const apiClientHeaders = {
        client: 'Jellyfin Web',
        device: apiClient.deviceName(),
        deviceId: apiClient.deviceId(),
        version: apiClient.appVersion(),
        token: apiClient.accessToken()
    };

    const authorizationString = `MediaBrowser Client="${apiClientHeaders.client}", Device="${apiClientHeaders.device}", DeviceId="${apiClientHeaders.deviceId}", Version="${apiClientHeaders.version}", Token="${apiClientHeaders.token}"`;

    return new Configuration ({
        basePath: apiClient.getUrl('/plexbot'),
        headers: {
            'Authorization': authorizationString
        }
    }) ;
};
