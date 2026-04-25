<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const api = useApi()
const page = ref(1)
const limit = ref(10)

const { data, pending, error, refresh } = await useAsyncData('my-orders', () => 
  api('/orders/myorders', {
    query: {
      page: page.value,
      limit: limit.value
    }
  }), {
    watch: [page]
  }
)

const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'createdAt', label: 'Date' },
  { key: 'totalAmount', label: 'Total' },
  { key: 'status', label: 'Status' },
  { key: 'paymentStatus', label: 'Payment' },
  { key: 'actions', label: 'Actions' }
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}


useHead({
  title: 'My Orders | E-commerce'
})
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Manage and track your recent orders.</p>
    </div>

    <UCard :ui="{ body: { padding: 'p-0' } }">
      <UTable :rows="data?.orders || []" :columns="columns" :loading="pending">
        <template #createdAt-data="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>

        <template #totalAmount-data="{ row }">
          ${{ row.totalAmount.toFixed(2) }}
        </template>

        <template #status-data="{ row }">
          <OrderStatusBadge :status="row.status" />
        </template>
 
        <template #paymentStatus-data="{ row }">
          <OrderStatusBadge :status="row.paymentStatus" type="payment" />
        </template>


        <template #actions-data="{ row }">
          <UButton
            :to="`/orders/${row.id}`"
            color="gray"
            variant="ghost"
            icon="i-heroicons-eye"
            size="xs"
          >
            View Details
          </UButton>
        </template>
      </UTable>

      <template #footer v-if="data && data.totalPages > 1">
        <div class="flex justify-center">
          <UPagination
            v-model="page"
            :page-count="limit"
            :total="data.total"
          />
        </div>
      </template>
    </UCard>

    <div v-if="error" class="mt-8 text-center text-red-500">
      <p>Error loading orders: {{ error.message }}</p>
      <UButton color="primary" class="mt-4" @click="refresh">Retry</UButton>
    </div>

    <div v-else-if="!pending && (!data || data.orders.length === 0)" class="mt-8 text-center py-12">
      <UIcon name="i-heroicons-shopping-cart" class="text-6xl text-gray-300 mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">No orders yet</h2>
      <p class="text-gray-500 dark:text-gray-400 mt-2">You haven't placed any orders yet.</p>
      <UButton to="/" color="primary" class="mt-6">Start Shopping</UButton>
    </div>
  </UContainer>
</template>
