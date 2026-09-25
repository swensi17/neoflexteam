"use client"

// Reference copy for future React/shadcn rebuild.
// Live site uses /js/waves-shader-bg.js (vanilla WebGL) on the static portfolio.

import { useEffect, useRef } from "react"

const VERT = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

// Shader source lives in /js/waves-shader-bg.js — keep in sync when editing.

export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Mount via global helper when React source project is set up.
    const mount = (window as unknown as { __neoflexMountShader?: (c: HTMLCanvasElement) => void }).__neoflexMountShader
    const destroy = mount?.(canvas)
    return () => destroy?.()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
