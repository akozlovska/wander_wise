'use client';

import { memo, ReactNode } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { ErrorText } from "@/src/components/atoms";

interface InputControllerWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  isErrorLabelVisible?: boolean;
  label?: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}

const InputControllerWrapper = <T extends FieldValues>({
  isErrorLabelVisible = true,
  control,
  name,
  label,
  children,
}: InputControllerWrapperProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div 
          className="flex flex-col gap-3"
        >
          {!!label && (
            <label
              htmlFor={name}
              className="relative flex w-full
              flex-col items-start text-xl font-medium text-black"
            >
              {label}
            </label>
          )}


          {children(field)}

          {isErrorLabelVisible && fieldState?.error?.message && (
            <ErrorText errorText={fieldState.error.message} classes="w-fit" />
          )}
        </div>
      )}
    />
  );
};

export default memo(InputControllerWrapper) as typeof InputControllerWrapper;
