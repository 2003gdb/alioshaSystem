"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useState } from "react"

/**
 * InteractiveGridPattern is a component that renders a grid pattern with interactive squares.
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - The number of squares in the grid. The first element is the number of horizontal squares, and the second element is the number of vertical squares.
 * @param className - The class name of the grid.
 * @param squaresClassName - The class name of the squares.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number] // [horizontal, vertical]
  className?: string
  squaresClassName?: string
}

/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({
  width = 150,
  height = 150,
  squares = [30, 30],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const [squareColors, setSquareColors] = useState<{ [key: number]: string }>({})

  const colors = ['fill-alioshaBlue', 'fill-alioshaRed', 'fill-alioshaYellow']

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleMouseEnter = (index: number) => {
    setHoveredSquare(index)
    if (!squareColors[index]) {
      setSquareColors(prev => ({
        ...prev,
        [index]: getRandomColor()
      }))
    }
  }

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "stroke-gray-800/20 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              hoveredSquare === index && squareColors[index] 
                ? squareColors[index] 
                : "fill-transparent",
              squaresClassName,
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        )
      })}
    </svg>
  )
}
