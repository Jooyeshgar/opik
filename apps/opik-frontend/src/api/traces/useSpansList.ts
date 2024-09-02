import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api, { QueryConfig, SPANS_REST_ENDPOINT } from "@/api/api";
import { Span, SPAN_TYPE } from "@/types/traces";
import { Filters } from "@/types/filters";
import { generateSearchByIDFilters, processFilters } from "@/lib/filters";

type UseSpansListParams = {
  projectId: string;
  traceId?: string;
  type?: SPAN_TYPE;
  filters?: Filters;
  search?: string;
  page: number;
  size: number;
};

export type UseSpansListResponse = {
  content: Span[];
  total: number;
};

const getSpansList = async (
  { signal }: QueryFunctionContext,
  { projectId, traceId, type, filters, search, size, page }: UseSpansListParams,
) => {
  const { data } = await api.get(SPANS_REST_ENDPOINT, {
    signal,
    params: {
      project_id: projectId,
      ...(traceId && { trace_id: traceId }),
      ...(type && { type }),
      ...processFilters(filters, generateSearchByIDFilters(search)),
      size,
      page,
    },
  });

  return data;
};

export default function useSpansList(
  params: UseSpansListParams,
  options?: QueryConfig<UseSpansListResponse>,
) {
  return useQuery({
    queryKey: ["spans", params],
    queryFn: (context) => getSpansList(context, params),
    ...options,
  });
}