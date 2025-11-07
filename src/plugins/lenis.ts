import Lenis from 'lenis'

export function useLenis() {
  const lenis = new Lenis({
    duration: 1.6, // controls scroll speed (higher = slower)
    smoothWheel: true,
    touchMultiplier: 2,
    lerp: .1, // lower value = smoother
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}
