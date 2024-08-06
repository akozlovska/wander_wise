'use client';

import { useState, memo } from "react";
import { twMerge } from "tailwind-merge";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { motion } from "framer-motion";
import { Icons, TextMedium } from "@/src/components/atoms";
import { InputControllerWrapper, IconButton } from "@/src/components/molecules";
  
interface ListInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  errorText?: string;
  placeholder?: string;
  label?: string;
  disabled: boolean;
}
  
const ListInput = <T extends FieldValues>({
  name,
  control,
  errorText,
  placeholder,
  label,
  disabled,
}: ListInputProps<T>) => {
  const [currentValue, setCurrentValue] = useState('');
  const handleAdd = (field: ControllerRenderProps<T, Path<T>>) => {
    if (currentValue.trim()) {
      field.onChange([...field.value, currentValue]);
      setCurrentValue("");
    }
  };

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      label={label}
    >
      {(field) => (
        <div className="relative flex w-full flex-col">
          <input
            {...field}
            id={name}
            type="text"
            disabled={disabled}
            placeholder={placeholder ? placeholder : ''}
            onChange={(e) => setCurrentValue(e.target.value)}
            value={currentValue}
            className={twMerge(
              `border border-gray-50 bg-white grow placeholder:text-gray-50
              text-black flex w-full items-center
              justify-center text-base rounded-lg
              transition-colors focus:outline-none px-4 py-3 z-10`,
              errorText && 'border-error',
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd(field);
              }
            }}
            onBlur={() => handleAdd(field)}
          />
          {field.value.length > 0 && (
            <ul
              className="z-10 mt-3 flex w-full flex-col gap-2"
            >
              {field.value.map((value: string) => (
                <motion.li
                  key={value}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex w-full items-start gap-3 pr-4"
                >
                  <IconButton
                    icon={<Icons.close className="h-5 w-5" />}
                    classes="p-0 text-gray-80"
                    onClick={() => 
                      field.onChange(
                        field.value.filter((v: string) => v !== value))
                    }
                  />
                  <TextMedium 
                    text={value} 
                    font="normal" 
                    classes="overflow-hidden break-words" 
                  />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      )}
    </InputControllerWrapper>
  );
};
  
export default memo(ListInput) as typeof ListInput;