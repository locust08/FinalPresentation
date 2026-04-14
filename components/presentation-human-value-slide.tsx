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

type Differentiator = {
  id: string
  title: string
  support: string
}

function normalizeSentence(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback
  }

  const trimmed = value.trim()

  if (/[.!?]$/.test(trimmed)) {
    return trimmed
  }

  return `${trimmed}.`
}

function renderHumanValueIcon(index: number, className: string) {
  switch (index) {
    case 0:
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
          viewBox="0 0 64 64"
        >
          <path d="M16 19h32" />
          <path d="M32 19v24" />
          <path d="M21 19 13 32h16z" />
          <path d="M51 32 43 19l-8 13z" />
          <path d="M21 48h22" />
        </svg>
      )
    case 1:
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
          viewBox="0 0 64 64"
        >
          <path d="M17 46V18" />
          <path d="M17 32h16" />
          <path d="M33 32 47 18" />
          <path d="M33 32 47 46" />
          <circle cx="17" cy="18" r="4" />
          <circle cx="47" cy="18" r="4" />
          <circle cx="47" cy="46" r="4" />
        </svg>
      )
    default:
      return (
        <svg
          aria-hidden="true"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
          viewBox="0 0 64 64"
        >
          <path d="M32 13 46 18v12c0 11-6.5 19-14 22-7.5-3-14-11-14-22V18z" />
          <path d="m24 32 5 5 11-11" />
        </svg>
      )
  }
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

  const differentiators: Differentiator[] = [
    {
      id: "01",
      title: "Judgement",
      support: normalizeSentence(
        points[0],
        "I bring judgement and responsibility when choices affect the final outcome."
      ),
    },
    {
      id: "02",
      title: "Adaptability",
      support: normalizeSentence(
        points[1],
        "I can adjust how I communicate, collaborate, and decide in changing situations."
      ),
    },
    {
      id: "03",
      title: "Human Value",
      support: normalizeSentence(
        points[2],
        "Human understanding, flexibility, and trust shape the work beyond pure speed."
      ),
    },
  ]

  const orbitClasses = [
    styles.orbitNodeUpperLeft,
    styles.orbitNodeUpperRight,
    styles.orbitNodeLower,
  ]

  const responsiveOrbitClasses = [
    styles.responsiveOrbitNodeUpperLeft,
    styles.responsiveOrbitNodeUpperRight,
    styles.responsiveOrbitNodeLower,
  ]

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

              <section className={styles.responsiveDiagram} data-transition-content="main">
                <div className={styles.responsiveCoreCluster}>
                  <div className={styles.responsiveCoreHalo} aria-hidden="true" />
                  <div className={styles.responsiveCoreHaloSoft} aria-hidden="true" />

                  <div className={styles.responsiveCore}>
                    <span className={styles.responsiveCoreEyebrow}>Human Edge</span>
                    <h2 className={styles.responsiveCoreTitle}>Me</h2>
                    <p className={styles.responsiveCoreText}>
                      Context, trust, and human judgement shape the work beyond
                      output alone.
                    </p>
                  </div>
                </div>

                <ol className={styles.responsiveOrbitList}>
                  {differentiators.map((item, index) => (
                    <li
                      className={[
                        styles.responsiveOrbitNode,
                        responsiveOrbitClasses[index] ?? "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={item.id}
                      style={
                        {
                          "--ring-rotation": `${index * 118 + 16}deg`,
                          "--stagger": index,
                        } as CSSProperties
                      }
                      >
                        <div className={styles.responsiveOrbitRing} aria-hidden="true" />

                      <article className={styles.responsiveOrbitCard}>
                        <div className={styles.responsiveOrbitIconWrap}>
                          {renderHumanValueIcon(index, styles.responsiveOrbitIcon)}
                        </div>

                        <h3 className={styles.responsiveOrbitTitle}>{item.title}</h3>
                        <p className={styles.responsiveOrbitText}>{item.support}</p>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>

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

                  <section className={styles.diagramPanel} data-transition-content="main">
                    <svg
                      aria-hidden="true"
                      className={styles.diagramLinks}
                      viewBox="0 0 1040 700"
                    >
                      <path d="M520 350C456 292 396 246 312 214" />
                      <path d="M520 350C584 292 644 246 728 214" />
                      <path d="M520 350C520 470 520 620 520 772" />
                    </svg>

                    <div className={styles.coreCluster}>
                      <div className={styles.coreHalo} aria-hidden="true" />
                      <div className={styles.coreHaloSoft} aria-hidden="true" />

                      <div className={styles.core}>
                        <span className={styles.coreEyebrow}>Human Edge</span>
                        <h2 className={styles.coreTitle}>Me</h2>
                        <p className={styles.coreText}>
                          Context, trust, and human judgement shape the work
                          beyond output alone.
                        </p>
                      </div>
                    </div>

                    <ol className={styles.orbitList}>
                      {differentiators.map((item, index) => (
                        <li
                          className={[
                            styles.orbitNode,
                            orbitClasses[index] ?? "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          key={item.id}
                          style={
                            {
                              "--ring-rotation": `${index * 118 + 16}deg`,
                              "--stagger": index,
                            } as CSSProperties
                          }
                        >
                          <div className={styles.orbitRing} aria-hidden="true" />

                          <article className={styles.orbitCard}>
                            <div className={styles.orbitIconWrap}>
                              {renderHumanValueIcon(index, styles.orbitIcon)}
                            </div>

                            <h3 className={styles.orbitTitle}>{item.title}</h3>
                            <p className={styles.orbitText}>{item.support}</p>
                          </article>
                        </li>
                      ))}
                    </ol>
                  </section>
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
