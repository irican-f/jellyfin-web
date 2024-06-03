/* tslint:disable */
/* eslint-disable */
/**
 * PlexBot API
 * This the PlexBot Web API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: filip.iricanin@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  IPlexDownload,
} from '../models/index';
import {
    IPlexDownloadFromJSON,
    IPlexDownloadToJSON,
} from '../models/index';

export interface DownloadsCancelDownloadRequest {
    url?: string;
}

/**
 * 
 */
export class DownloadsApi extends runtime.BaseAPI {

    /**
     */
    async downloadsCancelDownloadRaw(requestParameters: DownloadsCancelDownloadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters['url'] != null) {
            queryParameters['url'] = requestParameters['url'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/downloads`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async downloadsCancelDownload(requestParameters: DownloadsCancelDownloadRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.downloadsCancelDownloadRaw(requestParameters, initOverrides);
    }

    /**
     * Gets all running or queued downloads
     */
    async downloadsGetDownloadsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<IPlexDownload>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/downloads`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(IPlexDownloadFromJSON));
    }

    /**
     * Gets all running or queued downloads
     */
    async downloadsGetDownloads(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<IPlexDownload>> {
        const response = await this.downloadsGetDownloadsRaw(initOverrides);
        return await response.value();
    }

}
