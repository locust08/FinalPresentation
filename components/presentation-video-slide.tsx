"use client"

import styles from "./presentation-video-slide.module.css"

type PresentationVideoSlideProps = {
  posterSrc?: string
  title: string
  videoSrc: string
}

export function PresentationVideoSlide({
  posterSrc,
  title,
  videoSrc,
}: PresentationVideoSlideProps) {
  return (
    <section
      aria-label={title}
      className={styles.shell}
      data-transition-panel
      data-transition-content="main"
    >
      <div className={styles.frameWrap}>
        <video
          autoPlay
          className={styles.video}
          controls
          loop
          muted
          playsInline
          poster={posterSrc}
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </section>
  )
}
