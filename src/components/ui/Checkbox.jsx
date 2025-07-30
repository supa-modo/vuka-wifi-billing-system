import React from "react";
import { FaCheck } from "react-icons/fa";

const Checkbox = ({
  checked,
  onChange,
  className = "",
  disabled = false,
  label,
  id,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={`inline-flex items-center mt-1 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div
          onClick={handleClick}
          className={`w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center ${
            disabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : checked
              ? "bg-primary-600 border-primary-600"
              : "border-gray-300 hover:border-primary-400"
          }`}
        >
          {checked && <FaCheck className="w-[0.7rem] h-[0.7rem] text-white" />}
        </div>
      </div>
      {label && (
        <label
          htmlFor={id}
          onClick={handleClick}
          className={`ml-2 text-sm font-medium cursor-pointer ${
            disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
