"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MultiValueInputProps {
  label: string;
  placeholder?: string;
  maxTags?: number;
  onTagsChange?: (tags: string[]) => void;
  onInputChange?: (value: string) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MultiValueInput: React.FC<MultiValueInputProps> = ({
  label,
  placeholder = "Add a tag...",
  maxTags = 5,
  onTagsChange,
  onInputChange,
  tags,
  setTags,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange?.(value);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block font-medium text-gray-700 text-sm">{label}</label>
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="flex flex-wrap items-center gap-2 p-2 border focus-within:border-blue-500 rounded-md focus-within:ring-2 focus-within:ring-blue-500"
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1 bg-theme-red/20 px-2 py-1"
          >
            {tag}
            <X
              className="w-3 h-3 hover:text-destructive cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
            />
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          className="flex-grow shadow-none p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm"
          placeholder={
            tags.length < maxTags ? placeholder : `Maximum ${maxTags} tags`
          }
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={tags.length >= maxTags}
        />
      </div>
      <p className="text-gray-500 text-xs">Add up to {maxTags} participants.</p>
    </div>
  );
};
