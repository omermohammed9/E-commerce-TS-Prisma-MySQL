<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()
const cartStore = useCartStore()
const api = useApi()
const toast = useToast()
const router = useRouter()
const isProcessing = ref(false)

const handleCheckout = async () => {
  if (!authStore.isAuthenticated) {
    toast.add({
      title: 'Authentication Required',
      description: 'Please login to complete your purchase.',
      color: 'warning'
    })
    emit('update:modelValue', false)
    router.push('/login')
    return
  }

  isProcessing.value = true
  try {
    const payload = {
      userId: authStore.user?.id,
      totalAmount: cartStore.cartTotal,
      status: 'PENDING',
      paymentStatus: 'UNPAID',
      paymentMethod: 'CREDIT_CARD',
      items: cartStore.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    }

    await api('/orders/createorder', {
      method: 'POST',
      body: payload
    })

    toast.add({
      title: 'Order Placed!',
      description: 'Your order has been successfully created.',
      color: 'success'
    })

    cartStore.clearCart()
    emit('update:modelValue', false)
  } catch (err: any) {
    toast.add({
      title: 'Checkout Failed',
      description: err.message || 'There was an error processing your order.',
      color: 'error'
    })
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <USlideover :model-value="props.modelValue" @update:model-value="val => emit('update:modelValue', val)">
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1 overflow-y-auto' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Shopping Cart</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" class="-my-1" @click="emit('update:modelValue', false)" />
        </div>
      </template>

      <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center h-full text-center p-8">
        <UIcon name="i-heroicons-shopping-cart" class="text-6xl text-gray-300 dark:text-gray-700 mb-4" />
        <p class="text-gray-500">Your cart is empty</p>
        <UButton color="primary" variant="link" @click="emit('update:modelValue', false)">Start Shopping</UButton>
      </div>

      <div v-else class="space-y-4">
        <div v-for="item in cartStore.items" :key="item.productId" class="flex justify-between items-center py-2">
          <div class="flex-1">
            <h4 class="font-semibold">{{ item.name }}</h4>
            <p class="text-sm text-gray-500">${{ item.price }} x {{ item.quantity }}</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <UButton 
                icon="i-heroicons-minus" 
                color="gray" 
                variant="ghost" 
                size="xs"
                @click="cartStore.decrementQuantity(item.productId)"
              />
              <span class="px-2 text-sm font-medium">{{ item.quantity }}</span>
              <UButton 
                icon="i-heroicons-plus" 
                color="gray" 
                variant="ghost" 
                size="xs"
                @click="cartStore.incrementQuantity(item.productId)"
              />
            </div>
            <div class="text-right min-w-[60px]">
              <span class="font-bold text-primary-500">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <UButton 
              color="red" 
              variant="ghost" 
              icon="i-heroicons-trash" 
              size="xs"
              @click="cartStore.removeFromCart(item.productId)"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div v-if="cartStore.items.length > 0" class="space-y-4">
          <div class="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <UButton 
            block 
            size="xl" 
            color="primary" 
            :loading="isProcessing"
            @click="handleCheckout"
          >
            Checkout
          </UButton>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>
