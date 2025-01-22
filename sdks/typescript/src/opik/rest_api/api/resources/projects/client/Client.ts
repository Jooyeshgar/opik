/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import * as OpikApi from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace Projects {
    interface Options {
        environment?: core.Supplier<environments.OpikApiEnvironment | string>;
        /** Override the Authorization header */
        apiKey?: core.Supplier<string | undefined>;
        /** Override the Comet-Workspace header */
        workspaceName?: core.Supplier<string | undefined>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the Authorization header */
        apiKey?: string | undefined;
        /** Override the Comet-Workspace header */
        workspaceName?: string | undefined;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

/**
 * Project related resources
 */
export class Projects {
    constructor(protected readonly _options: Projects.Options = {}) {}

    /**
     * Find projects
     *
     * @param {OpikApi.FindProjectsRequest} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.projects.findProjects()
     */
    public findProjects(
        request: OpikApi.FindProjectsRequest = {},
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<OpikApi.ProjectPagePublic> {
        return core.APIPromise.from(
            (async () => {
                const { page, size, name, sorting } = request;
                const _queryParams: Record<string, string | string[] | object | object[]> = {};
                if (page != null) {
                    _queryParams["page"] = page.toString();
                }
                if (size != null) {
                    _queryParams["size"] = size.toString();
                }
                if (name != null) {
                    _queryParams["name"] = name;
                }
                if (sorting != null) {
                    _queryParams["sorting"] = sorting;
                }
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        "v1/private/projects"
                    ),
                    method: "GET",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    queryParameters: _queryParams,
                    requestType: "json",
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: serializers.ProjectPagePublic.parseOrThrow(_response.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    throw new errors.OpikApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError("Timeout exceeded when calling GET /v1/private/projects.");
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Create project
     *
     * @param {OpikApi.ProjectWrite} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link OpikApi.BadRequestError}
     * @throws {@link OpikApi.UnprocessableEntityError}
     *
     * @example
     *     await client.projects.createProject({
     *         name: "name"
     *     })
     */
    public createProject(
        request: OpikApi.ProjectWrite,
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<void> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        "v1/private/projects"
                    ),
                    method: "POST",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    body: serializers.ProjectWrite.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: undefined,
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    switch (_response.error.statusCode) {
                        case 400:
                            throw new OpikApi.BadRequestError(_response.error.body);
                        case 422:
                            throw new OpikApi.UnprocessableEntityError(_response.error.body);
                        default:
                            throw new errors.OpikApiError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.body,
                            });
                    }
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling POST /v1/private/projects."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Get project by id
     *
     * @param {string} id
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.projects.getProjectById("id")
     */
    public getProjectById(
        id: string,
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<OpikApi.ProjectPublic> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        `v1/private/projects/${encodeURIComponent(id)}`
                    ),
                    method: "GET",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: serializers.ProjectPublic.parseOrThrow(_response.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    throw new errors.OpikApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling GET /v1/private/projects/{id}."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Delete project by id
     *
     * @param {string} id
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link OpikApi.ConflictError}
     *
     * @example
     *     await client.projects.deleteProjectById("id")
     */
    public deleteProjectById(id: string, requestOptions?: Projects.RequestOptions): core.APIPromise<void> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        `v1/private/projects/${encodeURIComponent(id)}`
                    ),
                    method: "DELETE",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: undefined,
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    switch (_response.error.statusCode) {
                        case 409:
                            throw new OpikApi.ConflictError(_response.error.body);
                        default:
                            throw new errors.OpikApiError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.body,
                            });
                    }
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling DELETE /v1/private/projects/{id}."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Update project by id
     *
     * @param {string} id
     * @param {OpikApi.ProjectUpdate} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link OpikApi.BadRequestError}
     * @throws {@link OpikApi.UnprocessableEntityError}
     *
     * @example
     *     await client.projects.updateProject("id")
     */
    public updateProject(
        id: string,
        request: OpikApi.ProjectUpdate = {},
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<void> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        `v1/private/projects/${encodeURIComponent(id)}`
                    ),
                    method: "PATCH",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    body: serializers.ProjectUpdate.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: undefined,
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    switch (_response.error.statusCode) {
                        case 400:
                            throw new OpikApi.BadRequestError(_response.error.body);
                        case 422:
                            throw new OpikApi.UnprocessableEntityError(_response.error.body);
                        default:
                            throw new errors.OpikApiError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.body,
                            });
                    }
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling PATCH /v1/private/projects/{id}."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Delete projects batch
     *
     * @param {OpikApi.BatchDelete} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.projects.deleteProjectsBatch({
     *         ids: ["ids"]
     *     })
     */
    public deleteProjectsBatch(
        request: OpikApi.BatchDelete,
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<void> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        "v1/private/projects/delete"
                    ),
                    method: "POST",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    body: serializers.BatchDelete.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: undefined,
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    throw new errors.OpikApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling POST /v1/private/projects/delete."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Find Feedback Score names By Project Ids
     *
     * @param {OpikApi.FindFeedbackScoreNamesByProjectIdsRequest} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.projects.findFeedbackScoreNamesByProjectIds()
     */
    public findFeedbackScoreNamesByProjectIds(
        request: OpikApi.FindFeedbackScoreNamesByProjectIdsRequest = {},
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<OpikApi.FeedbackScoreNames> {
        return core.APIPromise.from(
            (async () => {
                const { projectIds } = request;
                const _queryParams: Record<string, string | string[] | object | object[]> = {};
                if (projectIds != null) {
                    _queryParams["project_ids"] = projectIds;
                }
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        "v1/private/projects/feedback-scores/names"
                    ),
                    method: "GET",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    queryParameters: _queryParams,
                    requestType: "json",
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: serializers.FeedbackScoreNames.parseOrThrow(_response.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    throw new errors.OpikApiError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling GET /v1/private/projects/feedback-scores/names."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Gets specified metrics for a project
     *
     * @param {string} id
     * @param {OpikApi.ProjectMetricRequestPublic} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link OpikApi.BadRequestError}
     * @throws {@link OpikApi.NotFoundError}
     *
     * @example
     *     await client.projects.getProjectMetrics("id")
     */
    public getProjectMetrics(
        id: string,
        request: OpikApi.ProjectMetricRequestPublic = {},
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<OpikApi.ProjectMetricResponsePublic> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        `v1/private/projects/${encodeURIComponent(id)}/metrics`
                    ),
                    method: "POST",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    body: serializers.ProjectMetricRequestPublic.jsonOrThrow(request, {
                        unrecognizedObjectKeys: "strip",
                    }),
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: serializers.ProjectMetricResponsePublic.parseOrThrow(_response.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    switch (_response.error.statusCode) {
                        case 400:
                            throw new OpikApi.BadRequestError(_response.error.body);
                        case 404:
                            throw new OpikApi.NotFoundError(_response.error.body);
                        default:
                            throw new errors.OpikApiError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.body,
                            });
                    }
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling POST /v1/private/projects/{id}/metrics."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    /**
     * Retrieve project
     *
     * @param {OpikApi.ProjectRetrievePublic} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link OpikApi.BadRequestError}
     * @throws {@link OpikApi.NotFoundError}
     * @throws {@link OpikApi.UnprocessableEntityError}
     *
     * @example
     *     await client.projects.retrieveProject({
     *         name: "name"
     *     })
     */
    public retrieveProject(
        request: OpikApi.ProjectRetrievePublic,
        requestOptions?: Projects.RequestOptions
    ): core.APIPromise<OpikApi.ProjectPublic> {
        return core.APIPromise.from(
            (async () => {
                const _response = await core.fetcher({
                    url: urlJoin(
                        (await core.Supplier.get(this._options.environment)) ?? environments.OpikApiEnvironment.Default,
                        "v1/private/projects/retrieve"
                    ),
                    method: "POST",
                    headers: {
                        "Comet-Workspace":
                            (await core.Supplier.get(this._options.workspaceName)) != null
                                ? await core.Supplier.get(this._options.workspaceName)
                                : undefined,
                        "X-Fern-Language": "JavaScript",
                        "X-Fern-Runtime": core.RUNTIME.type,
                        "X-Fern-Runtime-Version": core.RUNTIME.version,
                        ...(await this._getCustomAuthorizationHeaders()),
                        ...requestOptions?.headers,
                    },
                    contentType: "application/json",
                    requestType: "json",
                    body: serializers.ProjectRetrievePublic.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
                    timeoutMs:
                        requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                    maxRetries: requestOptions?.maxRetries,
                    withCredentials: true,
                    abortSignal: requestOptions?.abortSignal,
                });
                if (_response.ok) {
                    return {
                        ok: _response.ok,
                        body: serializers.ProjectPublic.parseOrThrow(_response.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                        headers: _response.headers,
                    };
                }
                if (_response.error.reason === "status-code") {
                    switch (_response.error.statusCode) {
                        case 400:
                            throw new OpikApi.BadRequestError(_response.error.body);
                        case 404:
                            throw new OpikApi.NotFoundError(_response.error.body);
                        case 422:
                            throw new OpikApi.UnprocessableEntityError(_response.error.body);
                        default:
                            throw new errors.OpikApiError({
                                statusCode: _response.error.statusCode,
                                body: _response.error.body,
                            });
                    }
                }
                switch (_response.error.reason) {
                    case "non-json":
                        throw new errors.OpikApiError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.rawBody,
                        });
                    case "timeout":
                        throw new errors.OpikApiTimeoutError(
                            "Timeout exceeded when calling POST /v1/private/projects/retrieve."
                        );
                    case "unknown":
                        throw new errors.OpikApiError({
                            message: _response.error.errorMessage,
                        });
                }
            })()
        );
    }

    protected async _getCustomAuthorizationHeaders() {
        const apiKeyValue = await core.Supplier.get(this._options.apiKey);
        return { Authorization: apiKeyValue };
    }
}
