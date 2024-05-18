// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import { Configuration } from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo } from '../http/http';
import { ObjectSerializer } from '../models/ObjectSerializer';
import { ApiException } from './exception';
import { isCodeInRange } from '../util';
import { SecurityAuthentication } from '../auth/auth';

import { IProvider } from '../models/IProvider';
import { MediaSearchRequest } from '../models/MediaSearchRequest';

/**
 * no description
 */
export class ProviderApiRequestFactory extends BaseAPIRequestFactory {
    /**
     * Gets the list of enabled providers.
     * @param searchEnabled Indicates if it should return only providers which have the search functionality.
     */
    public async providerGetAvailableProviders(searchEnabled?: boolean, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // Path Params
        const localVarPath = '/api/providers';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Query Params
        if (searchEnabled !== undefined) {
            requestContext.setQueryParam('searchEnabled', ObjectSerializer.serialize(searchEnabled, 'boolean', ''));
        }

        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default;
        requestContext.setHeaderParam('Authorization', _config.authString);
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param providerId The provider id on which to perform the search
     * @param mediaSearchRequest The search request
     */
    public async providerSearch(providerId: string, mediaSearchRequest: MediaSearchRequest, _options?: Configuration): Promise<RequestContext> {
        const _config = _options || this.configuration;

        // verify required parameter 'providerId' is not null or undefined
        if (providerId === null || providerId === undefined) {
            throw new RequiredError('ProviderApi', 'providerSearch', 'providerId');
        }

        // verify required parameter 'mediaSearchRequest' is not null or undefined
        if (mediaSearchRequest === null || mediaSearchRequest === undefined) {
            throw new RequiredError('ProviderApi', 'providerSearch', 'mediaSearchRequest');
        }

        // Path Params
        const localVarPath = '/api/providers/{providerId}/search'
            .replace('{' + 'providerId' + '}', encodeURIComponent(String(providerId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam('Accept', 'application/json, */*;q=0.8');

        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            'application/json'
        ]);
        requestContext.setHeaderParam('Content-Type', contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(mediaSearchRequest, 'MediaSearchRequest', ''),
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

export class ProviderApiResponseProcessor {
    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to providerGetAvailableProviders
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async providerGetAvailableProvidersWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Array<IProvider> >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            const body: Array<IProvider> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'Array<IProvider>', ''
            ) as Array<IProvider>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Array<IProvider> = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'Array<IProvider>', ''
            ) as Array<IProvider>;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to providerSearch
     * @throws ApiException if the response code was not in [200, 299]
     */
    public async providerSearchWithHttpInfo(response: ResponseContext): Promise<HttpInfo<HttpFile >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers['content-type']);
        if (isCodeInRange('200', response.httpStatusCode)) {
            const body: HttpFile = await response.getBodyAsFile() as any as HttpFile;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: HttpFile = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                'HttpFile', 'binary'
            ) as HttpFile;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, 'Unknown API Status Code!', await response.getBodyAsAny(), response.headers);
    }
}
