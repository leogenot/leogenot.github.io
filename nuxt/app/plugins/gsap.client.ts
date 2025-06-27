import type _ScrollTrigger from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(async () => {
  let gsap: typeof globalThis.gsap | undefined = undefined
  let ScrollTrigger: typeof _ScrollTrigger | undefined = undefined
  let SplitText = null

  gsap = (await import('gsap')).gsap

  // import your plugins here
  ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger
  SplitText = (await import('gsap/SplitText')).SplitText

  // register the plugins
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(SplitText)

  return {
    provide: {
      gsap,
      SplitText,
      ScrollTrigger,
    },
  }
})
