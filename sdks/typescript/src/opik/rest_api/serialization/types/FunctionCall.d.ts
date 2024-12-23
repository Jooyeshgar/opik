/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../index";
import * as OpikApi from "../../api/index";
import * as core from "../../core";
export declare const FunctionCall: core.serialization.ObjectSchema<serializers.FunctionCall.Raw, OpikApi.FunctionCall>;
export declare namespace FunctionCall {
    interface Raw {
        name?: string | null;
        arguments?: string | null;
    }
}