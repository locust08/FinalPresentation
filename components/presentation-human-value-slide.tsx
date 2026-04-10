"use client"

import Image from "next/image"
import type { CSSProperties } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./presentation-human-value-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type PresentationHumanValueSlideProps = {
  lead: string
  points: string[]
  sectionNumber: string
  title: string
}

export function PresentationHumanValueSlide({
  lead,
  points,
  sectionNumber,
  title,
}: PresentationHumanValueSlideProps) {
  const { isResponsiveViewport, scale, viewportRef } = useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )

  const titleTop = "What Makes Me"
  const titleBottom = "Different from AI"

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        {isResponsiveViewport ? (
          <section aria-label={`${title} slide`} className={styles.responsive}>
            <div className={styles.responsiveTopLine} aria-hidden="true" />

            <div className={styles.responsiveInner} data-transition-panel>
              <div
                className={styles.responsiveBrandGhost}
                aria-hidden="true"
                data-transition-content="decor"
              >
                <span>HUMAN</span>
              </div>

              <header className={styles.responsiveHeader} data-transition-content="header">
                <p className={styles.responsiveEyebrow}>Section {sectionNumber}</p>

                <div className={styles.responsiveTitleWrap}>
                  <p className={styles.responsivePreTitle}>{titleTop}</p>
                  <h1 className={styles.responsiveHeroTitle}>{titleBottom}</h1>
                </div>

                <div className={styles.responsiveLeadBlock}>
                  <span className={styles.responsiveLeadRule} aria-hidden="true" />
                  <p className={styles.responsiveLead}>{lead}</p>
                </div>
              </header>

              <ol className={styles.responsivePoints} data-transition-content="main">
                {points.map((point, index) => (
                  <li
                    className={[
                      styles.responsivePoint,
                      index === 2 ? styles.responsivePointFeature : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={point}
                    style={{ "--stagger": index } as CSSProperties}
                  >
                    <div className={styles.responsivePointTop}>
                      <span className={styles.responsivePointNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.responsivePointLabel}>
                        {index === 0
                          ? "Judgement"
                          : index === 1
                            ? "Adaptability"
                            : "Human Value"}
                      </span>
                    </div>

                    <p className={styles.responsivePointText}>{point}</p>
                  </li>
                ))}
              </ol>

              <footer className={styles.responsiveFooter} data-transition-content="footer">
                <div className={styles.responsiveFooterLine} aria-hidden="true" />

                <div className={styles.responsiveFooterMeta}>
                  <div className={styles.responsiveLogo}>
                    <Image
                      alt="Locus-T"
                      fill
                      sizes="(max-width: 767px) 110px, 127px"
                      src="/reference/figma-20-2-logo.png"
                    />
                  </div>

                  <p className={styles.responsiveFooterText}>LOCUS-T SDN BHD</p>
                </div>
              </footer>
            </div>
          </section>
        ) : (
          <section aria-label={`${title} slide`} className={styles.desktop}>
            <div
              className={styles.canvas}
              style={{ "--slide-scale": scale } as CSSProperties}
            >
              <div className={styles.frame}>
                <div className={styles.topLine} aria-hidden="true" />

                <div
                  className={styles.brandGhost}
                  aria-hidden="true"
                  data-transition-content="decor"
                >
                  <span>HUMAN</span>
                </div>

                <div className={styles.content} data-transition-panel>
                  <header className={styles.header} data-transition-content="header">
                    <p className={styles.eyebrow}>Section {sectionNumber}</p>

                    <div className={styles.titleWrap}>
                      <p className={styles.preTitle}>{titleTop}</p>
                      <h1 className={styles.heroTitle}>{titleBottom}</h1>
                    </div>

                    <div className={styles.leadBlock}>
                      <span className={styles.leadRule} aria-hidden="true" />
                      <p className={styles.lead}>{lead}</p>
                    </div>
                  </header>

                  <ol className={styles.points} data-transition-content="main">
                    {points.map((point, index) => (
                      <li
                        className={[
                          styles.point,
                          index === 2 ? styles.pointFeature : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        key={point}
                        style={{ "--stagger": index } as CSSProperties}
                      >
                        <div className={styles.pointTop}>
                          <span className={styles.pointNumber}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.pointLabel}>
                            {index === 0
                              ? "Judgement"
                              : index === 1
                                ? "Adaptability"
                                : "Human Value"}
                          </span>
                        </div>

                        <p className={styles.pointText}>{point}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <footer className={styles.footer} data-transition-content="footer">
                  <div className={styles.footerLine} aria-hidden="true" />

                  <div className={styles.footerMeta}>
                    <div className={styles.logo}>
                      <Image
                        alt="Locus-T"
                        fill
                        sizes="127px"
                        src="/reference/figma-20-2-logo.png"
                      />
                    </div>

                    <p className={styles.footerText}>LOCUS-T SDN BHD</p>
                  </div>
                </footer>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
