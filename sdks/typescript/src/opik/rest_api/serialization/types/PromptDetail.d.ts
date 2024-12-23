/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../index";
import * as OpikApi from "../../api/index";
import * as core from "../../core";
import { PromptVersionDetail } from "./PromptVersionDetail";
export declare const PromptDetail: core.serialization.ObjectSchema<serializers.PromptDetail.Raw, OpikApi.PromptDetail>;
export declare namespace PromptDetail {
    interface Raw {
        id?: string | null;
        name: string;
        description?: string | null;
        created_at?: string | null;
        created_by?: string | null;
        last_updated_at?: string | null;
        last_updated_by?: string | null;
        version_count?: number | null;
        latest_version?: PromptVersionDetail.Raw | null;
    }
}
