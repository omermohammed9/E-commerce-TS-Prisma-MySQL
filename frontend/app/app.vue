<script setup lang="ts">
const authStore = useAuthStore()
const cartStore = useCartStore()
const isCartOpen = ref(false)

// Initialize cart from storage on mount
onMounted(() => {
  cartStore.loadFromStorage()
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator :color="'repeating-linear-gradient(to right,#4f46e5 0%,#8b5cf6 50%,#ec4899 100%)'" :height="3" />
    <AppNav v-model:cart-open="isCartOpen" />

    <main class="min-h-[calc(100vh-64px)]">
      <NuxtPage />
    </main>

    <CartSlideover v-model="isCartOpen" />
    <UNotifications />
  </div>
</template>

<style>
body {
  @apply antialiased font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950;
}
</style>
