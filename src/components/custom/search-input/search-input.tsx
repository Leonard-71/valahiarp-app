"use client";

import type { InputProps } from "@/components/custom/input";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/custom/input";
import { useDebounce } from "@/hooks";

export interface SearchInputProps
  extends Omit<InputProps, "onChange" | "defaultValue" | "value"> {
  onChange: (value: string | undefined) => void;
  time?: number;
  defaultValue?: string;
}

export function SearchInput({
  onChange,
  time = 300,
  defaultValue,
  className,
  ...props
}: SearchInputProps) {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [query, setQuery] = useState(defaultValue);
  const debouncedQuery = useDebounce(query, time);

  useEffect(() => {
    if (hasUserInteracted) {
      onChange(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <Input
      type="search"
      placeholder="Caută..."
      className={className}
      value={query}
      onChange={(e) => {
        setHasUserInteracted(true);
        setQuery(e.target.value);
      }}
      startIcon={<Search className="size-4" />}
      {...props}
    />
  );
}

export default SearchInput;
