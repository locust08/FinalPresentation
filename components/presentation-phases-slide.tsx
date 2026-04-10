"use client"

import Image from "next/image"
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from "react"
import { useEffect, useMemo, useState } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./presentation-phases-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type PhaseVideo = {
  title: string
  url: string
}

type PhaseGroup = {
  duration: string
  items: string[]
  title: string
  videos?: PhaseVideo[]
}

type PresentationPhasesSlideProps = {
  lead: string
  phaseGroups: PhaseGroup[]
  sectionNumber: string
  title: string
}

function extractDriveFileId(url: string) {
  const match = url.match(/\/d\/([^/]+)/)
  return match?.[1] ?? null
}

function toDrivePreviewUrl(url: string) {
  const fileId = extractDriveFileId(url)
  return fileId
    ? `https://drive.google.com/file/d/${fileId}/preview?autoplay=1&mute=1`
    : url
}

export function PresentationPhasesSlide({
  lead,
  phaseGroups,
  sectionNumber,
  title,
}: PresentationPhasesSlideProps) {
  const { isResponsiveViewport, scale, viewportRef } = useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )
  const [activeVideos, setActiveVideos] = useState<PhaseVideo[]>([])

  const modalVideos = useMemo(() => {
    return activeVideos.map((video) => ({
      ...video,
      previewUrl: toDrivePreviewUrl(video.url),
    }))
  }, [activeVideos])
  const [preTitle, heroTitle] = title.split(" / ")

  useEffect(() => {
    if (activeVideos.length === 0) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveVideos([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeVideos.length])

  const openAllVideos = (videos?: PhaseVideo[]) => {
    if (!videos?.length) {
      return
    }

    setActiveVideos(videos)
  }

  const openSingleVideo = (video: PhaseVideo) => {
    setActiveVideos([video])
  }

  const handleGroupKeyDown = (
    event: ReactKeyboardEvent<HTMLElement>,
    videos?: PhaseVideo[]
  ) => {
    if (!videos?.length) {
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openAllVideos(videos)
    }
  }

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
                  <p className={styles.responsivePreTitle}>{preTitle}</p>
                  <h1 className={styles.responsiveHeroTitle}>{heroTitle ?? preTitle}</h1>
                </div>

                <div className={styles.responsiveLeadBlock}>
                  <span className={styles.responsiveLeadRule} aria-hidden="true" />
                  <p className={styles.responsiveLead}>{lead}</p>
                </div>
              </header>

              <div className={styles.responsiveFlow} data-transition-content="main">
                <div className={styles.responsiveFlowTrack} aria-hidden="true">
                  {phaseGroups.map((group, index) => (
                    <div className={styles.responsiveFlowStep} key={group.title}>
                      <span className={styles.responsiveFlowNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.responsiveFlowLabel}>
                        {index === 0 ? "First" : "Next"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.responsiveGroups}>
                {phaseGroups.map((group, index) => (
                  <section
                    aria-label={
                      group.videos?.length
                        ? `${group.title}. Tap the card to open all videos.`
                        : undefined
                    }
                    className={[
                      styles.responsiveGroup,
                      index === 0 ? styles.responsiveGroupPrimary : "",
                      index === 1 ? styles.responsiveGroupSecondary : "",
                      group.videos?.length ? styles.interactiveGroup : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={group.title}
                    onClick={() => openAllVideos(group.videos)}
                    onKeyDown={(event) => handleGroupKeyDown(event, group.videos)}
                    role={group.videos?.length ? "button" : undefined}
                    style={{ "--stagger": index } as CSSProperties}
                    tabIndex={group.videos?.length ? 0 : undefined}
                  >
                    <span className={styles.responsiveStageBadge}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className={styles.responsiveGroupTop}>
                      <p className={styles.responsiveDuration}>{group.duration}</p>
                      <h2 className={styles.responsiveGroupTitle}>{group.title}</h2>
                    </div>

                    <ul className={styles.responsiveItems}>
                      {group.items.map((item, itemIndex) => {
                        const video = group.videos?.[itemIndex]

                        return (
                        <li className={styles.responsiveItem} key={item}>
                          <span className={styles.responsiveBullet} aria-hidden="true" />
                          {video ? (
                            <button
                              className={styles.itemButton}
                              onClick={(event) => {
                                event.stopPropagation()
                                openSingleVideo(video)
                              }}
                              type="button"
                            >
                              {item}
                            </button>
                          ) : (
                            <span>{item}</span>
                          )}
                        </li>
                        )
                      })}
                    </ul>

                    {group.videos?.length ? (
                      <p className={styles.responsiveGroupHint}>
                        Tap a title for one video, or tap the card for all three.
                      </p>
                    ) : null}
                  </section>
                ))}
                </div>
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

                <div className={styles.content} data-transition-panel>
                  <header className={styles.header} data-transition-content="header">
                    <p className={styles.eyebrow}>Section {sectionNumber}</p>

                    <div className={styles.titleWrap}>
                      <p className={styles.preTitle}>{preTitle}</p>
                      <h1 className={styles.heroTitle}>{heroTitle ?? preTitle}</h1>
                    </div>

                    <div className={styles.leadBlock}>
                      <span className={styles.leadRule} aria-hidden="true" />
                      <p className={styles.lead}>{lead}</p>
                    </div>
                  </header>

                  <div className={styles.groupsRail} data-transition-content="main">
                    <div className={styles.flowTrack} aria-hidden="true">
                      {phaseGroups.map((group, index) => (
                        <div className={styles.flowStep} key={group.title}>
                          <span className={styles.flowNumber}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.flowLabel}>
                            {index === 0 ? "First" : "Next"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.groups}>
                    {phaseGroups.map((group, index) => (
                      <section
                        aria-label={
                          group.videos?.length
                            ? `${group.title}. Click the card to open all videos.`
                            : undefined
                        }
                        className={[
                          styles.group,
                          index === 0 ? styles.groupPrimary : "",
                          index === 1 ? styles.groupSecondary : "",
                          group.videos?.length ? styles.interactiveGroup : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        key={group.title}
                        onClick={() => openAllVideos(group.videos)}
                        onKeyDown={(event) => handleGroupKeyDown(event, group.videos)}
                        role={group.videos?.length ? "button" : undefined}
                        style={{ "--stagger": index } as CSSProperties}
                        tabIndex={group.videos?.length ? 0 : undefined}
                      >
                        <span className={styles.stageBadge}>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className={styles.groupTop}>
                          <p className={styles.duration}>{group.duration}</p>
                          <h2 className={styles.groupTitle}>{group.title}</h2>
                        </div>

                        <ul className={styles.items}>
                          {group.items.map((item, itemIndex) => {
                            const video = group.videos?.[itemIndex]

                            return (
                            <li className={styles.item} key={item}>
                              <span className={styles.bullet} aria-hidden="true" />
                              {video ? (
                                <button
                                  className={styles.itemButton}
                                  onClick={(event) => {
                                    event.stopPropagation()
                                    openSingleVideo(video)
                                  }}
                                  type="button"
                                >
                                  {item}
                                </button>
                              ) : (
                                <span>{item}</span>
                              )}
                            </li>
                            )
                          })}
                        </ul>

                        {group.videos?.length ? (
                          <p className={styles.groupHint}>
                            Click a title for one video, or click the card for all
                            three.
                          </p>
                        ) : null}
                      </section>
                    ))}
                    </div>
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

        {modalVideos.length > 0 ? (
          <div
            aria-hidden="true"
            className={styles.modalBackdrop}
            onClick={() => setActiveVideos([])}
          />
        ) : null}

        {modalVideos.length > 0 ? (
          <section
            aria-label="Video preview"
            aria-modal="true"
            className={styles.modal}
            role="dialog"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalEyebrow}>AI Video Preview</p>
                <h2 className={styles.modalTitle}>
                  {modalVideos.length === 1
                    ? modalVideos[0]?.title
                    : "Phase 1 - 3 Reels"}
                </h2>
              </div>

              <button
                aria-label="Close video preview"
                className={styles.modalClose}
                onClick={() => setActiveVideos([])}
                type="button"
              >
                Close
              </button>
            </div>

            <div
              className={[
                styles.videoGrid,
                modalVideos.length === 1 ? styles.videoGridSingle : "",
                modalVideos.length > 1 ? styles.videoGridMulti : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {modalVideos.map((video) => (
                <article
                  className={[
                    styles.videoCard,
                    modalVideos.length === 1 ? styles.videoCardSingle : "",
                    modalVideos.length > 1 ? styles.videoCardMulti : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={video.url}
                >
                  {modalVideos.length > 1 ? (
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                  ) : null}
                  <div className={styles.videoFrame}>
                    <iframe
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      loading="lazy"
                      src={video.previewUrl}
                      title={video.title}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
