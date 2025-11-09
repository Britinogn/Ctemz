// import Lenis from 'lenis'

// let lenis: Lenis | null = null

// export function useLenis() {
//   // Return existing instance if already initialized
//   if (lenis) return lenis

//   lenis = new Lenis({
//     duration: 1.6,      // scroll speed
//     smoothWheel: true,   // smooth mouse wheel
//     touchMultiplier: 2,  // mobile swipe speed
//     lerp: 0.1,           // smoothness
//   })

//   function raf(time: number) {
//     lenis?.raf(time)
//     requestAnimationFrame(raf)
//   }

//   requestAnimationFrame(raf)

//   return lenis
// }
