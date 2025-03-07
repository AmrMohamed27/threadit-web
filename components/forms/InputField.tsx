"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TextareaAutosize from "react-textarea-autosize";
import { Control } from "react-hook-form";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useTheme } from "next-themes";

interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  isMarkdown?: boolean;
  showPassword?: boolean;
  disabled?: boolean;
  handleToggleShowPassword?: () => void;
}

const InputField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isTextArea = false,
  isMarkdown = false,
  showPassword = false,
  handleToggleShowPassword,
  disabled = false,
}: InputFieldProps) => {
  const passwordInputType = showPassword ? "text" : "password";
  const { resolvedTheme } = useTheme();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            type === "checkbox"
              ? "flex flex-row-reverse gap-2 items-center"
              : ""
          )}
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextArea ? (
              <TextareaAutosize
                className="flex bg-transparent disabled:opacity-50 shadow-sm px-3 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full min-h-[60px] placeholder:text-muted-foreground md:text-sm text-base resize-none disabled:cursor-not-allowed"
                placeholder={placeholder}
                {...field}
              />
            ) : isMarkdown ? (
              <MarkdownEditor
                {...field}
                className="!bg-transparent *:max-w-full !text-foreground"
                height="400px"
                enableScroll={false}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
              />
            ) : (
              <div className="relative">
                <Input
                  type={type === "password" ? passwordInputType : type}
                  placeholder={placeholder}
                  {...field}
                  className={cn(
                    "relative",
                    type === "checkbox" ? "mb-2 w-[15px]" : ""
                  )}
                  disabled={disabled}
                />
                {type === "password" && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (typeof handleToggleShowPassword !== "undefined") {
                        handleToggleShowPassword();
                      }
                    }}
                    variant={"ghost"}
                    size="icon"
                    className="top-1/2 right-2 absolute hover:bg-transparent -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                )}
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
