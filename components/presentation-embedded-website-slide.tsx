"use client"

import { useEffect, useRef, useState } from "react"

import styles from "./presentation-embedded-website-slide.module.css"

type PresentationEmbeddedWebsiteSlideProps = {
  musicSrc?: string
  src: string
  title: string
}

export function PresentationEmbeddedWebsiteSlide({
  musicSrc,
  src,
  title,
}: PresentationEmbeddedWebsiteSlideProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasLoadedInitialFrameRef = useRef(false)
  const [hasEnteredSite, setHasEnteredSite] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [frameSrc] = useState(() => {
    const separator = src.includes("?") ? "&" : "?"
    return `${src}${separator}slideSession=${Date.now()}`
  })

  const restoreDeckFocus = () => {
    const deckRoot = document.querySelector<HTMLElement>('[data-presentation-deck-root="true"]')
    deckRoot?.focus({ preventScroll: true })
  }

  const stopPlayback = (markEntered = false) => {
    const audio = audioRef.current

    if (!audio) {
      if (markEntered) {
        setHasEnteredSite(true)
      }
      return
    }

    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    if (markEntered) {
      setHasEnteredSite(true)
    }
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (document.activeElement?.tagName === "IFRAME") {
        restoreDeckFocus()
      }
    }, 160)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    const tryPlay = async () => {
      try {
        audio.volume = 0.42
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    void tryPlay()

    return () => {
      stopPlayback()
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      return
    }

    const intervalId = window.setInterval(() => {
      if (document.activeElement?.tagName === "IFRAME") {
        stopPlayback(true)
        restoreDeckFocus()
      }
    }, 200)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPlaying])

  const handleFrameLoad = () => {
    if (!musicSrc) {
      return
    }

    if (!hasLoadedInitialFrameRef.current) {
      hasLoadedInitialFrameRef.current = true
      return
    }

    stopPlayback(true)
  }

  return (
    <section
      aria-label={title}
      className={styles.shell}
      data-transition-panel
      data-transition-content="main"
    >
      {musicSrc && !hasEnteredSite ? <audio loop preload="auto" ref={audioRef} src={musicSrc} /> : null}

      <div
        className={styles.frameWrap}
        onMouseDown={() => {
          if (!hasEnteredSite) {
            stopPlayback(true)
          }
        }}
      >
        <iframe
          allow="autoplay; fullscreen"
          className={styles.frame}
          loading="eager"
          onLoad={handleFrameLoad}
          referrerPolicy="strict-origin-when-cross-origin"
          src={frameSrc}
          title={title}
        />
      </div>
    </section>
  )
}
