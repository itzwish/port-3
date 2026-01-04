/**
 * Example usage of the page loader for API calls and async operations
 *
 * This plugin demonstrates how to use the loader for:
 * - API requests
 * - Form submissions
 * - Authentication
 * - Any async operation that takes >300ms
 */

export default defineNuxtPlugin(() => {
  const { withLoading, startLoading, stopLoading } = usePageLoader()

  // Example: Wrap $fetch to show loader for API calls
  const $fetchWithLoader = async <T>(url: string, options?: any): Promise<T> => {
    return withLoading(async () => {
      return await $fetch<T>(url, options)
    })
  }

  return {
    provide: {
      fetchWithLoader: $fetchWithLoader,
      pageLoader: {
        start: startLoading,
        stop: stopLoading,
        with: withLoading,
      },
    },
  }
})
