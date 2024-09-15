export interface FilterOption {
  label: string;
  value: string;
}

export interface Props {
  name: string;
  label: string;
  options: FilterOption[];
  defaultOption: number;
  disabled: boolean;
}
