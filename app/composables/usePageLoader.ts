/**
 * Composable to manage page loading states
 * Shows loader when actions take >300ms based on best practices
 */
export const usePageLoader = () => {
  const isLoading = useState<boolean>('page-loading', () => false)
  const loadingTimer = useState<NodeJS.Timeout | null>('loading-timer', () => null)

  const LOADER_DELAY = 300 // Show loader only if action takes >300ms

  /**
   * Start loading with a delay to avoid flashing for quick actions
   */
  const startLoading = () => {
    if (loadingTimer.value) {
      clearTimeout(loadingTimer.value)
    }

    loadingTimer.value = setTimeout(() => {
      isLoading.value = true
    }, LOADER_DELAY)
  }

  /**
   * Stop loading immediately
   */
  const stopLoading = () => {
    if (loadingTimer.value) {
      clearTimeout(loadingTimer.value)
      loadingTimer.value = null
    }
    isLoading.value = false
  }

  /**
   * Execute an async function with loading state
   */
  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    startLoading()
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading: readonly(isLoading),
    startLoading,
    stopLoading,
    withLoading,
  }
}
