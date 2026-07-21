import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

export interface UseRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

const reducedMotionQuery = (): MediaQueryList | null => {
  if (typeof window === 'undefined' || !window.matchMedia) return null
  return window.matchMedia('(prefers-reduced-motion: reduce)')
}

export function useReveal(options: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -80px 0px', once = true } = options

  const elementRef: Ref<HTMLElement | null> = ref(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const attach = () => {
    if (!elementRef.value) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (once && observer && elementRef.value) {
              observer.unobserve(elementRef.value)
            }
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      { threshold, rootMargin },
    )
    observer.observe(elementRef.value)
  }

  onMounted(() => {
    const mql = reducedMotionQuery()
    if (mql?.matches) {
      isVisible.value = true
      return
    }
    attach()
  })

  watch(elementRef, (el, oldEl) => {
    if (oldEl && observer) observer.unobserve(oldEl)
    if (!el) return
    if (!observer) attach()
    else observer.observe(el)
  })

  onBeforeUnmount(disconnect)

  return { elementRef, isVisible }
}
