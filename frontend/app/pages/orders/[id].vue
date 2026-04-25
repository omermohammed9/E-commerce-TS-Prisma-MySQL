<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const api = useApi()
const orderId = route.params.id

const { data: order, pending, error } = await useAsyncData(`order-${orderId}`, () => 
  api(`/orders/getorderbyid/${orderId}`)
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}


useHead({
  title: `Order #${orderId} | E-commerce`
})
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-8 flex items-center gap-4">
      <UButton
        to="/orders"
        color="gray"
        variant="ghost"
        icon="i-heroicons-arrow-left"
      >
        Back to Orders
      </UButton>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Order Details</h1>
    </div>

    <div v-if="pending" class="space-y-6">
      <USkeleton class="h-32 w-full" />
      <USkeleton class="h-64 w-full" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <UIcon name="i-heroicons-exclamation-circle" class="text-6xl text-red-500 mb-4" />
      <h2 class="text-xl font-semibold">Order not found</h2>
      <p class="text-gray-500 mt-2">The order you are looking for does not exist or you don't have permission to view it.</p>
      <UButton to="/orders" color="primary" class="mt-6">Back to My Orders</UButton>
    </div>

    <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Order Summary & Items -->
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold">Order #{{ order.id }}</h2>
              <OrderStatusBadge :status="order.status" size="lg" />
            </div>
          </template>

          <div class="divide-y divide-gray-200 dark:divide-gray-800">
            <div v-for="item in order.items" :key="item.productId" class="py-4 flex gap-4">
              <img :src="item.productImage || 'https://via.placeholder.com/100'" :alt="item.productName" class="w-20 h-20 object-cover rounded-md">
              <div class="flex-grow">
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ item.productName }}</h4>
                <p class="text-sm text-gray-500">Qty: {{ item.quantity }} x ${{ item.price.toFixed(2) }}</p>
              </div>
              <div class="text-right font-bold">
                ${{ (item.quantity * item.price).toFixed(2) }}
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span class="text-primary">${{ order.totalAmount.toFixed(2) }}</span>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Shipping & Payment Info -->
      <div class="space-y-6">
        <UCard>
          <template #header>
            <h3 class="font-bold">Shipping Information</h3>
          </template>
          <div class="space-y-4 text-sm">
            <div>
              <span class="text-gray-500 block">Address</span>
              <p class="font-medium">{{ order.shippingAddress || 'N/A' }}</p>
            </div>
            <div>
              <span class="text-gray-500 block">Date Placed</span>
              <p class="font-medium">{{ formatDate(order.createdAt) }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-bold">Payment Details</h3>
          </template>
          <div class="space-y-4 text-sm">
            <div>
              <span class="text-gray-500 block">Method</span>
              <p class="font-medium">{{ order.paymentMethod || 'Credit Card' }}</p>
            </div>
            <div>
              <span class="text-gray-500 block">Status</span>
              <OrderStatusBadge :status="order.paymentStatus" type="payment" />
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
