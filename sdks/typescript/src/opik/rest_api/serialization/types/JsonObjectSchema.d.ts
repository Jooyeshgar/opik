/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../index";
import * as OpikApi from "../../api/index";
import * as core from "../../core";
import { JsonSchemaElement } from "./JsonSchemaElement";
export declare const JsonObjectSchema: core.serialization.ObjectSchema<serializers.JsonObjectSchema.Raw, OpikApi.JsonObjectSchema>;
export declare namespace JsonObjectSchema {
    interface Raw {
        type?: string | null;
        description?: string | null;
        properties?: Record<string, JsonSchemaElement.Raw> | null;
        required?: string[] | null;
        additionalProperties?: boolean | null;
        $defs?: Record<string, JsonSchemaElement.Raw> | null;
    }
}
