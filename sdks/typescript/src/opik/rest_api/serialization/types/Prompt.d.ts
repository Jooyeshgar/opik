/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../index";
import * as OpikApi from "../../api/index";
import * as core from "../../core";
import { JsonNode } from "./JsonNode";
import { PromptVersion } from "./PromptVersion";
export declare const Prompt: core.serialization.ObjectSchema<serializers.Prompt.Raw, OpikApi.Prompt>;
export declare namespace Prompt {
    interface Raw {
        id?: string | null;
        name: string;
        description?: string | null;
        template?: string | null;
        metadata?: JsonNode.Raw | null;
        change_description?: string | null;
        created_at?: string | null;
        created_by?: string | null;
        last_updated_at?: string | null;
        last_updated_by?: string | null;
        version_count?: number | null;
        latest_version?: PromptVersion.Raw | null;
    }
}
