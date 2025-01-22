/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as OpikApi from "../index";

export type AutomationRuleEvaluatorObjectPublic = OpikApi.AutomationRuleEvaluatorObjectPublic.LlmAsJudge;

export declare namespace AutomationRuleEvaluatorObjectPublic {
    interface LlmAsJudge extends OpikApi.AutomationRuleEvaluatorLlmAsJudgePublic, _Base {
        type: "llm_as_judge";
    }

    interface _Base {
        id?: string;
        projectId?: string;
        name: string;
        samplingRate?: number;
        createdAt?: Date;
        createdBy?: string;
        lastUpdatedAt?: Date;
        lastUpdatedBy?: string;
        action?: "evaluator";
    }
}
