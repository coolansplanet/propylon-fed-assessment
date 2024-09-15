import { AxiosResponse } from "axios";

export type LegislationArgs = {
  page: number;
  rowsPerPage: number;
  bill_status: string;
};

export type ApiCall = (args?: any) => Promise<AxiosResponse> | Promise<unknown>;
//Promise<unknown> is only applicable for mock requests.
