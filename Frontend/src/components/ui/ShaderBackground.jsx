import React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

/**
 * Animated MeshGradient background — drop onto any page as
 * a full-screen layer behind your content.
 *
 * @param {"light" | "dark"} variant - color scheme
 * @param {number} speed   - animation speed (default 0.6)
 * @param {string} className - extra classes
 */
export default function ShaderBackground({
  variant = "dark",
  speed = 0.6,
  className = "",
}) {
  const palettes = {
    dark: {
      colors: ["#000000", "#0a0a12", "#0d1b2a", "#1b2838"],
      bg: "#000000",
    },
    light: {
      colors: ["#e8ecf4", "#dce4f2", "#c5d0e6", "#f0f2f8"],
      bg: "#eef1f8",
    },
    hero: {
      colors: ["#000000", "#06101f", "#0d1b2a", "#102a43"],
      bg: "#000000",
    },
  }

  const p = palettes[variant] || palettes.dark

  return (
    <MeshGradient
      className={`w-full h-full absolute inset-0 ${className}`}
      colors={p.colors}
      speed={speed}
      backgroundColor={p.bg}
      style={{ position: "absolute", inset: 0 }}
    />
  )
}
