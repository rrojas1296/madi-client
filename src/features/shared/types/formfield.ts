import { ComponentProps, ReactNode } from "react";

export interface IOption {
  label: string;
  value: string | number;
}

type InputType =
  | ComponentProps<"input">["type"]
  | "select"
  | "select-badge"
  | "switch"
  | "phone"
  | "input-range";

export interface IControl<T> {
  name: T;
  label?: string;
  required?: boolean;
  labelNumber?: string;
  labelCode?: string;
  placeholder?: string;
  placeholderMin?: string;
  placeholderMax?: string;
  placeholderNumber?: string;
  placeholderCode?: string;
  type: InputType;
  className?: string;
  isFloat?: boolean;
  icon?: ReactNode;
  options?: IOption[];
}
