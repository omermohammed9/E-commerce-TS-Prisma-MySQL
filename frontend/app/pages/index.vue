<script setup lang="ts">
const {
  search,
  selectedCategory,
  currentPage,
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
} = useProducts()

useHead({
  title: 'TSC Shop - Premium E-commerce'
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0di0yaDEydjJIMjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <UContainer class="relative py-16 md:py-24 text-center text-white">
        <h1 class="text-5xl md:text-7xl font-black tracking-tight leading-none">
          Discover <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">Premium</span> Products
        </h1>
        <p class="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Curated collection of the finest products. Quality you can trust, style you'll love.
        </p>

        <!-- Search Bar -->
        <div class="mt-10 max-w-xl mx-auto">
          <div class="relative">
            <UIcon name="i-heroicons-magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <input
              v-model="search"
              type="text"
              placeholder="Search products..."
              class="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white placeholder-gray-400 text-lg shadow-2xl shadow-black/20 border-0 outline-none focus:ring-4 focus:ring-white/30 transition-all"
              @keyup.enter="handleSearch"
            >
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Main Content -->
    <UContainer class="py-12">
      <!-- Category Filters -->
      <div class="flex flex-wrap items-center gap-3 mb-10">
        <span class="text-sm font-bold text-gray-400 uppercase tracking-wider mr-2">Filter:</span>
        <button
          :class="[
            'px-4 py-2 rounded-full text-sm font-bold transition-all duration-200',
            !selectedCategory
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          @click="handleCategoryFilter(undefined)"
        >
          All
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          :class="[
            'px-4 py-2 rounded-full text-sm font-bold transition-all duration-200',
            selectedCategory === cat
              ? 'bg-primary text-white shadow-lg shadow-primary/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          @click="handleCategoryFilter(cat)"
        >
          {{ cat }}
        </button>

        <div class="ml-auto text-sm text-gray-400 font-medium">
          {{ total }} product{{ total !== 1 ? 's' : '' }} found
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductSkeleton v-for="i in 8" :key="i" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-6xl text-red-500 mb-4 mx-auto block" />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Failed to load products</h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">{{ error.message }}</p>
        <UButton color="primary" class="mt-6 font-bold" @click="refresh()">
          Try Again
        </UButton>
      </div>

      <!-- Empty State -->
      <div v-else-if="products.length === 0" class="text-center py-20">
        <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto block" />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">No products found</h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <UButton
          v-if="search || selectedCategory"
          color="primary"
          variant="ghost"
          class="mt-6 font-bold"
          @click="search = ''; selectedCategory = undefined"
        >
          Clear Filters
        </UButton>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center">
        <div class="flex items-center gap-2">
          <UButton
            icon="i-heroicons-chevron-left"
            color="gray"
            variant="ghost"
            :disabled="currentPage <= 1"
            @click="handlePageChange(currentPage - 1)"
          />
          <template v-for="page in totalPages" :key="page">
            <UButton
              :color="page === currentPage ? 'primary' : 'gray'"
              :variant="page === currentPage ? 'solid' : 'ghost'"
              class="font-bold min-w-[40px]"
              @click="handlePageChange(page)"
            >
              {{ page }}
            </UButton>
          </template>
          <UButton
            icon="i-heroicons-chevron-right"
            color="gray"
            variant="ghost"
            :disabled="currentPage >= totalPages"
            @click="handlePageChange(currentPage + 1)"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
