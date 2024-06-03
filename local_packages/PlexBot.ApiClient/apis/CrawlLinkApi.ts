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
  ExtractMediaConfirmationRequest,
  ExtractMediaRequest,
  ICrawlLink,
  PaginatedResponseOfICrawlLink,
  ProblemDetails,
  RenameCrawlLinkRequest,
} from '../models/index';
import {
    ExtractMediaConfirmationRequestFromJSON,
    ExtractMediaConfirmationRequestToJSON,
    ExtractMediaRequestFromJSON,
    ExtractMediaRequestToJSON,
    ICrawlLinkFromJSON,
    ICrawlLinkToJSON,
    PaginatedResponseOfICrawlLinkFromJSON,
    PaginatedResponseOfICrawlLinkToJSON,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    RenameCrawlLinkRequestFromJSON,
    RenameCrawlLinkRequestToJSON,
} from '../models/index';

export interface CrawlLinkAddLinkRequest {
    extractMediaRequest: ExtractMediaRequest;
}

export interface CrawlLinkConfirmMediaExtractRequest {
    extractMediaConfirmationRequest: ExtractMediaConfirmationRequest;
}

export interface CrawlLinkDeleteRequest {
    id?: string;
}

export interface CrawlLinkGetRequest {
    page?: number;
    limit?: number;
}

export interface CrawlLinkRenameLinkRequest {
    crawlLinkId: string;
    renameCrawlLinkRequest: RenameCrawlLinkRequest;
}

/**
 * 
 */
export class CrawlLinkApi extends runtime.BaseAPI {

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     */
    async crawlLinkAddLinkRaw(requestParameters: CrawlLinkAddLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ICrawlLink>> {
        if (requestParameters['extractMediaRequest'] == null) {
            throw new runtime.RequiredError(
                'extractMediaRequest',
                'Required parameter "extractMediaRequest" was null or undefined when calling crawlLinkAddLink().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/crawl-links`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExtractMediaRequestToJSON(requestParameters['extractMediaRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ICrawlLinkFromJSON(jsonValue));
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     */
    async crawlLinkAddLink(requestParameters: CrawlLinkAddLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ICrawlLink> {
        const response = await this.crawlLinkAddLinkRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     */
    async crawlLinkConfirmMediaExtractRaw(requestParameters: CrawlLinkConfirmMediaExtractRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ICrawlLink>> {
        if (requestParameters['extractMediaConfirmationRequest'] == null) {
            throw new runtime.RequiredError(
                'extractMediaConfirmationRequest',
                'Required parameter "extractMediaConfirmationRequest" was null or undefined when calling crawlLinkConfirmMediaExtract().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/crawl-links/confirm-add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExtractMediaConfirmationRequestToJSON(requestParameters['extractMediaConfirmationRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ICrawlLinkFromJSON(jsonValue));
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     */
    async crawlLinkConfirmMediaExtract(requestParameters: CrawlLinkConfirmMediaExtractRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ICrawlLink> {
        const response = await this.crawlLinkConfirmMediaExtractRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Deletes a crawl link.
     */
    async crawlLinkDeleteRaw(requestParameters: CrawlLinkDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        if (requestParameters['id'] != null) {
            queryParameters['id'] = requestParameters['id'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/crawl-links`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes a crawl link.
     */
    async crawlLinkDelete(requestParameters: CrawlLinkDeleteRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.crawlLinkDeleteRaw(requestParameters, initOverrides);
    }

    /**
     * Gets added crawl links, the results are paginated.
     */
    async crawlLinkGetRaw(requestParameters: CrawlLinkGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedResponseOfICrawlLink>> {
        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/crawl-links`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedResponseOfICrawlLinkFromJSON(jsonValue));
    }

    /**
     * Gets added crawl links, the results are paginated.
     */
    async crawlLinkGet(requestParameters: CrawlLinkGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedResponseOfICrawlLink> {
        const response = await this.crawlLinkGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Changes the name of the show for an added link.
     */
    async crawlLinkRenameLinkRaw(requestParameters: CrawlLinkRenameLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ICrawlLink>> {
        if (requestParameters['crawlLinkId'] == null) {
            throw new runtime.RequiredError(
                'crawlLinkId',
                'Required parameter "crawlLinkId" was null or undefined when calling crawlLinkRenameLink().'
            );
        }

        if (requestParameters['renameCrawlLinkRequest'] == null) {
            throw new runtime.RequiredError(
                'renameCrawlLinkRequest',
                'Required parameter "renameCrawlLinkRequest" was null or undefined when calling crawlLinkRenameLink().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/crawl-links/{crawlLinkId}/rename`.replace(`{${"crawlLinkId"}}`, encodeURIComponent(String(requestParameters['crawlLinkId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: RenameCrawlLinkRequestToJSON(requestParameters['renameCrawlLinkRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ICrawlLinkFromJSON(jsonValue));
    }

    /**
     * Changes the name of the show for an added link.
     */
    async crawlLinkRenameLink(requestParameters: CrawlLinkRenameLinkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ICrawlLink> {
        const response = await this.crawlLinkRenameLinkRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
