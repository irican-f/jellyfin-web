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

import { mapValues } from '../runtime';
import type { ICrawlLink } from './ICrawlLink';
import {
    ICrawlLinkFromJSON,
    ICrawlLinkFromJSONTyped,
    ICrawlLinkToJSON,
} from './ICrawlLink';

/**
 * 
 * @export
 * @interface IProvider
 */
export interface IProvider {
    /**
     * 
     * @type {string}
     * @memberof IProvider
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof IProvider
     */
    displayName?: string;
    /**
     * 
     * @type {string}
     * @memberof IProvider
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof IProvider
     */
    url?: string;
    /**
     * 
     * @type {boolean}
     * @memberof IProvider
     */
    enabled?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof IProvider
     */
    searchEnabled?: boolean;
    /**
     * 
     * @type {Array<ICrawlLink>}
     * @memberof IProvider
     */
    crawlLinksRef?: Array<ICrawlLink>;
}

/**
 * Check if a given object implements the IProvider interface.
 */
export function instanceOfIProvider(value: object): value is IProvider {
    return true;
}

export function IProviderFromJSON(json: any): IProvider {
    return IProviderFromJSONTyped(json, false);
}

export function IProviderFromJSONTyped(json: any, ignoreDiscriminator: boolean): IProvider {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'displayName': json['displayName'] == null ? undefined : json['displayName'],
        'name': json['name'] == null ? undefined : json['name'],
        'url': json['url'] == null ? undefined : json['url'],
        'enabled': json['enabled'] == null ? undefined : json['enabled'],
        'searchEnabled': json['searchEnabled'] == null ? undefined : json['searchEnabled'],
        'crawlLinksRef': json['crawlLinksRef'] == null ? undefined : ((json['crawlLinksRef'] as Array<any>).map(ICrawlLinkFromJSON)),
    };
}

export function IProviderToJSON(value?: IProvider | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'displayName': value['displayName'],
        'name': value['name'],
        'url': value['url'],
        'enabled': value['enabled'],
        'searchEnabled': value['searchEnabled'],
        'crawlLinksRef': value['crawlLinksRef'] == null ? undefined : ((value['crawlLinksRef'] as Array<any>).map(ICrawlLinkToJSON)),
    };
}

