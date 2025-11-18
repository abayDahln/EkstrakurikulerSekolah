export default function Card({
  children,
  className = "",
  onClick,
  hover = false
}) {
  const hoverClass = hover
    ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    : ""

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-200 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  )
}
