"use client";

import { ChangeEvent, forwardRef, useId, useRef } from "react";
import { Upload } from "lucide-react";

import { InputProps } from "@/components/custom/input";
import { cn } from "@/lib/utils";

export interface FileInputProps
  extends Omit<InputProps, "onChange" | "value" | "type"> {
  onChange: (files: File | File[] | null) => void;
  value?: File | File[];
  isInvalid?: boolean;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      startIcon = <Upload className="size-4" />,
      endIcon,
      multiple,
      onChange,
      value,
      isInvalid,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (multiple) {
        onChange(fileList ? Array.from(fileList) : null);
      } else {
        onChange(fileList ? fileList[0] : null);
      }
    };

    const files = value ? (Array.isArray(value) ? value : [value]) : [];

    const fileNames =
      files.length > 0
        ? files.map((file) => file.name).join(", ")
        : props.placeholder || "Niciun fișier selectat";

    const handleWrapperClick = () => {
      inputRef.current?.click();
    };

    return (
      <div
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:focus-within:ring-offset-background-dark flex h-9 w-full cursor-pointer items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] focus-within:ring-offset-2",
          {
            "text-muted-foreground": files.length === 0,
          },
          isInvalid && "border-destructive",
          className,
        )}
        onClick={handleWrapperClick}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {startIcon}
          <span className="w-0 flex-1 truncate">{fileNames}</span>
        </div>
        {endIcon}
        <input
          id={id}
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          ref={(instance) => {
            if (ref) {
              if (typeof ref === "function") {
                ref(instance);
              } else {
                ref.current = instance;
              }
            }
            if (inputRef) {
              inputRef.current = instance;
            }
          }}
          className="hidden"
          {...props}
        />
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export { FileInput };
