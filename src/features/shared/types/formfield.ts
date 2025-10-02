import { ComponentProps, ReactNode } from "react";

export interface IOption {
  label: string;
  value: string | number;
}

export interface IControl<T> {
  name: T;
  label: string;
  required?: boolean;
  placeholder?: string;
  type: ComponentProps<"input">["type"];
  className?: string;
  icon?: ReactNode;
  options?: IOption[];
}
