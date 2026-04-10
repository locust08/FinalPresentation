/* eslint-disable @next/next/no-img-element */
"use client"

import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import { useSlideScale } from "@/components/use-slide-scale"

import styles from "./presentation-thibault-showcase-slide.module.css"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

type ViewState = { type: "home" } | { type: "about" } | { type: "project"; slug: string }

type Project = {
  slug: string
  homeTitle: string
  detailTitle: string
  homeMeta: string
  homeScope: string
  homeDiscipline: string
  year: string
  category: string
  summary: string
  client: string
  role: string
  stack: string
  type: string
  score?: string
  liveUrl?: string
  logoPath: string
  videoPath: string
  videoPosterPath: string
  heroPath: string
  images: string[]
}

type ExperienceItem = {
  company: string
  description: string
  role: string
  time: string
}

const PROJECTS: Project[] = [
  {
    slug: "atelier-stratus",
    homeTitle: "Stratus, Scenography Studio",
    detailTitle: "Atelier Stratus",
    homeMeta: "Freelance",
    homeScope: "Web & mobile",
    homeDiscipline: "Front & back-end development",
    year: "2025",
    category: "Architecture and Design",
    summary: "A new approach to urban scenography",
    client: "Metropole & JCDecaux",
    role: "Developer",
    stack: "Next.js, TypeScript, Sanity, GSAP, Lenis Scroll",
    type: "Freelance",
    score: "100",
    liveUrl: "https://www.stratus.fr/",
    logoPath: "/reference/thibault/img/stratus.svg",
    videoPath: "/reference/thibault/vid/stratus.mp4",
    videoPosterPath: "/reference/thibault/vid/posters/stratus.webp",
    heroPath: "/reference/thibault/img/stratus/stratus-hero-img.webp",
    images: ["1", "2", "3", "4", "5", "6"].map(
      (item) => `/reference/thibault/img/stratus/stratus-${item}.webp`
    ),
  },
  {
    slug: "metropole",
    homeTitle: "Metropole, Advertising Network",
    detailTitle: "Metropole média",
    homeMeta: "Freelance",
    homeScope: "Web & mobile",
    homeDiscipline: "Front & back-end development",
    year: "2025",
    category: "Exceptional advertising spaces.",
    summary:
      "Complete website creation, integrating smooth animations and an immersive user experience to showcase their unique advertising offer.",
    client: "Metropole média",
    role: "Developer",
    stack: "Next.js, TypeScript, Sanity, GSAP, Lenis Scroll",
    type: "Freelance",
    score: "100",
    liveUrl: "https://www.metropole.media/",
    logoPath: "/reference/thibault/img/metropole.svg",
    videoPath: "/reference/thibault/vid/metropole.mp4",
    videoPosterPath: "/reference/thibault/vid/posters/metropole.webp",
    heroPath: "/reference/thibault/img/metropole/metropole-hero-img.webp",
    images: ["1", "2", "3", "4", "5"].map(
      (item) => `/reference/thibault/img/metropole/metropole-${item}.webp`
    ),
  },
  {
    slug: "acheterduneuf",
    homeTitle: "ACHETERduNEUF, New Property Comparator",
    detailTitle: "ACHETERduNEUF",
    homeMeta: "Employed",
    homeScope: "Web app",
    homeDiscipline: "Front-end development",
    year: "2023",
    category: "New property comparator",
    summary:
      "A platform for searching and comparing new properties in France, offering an optimized user experience through advanced filtering and visualization features.",
    client: "ACHETERduNEUF",
    role: "Developer",
    stack: "React, GoogleAPI, Symfony, Elasticsearch",
    type: "Employed",
    liveUrl: "https://acheterduneuf.com",
    logoPath: "/reference/thibault/img/acheterduneuf.svg",
    videoPath: "/reference/thibault/vid/acheterduneuf.mp4",
    videoPosterPath: "/reference/thibault/vid/posters/acheterduneuf.webp",
    heroPath: "/reference/thibault/img/acheterduneuf/acheterduneuf-hero-img.webp",
    images: ["1", "7", "8", "9", "10", "11", "12"].map(
      (item) => `/reference/thibault/img/acheterduneuf/acheterduneuf-${item}.webp`
    ),
  },
  {
    slug: "vickies",
    homeTitle: "Vickies, Super Fresh Communication Agency",
    detailTitle: "Vickies",
    homeMeta: "Employed",
    homeScope: "Web",
    homeDiscipline: "Front-end development",
    year: "2025",
    category: "360 communication agency",
    summary:
      "A super fresh communication agency, specialized in creating innovative digital content.",
    client: "Vickies",
    role: "Frontend Developer",
    stack: "Next.js, TypeScript, GSAP, Framer Motion, Lenis Scroll",
    type: "Employed",
    liveUrl: "https://vickies.fr/",
    logoPath: "/reference/thibault/img/vickies.svg",
    videoPath: "/reference/thibault/vid/vickies.mp4",
    videoPosterPath: "/reference/thibault/vid/posters/vickies.webp",
    heroPath: "/reference/thibault/img/vickies/vickies-hero-img.webp",
    images: ["1", "2", "3", "4", "5", "6", "7"].map(
      (item) => `/reference/thibault/img/vickies/vickies-${item}.webp`
    ),
  },
  {
    slug: "adn-family",
    homeTitle: "ADN Family, Metaverse Ecosystem",
    detailTitle: "ADN Family",
    homeMeta: "Employed",
    homeScope: "Web & mobile",
    homeDiscipline: "Front-end development",
    year: "2025",
    category: "3D representation and metaverse",
    summary:
      "Metaverse ecosystem, bringing together all ADN Family services in an immersive 3D environment.",
    client: "ADN Family",
    role: "Developer",
    stack: "React, Vite.js, Spline, Three.js, GSAP",
    type: "Employed",
    liveUrl: "https://adnfamily.com/",
    logoPath: "/reference/thibault/img/adnfamily.svg",
    videoPath: "/reference/thibault/vid/adnfamily.mp4",
    videoPosterPath: "/reference/thibault/vid/posters/adnfamily.webp",
    heroPath: "/reference/thibault/img/adn-family/adnfamily-hero-img.webp",
    images: ["1", "2", "3", "4", "5"].map(
      (item) => `/reference/thibault/img/adn-family/adn-${item}.webp`
    ),
  },
  {
    slug: "atypica",
    homeTitle: "Atypica, Where Web Meets Originality",
    detailTitle: "Atypica",
    homeMeta: "Personal",
    homeScope: "Web & mobile",
    homeDiscipline: "Design & development",
    year: "2024",
    category: "Web development agency",
    summary: "Where technology meets creativity for custom web solutions.",
    client: "Atypica",
    role: "Fullstack Developer",
    stack: "React, Vite.js, Three.js, GSAP",
    type: "Personal",
    logoPath: "/reference/thibault/img/atypica.svg",
    videoPath: "/reference/thibault/vid/atypica.mp4",
    videoPosterPath: "/reference/thibault/vid/posters/atypica.webp",
    heroPath: "/reference/thibault/img/atypica/atypica-hero-img.webp",
    images: ["1", "2", "3", "4", "5"].map(
      (item) => `/reference/thibault/img/atypica/atypica-${item}.webp`
    ),
  },
]

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Freelance",
    description:
      "Crafting immersive and interactive web experiences. Polished animations, custom interfaces and optimal performance.",
    role: "Creative Frontend Developer",
    time: "2025 \u2014 Present",
  },
  {
    company: "Multi-brand Company",
    description:
      "Development of all digital products across multiple brands: showcase websites, web applications and design interfaces.",
    role: "Frontend Developer",
    time: "2023 \u2014 Present",
  },
  {
    company: "Web Agency",
    description:
      "A short but decisive experience. I discovered what I did not want to do, and it awakened me to the level of quality I wanted to represent.",
    role: "Frontend Developer",
    time: "2023 \u2014 3 months",
  },
]

