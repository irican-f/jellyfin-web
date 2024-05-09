# .JobApi

All URIs are relative to *http://localhost:8888*

Method | HTTP request | Description
------------- | ------------- | -------------
[**jobGetRunningJobs**](JobApi.md#jobGetRunningJobs) | **GET** /api/jobs | 
[**jobInterruptJob**](JobApi.md#jobInterruptJob) | **DELETE** /api/jobs | 
[**jobTriggerJob**](JobApi.md#jobTriggerJob) | **POST** /api/jobs | 


# **jobGetRunningJobs**
> Array<ScheduledJob> jobGetRunningJobs()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .JobApi(configuration);

let body:any = {};

apiInstance.jobGetRunningJobs(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<ScheduledJob>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **jobInterruptJob**
> void jobInterruptJob(scheduledJob)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .JobApi(configuration);

let body:.JobApiJobInterruptJobRequest = {
  // ScheduledJob
  scheduledJob: {
    id: "id_example",
    type: "type_example",
    status: "status_example",
    startedAt: new Date('1970-01-01T00:00:00.00Z'),
  },
};

apiInstance.jobInterruptJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **scheduledJob** | **ScheduledJob**|  |


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **jobTriggerJob**
> void jobTriggerJob(triggerJobRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .JobApi(configuration);

let body:.JobApiJobTriggerJobRequest = {
  // TriggerJobRequest
  triggerJobRequest: {
    jobType: "jobType_example",
  },
};

apiInstance.jobTriggerJob(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **triggerJobRequest** | **TriggerJobRequest**|  |


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


