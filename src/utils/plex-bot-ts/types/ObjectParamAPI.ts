import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { CancellationToken } from '../models/CancellationToken';
import { CancellationTokenSource } from '../models/CancellationTokenSource';
import { CrawlLink } from '../models/CrawlLink';
import { CrawlStatus } from '../models/CrawlStatus';
import { CreationOrigin } from '../models/CreationOrigin';
import { EntityBase } from '../models/EntityBase';
import { ExtractMediaRequest } from '../models/ExtractMediaRequest';
import { ICrawlLink } from '../models/ICrawlLink';
import { IDownloadLink } from '../models/IDownloadLink';
import { IPlexDownload } from '../models/IPlexDownload';
import { IPlexDownloadScheduledCrawl } from '../models/IPlexDownloadScheduledCrawl';
import { IProvider } from '../models/IProvider';
import { IScheduledCrawl } from '../models/IScheduledCrawl';
import { MediaCategory } from '../models/MediaCategory';
import { MediaSearchRequest } from '../models/MediaSearchRequest';
import { MediaServerType } from '../models/MediaServerType';
import { PaginatedResponseOfICrawlLink } from '../models/PaginatedResponseOfICrawlLink';
import { ProblemDetails } from '../models/ProblemDetails';
import { Provider } from '../models/Provider';
import { RenameCrawlLinkRequest } from '../models/RenameCrawlLinkRequest';
import { SafeHandle } from '../models/SafeHandle';
import { SafeHandleZeroOrMinusOneIsInvalid } from '../models/SafeHandleZeroOrMinusOneIsInvalid';
import { SafeWaitHandle } from '../models/SafeWaitHandle';
import { ScheduledJob } from '../models/ScheduledJob';
import { TriggerJobRequest } from '../models/TriggerJobRequest';
import { WaitHandle } from '../models/WaitHandle';
import { WaitHandleAllOfHandle } from '../models/WaitHandleAllOfHandle';

import { ObservableCrawlLinkApi } from "./ObservableAPI";
import { CrawlLinkApiRequestFactory, CrawlLinkApiResponseProcessor} from "../apis/CrawlLinkApi";

export interface CrawlLinkApiCrawlLinkAddLinkRequest {
    /**
     * The object containing the mandatory data for link extraction.
     * @type ExtractMediaRequest
     * @memberof CrawlLinkApicrawlLinkAddLink
     */
    extractMediaRequest: ExtractMediaRequest
}

export interface CrawlLinkApiCrawlLinkConfirmMediaExtractRequest {
    /**
     * The crawl link to save.
     * @type CrawlLink
     * @memberof CrawlLinkApicrawlLinkConfirmMediaExtract
     */
    crawlLink: CrawlLink
}

export interface CrawlLinkApiCrawlLinkDeleteRequest {
    /**
     * The id of the crawl link to delete.
     * @type string
     * @memberof CrawlLinkApicrawlLinkDelete
     */
    id?: string
}

export interface CrawlLinkApiCrawlLinkGetRequest {
    /**
     * The page index.
     * @type number
     * @memberof CrawlLinkApicrawlLinkGet
     */
    page?: number
    /**
     * The number of elements to return.
     * @type number
     * @memberof CrawlLinkApicrawlLinkGet
     */
    limit?: number
}

export interface CrawlLinkApiCrawlLinkRenameLinkRequest {
    /**
     * The id of the crawl link to rename.
     * @type string
     * @memberof CrawlLinkApicrawlLinkRenameLink
     */
    crawlLinkId: string
    /**
     * The objects containing the new name.
     * @type RenameCrawlLinkRequest
     * @memberof CrawlLinkApicrawlLinkRenameLink
     */
    renameCrawlLinkRequest: RenameCrawlLinkRequest
}

export class ObjectCrawlLinkApi {
    private api: ObservableCrawlLinkApi

