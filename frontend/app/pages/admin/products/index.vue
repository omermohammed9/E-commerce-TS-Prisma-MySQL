<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const api = useApi()
const toast = useToast()

import type { Product } from '~/types';

const page = ref(1)
const limit = 10

const { data, pending, refresh } = await useAsyncData('admin-products', () => 
  api('/products', { query: { page: page.value, limit } })
)

const products = computed(() => data.value?.products || [])
const totalProducts = computed(() => data.value?.total || 0)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stockQuantity', label: 'Stock' },
  { key: 'actions', label: '' }
]

const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this product?')) return
  
  try {
    await api(`/products/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Product Deleted', color: 'success' })
    refresh()
  } catch (error: any) {
    toast.add({ title: 'Delete Failed', description: error.data?.message, color: 'red' })
  }
}

useHead({
  title: 'Manage Products | Admin'
})
</script>

<template>
  <UContainer class="py-12">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-4xl font-black text-gray-900 dark:text-white">Products</h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">Total: {{ totalProducts }} products in catalog</p>
      </div>
      <UButton to="/admin/products/new" color="primary" size="lg" icon="i-heroicons-plus" class="font-bold rounded-xl shadow-lg">
        Add Product
      </UButton>
    </div>

    <UCard class="overflow-hidden border-none shadow-sm" :ui="{ body: { padding: 'p-0' } }">
      <div class="overflow-x-auto">
        <UTable :rows="products" :columns="columns" :loading="pending" class="min-w-max">
          <template #price-data="{ row }">
            <span class="font-bold">${{ row.price }}</span>
          </template>
          
          <template #stockQuantity-data="{ row }">
            <UBadge :color="row.stockQuantity < 10 ? 'orange' : 'green'" variant="subtle">
              {{ row.stockQuantity }} in stock
            </UBadge>
          </template>

          <template #actions-data="{ row }">
            <div class="flex justify-end gap-2">
              <UButton 
                :to="`/admin/products/${row.id}`" 
                color="gray" 
                variant="ghost" 
                icon="i-heroicons-pencil-square" 
                size="sm"
              />
              <UButton 
                color="red" 
                variant="ghost" 
                icon="i-heroicons-trash" 
                size="sm"
                @click="handleDelete(row.id)"
              />
            </div>
          </template>
        </UTable>
      </div>

      <template #footer>
        <div class="flex justify-center">
          <UPagination
            v-model="page"
            :page-count="limit"
            :total="totalProducts"
            @update:model-value="refresh"
          />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
