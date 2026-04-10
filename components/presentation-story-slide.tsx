"use client"

import Image from "next/image"
import type { CSSProperties } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./presentation-story-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type StorySection = {
  body: string[]
  label: string
}

type PresentationStorySlideProps = {
  lead: string
  sectionNumber: string
  sections: StorySection[]
  title: string
  variant?: "default" | "breakthrough" | "challenge"
}

export function PresentationStorySlide({
  lead,
  sectionNumber,
  sections,
  title,
  variant = "default",
}: PresentationStorySlideProps) {
  const { isResponsiveViewport, scale, viewportRef } = useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )
  const titleWords = title.split(" ")
  const titleTop = titleWords.slice(0, 2).join(" ")
  const titleBottom = titleWords.slice(2).join(" ")
  const challengeTitleParts = title.split(" & ")
  const challengeTitleTop = challengeTitleParts[0] ?? title
  const challengeTitleBottom = challengeTitleParts[1] ?? ""
  const isBreakthrough = variant === "breakthrough"
  const isChallenge = variant === "challenge"

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        {isResponsiveViewport ? (
          <section className={styles.responsive} aria-label={`${title} slide`}>
            <div className={styles.responsiveTopLine} aria-hidden="true" />

            <div className={styles.responsiveInner} data-transition-panel>
              {isBreakthrough ? (
                <div
                  className={styles.responsiveBrandGhost}
                  aria-hidden="true"
                  data-transition-content="decor"
                >
                  <span>MOMENT</span>
                </div>
              ) : null}

              <header className={styles.responsiveHeader} data-transition-content="header">
                <p className={styles.responsiveEyebrow}>Section {sectionNumber}</p>

                {isBreakthrough || isChallenge ? (
                  <>
                    <div className={styles.responsiveTitleWrap}>
                      <p className={styles.responsivePreTitle}>
                        {isChallenge ? challengeTitleTop : titleTop}
                      </p>
                      <h1 className={styles.responsiveHeroTitle}>
                        {isChallenge
                          ? challengeTitleBottom || challengeTitleTop
                          : titleBottom || titleTop}
                      </h1>
                    </div>

                    <div
                      className={[
                        styles.responsiveLeadBlock,
                        isChallenge ? styles.responsiveChallengeLeadBlock : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className={styles.responsiveLeadRule} aria-hidden="true" />
                      <p className={styles.responsiveLead}>{lead}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className={styles.responsiveTitle}>{title}</h1>
                    <p className={styles.responsiveLead}>{lead}</p>
                  </>
                )}
              </header>

              <div className={styles.responsiveSections} data-transition-content="main">
                {sections.map((section, index) => (
                  <article
                    className={[
                      styles.responsiveCard,
                      index === 0 ? styles.responsiveHeroCard : styles.responsiveSupportCard,
                      isBreakthrough && index === 0 ? styles.responsiveBreakthroughCard : "",
                      isBreakthrough && index > 0 ? styles.responsiveReasonCard : "",
                      isChallenge && index === 0 ? styles.responsiveChallengeCard : "",
                      isChallenge && index > 0 ? styles.responsiveSolutionCard : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={section.label}
                    style={{ "--stagger": index } as CSSProperties}
                  >
                    <p className={styles.responsiveCardLabel}>{section.label}</p>

                    <div className={styles.responsiveCardBody}>
                      {section.body.map((paragraph, paragraphIndex) => {
                        if (index === 0 && paragraphIndex === 0) {
                          return (
                            <p className={styles.responsiveHeroQuote} key={paragraph}>
                              {paragraph}
                            </p>
                          )
                        }

                        if (isChallenge && index === 0) {
                          return (
                            <div className={styles.responsiveChallengeSupportRow} key={paragraph}>
                              <span
                                className={styles.responsiveChallengeSupportBullet}
                                aria-hidden="true"
                              />
                              <p className={styles.responsiveChallengeSupportText}>
                                {paragraph}
                              </p>
                            </div>
                          )
                        }

                        if (isBreakthrough && index > 0) {
                          return (
                            <div
                              className={styles.responsiveReasonRow}
                              key={paragraph}
                            >
                              <span className={styles.responsiveReasonNumber}>
                                {String(paragraphIndex + 1).padStart(2, "0")}
                              </span>
                              <p className={styles.responsiveReasonText}>{paragraph}</p>
                            </div>
                          )
                        }

                        if (isChallenge && index > 0) {
                          return (
                            <div className={styles.responsiveSolutionRow} key={paragraph}>
                              <span className={styles.responsiveSolutionNumber}>
                                {String(paragraphIndex + 1).padStart(2, "0")}
                              </span>
                              <p className={styles.responsiveSolutionText}>{paragraph}</p>
                            </div>
                          )
                        }

                        return (
                          <p
                            className={[
                              styles.responsiveParagraph,
                              index > 0 ? styles.responsiveTakeaway : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            key={paragraph}
                          >
                            {paragraph}
                          </p>
                        )
                      })}
                    </div>
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
                {isBreakthrough ? (
                  <div
                    className={styles.brandGhost}
                    aria-hidden="true"
                    data-transition-content="decor"
                  >
                    <span>MOMENT</span>
                  </div>
                ) : null}

                <div className={styles.content} data-transition-panel>
                  <header className={styles.header} data-transition-content="header">
                    <p className={styles.eyebrow}>Section {sectionNumber}</p>

                    {isBreakthrough || isChallenge ? (
                      <>
                        <div className={styles.titleWrap}>
                          <p className={styles.preTitle}>
                            {isChallenge ? challengeTitleTop : titleTop}
                          </p>
                          <h1 className={styles.heroTitle}>
                            {isChallenge
                              ? challengeTitleBottom || challengeTitleTop
                              : titleBottom || titleTop}
                          </h1>
                        </div>

                        <div
                          className={[
                            styles.leadBlock,
                            isChallenge ? styles.challengeLeadBlock : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <span className={styles.leadRule} aria-hidden="true" />
                          <p className={styles.lead}>{lead}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.lead}>{lead}</p>
                      </>
                    )}
                  </header>

                  <div className={styles.sections} data-transition-content="main">
                    {sections.map((section, index) => (
                      <article
                        className={[
                          styles.card,
                          index === 0 ? styles.heroCard : styles.supportCard,
                          isBreakthrough && index === 0 ? styles.breakthroughCard : "",
                          isBreakthrough && index > 0 ? styles.reasonCard : "",
                          isChallenge && index === 0 ? styles.challengeCard : "",
                          isChallenge && index > 0 ? styles.solutionCard : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        key={section.label}
                        style={{ "--stagger": index } as CSSProperties}
                      >
                        <div className={styles.cardTop}>
                          <p className={styles.cardLabel}>{section.label}</p>
                        </div>

                        <div className={styles.cardBody}>
                          {section.body.map((paragraph, paragraphIndex) => {
                            if (index === 0 && paragraphIndex === 0) {
                              return (
                                <p className={styles.heroQuote} key={paragraph}>
                                  {paragraph}
                                </p>
                              )
                            }

                            if (isChallenge && index === 0) {
                              return (
                                <div className={styles.challengeSupportRow} key={paragraph}>
                                  <span
                                    className={styles.challengeSupportBullet}
                                    aria-hidden="true"
                                  />
                                  <p className={styles.challengeSupportText}>{paragraph}</p>
                                </div>
                              )
                            }

                            if (isBreakthrough && index > 0) {
                              return (
                                <div className={styles.reasonRow} key={paragraph}>
                                  <span className={styles.reasonNumber}>
                                    {String(paragraphIndex + 1).padStart(2, "0")}
                                  </span>
                                  <p className={styles.reasonText}>{paragraph}</p>
                                </div>
                              )
                            }

                            if (isChallenge && index > 0) {
                              return (
                                <div className={styles.solutionRow} key={paragraph}>
                                  <span className={styles.solutionNumber}>
                                    {String(paragraphIndex + 1).padStart(2, "0")}
                                  </span>
                                  <p className={styles.solutionText}>{paragraph}</p>
                                </div>
                              )
                            }

                            return (
                              <p
                                className={[
                                  styles.paragraph,
                                  index > 0 ? styles.takeaway : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                key={paragraph}
                              >
                                {paragraph}
                              </p>
                            )
                          })}
                        </div>
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
