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
  | "input-range";

export interface IControl<T> {
  name: T;
  label: string;
  required?: boolean;
  placeholder?: string;
  placeholderMin?: string;
  placeholderMax?: string;
  type: InputType;
  className?: string;
  isFloat?: boolean;
  icon?: ReactNode;
  options?: IOption[];
}
