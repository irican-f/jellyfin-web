# .ProviderApi

All URIs are relative to *http://localhost:8888*

Method | HTTP request | Description
------------- | ------------- | -------------
[**providerGetAvailableProviders**](ProviderApi.md#providerGetAvailableProviders) | **GET** /api/providers | Gets the list of enabled providers.
[**providerSearch**](ProviderApi.md#providerSearch) | **POST** /api/providers/{providerId}/search | Search the provider website and gets the results. The results are paginated.


# **providerGetAvailableProviders**
> Array<IProvider> providerGetAvailableProviders()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProviderApi(configuration);

let body:.ProviderApiProviderGetAvailableProvidersRequest = {
  // boolean | Indicates if it should return only providers which have the search functionality. (optional)
  searchEnabled: false,
};

apiInstance.providerGetAvailableProviders(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchEnabled** | [**boolean**] | Indicates if it should return only providers which have the search functionality. | (optional) defaults to false


### Return type

**Array<IProvider>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Providers returned |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **providerSearch**
> HttpFile providerSearch(mediaSearchRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ProviderApi(configuration);

let body:.ProviderApiProviderSearchRequest = {
  // string | The provider id on which to perform the search
  providerId: "providerId_example",
  // MediaSearchRequest | The search request
  mediaSearchRequest: {
    query: "query_example",
    category: 0,
  },
};

apiInstance.providerSearch(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **mediaSearchRequest** | **MediaSearchRequest**| The search request |
 **providerId** | [**string**] | The provider id on which to perform the search | defaults to undefined


### Return type

**HttpFile**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/octet-stream


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Page of the provider\&#39;s search results. |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


