export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const toast = useToast()

  return $fetch.create({
    baseURL: config.public.apiBase,
    
    onRequest({ options }) {
      if (authStore.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.accessToken}`,
        }
      }
    },

    async onResponseError({ response, options }) {
      const isRefreshRequest = response.url.includes('/users/refresh')
      
      if (response.status === 401 && authStore.refreshToken && !isRefreshRequest) {
        try {
          // Attempt to refresh the token
          await authStore.refresh()
          
          // Retry the original request with new token
          if (authStore.accessToken) {
            const retryOptions = {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${authStore.accessToken}`,
              }
            }
            return await $fetch(response.url, retryOptions)
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError)
          authStore.clearAuth()
          navigateTo('/login')
        }
      } else if (response.status !== 401) {
        // Generic error toast for other errors
        const message = response._data?.error || response._data?.message || 'An unexpected error occurred'
        toast.add({
          title: 'Error',
          description: message,
          color: 'red',
          icon: 'i-heroicons-exclamation-circle'
        })
      }
      
      console.error('API Error:', response._data)
    }
  })
}

