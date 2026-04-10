"use client"

import Image from "next/image"
import type { CSSProperties } from "react"
import { useEffect, useRef, useState } from "react"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

const getScale = (width: number, height: number) => {
  if (!width || !height) {
    return 1
  }

  return Math.max(
    0.1,
    Math.min(
      width / DESIGN_WIDTH,
      height / DESIGN_HEIGHT
    )
  )
}

export function TitleSlide() {
  const [scale, setScale] = useState(1)
  const [viewportWidth, setViewportWidth] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateScale = (width: number, height: number) => {
      setViewportWidth(width)
      setScale(getScale(width, height))
    }

    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (!entry) {
        return
      }

      updateScale(entry.contentRect.width, entry.contentRect.height)
    })

    resizeObserver.observe(viewport)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const isResponsiveViewport = viewportWidth > 0 && viewportWidth < 1024

  return (
    <main className="presentation-shell">
      <div className="title-slide__viewport" ref={viewportRef}>
        {isResponsiveViewport ? (
          <section
            aria-label="Responsive title slide"
            className="title-slide-responsive"
          >
            <div className="title-slide-responsive__inner">
              <div className="title-slide-responsive__logo">
                <div className="title-slide-responsive__logo-asset">
                  <Image
                    alt="Locus-T"
                    fill
                    priority
                    sizes="(max-width: 1023px) 280px, 323px"
                    src="/reference/figma-16-170-logo.png"
                  />
                </div>
              </div>

              <div className="title-slide-responsive__body">
                <p className="title-slide-responsive__date">April 2026</p>

                <div className="title-slide-responsive__copy">
                  <h1 className="title-slide-responsive__heading">
                    LOCUS-T Internship
                    <span>Final Presentation</span>
                  </h1>

                  <div className="title-slide-responsive__presenter">
                    <p>Ng Sin Lin (Michelle)</p>
                    <p>Paid Media R&amp;D Internship</p>
                  </div>
                </div>
              </div>

              <div className="title-slide-responsive__footer">
                <div className="title-slide-responsive__footer-line" />

                <div className="title-slide-responsive__footer-copy">
                  <p>Corporate Presentation Desk</p>
                  <p>LOCUS-T SDN BHD</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="title-slide title-slide--desktop" data-node-id="16:170">
            <div
              className="title-slide__canvas"
              style={{ "--slide-scale": scale } as CSSProperties}
            >
              <div className="title-slide__frame" data-node-id="20:49">
                <div className="title-slide__logo" data-node-id="13:101">
                  <div className="title-slide__logo-asset">
                    <Image
                      alt="Locus-T"
                      fill
                      priority
                      sizes="323px"
                      src="/reference/figma-16-170-logo.png"
                    />
                  </div>
                </div>

                <div className="title-slide__content" data-node-id="13:107">
                  <div className="title-slide__hero-row" data-node-id="13:104">
                    <p className="title-slide__date" data-node-id="2:10">
                      April 2026
                    </p>

                    <div className="title-slide__copy" data-node-id="13:103">
                      <div className="title-slide__heading" data-node-id="2:6">
                        <h1>
                          LOCUS-T Internship
                          <span>Final Presentation</span>
                        </h1>
                      </div>

                      <div className="title-slide__presenter" data-node-id="2:8">
                        <p>Ng Sin Lin (Michelle)</p>
                        <p>Paid Media R&amp;D Internship</p>
                      </div>
                    </div>
                  </div>

                  <div className="title-slide__footer-block" data-node-id="13:106">
                    <div className="title-slide__footer-line" data-node-id="2:12">
                      <Image
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="1791px"
                        src="/reference/figma-16-170-line.svg"
                        unoptimized
                      />
                    </div>

                    <div className="title-slide__footer-copy" data-node-id="13:105">
                      <p className="title-slide__footer-left" data-node-id="2:13">
                        Corporate Presentation Desk
                      </p>

                      <p className="title-slide__footer-right" data-node-id="2:14">
                        LOCUS-T SDN BHD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
