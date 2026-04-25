export const useApi = () => {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBase,
    async onResponseError({ response }) {
      console.error('API Error:', response._data)
    }
  })
}
