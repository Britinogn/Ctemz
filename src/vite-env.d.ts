// Swiper CSS module declarations
declare module 'swiper/css' {
  const content: string
  export default content
}

declare module 'swiper/css/navigation' {
  const content: string
  export default content
}

declare module 'swiper/css/pagination' {
  const content: string
  export default content
}

declare module 'swiper/css/autoplay' {
  const content: string
  export default content
}

// General wildcard for Swiper CSS (covers future modules)
declare module 'swiper/css/*' {
  const content: string
  export default content
}