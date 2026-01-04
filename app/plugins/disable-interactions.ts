export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      return false
    })

    // Disable text selection and copying
    document.addEventListener('copy', (e) => {
      e.preventDefault()
      return false
    })

    document.addEventListener('cut', (e) => {
      e.preventDefault()
      return false
    })

    // Disable user select
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'
    const style = document.body.style as any
    style.msUserSelect = 'none'

    // Prevent double-click selection that might trigger browser menu
    document.addEventListener('dblclick', (e) => {
      e.preventDefault()
      return false
    })

    // Prevent triple-click from opening browser menu
    let clickCount = 0
    let lastClickTime = 0

    document.addEventListener('click', (e) => {
      const now = Date.now()
      if (now - lastClickTime > 300) {
        clickCount = 1
      }
      else {
        clickCount++
      }
      lastClickTime = now

      if (clickCount >= 3) {
        e.preventDefault()
        clickCount = 0
        return false
      }
    }, true)

    // Disable mousedown selection behavior
    document.addEventListener('mousedown', (e) => {
      if (e.detail > 1) {
        e.preventDefault()
        return false
      }
    }, true)
  }
})
