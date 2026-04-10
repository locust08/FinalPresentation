"use client"

import Image from "next/image"
import type { CSSProperties } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./presentation-overview-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type OverviewCard = {
  body: string
  label: string
}

type PresentationOverviewSlideProps = {
  cards: OverviewCard[]
  lead: string
  sectionNumber: string
  title: string
}

export function PresentationOverviewSlide({
  cards,
  lead,
  sectionNumber,
  title,
}: PresentationOverviewSlideProps) {
  const { isResponsiveViewport, scale, viewportRef } = useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )
  const [preTitle, ...heroTitleParts] = title.split(" ")
  const heroTitle = heroTitleParts.join(" ")

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        {isResponsiveViewport ? (
          <section className={styles.responsive} aria-label={`${title} slide`}>
            <div className={styles.responsiveTopLine} aria-hidden="true" />

            <div className={styles.responsiveInner} data-transition-panel>
              <header className={styles.responsiveHeader} data-transition-content="header">
                <p className={styles.responsiveEyebrow}>Section {sectionNumber}</p>

                <div className={styles.responsiveTitleWrap}>
                  <p className={styles["responsive-pre-title"]}>{preTitle}</p>
                  <h1 className={styles["responsive-hero-title"]}>{heroTitle}</h1>
                </div>

                <div className={styles["responsive-lead-block"]}>
                  <span className={styles["responsive-lead-rule"]} aria-hidden="true" />
                  <p className={styles.responsiveLead}>{lead}</p>
                </div>
              </header>

              <div className={styles.responsiveGrid} data-transition-content="main">
                {cards.map((card, index) => (
                  <article
                    className={[
                      styles.responsiveCard,
                      index === 0 ? styles.responsiveCardTeam : "",
                      index === 1 ? styles.responsiveCardFeature : "",
                      index === 2 ? styles.responsiveCardScope : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={card.label}
                    style={{ "--stagger": index } as CSSProperties}
                  >
                    <div className={styles["responsive-card-top"]}>
                      <span className={styles["responsive-card-number"]}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.responsiveCardLabel}>{card.label}</p>
                    </div>
                    <p className={styles.responsiveCardBody}>{card.body}</p>
                  </article>
                ))}
              </div>

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
          <section className={styles.desktop} aria-label={`${title} slide`}>
            <div
              className={styles.canvas}
              style={{ "--slide-scale": scale } as CSSProperties}
            >
              <div className={styles.frame}>
                <div className={styles.topLine} aria-hidden="true" />
                <div
                  className={styles["brand-ghost"]}
                  aria-hidden="true"
                  data-transition-content="decor"
                >
                  <span>OVERVIEW</span>
                </div>

                <div className={styles.content} data-transition-panel>
                  <header className={styles.header} data-transition-content="header">
                    <p className={styles.eyebrow}>Section {sectionNumber}</p>

                    <div className={styles.titleWrap}>
                      <p className={styles["pre-title"]}>{preTitle}</p>
                      <h1 className={styles["hero-title"]}>{heroTitle}</h1>
                    </div>

                    <div className={styles["lead-block"]}>
                      <span className={styles["lead-rule"]} aria-hidden="true" />
                      <p className={styles.lead}>{lead}</p>
                    </div>
                  </header>

                  <div className={styles.grid} data-transition-content="main">
                    {cards.map((card, index) => (
                      <article
                        className={[
                          styles.card,
                          index === 0 ? styles.cardTeam : "",
                          index === 1 ? styles.cardFeature : "",
                          index === 2 ? styles.cardScope : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        key={card.label}
                        style={{ "--stagger": index } as CSSProperties}
                      >
                        <div className={styles["card-top"]}>
                          <span className={styles["card-number"]}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className={styles.cardLabel}>{card.label}</p>
                        </div>
                        <p className={styles.cardBody}>{card.body}</p>
                      </article>
                    ))}
                  </div>
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
