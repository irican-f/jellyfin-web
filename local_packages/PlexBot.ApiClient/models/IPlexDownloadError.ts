/* tslint:disable */
/* eslint-disable */
// @ts-nocheck 
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

import type { Exception } from './Exception';
import {
    instanceOfException,
    ExceptionFromJSON,
    ExceptionFromJSONTyped,
    ExceptionToJSON,
} from './Exception';

/**
 * @type IPlexDownloadError
 * 
 * @export
 */
export type IPlexDownloadError = Exception;

export function IPlexDownloadErrorFromJSON(json: any): IPlexDownloadError {
    return IPlexDownloadErrorFromJSONTyped(json, false);
}

export function IPlexDownloadErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): IPlexDownloadError {
    if (json == null) {
        return json;
    }
    if (instanceOfException(json)) {
        return ExceptionFromJSONTyped(json, true);
    }
}

export function IPlexDownloadErrorToJSON(value?: IPlexDownloadError | null): any {
    if (value == null) {
        return value;
    }

    if (instanceOfException(value)) {
        return ExceptionToJSON(value as Exception);
    }

    return {};
}

