import { useMutation, useQueryClient } from "@tanstack/react-query";
import get from "lodash/get";
import { useToast } from "@/components/ui/use-toast";
import api, { PROJECTS_REST_ENDPOINT } from "@/api/api";

type UseProjectBatchDeleteMutationParams = {
  ids: string[];
};

const useProjectBatchDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ ids }: UseProjectBatchDeleteMutationParams) => {
      const { data } = await api.post(`${PROJECTS_REST_ENDPOINT}delete`, {
        ids: ids,
      });
      return data;
    },
    onError: (error) => {
      const message = get(
        error,
        ["response", "data", "message"],
        error.message,
      );

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export default useProjectBatchDeleteMutation;
