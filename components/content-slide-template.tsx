"use client"

import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./content-slide-template.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type ContentSlideTemplateProps = {
  children?: ReactNode
  title?: string
}

export function ContentSlideTemplate({
  children,
  title = "Title",
}: ContentSlideTemplateProps) {
  const { isResponsiveViewport, scale, viewportRef } = useSlideScale(
    DESIGN_WIDTH,
    DESIGN_HEIGHT
  )

  const content = children ?? null
  const responsiveContent = children ?? null

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        {isResponsiveViewport ? (
          <section className={styles.responsive} aria-label="Content slide template">
            <div className={styles.responsiveTopLine} aria-hidden="true" />

            <div className={styles.responsiveInner}>
              <h1 className={styles.responsiveTitle} data-transition-content="header">
                {title}
              </h1>

              <div
                className={styles.responsiveContentArea}
                data-transition-content="main"
                data-transition-panel
              >
                {responsiveContent}
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
          <section className={styles.desktop} aria-label="Content slide template">
            <div
              className={styles.canvas}
              style={{ "--slide-scale": scale } as CSSProperties}
            >
              <div className={styles.frame}>
                <div className={styles.topLine} aria-hidden="true" />
                <h1 className={styles.title} data-transition-content="header">
                  {title}
                </h1>

                <div
                  className={styles.contentArea}
                  data-transition-content="main"
                  data-transition-panel
                >
                  {content}
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
