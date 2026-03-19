import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Types ───────────────────────────────── */

interface ScrollTriggerConfig {
  trigger: Element | string
  start: string
  toggleActions?: string
}

/* ─── Helpers ─────────────────────────────── */

function splitChars(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent?.trim() ?? ''
  el.innerHTML = [...text].map(c =>
    `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`
  ).join('')
  return Array.from(el.querySelectorAll<HTMLSpanElement>('.char'))
}

const reducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ─── Lenis ───────────────────────────────── */

function initLenis(): Lenis {
  const lenis = new Lenis({
    lerp: 0.3,
    smoothWheel: true,
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time: number) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

/* ─── Init ────────────────────────────────── */

function init(): void {

  if (reducedMotion) {
    document.querySelectorAll<HTMLElement>('.name-line, .contact-line').forEach(el => { el.style.opacity = '1' })
    const heroFoot = document.querySelector<HTMLElement>('.hero-foot')
    if (heroFoot) heroFoot.style.opacity = '1'
    document.querySelectorAll('.section-rule').forEach(el => gsap.set(el, { scaleX: 1 }))
    return
  }

  initLenis()

  /* ── Hero name split & set ──────────────── */
  document.querySelectorAll<HTMLElement>('.name-line').forEach(line => {
    const chars = splitChars(line)
    gsap.set(chars, {
      y: '110%',
      rotateX: 55,
      transformPerspective: 700,
      transformOrigin: 'center top',
    })
    line.style.opacity = '1'
  })

  const leoChars = document.querySelectorAll<HTMLElement>('#name-leo .char')
  const genotChars = document.querySelectorAll<HTMLElement>('#name-genot .char')
  const metaInners = document.querySelectorAll<HTMLElement>('.meta-inner, .hero-scroll-hint .meta-inner')
  gsap.set(metaInners, { y: '100%' })

  /* ── Hero intro timeline ────────────────── */
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.nav', { opacity: 0, duration: 0.6, ease: 'power1.out' }, 0.2)
    .to(leoChars, { y: 0, rotateX: 0, duration: 1.6, stagger: 0.055 }, 0.15)
    .to(genotChars, { y: 0, rotateX: 0, duration: 1.6, stagger: 0.05 }, 0.28)
    .to('.hero-foot', { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.75)
    .to(metaInners, { y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.85)

  /* ─────────────────────────────────────────
     SCROLL ANIMATIONS
  ───────────────────────────────────────── */

  const PLAY_REV = 'play none none reverse'

  /* ── Section header rules ───────────────── */
  document.querySelectorAll<HTMLElement>('.section').forEach(section => {
    const rule = section.querySelector<HTMLElement>('.section-rule')
    const index = section.querySelector<HTMLElement>('.section-index')
    const title = section.querySelector<HTMLElement>('.section-title')
    if (!rule) return

    const st: ScrollTriggerConfig = { trigger: section, start: 'top 82%', toggleActions: PLAY_REV }

    gsap.to(rule, { scaleX: 1, duration: 1.1, ease: 'power2.inOut', scrollTrigger: st })
    gsap.from([index, title], { opacity: 0, y: 12, duration: 0.7, stagger: 0.08, ease: 'power2.out', scrollTrigger: st })
  })

  /* ── About ──────────────────────────────── */
  gsap.from('.about-bio', {
    y: 45, opacity: 0, duration: 1.3, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-bio', start: 'top 82%', toggleActions: PLAY_REV },
  })

  gsap.from('.aside-item', {
    y: 22, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'power2.out',
    scrollTrigger: { trigger: '.about-aside', start: 'top 82%', toggleActions: PLAY_REV },
  })

  /* ── Work — batch per item ──────────────── */
  gsap.set('.project-item', { y: 28, opacity: 0 })

  ScrollTrigger.batch('.project-item', {
    start: 'top 88%',
    onEnter: (batch: Element[]) => gsap.to(batch, {
      y: 0, opacity: 1,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power2.out',
      overwrite: true,
    }),
    onLeaveBack: (batch: Element[]) => gsap.to(batch, {
      y: 28, opacity: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: 'power2.in',
      overwrite: true,
    }),
  })

  /* ── Project hover — dim siblings ───────── */
  const projectItems = document.querySelectorAll<HTMLElement>('.project-item')

  projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      projectItems.forEach(el => {
        gsap.to(el, { opacity: el === item ? 1 : 0.5, duration: 0.25, overwrite: 'auto' })
      })
    })
  })

  document.querySelector<HTMLElement>('.project-list')!.addEventListener('mouseleave', () => {
    projectItems.forEach(el => gsap.to(el, { opacity: 1, duration: 0.25, overwrite: 'auto' }))
  })

  /* ── Contact links hover — dim siblings ─── */
  const contactLinks = document.querySelectorAll<HTMLElement>('.contact-link')

  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      contactLinks.forEach(el => {
        gsap.to(el, { opacity: el === link ? 1 : 0.5, duration: 0.25, overwrite: 'auto' })
      })
    })
  })

  document.querySelector<HTMLElement>('.contact-links')!.addEventListener('mouseleave', () => {
    contactLinks.forEach(el => gsap.to(el, { opacity: 1, duration: 0.25, overwrite: 'auto' }))
  })

  /* ── Contact char split ─────────────────── */
  document.querySelectorAll<HTMLElement>('.contact-line').forEach(line => {
    const chars = splitChars(line)
    gsap.set(chars, {
      y: '110%',
      rotateX: 45,
      transformPerspective: 600,
      transformOrigin: 'center top',
    })
    line.style.opacity = '1'
  })

  const getChars = document.querySelectorAll<HTMLElement>('#contact-get .char')
  const touchChars = document.querySelectorAll<HTMLElement>('#contact-touch .char')

  const contactTl = gsap.timeline({ paused: true })
    .to(getChars, { y: 0, rotateX: 0, duration: 1.5, stagger: 0.05, ease: 'expo.out' }, 0)
    .to(touchChars, { y: 0, rotateX: 0, duration: 1.5, stagger: 0.05, ease: 'expo.out' }, 0.12)

  ScrollTrigger.create({
    trigger: '.contact',
    start: 'top 75%',
    onEnter: () => contactTl.play(),
    onLeaveBack: () => contactTl.reverse(),
  })

  gsap.from('.contact-link', {
    y: 18, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-links', start: 'top 82%', toggleActions: PLAY_REV },
  })

  gsap.from('.contact-closing', {
    y: 15, opacity: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-closing', start: 'top 88%', toggleActions: PLAY_REV },
  })
}

/* ─── Boot ────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
