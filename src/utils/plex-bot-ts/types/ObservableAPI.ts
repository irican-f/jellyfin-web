import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { CrawlLinkApiRequestFactory, CrawlLinkApiResponseProcessor} from "../apis/CrawlLinkApi";
export class ObservableCrawlLinkApi {
    private requestFactory: CrawlLinkApiRequestFactory;
    private responseProcessor: CrawlLinkApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CrawlLinkApiRequestFactory,
        responseProcessor?: CrawlLinkApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CrawlLinkApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CrawlLinkApiResponseProcessor();
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param extractMediaRequest The object containing the mandatory data for link extraction.
     */
    public crawlLinkAddLinkWithHttpInfo(extractMediaRequest: ExtractMediaRequest, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.crawlLinkAddLink(extractMediaRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.crawlLinkAddLinkWithHttpInfo(rsp)));
            }));
    }

    /**
     * Adds a crawl link, it will return the extracted crawl link. You will need to confirm the link by calling the confirm-add endpoint and send the crawl link object. It allows for the third-party to edit the details of the crawl link before saving it.
     * @param extractMediaRequest The object containing the mandatory data for link extraction.
     */
    public crawlLinkAddLink(extractMediaRequest: ExtractMediaRequest, _options?: Configuration): Observable<void> {
        return this.crawlLinkAddLinkWithHttpInfo(extractMediaRequest, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param crawlLink The crawl link to save.
     */
    public crawlLinkConfirmMediaExtractWithHttpInfo(crawlLink: CrawlLink, _options?: Configuration): Observable<HttpInfo<ICrawlLink>> {
        const requestContextPromise = this.requestFactory.crawlLinkConfirmMediaExtract(crawlLink, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.crawlLinkConfirmMediaExtractWithHttpInfo(rsp)));
            }));
    }

    /**
     * Saves a crawl link to the database, this endpoint should be called after calling the add link endpoint.
     * @param crawlLink The crawl link to save.
     */
    public crawlLinkConfirmMediaExtract(crawlLink: CrawlLink, _options?: Configuration): Observable<ICrawlLink> {
        return this.crawlLinkConfirmMediaExtractWithHttpInfo(crawlLink, _options).pipe(map((apiResponse: HttpInfo<ICrawlLink>) => apiResponse.data));
    }

    /**
     * Deletes a crawl link.
     * @param id The id of the crawl link to delete.
     */
    public crawlLinkDeleteWithHttpInfo(id?: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.crawlLinkDelete(id, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.crawlLinkDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Deletes a crawl link.
     * @param id The id of the crawl link to delete.
     */
    public crawlLinkDelete(id?: string, _options?: Configuration): Observable<void> {
        return this.crawlLinkDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param page The page index.
     * @param limit The number of elements to return.
     */
    public crawlLinkGetWithHttpInfo(page?: number, limit?: number, _options?: Configuration): Observable<HttpInfo<PaginatedResponseOfICrawlLink>> {
        const requestContextPromise = this.requestFactory.crawlLinkGet(page, limit, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.crawlLinkGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * Gets added crawl links, the results are paginated.
     * @param page The page index.
     * @param limit The number of elements to return.
     */
    public crawlLinkGet(page?: number, limit?: number, _options?: Configuration): Observable<PaginatedResponseOfICrawlLink> {
        return this.crawlLinkGetWithHttpInfo(page, limit, _options).pipe(map((apiResponse: HttpInfo<PaginatedResponseOfICrawlLink>) => apiResponse.data));
    }

    /**
     * Changes the name of the show for an added link.
     * @param crawlLinkId The id of the crawl link to rename.
     * @param renameCrawlLinkRequest The objects containing the new name.
     */
    public crawlLinkRenameLinkWithHttpInfo(crawlLinkId: string, renameCrawlLinkRequest: RenameCrawlLinkRequest, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.crawlLinkRenameLink(crawlLinkId, renameCrawlLinkRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.crawlLinkRenameLinkWithHttpInfo(rsp)));
            }));
    }

    /**
     * Changes the name of the show for an added link.
     * @param crawlLinkId The id of the crawl link to rename.
     * @param renameCrawlLinkRequest The objects containing the new name.
     */
    public crawlLinkRenameLink(crawlLinkId: string, renameCrawlLinkRequest: RenameCrawlLinkRequest, _options?: Configuration): Observable<void> {
        return this.crawlLinkRenameLinkWithHttpInfo(crawlLinkId, renameCrawlLinkRequest, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { DownloadsApiRequestFactory, DownloadsApiResponseProcessor} from "../apis/DownloadsApi";
export class ObservableDownloadsApi {
    private requestFactory: DownloadsApiRequestFactory;
    private responseProcessor: DownloadsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DownloadsApiRequestFactory,
        responseProcessor?: DownloadsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DownloadsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DownloadsApiResponseProcessor();
    }

    /**
     * @param url 
     */
    public downloadsCancelDownloadWithHttpInfo(url?: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.downloadsCancelDownload(url, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.downloadsCancelDownloadWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param url 
     */
    public downloadsCancelDownload(url?: string, _options?: Configuration): Observable<void> {
        return this.downloadsCancelDownloadWithHttpInfo(url, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     */
    public downloadsGetDownloadsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<IPlexDownload>>> {
        const requestContextPromise = this.requestFactory.downloadsGetDownloads(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.downloadsGetDownloadsWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public downloadsGetDownloads(_options?: Configuration): Observable<Array<IPlexDownload>> {
        return this.downloadsGetDownloadsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<IPlexDownload>>) => apiResponse.data));
    }

}

import { HealthApiRequestFactory, HealthApiResponseProcessor} from "../apis/HealthApi";
export class ObservableHealthApi {
    private requestFactory: HealthApiRequestFactory;
    private responseProcessor: HealthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthApiRequestFactory,
        responseProcessor?: HealthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new HealthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new HealthApiResponseProcessor();
    }

    /**
     */
    public healthGetWithHttpInfo(_options?: Configuration): Observable<HttpInfo<HttpFile>> {
        const requestContextPromise = this.requestFactory.healthGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.healthGetWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public healthGet(_options?: Configuration): Observable<HttpFile> {
        return this.healthGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<HttpFile>) => apiResponse.data));
    }

}

import { IptvApiRequestFactory, IptvApiResponseProcessor} from "../apis/IptvApi";
export class ObservableIptvApi {
    private requestFactory: IptvApiRequestFactory;
    private responseProcessor: IptvApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: IptvApiRequestFactory,
        responseProcessor?: IptvApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new IptvApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new IptvApiResponseProcessor();
    }

    /**
     */
    public iptvGetAtlasProPlaylistWithHttpInfo(_options?: Configuration): Observable<HttpInfo<string>> {
        const requestContextPromise = this.requestFactory.iptvGetAtlasProPlaylist(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.iptvGetAtlasProPlaylistWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public iptvGetAtlasProPlaylist(_options?: Configuration): Observable<string> {
        return this.iptvGetAtlasProPlaylistWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

}

import { JobApiRequestFactory, JobApiResponseProcessor} from "../apis/JobApi";
export class ObservableJobApi {
    private requestFactory: JobApiRequestFactory;
    private responseProcessor: JobApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: JobApiRequestFactory,
        responseProcessor?: JobApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new JobApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new JobApiResponseProcessor();
    }

    /**
     */
    public jobGetRunningJobsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<Array<ScheduledJob>>> {
        const requestContextPromise = this.requestFactory.jobGetRunningJobs(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.jobGetRunningJobsWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public jobGetRunningJobs(_options?: Configuration): Observable<Array<ScheduledJob>> {
        return this.jobGetRunningJobsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<ScheduledJob>>) => apiResponse.data));
    }

    /**
     * @param scheduledJob 
     */
    public jobInterruptJobWithHttpInfo(scheduledJob: ScheduledJob, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.jobInterruptJob(scheduledJob, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.jobInterruptJobWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param scheduledJob 
     */
    public jobInterruptJob(scheduledJob: ScheduledJob, _options?: Configuration): Observable<void> {
        return this.jobInterruptJobWithHttpInfo(scheduledJob, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param triggerJobRequest 
     */
    public jobTriggerJobWithHttpInfo(triggerJobRequest: TriggerJobRequest, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.jobTriggerJob(triggerJobRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.jobTriggerJobWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param triggerJobRequest 
     */
    public jobTriggerJob(triggerJobRequest: TriggerJobRequest, _options?: Configuration): Observable<void> {
        return this.jobTriggerJobWithHttpInfo(triggerJobRequest, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}

import { LogsApiRequestFactory, LogsApiResponseProcessor} from "../apis/LogsApi";
export class ObservableLogsApi {
    private requestFactory: LogsApiRequestFactory;
    private responseProcessor: LogsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: LogsApiRequestFactory,
        responseProcessor?: LogsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new LogsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new LogsApiResponseProcessor();
    }

    /**
     * @param date 
     */
    public logsGetLogsWithHttpInfo(date?: Date, _options?: Configuration): Observable<HttpInfo<string>> {
        const requestContextPromise = this.requestFactory.logsGetLogs(date, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.logsGetLogsWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param date 
     */
    public logsGetLogs(date?: Date, _options?: Configuration): Observable<string> {
        return this.logsGetLogsWithHttpInfo(date, _options).pipe(map((apiResponse: HttpInfo<string>) => apiResponse.data));
    }

}

import { PlexWebhookApiRequestFactory, PlexWebhookApiResponseProcessor} from "../apis/PlexWebhookApi";
export class ObservablePlexWebhookApi {
    private requestFactory: PlexWebhookApiRequestFactory;
    private responseProcessor: PlexWebhookApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: PlexWebhookApiRequestFactory,
        responseProcessor?: PlexWebhookApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new PlexWebhookApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new PlexWebhookApiResponseProcessor();
    }

    /**
     */
    public plexWebhookHandlePlexEventWithHttpInfo(_options?: Configuration): Observable<HttpInfo<HttpFile>> {
        const requestContextPromise = this.requestFactory.plexWebhookHandlePlexEvent(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.plexWebhookHandlePlexEventWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public plexWebhookHandlePlexEvent(_options?: Configuration): Observable<HttpFile> {
        return this.plexWebhookHandlePlexEventWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<HttpFile>) => apiResponse.data));
    }

}

import { ProviderApiRequestFactory, ProviderApiResponseProcessor} from "../apis/ProviderApi";
export class ObservableProviderApi {
    private requestFactory: ProviderApiRequestFactory;
    private responseProcessor: ProviderApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ProviderApiRequestFactory,
        responseProcessor?: ProviderApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ProviderApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ProviderApiResponseProcessor();
    }

    /**
     * Gets the list of enabled providers.
     * @param searchEnabled Indicates if it should return only providers which have the search functionality.
     */
    public providerGetAvailableProvidersWithHttpInfo(searchEnabled?: boolean, _options?: Configuration): Observable<HttpInfo<Array<IProvider>>> {
        const requestContextPromise = this.requestFactory.providerGetAvailableProviders(searchEnabled, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.providerGetAvailableProvidersWithHttpInfo(rsp)));
            }));
    }

    /**
     * Gets the list of enabled providers.
     * @param searchEnabled Indicates if it should return only providers which have the search functionality.
     */
    public providerGetAvailableProviders(searchEnabled?: boolean, _options?: Configuration): Observable<Array<IProvider>> {
        return this.providerGetAvailableProvidersWithHttpInfo(searchEnabled, _options).pipe(map((apiResponse: HttpInfo<Array<IProvider>>) => apiResponse.data));
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param providerId The provider id on which to perform the search
     * @param mediaSearchRequest The search request
     */
    public providerSearchWithHttpInfo(providerId: string, mediaSearchRequest: MediaSearchRequest, _options?: Configuration): Observable<HttpInfo<HttpFile>> {
        const requestContextPromise = this.requestFactory.providerSearch(providerId, mediaSearchRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.providerSearchWithHttpInfo(rsp)));
            }));
    }

    /**
     * Search the provider website and gets the results. The results are paginated.
     * @param providerId The provider id on which to perform the search
     * @param mediaSearchRequest The search request
     */
    public providerSearch(providerId: string, mediaSearchRequest: MediaSearchRequest, _options?: Configuration): Observable<HttpFile> {
        return this.providerSearchWithHttpInfo(providerId, mediaSearchRequest, _options).pipe(map((apiResponse: HttpInfo<HttpFile>) => apiResponse.data));
    }

}
