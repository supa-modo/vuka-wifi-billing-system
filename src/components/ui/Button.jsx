export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center text-sm lg:text-[0.95rem] hover:cursor-pointer justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "btn-primary focus:ring-primary-500 shadow-md hover:shadow-xl",
    secondary: "btn-secondary focus:ring-primary-500 shadow-md hover:shadow-xl",
    success:
      "bg-success-500 hover:bg-success-600 text-white shadow-md hover:shadow-xl focus:ring-success-500",
    danger:
      "bg-danger-500 hover:bg-danger-600 text-white shadow-md hover:shadow-xl focus:ring-danger-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    gradient:
      "gradient-primary text-white shadow-glow hover:shadow-lg transform hover:-translate-y-0.5",
    secondary2:
      "bg-white hover:bg-gray-50 font-semibold text-gray-600 py-3 px-6 shadow-md hover:shadow-xl border border-gray-200",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2 md:py-2.5",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
