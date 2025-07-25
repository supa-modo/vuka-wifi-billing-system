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
        <label className="block text-[0.8rem] md:text-sm font-semibold text-secondary-500 mb-1 md:mb-2">
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
        <p className="mt-1 text-[0.8rem] md:text-[0.83rem] lg:text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
