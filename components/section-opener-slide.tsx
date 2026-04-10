"use client"

import Image from "next/image"
import type { CSSProperties } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./section-opener-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type SectionOpenerSlideProps = {
  sectionNumber?: string
  title?: string
}

export function SectionOpenerSlide({
  sectionNumber = "01",
  title = "Section Title",
}: SectionOpenerSlideProps) {
  const showNumber = sectionNumber.trim().length > 0
  const { isResponsiveViewport, scale, viewportHeight, viewportRef, viewportWidth } =
    useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )
  const useAdaptiveLayout =
    isResponsiveViewport || (viewportWidth > 0 && viewportHeight > 0 && viewportHeight < 760)
  const useCompactFallbackLayout =
    useAdaptiveLayout &&
    ((viewportWidth > 0 && viewportWidth <= 560) ||
      (viewportHeight > 0 && viewportHeight <= 760) ||
      scale <= 0.52)

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        {useAdaptiveLayout ? (
          <section
            className={[
              styles.responsive,
              useCompactFallbackLayout ? styles.responsiveCompact : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label="Section opener slide"
          >
            <div className={styles.responsiveInner}>
              <div className={styles.responsiveShapes} aria-hidden="true">
                <div className={styles.responsiveOutline} data-transition-content="decor">
                  <Image
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 767px) 78vw, 38vw"
                    src="/reference/figma-17-174-outline.svg"
                    unoptimized
                  />
                </div>

                <div className={styles.responsiveCard} data-transition-shape>
                  <Image
                    alt=""
                    fill
                    sizes="(max-width: 767px) 64vw, 30vw"
                    src="/reference/figma-17-174-card.svg"
                    unoptimized
                  />
                </div>

                {showNumber ? (
                  <p className={styles.responsiveNumber} data-transition-content="title">
                    {sectionNumber}
                  </p>
                ) : null}
              </div>

              <div className={styles.responsiveCopy} data-transition-content="title">
                <h1 className={styles.responsiveTitle}>{title}</h1>
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.desktop} aria-label="Section opener slide">
            <div
              className={styles.canvas}
              style={{ "--slide-scale": scale } as CSSProperties}
            >
              <div className={styles.frame}>
                <h1 className={styles.title} data-transition-content="title">
                  {title}
                </h1>

                <div
                  className={styles.outline}
                  aria-hidden="true"
                  data-transition-content="decor"
                >
                  <Image
                    alt=""
                    fill
                    priority
                    sizes="1119px"
                    src="/reference/figma-17-174-outline.svg"
                    unoptimized
                  />
                </div>

                <div className={styles.card} aria-hidden="true" data-transition-shape>
                  <Image
                    alt=""
                    fill
                    sizes="874px"
                    src="/reference/figma-17-174-card.svg"
                    unoptimized
                  />
                </div>

                {showNumber ? (
                  <p className={styles.number} data-transition-content="title">
                    {sectionNumber}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
