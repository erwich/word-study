import React from "react"

const borderColors = {
  red: `border-red-500`,
  orange: `border-orange-500`,
  amber: `border-amber-500`,
  yellow: `border-yellow-500`,
  green: `border-green-500`,
  blue: `border-blue-500`,
}

const Header = ({ text, borderColor }) => {
  const bgClass = borderColors[borderColor] || `border-amber-500`
  return (
    <h1 className={`
      mb-3 
      rounded-sm 
      border-l-8 
      ${bgClass} 
      bg-slate-100 
      py-4 px-4 
      text-3xl 
      dark:bg-slate-900 
      dark:text-slate-100`}>{text}</h1>
  )
}

export default Header