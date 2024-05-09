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
import { ObservableCrawlLinkApi } from './ObservableAPI';

import { CrawlLinkApiRequestFactory, CrawlLinkApiResponseProcessor} from "../apis/CrawlLinkApi";
export class PromiseCrawlLinkApi {
    private api: ObservableCrawlLinkApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CrawlLinkApiRequestFactory,
        responseProcessor?: CrawlLinkApiResponseProcessor
    ) {
        this.api = new ObservableCrawlLinkApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param extractMediaRequest The object containing the mandatory data for link extraction.
     */
    public crawlLinkAddLinkWithHttpInfo(extractMediaRequest: ExtractMediaRequest, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.crawlLinkAddLinkWithHttpInfo(extractMediaRequest, _options);
        return result.toPromise();
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param extractMediaRequest The object containing the mandatory data for link extraction.
     */
    public crawlLinkAddLink(extractMediaRequest: ExtractMediaRequest, _options?: Configuration): Promise<void> {
        const result = this.api.crawlLinkAddLink(extractMediaRequest, _options);
        return result.toPromise();
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param crawlLink The crawl link to save.
     */
    public crawlLinkConfirmMediaExtractWithHttpInfo(crawlLink: CrawlLink, _options?: Configuration): Promise<HttpInfo<ICrawlLink>> {
        const result = this.api.crawlLinkConfirmMediaExtractWithHttpInfo(crawlLink, _options);
        return result.toPromise();
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param crawlLink The crawl link to save.
     */
    public crawlLinkConfirmMediaExtract(crawlLink: CrawlLink, _options?: Configuration): Promise<ICrawlLink> {
        const result = this.api.crawlLinkConfirmMediaExtract(crawlLink, _options);
        return result.toPromise();
    }

    /**
     * Deletes a crawl link.
     * @param id The id of the crawl link to delete.
     */
    public crawlLinkDeleteWithHttpInfo(id?: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.crawlLinkDeleteWithHttpInfo(id, _options);
        return result.toPromise();
    }

    /**
     * Deletes a crawl link.
     * @param id The id of the crawl link to delete.
     */
    public crawlLinkDelete(id?: string, _options?: Configuration): Promise<void> {
        const result = this.api.crawlLinkDelete(id, _options);
        return result.toPromise();
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param page The page index.
     * @param limit The number of elements to return.
     */
    public crawlLinkGetWithHttpInfo(page?: number, limit?: number, _options?: Configuration): Promise<HttpInfo<PaginatedResponseOfICrawlLink>> {
        const result = this.api.crawlLinkGetWithHttpInfo(page, limit, _options);
        return result.toPromise();
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param page The page index.
     * @param limit The number of elements to return.
     */
    public crawlLinkGet(page?: number, limit?: number, _options?: Configuration): Promise<PaginatedResponseOfICrawlLink> {
        const result = this.api.crawlLinkGet(page, limit, _options);
        return result.toPromise();
    }

    /**
     * Changes the name of the show for an added link.
     * @param crawlLinkId The id of the crawl link to rename.
     * @param renameCrawlLinkRequest The objects containing the new name.
     */
    public crawlLinkRenameLinkWithHttpInfo(crawlLinkId: string, renameCrawlLinkRequest: RenameCrawlLinkRequest, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.crawlLinkRenameLinkWithHttpInfo(crawlLinkId, renameCrawlLinkRequest, _options);
        return result.toPromise();
    }

    /**
     * Changes the name of the show for an added link.
     * @param crawlLinkId The id of the crawl link to rename.
     * @param renameCrawlLinkRequest The objects containing the new name.
     */
    public crawlLinkRenameLink(crawlLinkId: string, renameCrawlLinkRequest: RenameCrawlLinkRequest, _options?: Configuration): Promise<void> {
        const result = this.api.crawlLinkRenameLink(crawlLinkId, renameCrawlLinkRequest, _options);
        return result.toPromise();
    }


}



import { ObservableDownloadsApi } from './ObservableAPI';

import { DownloadsApiRequestFactory, DownloadsApiResponseProcessor} from "../apis/DownloadsApi";
export class PromiseDownloadsApi {
    private api: ObservableDownloadsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DownloadsApiRequestFactory,
        responseProcessor?: DownloadsApiResponseProcessor
    ) {
        this.api = new ObservableDownloadsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param url 
     */
    public downloadsCancelDownloadWithHttpInfo(url?: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.downloadsCancelDownloadWithHttpInfo(url, _options);
        return result.toPromise();
    }

    /**
     * @param url 
     */
    public downloadsCancelDownload(url?: string, _options?: Configuration): Promise<void> {
        const result = this.api.downloadsCancelDownload(url, _options);
        return result.toPromise();
    }

    /**
     */
    public downloadsGetDownloadsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<IPlexDownload>>> {
        const result = this.api.downloadsGetDownloadsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     */
    public downloadsGetDownloads(_options?: Configuration): Promise<Array<IPlexDownload>> {
        const result = this.api.downloadsGetDownloads(_options);
        return result.toPromise();
    }


}



import { ObservableHealthApi } from './ObservableAPI';

import { HealthApiRequestFactory, HealthApiResponseProcessor} from "../apis/HealthApi";
export class PromiseHealthApi {
    private api: ObservableHealthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthApiRequestFactory,
        responseProcessor?: HealthApiResponseProcessor
    ) {
        this.api = new ObservableHealthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public healthGetWithHttpInfo(_options?: Configuration): Promise<HttpInfo<HttpFile>> {
        const result = this.api.healthGetWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     */
    public healthGet(_options?: Configuration): Promise<HttpFile> {
        const result = this.api.healthGet(_options);
        return result.toPromise();
    }


}



import { ObservableIptvApi } from './ObservableAPI';

import { IptvApiRequestFactory, IptvApiResponseProcessor} from "../apis/IptvApi";
export class PromiseIptvApi {
    private api: ObservableIptvApi

    public constructor(
        configuration: Configuration,
        requestFactory?: IptvApiRequestFactory,
        responseProcessor?: IptvApiResponseProcessor
    ) {
        this.api = new ObservableIptvApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public iptvGetAtlasProPlaylistWithHttpInfo(_options?: Configuration): Promise<HttpInfo<string>> {
        const result = this.api.iptvGetAtlasProPlaylistWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     */
    public iptvGetAtlasProPlaylist(_options?: Configuration): Promise<string> {
        const result = this.api.iptvGetAtlasProPlaylist(_options);
        return result.toPromise();
    }


}



import { ObservableJobApi } from './ObservableAPI';

import { JobApiRequestFactory, JobApiResponseProcessor} from "../apis/JobApi";
export class PromiseJobApi {
    private api: ObservableJobApi

    public constructor(
        configuration: Configuration,
        requestFactory?: JobApiRequestFactory,
        responseProcessor?: JobApiResponseProcessor
    ) {
        this.api = new ObservableJobApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public jobGetRunningJobsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<Array<ScheduledJob>>> {
        const result = this.api.jobGetRunningJobsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     */
    public jobGetRunningJobs(_options?: Configuration): Promise<Array<ScheduledJob>> {
        const result = this.api.jobGetRunningJobs(_options);
        return result.toPromise();
    }

    /**
     * @param scheduledJob 
     */
    public jobInterruptJobWithHttpInfo(scheduledJob: ScheduledJob, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.jobInterruptJobWithHttpInfo(scheduledJob, _options);
        return result.toPromise();
    }

    /**
     * @param scheduledJob 
     */
    public jobInterruptJob(scheduledJob: ScheduledJob, _options?: Configuration): Promise<void> {
        const result = this.api.jobInterruptJob(scheduledJob, _options);
        return result.toPromise();
    }

    /**
     * @param triggerJobRequest 
     */
    public jobTriggerJobWithHttpInfo(triggerJobRequest: TriggerJobRequest, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.jobTriggerJobWithHttpInfo(triggerJobRequest, _options);
        return result.toPromise();
    }

    /**
     * @param triggerJobRequest 
     */
    public jobTriggerJob(triggerJobRequest: TriggerJobRequest, _options?: Configuration): Promise<void> {
        const result = this.api.jobTriggerJob(triggerJobRequest, _options);
        return result.toPromise();
    }


}



import { ObservableLogsApi } from './ObservableAPI';

import { LogsApiRequestFactory, LogsApiResponseProcessor} from "../apis/LogsApi";
export class PromiseLogsApi {
    private api: ObservableLogsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: LogsApiRequestFactory,
        responseProcessor?: LogsApiResponseProcessor
    ) {
        this.api = new ObservableLogsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param date 
     */
    public logsGetLogsWithHttpInfo(date?: Date, _options?: Configuration): Promise<HttpInfo<string>> {
        const result = this.api.logsGetLogsWithHttpInfo(date, _options);
        return result.toPromise();
    }

    /**
     * @param date 
     */
    public logsGetLogs(date?: Date, _options?: Configuration): Promise<string> {
        const result = this.api.logsGetLogs(date, _options);
        return result.toPromise();
    }


}



import { ObservablePlexWebhookApi } from './ObservableAPI';

import { PlexWebhookApiRequestFactory, PlexWebhookApiResponseProcessor} from "../apis/PlexWebhookApi";
export class PromisePlexWebhookApi {
    private api: ObservablePlexWebhookApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PlexWebhookApiRequestFactory,
        responseProcessor?: PlexWebhookApiResponseProcessor
    ) {
        this.api = new ObservablePlexWebhookApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public plexWebhookHandlePlexEventWithHttpInfo(_options?: Configuration): Promise<HttpInfo<HttpFile>> {
        const result = this.api.plexWebhookHandlePlexEventWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     */
    public plexWebhookHandlePlexEvent(_options?: Configuration): Promise<HttpFile> {
        const result = this.api.plexWebhookHandlePlexEvent(_options);
        return result.toPromise();
    }


}



import { ObservableProviderApi } from './ObservableAPI';

import { ProviderApiRequestFactory, ProviderApiResponseProcessor} from "../apis/ProviderApi";
export class PromiseProviderApi {
    private api: ObservableProviderApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ProviderApiRequestFactory,
        responseProcessor?: ProviderApiResponseProcessor
    ) {
        this.api = new ObservableProviderApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Gets the list of enabled providers.
     * @param searchEnabled Indicates if it should return only providers which have the search functionality.
     */
    public providerGetAvailableProvidersWithHttpInfo(searchEnabled?: boolean, _options?: Configuration): Promise<HttpInfo<Array<IProvider>>> {
        const result = this.api.providerGetAvailableProvidersWithHttpInfo(searchEnabled, _options);
        return result.toPromise();
    }

    /**
     * Gets the list of enabled providers.
     * @param searchEnabled Indicates if it should return only providers which have the search functionality.
     */
    public providerGetAvailableProviders(searchEnabled?: boolean, _options?: Configuration): Promise<Array<IProvider>> {
        const result = this.api.providerGetAvailableProviders(searchEnabled, _options);
        return result.toPromise();
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param providerId The provider id on which to perform the search
     * @param mediaSearchRequest The search request
     */
    public providerSearchWithHttpInfo(providerId: string, mediaSearchRequest: MediaSearchRequest, _options?: Configuration): Promise<HttpInfo<HttpFile>> {
        const result = this.api.providerSearchWithHttpInfo(providerId, mediaSearchRequest, _options);
        return result.toPromise();
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param providerId The provider id on which to perform the search
     * @param mediaSearchRequest The search request
     */
    public providerSearch(providerId: string, mediaSearchRequest: MediaSearchRequest, _options?: Configuration): Promise<HttpFile> {
        const result = this.api.providerSearch(providerId, mediaSearchRequest, _options);
        return result.toPromise();
    }


}



