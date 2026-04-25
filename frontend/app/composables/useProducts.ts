import type { Product } from '~/types';

interface ProductResponse {
  products: Product[]
  total: number
}

export function useProducts() {
  const api = useApi()
  
  const search = ref('')
  const selectedCategory = ref<string | undefined>(undefined)
  const currentPage = ref(1)
  const limit = 12

  // Build query params reactively
  const queryParams = computed(() => {
    const params: Record<string, string | number> = {
      page: currentPage.value,
      limit,
    }
    if (search.value) params.search = search.value
    if (selectedCategory.value) params.category = selectedCategory.value
    return params
  })

  const { data, pending, error, refresh } = useAsyncData<ProductResponse>(
    'products',
    () => api<ProductResponse>('/products', { params: queryParams.value }),
    { watch: [queryParams] }
  )

  const products = computed(() => data.value?.products ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const totalPages = computed(() => Math.ceil(total.value / limit))

  // Extract unique categories from returned products for filter chips
  const categories = computed(() => {
    const cats = new Set<string>()
    products.value.forEach(p => {
      if (p.category) cats.add(p.category)
    })
    return Array.from(cats).sort()
  })

  const handleSearch = () => {
    currentPage.value = 1
  }

  const handleCategoryFilter = (cat: string | undefined) => {
    selectedCategory.value = cat
    currentPage.value = 1
  }

  const handlePageChange = (page: number) => {
    currentPage.value = page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return {
    search,
    selectedCategory,
    currentPage,
    limit,
    queryParams,
    data,
    pending,
    error,
    refresh,
    products,
    total,
    totalPages,
    categories,
    handleSearch,
    handleCategoryFilter,
    handlePageChange
  }
}
