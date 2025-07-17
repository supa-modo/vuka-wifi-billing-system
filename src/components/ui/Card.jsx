export const Card = ({
  children,
  className = "",
  hover = true,
  padding = true,
  ...props
}) => {
  const baseClasses = `card ${hover ? "hover:shadow-float" : ""} ${
    padding ? "" : "p-0"
  }`;
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};
