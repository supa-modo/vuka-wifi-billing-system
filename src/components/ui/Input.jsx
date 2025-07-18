export const Input = ({
  label,
  error,
  helperText,
  icon,
  className = "",
  type = "text",
  ...props
}) => {
  const inputClasses = `input-field ${
    error ? "border-danger-500 focus:ring-danger-500" : ""
  } ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-600 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          type={type}
          className={`${inputClasses} ${icon ? "pl-11" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
