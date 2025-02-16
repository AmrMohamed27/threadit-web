"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  showPassword?: boolean;
  handleToggleShowPassword?: () => void;
}

const InputField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isTextArea = false,
  showPassword,
  handleToggleShowPassword,
}: InputFieldProps) => {
  const passwordInputType = showPassword ? "text" : "password";
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextArea ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <div className="relative">
                <Input
                  type={type === "password" ? passwordInputType : type}
                  placeholder={placeholder}
                  {...field}
                  className="relative"
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
