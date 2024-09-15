import * as api from "@/helpers/api";
import {
  useQuery,
  useMutation,
  QueryFunctionContext,
} from "@tanstack/react-query";
import type { ApiCall, LegislationArgs } from "./useApi.types";

const useApi = () => {
  const generateQuery = (name: string, apiCall: ApiCall, args: unknown) => {
    // eslint-disable-next-line
    return useQuery({
      queryKey: [name, args],
      queryFn: ({ queryKey }: QueryFunctionContext) => {
        const args = queryKey[1];
        return apiCall(args);
      },
    });
  };

  const generateMutation = (name: string, apiCall: ApiCall) =>
    // eslint-disable-next-line
    useMutation({
      mutationKey: [name],
      mutationFn: apiCall,
    });

  return {
    legislation: {
      get: ({ page, rowsPerPage, bill_status }: LegislationArgs) =>
        generateQuery("api.legislation.get", api.legislation.get, {
          page,
          rowsPerPage,
          bill_status,
        }),
    },
    favourites: {
      get: ({ page, rowsPerPage, bill_status }: LegislationArgs) =>
        generateQuery("api.favourites.get", api.favourites.get, {
          page,
          rowsPerPage,
          bill_status,
        }),
      post: () => generateMutation("api.favourites.post", api.favourites.post),
      delete: () =>
        generateMutation("api.favourites.delete", api.favourites.delete),
    },
  };
};

export default useApi;