    public constructor(configuration: Configuration, requestFactory?: CrawlLinkApiRequestFactory, responseProcessor?: CrawlLinkApiResponseProcessor) {
        this.api = new ObservableCrawlLinkApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param param the request object
     */
    public crawlLinkAddLinkWithHttpInfo(param: CrawlLinkApiCrawlLinkAddLinkRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.crawlLinkAddLinkWithHttpInfo(param.extractMediaRequest,  options).toPromise();
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param param the request object
     */
    public crawlLinkAddLink(param: CrawlLinkApiCrawlLinkAddLinkRequest, options?: Configuration): Promise<void> {
        return this.api.crawlLinkAddLink(param.extractMediaRequest,  options).toPromise();
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param param the request object
     */
    public crawlLinkConfirmMediaExtractWithHttpInfo(param: CrawlLinkApiCrawlLinkConfirmMediaExtractRequest, options?: Configuration): Promise<HttpInfo<ICrawlLink>> {
        return this.api.crawlLinkConfirmMediaExtractWithHttpInfo(param.crawlLink,  options).toPromise();
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param param the request object
     */
    public crawlLinkConfirmMediaExtract(param: CrawlLinkApiCrawlLinkConfirmMediaExtractRequest, options?: Configuration): Promise<ICrawlLink> {
        return this.api.crawlLinkConfirmMediaExtract(param.crawlLink,  options).toPromise();
    }

    /**
     * Deletes a crawl link.
     * @param param the request object
     */
    public crawlLinkDeleteWithHttpInfo(param: CrawlLinkApiCrawlLinkDeleteRequest = {}, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.crawlLinkDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Deletes a crawl link.
     * @param param the request object
     */
    public crawlLinkDelete(param: CrawlLinkApiCrawlLinkDeleteRequest = {}, options?: Configuration): Promise<void> {
        return this.api.crawlLinkDelete(param.id,  options).toPromise();
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param param the request object
     */
    public crawlLinkGetWithHttpInfo(param: CrawlLinkApiCrawlLinkGetRequest = {}, options?: Configuration): Promise<HttpInfo<PaginatedResponseOfICrawlLink>> {
        return this.api.crawlLinkGetWithHttpInfo(param.page, param.limit,  options).toPromise();
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param param the request object
     */
    public crawlLinkGet(param: CrawlLinkApiCrawlLinkGetRequest = {}, options?: Configuration): Promise<PaginatedResponseOfICrawlLink> {
        return this.api.crawlLinkGet(param.page, param.limit,  options).toPromise();
    }

    /**
     * Changes the name of the show for an added link.
     * @param param the request object
     */
    public crawlLinkRenameLinkWithHttpInfo(param: CrawlLinkApiCrawlLinkRenameLinkRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.crawlLinkRenameLinkWithHttpInfo(param.crawlLinkId, param.renameCrawlLinkRequest,  options).toPromise();
    }

    /**
     * Changes the name of the show for an added link.
     * @param param the request object
     */
    public crawlLinkRenameLink(param: CrawlLinkApiCrawlLinkRenameLinkRequest, options?: Configuration): Promise<void> {
        return this.api.crawlLinkRenameLink(param.crawlLinkId, param.renameCrawlLinkRequest,  options).toPromise();
    }

}

import { ObservableDownloadsApi } from "./ObservableAPI";
import { DownloadsApiRequestFactory, DownloadsApiResponseProcessor} from "../apis/DownloadsApi";

export interface DownloadsApiDownloadsCancelDownloadRequest {
    /**
     * 
     * @type string
     * @memberof DownloadsApidownloadsCancelDownload
     */
    url?: string
}

export interface DownloadsApiDownloadsGetDownloadsRequest {
}

export class ObjectDownloadsApi {
    private api: ObservableDownloadsApi

    public constructor(configuration: Configuration, requestFactory?: DownloadsApiRequestFactory, responseProcessor?: DownloadsApiResponseProcessor) {
        this.api = new ObservableDownloadsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public downloadsCancelDownloadWithHttpInfo(param: DownloadsApiDownloadsCancelDownloadRequest = {}, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.downloadsCancelDownloadWithHttpInfo(param.url,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public downloadsCancelDownload(param: DownloadsApiDownloadsCancelDownloadRequest = {}, options?: Configuration): Promise<void> {
        return this.api.downloadsCancelDownload(param.url,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public downloadsGetDownloadsWithHttpInfo(param: DownloadsApiDownloadsGetDownloadsRequest = {}, options?: Configuration): Promise<HttpInfo<Array<IPlexDownload>>> {
        return this.api.downloadsGetDownloadsWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public downloadsGetDownloads(param: DownloadsApiDownloadsGetDownloadsRequest = {}, options?: Configuration): Promise<Array<IPlexDownload>> {
        return this.api.downloadsGetDownloads( options).toPromise();
    }

}

import { ObservableHealthApi } from "./ObservableAPI";
import { HealthApiRequestFactory, HealthApiResponseProcessor} from "../apis/HealthApi";

export interface HealthApiHealthGetRequest {
}

export class ObjectHealthApi {
    private api: ObservableHealthApi

    public constructor(configuration: Configuration, requestFactory?: HealthApiRequestFactory, responseProcessor?: HealthApiResponseProcessor) {
        this.api = new ObservableHealthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public healthGetWithHttpInfo(param: HealthApiHealthGetRequest = {}, options?: Configuration): Promise<HttpInfo<HttpFile>> {
        return this.api.healthGetWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public healthGet(param: HealthApiHealthGetRequest = {}, options?: Configuration): Promise<HttpFile> {
        return this.api.healthGet( options).toPromise();
    }

}

import { ObservableIptvApi } from "./ObservableAPI";
import { IptvApiRequestFactory, IptvApiResponseProcessor} from "../apis/IptvApi";

export interface IptvApiIptvGetAtlasProPlaylistRequest {
}

export class ObjectIptvApi {
    private api: ObservableIptvApi

    public constructor(configuration: Configuration, requestFactory?: IptvApiRequestFactory, responseProcessor?: IptvApiResponseProcessor) {
        this.api = new ObservableIptvApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public iptvGetAtlasProPlaylistWithHttpInfo(param: IptvApiIptvGetAtlasProPlaylistRequest = {}, options?: Configuration): Promise<HttpInfo<string>> {
        return this.api.iptvGetAtlasProPlaylistWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public iptvGetAtlasProPlaylist(param: IptvApiIptvGetAtlasProPlaylistRequest = {}, options?: Configuration): Promise<string> {
        return this.api.iptvGetAtlasProPlaylist( options).toPromise();
    }

}

import { ObservableJobApi } from "./ObservableAPI";
import { JobApiRequestFactory, JobApiResponseProcessor} from "../apis/JobApi";

export interface JobApiJobGetRunningJobsRequest {
}

export interface JobApiJobInterruptJobRequest {
    /**
     * 
     * @type ScheduledJob
     * @memberof JobApijobInterruptJob
     */
    scheduledJob: ScheduledJob
}

export interface JobApiJobTriggerJobRequest {
    /**
     * 
     * @type TriggerJobRequest
     * @memberof JobApijobTriggerJob
     */
    triggerJobRequest: TriggerJobRequest
}

export class ObjectJobApi {
    private api: ObservableJobApi

    public constructor(configuration: Configuration, requestFactory?: JobApiRequestFactory, responseProcessor?: JobApiResponseProcessor) {
        this.api = new ObservableJobApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public jobGetRunningJobsWithHttpInfo(param: JobApiJobGetRunningJobsRequest = {}, options?: Configuration): Promise<HttpInfo<Array<ScheduledJob>>> {
        return this.api.jobGetRunningJobsWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public jobGetRunningJobs(param: JobApiJobGetRunningJobsRequest = {}, options?: Configuration): Promise<Array<ScheduledJob>> {
        return this.api.jobGetRunningJobs( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public jobInterruptJobWithHttpInfo(param: JobApiJobInterruptJobRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.jobInterruptJobWithHttpInfo(param.scheduledJob,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public jobInterruptJob(param: JobApiJobInterruptJobRequest, options?: Configuration): Promise<void> {
        return this.api.jobInterruptJob(param.scheduledJob,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public jobTriggerJobWithHttpInfo(param: JobApiJobTriggerJobRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.jobTriggerJobWithHttpInfo(param.triggerJobRequest,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public jobTriggerJob(param: JobApiJobTriggerJobRequest, options?: Configuration): Promise<void> {
        return this.api.jobTriggerJob(param.triggerJobRequest,  options).toPromise();
    }

}

import { ObservableLogsApi } from "./ObservableAPI";
import { LogsApiRequestFactory, LogsApiResponseProcessor} from "../apis/LogsApi";

export interface LogsApiLogsGetLogsRequest {
    /**
     * 
     * @type Date
     * @memberof LogsApilogsGetLogs
     */
    date?: Date
}

export class ObjectLogsApi {
    private api: ObservableLogsApi

    public constructor(configuration: Configuration, requestFactory?: LogsApiRequestFactory, responseProcessor?: LogsApiResponseProcessor) {
        this.api = new ObservableLogsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public logsGetLogsWithHttpInfo(param: LogsApiLogsGetLogsRequest = {}, options?: Configuration): Promise<HttpInfo<string>> {
        return this.api.logsGetLogsWithHttpInfo(param.date,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public logsGetLogs(param: LogsApiLogsGetLogsRequest = {}, options?: Configuration): Promise<string> {
        return this.api.logsGetLogs(param.date,  options).toPromise();
    }

}

import { ObservablePlexWebhookApi } from "./ObservableAPI";
import { PlexWebhookApiRequestFactory, PlexWebhookApiResponseProcessor} from "../apis/PlexWebhookApi";

export interface PlexWebhookApiPlexWebhookHandlePlexEventRequest {
}

export class ObjectPlexWebhookApi {
    private api: ObservablePlexWebhookApi

    public constructor(configuration: Configuration, requestFactory?: PlexWebhookApiRequestFactory, responseProcessor?: PlexWebhookApiResponseProcessor) {
        this.api = new ObservablePlexWebhookApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public plexWebhookHandlePlexEventWithHttpInfo(param: PlexWebhookApiPlexWebhookHandlePlexEventRequest = {}, options?: Configuration): Promise<HttpInfo<HttpFile>> {
        return this.api.plexWebhookHandlePlexEventWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public plexWebhookHandlePlexEvent(param: PlexWebhookApiPlexWebhookHandlePlexEventRequest = {}, options?: Configuration): Promise<HttpFile> {
        return this.api.plexWebhookHandlePlexEvent( options).toPromise();
    }

}

import { ObservableProviderApi } from "./ObservableAPI";
import { ProviderApiRequestFactory, ProviderApiResponseProcessor} from "../apis/ProviderApi";

export interface ProviderApiProviderGetAvailableProvidersRequest {
    /**
     * Indicates if it should return only providers which have the search functionality.
     * @type boolean
     * @memberof ProviderApiproviderGetAvailableProviders
     */
    searchEnabled?: boolean
}

export interface ProviderApiProviderSearchRequest {
    /**
     * The provider id on which to perform the search
     * @type string
     * @memberof ProviderApiproviderSearch
     */
    providerId: string
    /**
     * The search request
     * @type MediaSearchRequest
     * @memberof ProviderApiproviderSearch
     */
    mediaSearchRequest: MediaSearchRequest
}

export class ObjectProviderApi {
    private api: ObservableProviderApi

    public constructor(configuration: Configuration, requestFactory?: ProviderApiRequestFactory, responseProcessor?: ProviderApiResponseProcessor) {
        this.api = new ObservableProviderApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Gets the list of enabled providers.
     * @param param the request object
     */
    public providerGetAvailableProvidersWithHttpInfo(param: ProviderApiProviderGetAvailableProvidersRequest = {}, options?: Configuration): Promise<HttpInfo<Array<IProvider>>> {
        return this.api.providerGetAvailableProvidersWithHttpInfo(param.searchEnabled,  options).toPromise();
    }

    /**
     * Gets the list of enabled providers.
     * @param param the request object
     */
    public providerGetAvailableProviders(param: ProviderApiProviderGetAvailableProvidersRequest = {}, options?: Configuration): Promise<Array<IProvider>> {
        return this.api.providerGetAvailableProviders(param.searchEnabled,  options).toPromise();
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param param the request object
     */
    public providerSearchWithHttpInfo(param: ProviderApiProviderSearchRequest, options?: Configuration): Promise<HttpInfo<HttpFile>> {
        return this.api.providerSearchWithHttpInfo(param.providerId, param.mediaSearchRequest,  options).toPromise();
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param param the request object
     */
    public providerSearch(param: ProviderApiProviderSearchRequest, options?: Configuration): Promise<HttpFile> {
        return this.api.providerSearch(param.providerId, param.mediaSearchRequest,  options).toPromise();
    }

}
