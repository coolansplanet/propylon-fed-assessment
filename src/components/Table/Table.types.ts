import { Bill, Head } from "@/types/bill";

export interface Props {
  head: Head;
  rows: Bill[];
  isFetched: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
}
