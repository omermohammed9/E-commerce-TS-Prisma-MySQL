<script setup lang="ts">
const route = useRoute()
const api = useApi()
const cartStore = useCartStore()
const toast = useToast()

interface Product {
  id: number
  name: string
  description?: string
  price: number
  stockQuantity: number
  image: string
  category?: string
}

const { data: product, pending, error } = await useAsyncData<Product>(`product-${route.params.id}`, () => 
  api(`/products/${route.params.id}`)
)

const quantity = ref(1)

const handleAddToCart = () => {
  if (!product.value) return
  
  cartStore.addToCart({ 
    productId: product.value.id, 
    name: product.value.name, 
    price: product.value.price 
  })
  
  toast.add({ 
    title: 'Added to cart', 
    description: `${product.value.name} has been added to your cart.`, 
    color: 'success' 
  })
}

useHead({
  title: product.value ? `${product.value.name} | E-commerce` : 'Product Details'
})
</script>

<template>
  <UContainer class="py-12">
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <USkeleton class="h-96 w-full rounded-2xl" />
      <div class="space-y-6">
        <USkeleton class="h-10 w-3/4" />
        <USkeleton class="h-6 w-1/4" />
        <USkeleton class="h-24 w-full" />
        <USkeleton class="h-12 w-1/2" />
      </div>
    </div>

    <div v-else-if="error" class="max-w-md mx-auto text-center py-20">
      <UIcon name="i-heroicons-exclamation-circle" class="text-6xl text-red-500 mb-4" />
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Product Not Found</h2>
      <p class="mt-4 text-gray-500 dark:text-gray-400 text-lg">
        The product you are looking for doesn't exist or has been removed.
      </p>
      <UButton to="/" color="primary" variant="ghost" class="mt-8" icon="i-heroicons-arrow-left">
        Back to Shop
      </UButton>
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
      <!-- Product Image -->
      <div class="relative group">
        <div class="aspect-square overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-2xl">
          <img 
            :src="product.image?.startsWith('http') ? product.image : (product.image ? `http://localhost:5000${product.image}` : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop')" 
            :alt="product.name" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
        </div>
        <UBadge 
          v-if="product.category" 
          color="primary" 
          variant="solid" 
          size="lg"
          class="absolute top-6 left-6 font-bold px-4 py-2 rounded-xl shadow-lg"
        >
          {{ product.category }}
        </UBadge>
      </div>

      <!-- Product Info -->
      <div class="flex flex-col justify-center">
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li><NuxtLink to="/" class="hover:text-primary transition-colors">Shop</NuxtLink></li>
            <li class="flex items-center space-x-2">
              <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
              <span class="font-medium text-gray-900 dark:text-white">{{ product.name }}</span>
            </li>
          </ol>
        </nav>

        <h1 class="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
          {{ product.name }}
        </h1>
        
        <div class="mt-6 flex items-center gap-4">
          <span class="text-3xl font-bold text-primary">
            ${{ product.price }}
          </span>
          <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          <span :class="[
            'text-sm font-semibold px-3 py-1 rounded-full',
            product.stockQuantity > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          ]">
            {{ product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>

        <p class="mt-8 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ product.description || 'Elevate your daily routine with this exceptional product. Designed for those who appreciate quality and attention to detail, it offers unmatched performance and style.' }}
        </p>

        <div class="mt-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex items-center gap-4 flex-grow">
              <UButton 
                color="primary" 
                size="xl" 
                block
                class="font-bold py-4 rounded-xl shadow-xl shadow-primary/25"
                icon="i-heroicons-shopping-cart"
                :disabled="product.stockQuantity <= 0"
                @click="handleAddToCart"
              >
                Add to Shopping Bag
              </UButton>
            </div>
          </div>
          
          <div class="mt-4 flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <UIcon name="i-heroicons-truck" class="w-5 h-5" />
              Free shipping on orders over $100
            </span>
            <span v-if="product.stockQuantity < 10 && product.stockQuantity > 0" class="text-orange-500 font-bold animate-pulse">
              Only {{ product.stockQuantity }} units left!
            </span>
          </div>
        </div>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            <UIcon name="i-heroicons-shield-check" class="text-3xl text-primary mb-2" />
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Warranty</span>
            <span class="text-sm font-semibold mt-1">2 Year Limited</span>
          </div>
          <div class="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            <UIcon name="i-heroicons-arrow-path" class="text-3xl text-primary mb-2" />
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Returns</span>
            <span class="text-sm font-semibold mt-1">30-Day Policy</span>
          </div>
          <div class="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            <UIcon name="i-heroicons-globe-americas" class="text-3xl text-primary mb-2" />
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Shipping</span>
            <span class="text-sm font-semibold mt-1">Global Delivery</span>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
