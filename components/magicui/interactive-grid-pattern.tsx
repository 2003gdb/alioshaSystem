"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useState, useEffect } from "react"

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
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */

export function InteractiveGridPattern({
  width = 150,
  height = 150,
  squares = [12, 12],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null)
  const [squareColors, setSquareColors] = useState<{ [key: number]: string }>({})
  const [autoSquares, setAutoSquares] = useState<{ [key: number]: string }>({})

  const colors = ['fill-alioshaBlue', 'fill-alioshaRed', 'fill-alioshaYellow']

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getRandomSquareIndex = () => {
    return Math.floor(Math.random() * (horizontal * vertical))
  }

  // Auto-spark random squares with random timing for more organic feel
  useEffect(() => {
    const sparkSquare = () => {
      // Spark 1-3 squares at once for more noticeable effect
      const numSquares = Math.floor(Math.random() * 10) + 3
      
      for (let i = 0; i < numSquares; i++) {
        const randomIndex = getRandomSquareIndex()
        const randomColor = getRandomColor()
        
        setAutoSquares(prev => ({
          ...prev,
          [randomIndex]: randomColor
        }))

        // Remove each square after a random duration (1-3 seconds)
        const fadeDelay = Math.random() * 2000 + 1000
        setTimeout(() => {
          setAutoSquares(prev => {
            const newState = { ...prev }
            delete newState[randomIndex]
            return newState
          })
        }, fadeDelay)
      }
      
      // Schedule next spark with random interval (1-4 seconds)
      const nextInterval = Math.random() * 3000 + 1000
      setTimeout(sparkSquare, nextInterval)
    }

    // Start the sparking
    sparkSquare()
  }, [horizontal, vertical])

  const handleMouseEnter = (index: number) => {
    setHoveredSquare(index)
    if (!squareColors[index]) {
      setSquareColors(prev => ({
        ...prev,
        [index]: getRandomColor()
      }))
    }
  }

  const handleMouseLeave = (index: number) => {
    setHoveredSquare(null)
    setSquareColors(prev => {
      const newState = { ...prev }
      delete newState[index]
      return newState
    })
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
            stroke="none"
            strokeWidth={0}
            style={{ stroke: 'none', strokeWidth: 0 }}
            className={cn(
              "transition-all duration-100 ease-in-out [&:not(:hover)]:duration-3000",
              // Show color only while hovering or if it's an auto-spark
              hoveredSquare === index && squareColors[index] 
                ? squareColors[index] 
                : autoSquares[index]
                  ? autoSquares[index]
                  : "fill-transparent",
              squaresClassName,
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          />
        )
      })}
    </svg>
  )
}