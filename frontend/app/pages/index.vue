<script setup lang="ts">
const api = useApi()

// Define the Product interface based on the backend schema
interface Product {
  id: number
  name: string
  description?: string
  price: number
  stockQuantity: number
  image: string
  category?: string
}

// Fetch products from the backend
const { data: products, pending, error } = await useAsyncData<Product[]>('products', () => api('/products'))

useHead({
  title: 'Product Listing | E-commerce'
})
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        Our Collection
      </h1>
      <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
        Discover our premium products curated just for you.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <UCard v-for="i in 8" :key="i" class="overflow-hidden">
        <USkeleton class="h-48 w-full" />
        <div class="p-4 space-y-4">
          <USkeleton class="h-6 w-3/4" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-1/2" />
          <div class="flex justify-between items-center pt-4">
            <USkeleton class="h-8 w-20" />
            <USkeleton class="h-10 w-24" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-md mx-auto text-center py-12">
      <UIcon name="i-heroicons-exclamation-triangle" class="text-6xl text-red-500 mb-4" />
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h2>
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        {{ error.statusMessage || 'Unable to fetch products. Please check if the backend is running.' }}
      </p>
      <UButton color="primary" class="mt-6" @click="refreshNuxtData('products')">
        Try Again
      </UButton>
    </div>

    <!-- Empty State -->
    <div v-else-if="!products || products.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-xl">No products found.</p>
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <UCard 
        v-for="product in products" 
        :key="product.id" 
        class="group flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        :ui="{ body: { padding: 'p-0' }, footer: { padding: 'p-4' } }"
      >
        <div class="relative overflow-hidden h-64">
          <img 
            :src="product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'" 
            :alt="product.name" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          >
          <div v-if="product.category" class="absolute top-4 left-4">
            <UBadge color="white" variant="solid" class="font-semibold px-3 py-1">
              {{ product.category }}
            </UBadge>
          </div>
        </div>
        
        <div class="p-5 flex-grow">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {{ product.name }}
          </h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {{ product.description || 'Experience the perfect blend of quality and design with this premium item.' }}
          </p>
        </div>

        <template #footer>
          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              <span class="text-2xl font-black text-gray-900 dark:text-white">
                ${{ product.price }}
              </span>
              <span v-if="product.stockQuantity < 10" class="text-xs text-orange-500 font-medium">
                Only {{ product.stockQuantity }} left!
              </span>
            </div>
            <UButton 
              color="primary" 
              size="lg"
              class="font-bold shadow-lg shadow-primary/20"
              icon="i-heroicons-shopping-bag"
            >
              Add
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
