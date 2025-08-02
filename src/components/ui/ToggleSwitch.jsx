import React from "react";

const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  size = "default", // "small", "default", "large"
  variant = "default", // "default", "success", "warning", "danger"
  className = "",
  title = "",
}) => {
  const sizeClasses = {
    small: "h-4 w-7",
    default: "h-6 w-11",
    large: "h-8 w-14",
  };

  const thumbSizeClasses = {
    small: "h-3 w-3",
    default: "h-4 w-4",
    large: "h-6 w-6",
  };

  const translateClasses = {
    small: checked ? "translate-x-4" : "translate-x-0.5",
    default: checked ? "translate-x-6" : "translate-x-1",
    large: checked ? "translate-x-7" : "translate-x-1",
  };

  const variantClasses = {
    default: checked
      ? "bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25"
      : "bg-gray-300 hover:bg-gray-400",
    success: checked
      ? "bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-green-500/25"
      : "bg-gray-300 hover:bg-gray-400",
    warning: checked
      ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25"
      : "bg-gray-300 hover:bg-gray-400",
    danger: checked
      ? "bg-gradient-to-r from-red-500 to-pink-600 shadow-lg shadow-red-500/25"
      : "bg-gray-300 hover:bg-gray-400",
    secondary: checked
      ? "bg-gradient-to-r from-secondary-400 to-secondary-500 shadow-lg shadow-secondary-500/25"
      : "bg-gray-300 hover:bg-gray-400",
  };

  const focusRingClasses = {
    default: "focus:ring-primary-600",
    success: "focus:ring-green-600",
    warning: "focus:ring-amber-600",
    danger: "focus:ring-red-600",
    secondary: "focus:ring-secondary-500",
  };

  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${focusRingClasses[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      title={title}
      type="button"
    >
      <span
        className={`inline-block rounded-full bg-white shadow-lg transition-all duration-300 ${thumbSizeClasses[size]} ${translateClasses[size]}`}
      />
    </button>
  );
};

export default ToggleSwitch;
