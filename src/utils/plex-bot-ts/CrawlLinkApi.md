# .CrawlLinkApi

All URIs are relative to *http://localhost:8888*

Method | HTTP request | Description
------------- | ------------- | -------------
[**crawlLinkAddLink**](CrawlLinkApi.md#crawlLinkAddLink) | **POST** /api/crawl-links | Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
[**crawlLinkConfirmMediaExtract**](CrawlLinkApi.md#crawlLinkConfirmMediaExtract) | **POST** /api/crawl-links/confirm-add | Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
[**crawlLinkDelete**](CrawlLinkApi.md#crawlLinkDelete) | **DELETE** /api/crawl-links | Deletes a crawl link.
[**crawlLinkGet**](CrawlLinkApi.md#crawlLinkGet) | **GET** /api/crawl-links | Gets added crawl links, the results are paginated.
[**crawlLinkRenameLink**](CrawlLinkApi.md#crawlLinkRenameLink) | **PUT** /api/crawl-links/{crawlLinkId}/rename | Changes the name of the show for an added link.


# **crawlLinkAddLink**
> void crawlLinkAddLink(extractMediaRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CrawlLinkApi(configuration);

let body:.CrawlLinkApiCrawlLinkAddLinkRequest = {
  // ExtractMediaRequest | The object containing the mandatory data for link extraction.
  extractMediaRequest: {
    url: "url_example",
    fileHost: "fileHost_example",
    userName: "userName_example",
    userId: "userId_example",
  },
};

apiInstance.crawlLinkAddLink(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **extractMediaRequest** | **ExtractMediaRequest**| The object containing the mandatory data for link extraction. |


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Extracted crawl link returned |  -  |
**400** | Provider not supported |  -  |
**500** | Extraction failed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **crawlLinkConfirmMediaExtract**
> ICrawlLink crawlLinkConfirmMediaExtract(crawlLink)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CrawlLinkApi(configuration);

let body:.CrawlLinkApiCrawlLinkConfirmMediaExtractRequest = {
  // CrawlLink | The crawl link to save.
  crawlLink: null,
};

apiInstance.crawlLinkConfirmMediaExtract(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **crawlLink** | **CrawlLink**| The crawl link to save. |


### Return type

**ICrawlLink**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Crawl link saved |  -  |
**409** | Error when saving to database |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **crawlLinkDelete**
> void crawlLinkDelete()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CrawlLinkApi(configuration);

let body:.CrawlLinkApiCrawlLinkDeleteRequest = {
  // string | The id of the crawl link to delete. (optional)
  id: "id_example",
};

apiInstance.crawlLinkDelete(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] | The id of the crawl link to delete. | (optional) defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Crawl link deleted |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **crawlLinkGet**
> PaginatedResponseOfICrawlLink crawlLinkGet()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CrawlLinkApi(configuration);

let body:.CrawlLinkApiCrawlLinkGetRequest = {
  // number | The page index. (optional)
  page: 0,
  // number | The number of elements to return. (optional)
  limit: 25,
};

apiInstance.crawlLinkGet(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] | The page index. | (optional) defaults to 0
 **limit** | [**number**] | The number of elements to return. | (optional) defaults to 25


### Return type

**PaginatedResponseOfICrawlLink**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Page returned |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **crawlLinkRenameLink**
> void crawlLinkRenameLink(renameCrawlLinkRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CrawlLinkApi(configuration);

let body:.CrawlLinkApiCrawlLinkRenameLinkRequest = {
  // string | The id of the crawl link to rename.
  crawlLinkId: "crawlLinkId_example",
  // RenameCrawlLinkRequest | The objects containing the new name.
  renameCrawlLinkRequest: {
    newName: "newName_example",
  },
};

apiInstance.crawlLinkRenameLink(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **renameCrawlLinkRequest** | **RenameCrawlLinkRequest**| The objects containing the new name. |
 **crawlLinkId** | [**string**] | The id of the crawl link to rename. | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Crawl link renamed |  -  |
**409** | Error when saving to database |  -  |
**404** | No crawl link found for the given id |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


