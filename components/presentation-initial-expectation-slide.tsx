"use client"

import Image from "next/image"
import type { CSSProperties } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./presentation-initial-expectation-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type ExpectationPoint = {
  label: string
  text: string
}

type PresentationInitialExpectationSlideProps = {
  lead: string
  points: ExpectationPoint[]
  sectionNumber: string
}

export function PresentationInitialExpectationSlide({
  lead,
  points,
  sectionNumber,
}: PresentationInitialExpectationSlideProps) {
  const { isResponsiveViewport, scale, viewportRef } = useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        {isResponsiveViewport ? (
          <section
            aria-label="My Initial Expectation slide"
            className={styles.responsive}
          >
            <div className={styles.responsiveTopLine} aria-hidden="true" />

            <div className={styles.responsiveInner} data-transition-panel>
              <div
                className={styles.responsiveBrandGhost}
                aria-hidden="true"
                data-transition-content="decor"
              >
                <span>EXPECT</span>
              </div>

              <header className={styles.responsiveHeader} data-transition-content="header">
                <p className={styles.responsiveEyebrow}>Section {sectionNumber}</p>

                <div className={styles.responsiveTitleWrap}>
                  <p className={styles.responsivePreTitle}>My Initial</p>
                  <h1 className={styles.responsiveHeroTitle}>Expectation</h1>
                </div>

                <div className={styles.responsiveLeadBlock}>
                  <span className={styles.responsiveLeadRule} aria-hidden="true" />
                  <p className={styles.responsiveLead}>{lead}</p>
                </div>
              </header>

              <ol className={styles.responsivePoints} data-transition-content="main">
                {points.map((point, index) => (
                  <li
                    className={styles.responsivePoint}
                    data-emphasis={index === 1 ? "strong" : "default"}
                    key={point.label}
                    style={{ "--stagger": index } as CSSProperties}
                  >
                    <div className={styles.responsivePointTop}>
                      <span className={styles.responsivePointNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.responsivePointLabel}>{point.label}</p>
                    </div>

                    <p className={styles.responsivePointText}>{point.text}</p>
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
          <section aria-label="My Initial Expectation slide" className={styles.desktop}>
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
                  <span>EXPECT</span>
                </div>

                <div className={styles.content} data-transition-panel>
                  <header className={styles.header} data-transition-content="header">
                    <p className={styles.eyebrow}>Section {sectionNumber}</p>

                    <div className={styles.titleWrap}>
                      <p className={styles.preTitle}>My Initial</p>
                      <h1 className={styles.heroTitle}>Expectation</h1>
                    </div>

                    <div className={styles.leadBlock}>
                      <span className={styles.leadRule} aria-hidden="true" />
                      <p className={styles.lead}>{lead}</p>
                    </div>
                  </header>

                  <ol className={styles.points} data-transition-content="main">
                    {points.map((point, index) => (
                      <li
                        className={styles.point}
                        data-emphasis={index === 1 ? "strong" : "default"}
                        key={point.label}
                        style={{ "--stagger": index } as CSSProperties}
                      >
                        <div className={styles.pointTop}>
                          <span className={styles.pointNumber}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className={styles.pointLabel}>{point.label}</p>
                        </div>

                        <p className={styles.pointText}>{point.text}</p>
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
