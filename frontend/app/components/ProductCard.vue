<script setup lang="ts">
import type { Product } from '~/types';

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const toast = useToast()

const handleAddToCart = () => {
  cartStore.addToCart({ 
    productId: props.product.id, 
    name: props.product.name, 
    price: props.product.price 
  })
  toast.add({ 
    title: 'Added to cart', 
    description: `${props.product.name} has been added to your cart.`, 
    color: 'success' 
  })
}
</script>

<template>
  <UCard 
    class="group flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    :ui="{ body: { padding: 'p-0' }, footer: { padding: 'p-4' } }"
  >
    <div class="relative overflow-hidden h-64">
      <NuxtLink :to="`/products/${product.id}`">
        <img 
          :src="product.image?.startsWith('http') ? product.image : (product.image ? `http://localhost:5000${product.image}` : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop')" 
          :alt="product.name" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
        >
      </NuxtLink>
      <div v-if="product.category" class="absolute top-4 left-4 pointer-events-none">
        <UBadge color="white" variant="solid" class="font-semibold px-3 py-1">
          {{ product.category }}
        </UBadge>
      </div>
    </div>
    
    <div class="p-5 flex-grow">
      <NuxtLink :to="`/products/${product.id}`" class="block group/title">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover/title:text-primary transition-colors">
          {{ product.name }}
        </h3>
      </NuxtLink>
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
          @click="handleAddToCart"
        >
          Add
        </UButton>
      </div>
    </template>
  </UCard>
</template>
