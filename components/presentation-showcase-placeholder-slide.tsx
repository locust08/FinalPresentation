"use client"

import styles from "./presentation-showcase-placeholder-slide.module.css"

import { ContentSlideTemplate } from "@/components/content-slide-template"

type MediaFormat = "landscape" | "portrait"

type PresentationShowcasePlaceholderSlideProps = {
  caption?: string
  description?: string
  eyebrow?: string
  frameLabel?: string
  mediaFormat?: MediaFormat
  tags?: string[]
  title?: string
}

export function PresentationShowcasePlaceholderSlide({
  caption = "Final AI Video Output",
  eyebrow = "Final Showcase",
  frameLabel = "Media Area",
  mediaFormat = "landscape",
  title = "Product Showcase",
}: PresentationShowcasePlaceholderSlideProps) {
  return (
    <ContentSlideTemplate title={title}>
      <div className={styles.wrapper}>
        <section className={styles.stage}>
          <div
            className={[
              styles.mediaFrame,
              mediaFormat === "portrait" ? styles.mediaFramePortrait : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={styles.mediaHeader}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <p className={styles.frameLabel}>{frameLabel}</p>
            </div>

            <div className={styles.mediaScreen}>
              <div className={styles.screenGlow} aria-hidden="true" />
              <div className={styles.screenChrome} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className={styles.screenCenter}>
                <div className={styles.screenBadge}>
                  {mediaFormat === "portrait" ? "Vertical Ready" : "16:9 Ready"}
                </div>
                <p className={styles.screenTitle}>{caption}</p>
                <p className={styles.screenHint}>
                  Insert final{" "}
                  {mediaFormat === "portrait" ? "vertical" : "landscape"} video
                  here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ContentSlideTemplate>
  )
}
