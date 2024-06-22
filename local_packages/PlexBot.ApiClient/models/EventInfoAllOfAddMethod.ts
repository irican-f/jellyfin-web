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

import type { MethodInfo } from './MethodInfo';
import {
    instanceOfMethodInfo,
    MethodInfoFromJSON,
    MethodInfoFromJSONTyped,
    MethodInfoToJSON,
} from './MethodInfo';

/**
 * @type EventInfoAllOfAddMethod
 * 
 * @export
 */
export type EventInfoAllOfAddMethod = MethodInfo;

export function EventInfoAllOfAddMethodFromJSON(json: any): EventInfoAllOfAddMethod {
    return EventInfoAllOfAddMethodFromJSONTyped(json, false);
}

export function EventInfoAllOfAddMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventInfoAllOfAddMethod {
    if (json == null) {
        return json;
    }
    if (instanceOfMethodInfo(json)) {
        return MethodInfoFromJSONTyped(json, true);
    }
}

export function EventInfoAllOfAddMethodToJSON(value?: EventInfoAllOfAddMethod | null): any {
    if (value == null) {
        return value;
    }

    if (instanceOfMethodInfo(value)) {
        return MethodInfoToJSON(value as MethodInfo);
    }

    return {};
}