function countLabel(index: number) {
  return `${String(index + 1).padStart(2, "0")} \u2014 ${String(PROJECTS.length).padStart(2, "0")}`
}

export function PresentationThibaultShowcaseSlide() {
  const { scale, viewportRef } = useSlideScale(DESIGN_WIDTH, DESIGN_HEIGHT)
  const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug)
  const [view, setView] = useState<ViewState>({ type: "home" })
  const routeScrollRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)

  const activeProject = useMemo(
    () => PROJECTS.find((project) => project.slug === activeSlug) ?? PROJECTS[0],
    [activeSlug]
  )

  const currentProject = useMemo(() => {
    if (view.type !== "project") {
      return null
    }

    return PROJECTS.find((project) => project.slug === view.slug) ?? PROJECTS[0]
  }, [view])

  useEffect(() => {
    routeScrollRef.current?.scrollTo({ top: 0, behavior: "auto" })
  }, [view])

  const goHome = () => setView({ type: "home" })
  const goAbout = () => setView({ type: "about" })

  const openProject = (slug: string) => {
    setActiveSlug(slug)
    setView({ type: "project", slug })
  }

  const goNextProject = () => {
    if (!currentProject) {
      return
    }

    const currentIndex = PROJECTS.findIndex((project) => project.slug === currentProject.slug)
    openProject(PROJECTS[(currentIndex + 1) % PROJECTS.length].slug)
  }

  const scrollToGallery = () => {
    if (!routeScrollRef.current || !galleryRef.current) {
      return
    }

    routeScrollRef.current.scrollTo({
      top: galleryRef.current.offsetTop - 24,
      behavior: "smooth",
    })
  }

  const nextProject = currentProject
    ? PROJECTS[(PROJECTS.findIndex((project) => project.slug === currentProject.slug) + 1) % PROJECTS.length]
    : PROJECTS[1]

  return (
    <main className={styles.shell}>
      <div className={styles.viewport} ref={viewportRef}>
        <section className={styles.desktop} aria-label="Thibault Guignand reference slide">
          <div className={styles.canvas} style={{ "--slide-scale": scale } as CSSProperties}>
            <div className={styles.stage} data-transition-panel data-transition-content="main">
              {view.type === "home" ? (
                <div className={styles.home}>
                  <div className={styles.homeMedia} aria-hidden="true">
                    {PROJECTS.map((project) => (
                      <video
                        autoPlay
                        className={`${styles.homeVideo} ${project.slug === activeProject.slug ? styles.homeVideoActive : ""}`}
                        key={project.slug}
                        loop
                        muted
                        playsInline
                        poster={project.videoPosterPath}
                      >
                        <source src={project.videoPath} type="video/mp4" />
                      </video>
                    ))}
                    <div className={styles.homeShade} />
                  </div>

                  <div className={styles.homeGrid}>
                    {PROJECTS.map((project, index) => (
                      <button
                        className={`${styles.tile} ${project.slug === activeProject.slug ? styles.tileActive : ""}`}
                        key={project.slug}
                        onClick={() => setActiveSlug(project.slug)}
                        onFocus={() => setActiveSlug(project.slug)}
                        onMouseEnter={() => setActiveSlug(project.slug)}
                        type="button"
                      >
                        <span className={styles.tileTitle}>{project.homeTitle}</span>
                        <span className={styles.tileMeta}>
                          <span>{project.homeMeta}</span>
                          <span className={styles.diamond}>
                            <span>{index + 1}</span>
                          </span>
                          <span>{project.homeScope}</span>
                        </span>
                        <span className={styles.tileDiscipline}>{project.homeDiscipline}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.logoFrame}>
                    <div className={styles.logoCorners} aria-hidden="true" />
                    <img alt={activeProject.detailTitle} className={styles.logo} src={activeProject.logoPath} />
                  </div>

                  <button className={styles.edgeLeft} onClick={() => openProject(activeProject.slug)} type="button">
                    View
                  </button>
                  <button className={styles.edgeRight} onClick={goAbout} type="button">
                    About
                  </button>
                </div>
              ) : null}

              {view.type === "about" ? (
                <div className={styles.route} ref={routeScrollRef}>
                  <div className={styles.about}>
                    <header className={styles.routeHeader}>
                      <button className={styles.routeButton} onClick={goHome} type="button">
                        Back
                      </button>
                      <span className={styles.routeLabel}>About</span>
                    </header>

                    <section className={styles.aboutHero}>
                      <h1 className={styles.aboutTitle}>Creative Frontend Developer</h1>
                      <p className={styles.aboutLead}>
                        I transform your ideas into memorable web experiences, combining bold
                        design and performant code.
                      </p>
                      <p className={styles.aboutBody}>
                        Passionate about interfaces that leave a mark, I master React,
                        TypeScript, advanced animations and WebGL to create websites that stand
                        out. Every pixel counts, every interaction tells a story.
                      </p>
                    </section>

                    <section className={styles.aboutSection}>
                      <h2 className={styles.sectionTitle}>Experience</h2>
                      <div className={styles.experienceGrid}>
                        {EXPERIENCE.map((item) => (
                          <article className={styles.experienceCard} key={item.time}>
                            <div className={styles.experienceBody}>
                              <p className={styles.experienceCompany}>{item.company}</p>
                              <h3 className={styles.experienceRole}>{item.role}</h3>
                              <p className={styles.experienceCopy}>{item.description}</p>
                            </div>
                            <p className={styles.experienceTime}>{item.time}</p>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className={styles.aboutSection}>
                      <p className={styles.aboutBody}>
                        This portfolio only showcases a selection of my work. Other projects
                        remain confidential, in progress, or simply not displayed here.
                      </p>
                    </section>

                    <section className={styles.aboutSection}>
                      <h2 className={styles.sectionTitle}>Let&apos;s work together</h2>
                      <p className={styles.aboutBody}>
                        An ambitious project? A bold idea? Let&apos;s discuss it and create
                        something exceptional.
                      </p>
                      <div className={styles.contactRow}>
                        <a className={styles.contactLink} href="mailto:bonjour@atypica.digital">
                          Email <span>{"\u2192"}</span>
                        </a>
                        <a
                          className={styles.contactLink}
                          href="https://www.linkedin.com/in/thibault-guignand-b9456b197"
                          rel="noreferrer"
                          target="_blank"
                        >
                          LinkedIn <span>{"\u2192"}</span>
                        </a>
                        <a
                          className={styles.contactLink}
                          href="mailto:bonjour@atypica.digital?subject=GitHub"
                        >
                          GitHub <span>{"\u2192"}</span>
                        </a>
                      </div>
                      <p className={styles.availability}>Available for new projects</p>
                    </section>
                  </div>
                </div>
              ) : null}

              {view.type === "project" && currentProject ? (
                <div className={styles.route} ref={routeScrollRef}>
                  <div className={styles.project}>
                    <section
                      className={styles.projectHero}
                      style={{ "--hero-image": `url(${currentProject.heroPath})` } as CSSProperties}
                    >
                      <video
                        autoPlay
                        className={styles.projectHeroVideo}
                        loop
                        muted
                        playsInline
                        poster={currentProject.heroPath}
                      >
                        <source src={currentProject.videoPath} type="video/mp4" />
                      </video>
                      <div className={styles.projectShade} />

                      <header className={styles.routeHeader}>
                        <button className={styles.routeButton} onClick={goHome} type="button">
                          Back
                        </button>
                        <span className={styles.routeLabel}>
                          {countLabel(PROJECTS.findIndex((project) => project.slug === currentProject.slug))}
                        </span>
                      </header>

                      <div className={styles.projectMeta}>
                        <p className={styles.projectCategory}>{currentProject.category}</p>
                        <p className={styles.projectSummary}>{currentProject.summary}</p>
                        <div className={styles.utilityRow}>
                          <time>{currentProject.year}</time>
                          {currentProject.liveUrl ? (
                            <a
                              className={styles.liveLink}
                              href={currentProject.liveUrl}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <span className={styles.liveDot} />
                              Live
                            </a>
                          ) : null}
                        </div>

                        <dl className={styles.factGrid}>
                          <div>
                            <dt>Client</dt>
                            <dd>{currentProject.client}</dd>
                          </div>
                          <div>
                            <dt>Role</dt>
                            <dd>{currentProject.role}</dd>
                          </div>
                          <div>
                            <dt>Stack</dt>
                            <dd>{currentProject.stack}</dd>
                          </div>
                          <div>
                            <dt>Type</dt>
                            <dd>{currentProject.type}</dd>
                          </div>
                        </dl>

                        {currentProject.score ? (
                          <div className={styles.score}>
                            <span>{currentProject.score}</span>
                            <small>Performance Score</small>
                          </div>
                        ) : null}
                      </div>

                      <div className={styles.projectFooter}>
                        <h1 className={styles.projectTitle}>{currentProject.detailTitle}</h1>
                        <button className={styles.routeButton} onClick={scrollToGallery} type="button">
                          Scroll
                        </button>
                      </div>
                    </section>

                    <section className={styles.gallery} ref={galleryRef}>
                      {currentProject.images.map((image, index) => (
                        <figure
                          className={`${styles.galleryCard} ${index % 3 === 1 ? styles.galleryCardWide : ""} ${index % 3 === 2 ? styles.galleryCardTall : ""}`}
                          key={image}
                        >
                          <img
                            alt={`${currentProject.detailTitle} - image ${index + 1}`}
                            className={styles.galleryImage}
                            src={image}
                          />
                        </figure>
                      ))}
                    </section>

                    <button className={styles.nextCard} onClick={goNextProject} type="button">
                      <img alt="Next project preview" className={styles.nextPreview} src={nextProject.videoPosterPath} />
                      <div className={styles.nextOverlay} />
                      <div className={styles.nextContent}>
                        <span className={styles.nextLabel}>0</span>
                        <span className={styles.nextLabel}>Next project</span>
                        <h2 className={styles.nextTitle}>{nextProject.detailTitle}</h2>
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
