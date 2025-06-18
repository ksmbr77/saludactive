"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function VSLPageMinimal() {
  const [viewerCount, setViewerCount] = useState(961)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  useEffect(() => {
    // Load the video script with error handling
    const script = document.createElement("script")
    script.src =
      "https://scripts.converteai.net/7e36cdf6-8f2d-4adf-9c73-eb7c42755be9/players/68509a8aa01e999124c76568/player.js"
    script.async = true
    script.id = "converteai-script"

    script.onload = () => {
      console.log("Video script loaded successfully")
    }

    script.onerror = () => {
      console.error("Failed to load video script")
    }

    // Check if script already exists
    const existingScript = document.getElementById("converteai-script")
    if (!existingScript) {
      document.head.appendChild(script)
    }

    return () => {
      const scriptToRemove = document.getElementById("converteai-script")
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  useEffect(() => {
    // Animate viewer count
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 10) - 5 // Random change between -5 and +4
        const newCount = prev + change
        // Keep it between 950 and 980
        return Math.max(950, Math.min(980, newCount))
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hasShownPopup) return

    let timeOnPage = 0
    const timeInterval = setInterval(() => {
      timeOnPage += 1000
    }, 1000)

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownPopup && timeOnPage > 3000) {
        setShowExitPopup(true)
        setHasShownPopup(true)
      }
    }

    // Mobile: Page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && !hasShownPopup && timeOnPage > 10000) {
        setShowExitPopup(true)
        setHasShownPopup(true)
      }
    }

    // Mobile: Back button detection
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      if (!hasShownPopup && timeOnPage > 5000) {
        setShowExitPopup(true)
        setHasShownPopup(true)
        window.history.pushState(null, "", window.location.href)
      }
    }

    // Mobile: Touch events for swipe detection
    let startY = 0
    let startTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startTime = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return

      const currentY = e.touches[0].clientY
      const diffY = startY - currentY
      const timeDiff = Date.now() - startTime

      // Fast upward swipe near top of page
      if (diffY > 50 && timeDiff < 300 && window.scrollY < 100 && !hasShownPopup && timeOnPage > 5000) {
        setShowExitPopup(true)
        setHasShownPopup(true)
      }
    }

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })

    // Push initial state
    window.history.pushState(null, "", window.location.href)

    return () => {
      clearInterval(timeInterval)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [hasShownPopup])

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* H1 Title - Responsive */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black mb-6 sm:mb-8 leading-tight max-w-4xl mx-auto">
            Descubre el ritual casero que borra la "memoria de grasa" de tu cuerpo y derrite kilos sin dietas ni
            ejercicio.
          </h1>

          {/* Content based on the image - Responsive text sizes */}
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2">
              Descubre cómo una mezcla de 4 ingredientes naturales activa tus hormonas GLP-1 y transforma tu cuerpo
              mientras duermes.
            </p>

            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 leading-tight px-2">
              ¿Por Qué Médicos de Harvard Están Sorprendidos por Este Ritual Nocturno con Canela que Borra Grasa Rebelde
              Sin Dietas?
            </h2>
          </div>
        </div>

        {/* Video Section - Embedded */}
        <div className="mb-6 sm:mb-8">
          <div className="max-w-3xl mx-auto">
            {/* Embedded Video */}
            <div
              id="vid_68509a8aa01e999124c76568"
              style={{
                position: "relative",
                width: "100%",
                padding: "56.25% 0 0", // 16:9 aspect ratio
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <img
                id="thumb_68509a8aa01e999124c76568"
                src="https://images.converteai.net/7e36cdf6-8f2d-4adf-9c73-eb7c42755be9/players/68509a8aa01e999124c76568/thumbnail.jpg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                alt="thumbnail"
              />
              <div
                id="backdrop_68509a8aa01e999124c76568"
                style={{
                  WebkitBackdropFilter: "blur(5px)",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>

          {/* Animated Viewer Count */}
          <div className="text-center mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              {viewerCount} personas están mirando ahora
            </p>
          </div>
        </div>

        {/* Scientific References - Using the provided image */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20Tela%202025-06-16%20a%CC%80s%2019.44.17-dvTCNZ7zUpvPSKCjnpMJMNUKVrcDsH.png"
              alt="Referencias científicas: Harvard Medical School y Johns Hopkins School of Medicine"
              className="w-full h-auto max-w-md sm:max-w-lg mx-auto"
              style={{
                filter: "none",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Exit Intent Popup - Now works on mobile too */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative animate-fade-in">
              {/* Close button */}
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  ¡Espera! No te vayas sin ver esto...
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Miles de personas están transformando sus cuerpos con este ritual nocturno.
                  <strong className="text-red-600"> ¿Seguro que quieres perderte este secreto?</strong>
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowExitPopup(false)}
                    className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sí, quiero ver el ritual completo
                  </button>
                  <button
                    onClick={() => setShowExitPopup(false)}
                    className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
                  >
                    No gracias, prefiero seguir con sobrepeso
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
