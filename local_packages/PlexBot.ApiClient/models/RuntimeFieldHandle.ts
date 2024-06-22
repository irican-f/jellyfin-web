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
import type { IntPtr } from './IntPtr';
import {
    IntPtrFromJSON,
    IntPtrFromJSONTyped,
    IntPtrToJSON,
} from './IntPtr';

/**
 * 
 * @export
 * @interface RuntimeFieldHandle
 */
export interface RuntimeFieldHandle {
    /**
     * 
     * @type {IntPtr}
     * @memberof RuntimeFieldHandle
     */
    value?: IntPtr;
}

/**
 * Check if a given object implements the RuntimeFieldHandle interface.
 */
export function instanceOfRuntimeFieldHandle(value: object): value is RuntimeFieldHandle {
    return true;
}

export function RuntimeFieldHandleFromJSON(json: any): RuntimeFieldHandle {
    return RuntimeFieldHandleFromJSONTyped(json, false);
}

export function RuntimeFieldHandleFromJSONTyped(json: any, ignoreDiscriminator: boolean): RuntimeFieldHandle {
    if (json == null) {
        return json;
    }
    return {
        
        'value': json['value'] == null ? undefined : IntPtrFromJSON(json['value']),
    };
}

export function RuntimeFieldHandleToJSON(value?: RuntimeFieldHandle | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'value': IntPtrToJSON(value['value']),
    };
}

