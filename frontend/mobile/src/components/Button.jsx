export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"

  const variantClasses = {
    primary:
      "bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 text-gray-900 dark:text-white",
    outline:
      "border-2 border-sky-500 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 active:bg-sky-100 dark:active:bg-sky-900/30",
    danger:
      "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md hover:shadow-lg"
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
