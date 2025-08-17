import React from "react";

export interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    disabled?: boolean;
    invalid?: boolean;
    variant?: "filled" | "outlined" | "ghost";
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
};

const variantClasses = {
    filled: "bg-gray-100 border border-gray-300",
    outlined: "border border-gray-400",
    ghost: "bg-transparent border-none",
};

export const InputField: React.FC<InputFieldProps> = ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    variant = "outlined",
    size = "md",
}) => {
    return (
        <div className="flex flex-col w-full">
            {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`rounded-md ${sizeClasses[size]} ${variantClasses[variant]
                    } ${invalid ? "border-red-500" : ""} ${disabled ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                aria-invalid={invalid}
            />
            {helperText && !invalid && (
                <span className="text-xs text-gray-500 mt-1">{helperText}</span>
            )}
            {invalid && errorMessage && (
                <span className="text-xs text-red-600 mt-1">{errorMessage}</span>
            )}
        </div>
    );
};
