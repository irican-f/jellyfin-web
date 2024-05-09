// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo } from '../http/http';
import { ObjectSerializer } from '../models/ObjectSerializer';
import { ApiException } from './exception';
import { canConsumeForm, isCodeInRange } from '../util';
import { SecurityAuthentication } from '../auth/auth';

import { CrawlLink } from '../models/CrawlLink';
import { ExtractMediaRequest } from '../models/ExtractMediaRequest';
import { ICrawlLink } from '../models/ICrawlLink';
import { PaginatedResponseOfICrawlLink } from '../models/PaginatedResponseOfICrawlLink';
import { ProblemDetails } from '../models/ProblemDetails';
import { RenameCrawlLinkRequest } from '../models/RenameCrawlLinkRequest';

/**
 * no description
 */
export class CrawlLinkApiRequestFactory extends BaseAPIRequestFactory {
    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param extractMediaRequest The object containing the mandatory data for link extraction.
     */
    public async crawlLinkAddLink(extractMediaRequest: ExtractMediaRequest, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // verify required parameter 'extractMediaRequest' is not null or undefined
        if (extractMediaRequest === null || extractMediaRequest === undefined) {
            throw new RequiredError('CrawlLinkApi', 'crawlLinkAddLink', 'extractMediaRequest');
        }

        // Path Params
        const localVarPath = '/api/crawl-links';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            'application/json'
        ]);
        requestContext.setHeaderParam('Content-Type', contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(extractMediaRequest, 'ExtractMediaRequest', ''),
            contentType
        );
        requestContext.setBody(serializedBody);

        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default;
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param crawlLink The crawl link to save.
     */
    public async crawlLinkConfirmMediaExtract(crawlLink: CrawlLink, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // verify required parameter 'crawlLink' is not null or undefined
        if (crawlLink === null || crawlLink === undefined) {
            throw new RequiredError('CrawlLinkApi', 'crawlLinkConfirmMediaExtract', 'crawlLink');
        }

        // Path Params
        const localVarPath = '/api/crawl-links/confirm-add';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            'application/json'
        ]);
        requestContext.setHeaderParam('Content-Type', contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(crawlLink, 'CrawlLink', ''),
            contentType
        );
        requestContext.setBody(serializedBody);

        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default;
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Deletes a crawl link.
     * @param id The id of the crawl link to delete.
     */
    public async crawlLinkDelete(id?: string, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/api/crawl-links';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Query Params
        if (id !== undefined) {
            requestContext.setQueryParam('id', ObjectSerializer.serialize(id, 'string', 'guid'));
        }

        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default;
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param page The page index.
     * @param limit The number of elements to return.
     */
    public async crawlLinkGet(page?: number, limit?: number, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/api/crawl-links';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Query Params
        if (page !== undefined) {
            requestContext.setQueryParam('page', ObjectSerializer.serialize(page, 'number', 'int32'));
        }

        // Query Params
        if (limit !== undefined) {
            requestContext.setQueryParam('limit', ObjectSerializer.serialize(limit, 'number', 'int32'));
        }

        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default;
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Changes the name of the show for an added link.
     * @param crawlLinkId The id of the crawl link to rename.
     * @param renameCrawlLinkRequest The objects containing the new name.
     */
    public async crawlLinkRenameLink(crawlLinkId: string, renameCrawlLinkRequest: RenameCrawlLinkRequest, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // verify required parameter 'crawlLinkId' is not null or undefined
        if (crawlLinkId === null || crawlLinkId === undefined) {
            throw new RequiredError('CrawlLinkApi', 'crawlLinkRenameLink', 'crawlLinkId');
        }

        // verify required parameter 'renameCrawlLinkRequest' is not null or undefined
        if (renameCrawlLinkRequest === null || renameCrawlLinkRequest === undefined) {
            throw new RequiredError('CrawlLinkApi', 'crawlLinkRenameLink', 'renameCrawlLinkRequest');
        }

        // Path Params
        const localVarPath = '/api/crawl-links/{crawlLinkId}/rename'
            .replace('{' + 'crawlLinkId' + '}', encodeURIComponent(String(crawlLinkId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            'application/json'
        ]);
        requestContext.setHeaderParam('Content-Type', contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(renameCrawlLinkRequest, 'RenameCrawlLinkRequest', ''),
            contentType
        );
        requestContext.setBody(serializedBody);

        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default;
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }
}

export class CrawlLinkApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to crawlLinkAddLink
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async crawlLinkAddLinkWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange('400', response.httpStatusCode)) {
            const body: ProblemDetails = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'ProblemDetails', ''
            ) as ProblemDetails;
            throw new ApiException<ProblemDetails>(response.httpStatusCode, 'Provider not supported', body, response.headers);
        }
        if (isCodeInRange('500', response.httpStatusCode)) {
            throw new ApiException<undefined>(response.httpStatusCode, 'Extraction failed', undefined, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'void', ''
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to crawlLinkConfirmMediaExtract
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async crawlLinkConfirmMediaExtractWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ICrawlLink >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            const body: ICrawlLink = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'ICrawlLink', ''
            ) as ICrawlLink;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange('409', response.httpStatusCode)) {
            const body: ProblemDetails = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'ProblemDetails', ''
            ) as ProblemDetails;
            throw new ApiException<ProblemDetails>(response.httpStatusCode, 'Error when saving to database', body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ICrawlLink = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'ICrawlLink', ''
            ) as ICrawlLink;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to crawlLinkDelete
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async crawlLinkDeleteWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'void', ''
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to crawlLinkGet
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async crawlLinkGetWithHttpInfo(response: ResponseContext): Promise<HttpInfo<PaginatedResponseOfICrawlLink >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            const body: PaginatedResponseOfICrawlLink = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'PaginatedResponseOfICrawlLink', ''
            ) as PaginatedResponseOfICrawlLink;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: PaginatedResponseOfICrawlLink = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'PaginatedResponseOfICrawlLink', ''
            ) as PaginatedResponseOfICrawlLink;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to crawlLinkRenameLink
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async crawlLinkRenameLinkWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange('409', response.httpStatusCode)) {
            const body: ProblemDetails = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'ProblemDetails', ''
            ) as ProblemDetails;
            throw new ApiException<ProblemDetails>(response.httpStatusCode, 'Error when saving to database', body, response.headers);
        }
        if (isCodeInRange('404', response.httpStatusCode)) {
            const body: ProblemDetails = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'ProblemDetails', ''
            ) as ProblemDetails;
            throw new ApiException<ProblemDetails>(response.httpStatusCode, 'No crawl link found for the given id', body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'void', ''
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }
}
