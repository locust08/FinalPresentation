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
  description = "Final visual output developed during the internship project, prepared for presentation and review.",
  eyebrow = "Final Showcase",
  frameLabel = "Media Area",
  mediaFormat = "landscape",
  tags = ["AI Video", "Presentation", "Ready For Review"],
  title = "Product Showcase",
}: PresentationShowcasePlaceholderSlideProps) {
  return (
    <ContentSlideTemplate title={title}>
      <div className={styles.wrapper}>
        <section className={styles.stage}>
          <div className={styles.mediaColumn}>
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
                    Insert final {mediaFormat === "portrait" ? "vertical" : "landscape"}{" "}
                    video here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className={styles.infoColumn}>
            <div className={styles.infoPanel}>
              <p className={styles.sectionLabel}>Showcase Caption</p>
              <h2 className={styles.caption}>{caption}</h2>
              <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.metaPanel}>
              <p className={styles.sectionLabel}>Details</p>

              <div className={styles.metaList}>
                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>Format</span>
                  <span className={styles.metaValue}>
                    {mediaFormat === "portrait" ? "Vertical Video" : "Landscape Video"}
                  </span>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.metaKey}>Purpose</span>
                  <span className={styles.metaValue}>Final product demonstration</span>
                </div>
              </div>

              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </ContentSlideTemplate>
  )
}
