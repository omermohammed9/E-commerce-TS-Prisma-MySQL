<script setup lang="ts">
const authStore = useAuthStore()
const cartStore = useCartStore()
const isCartOpen = defineModel<boolean>('cartOpen', { default: false })

const handleLogout = async () => {
  await authStore.logout()
}

const navItems = [
  { label: 'Shop', to: '/' },
  { label: 'My Orders', to: '/orders' }
]
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
    <UContainer class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
            <UIcon name="i-heroicons-shopping-bag" class="h-6 w-6 text-white" />
          </div>
          <span class="text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase">TSC Shop</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.to" 
            :to="item.to"
            class="text-sm font-bold text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
            active-class="text-primary dark:text-white"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center gap-4">
        <template v-if="authStore.isAuthenticated">
          <UDropdown 
            :items="[[
              { label: 'Account Dashboard', icon: 'i-heroicons-user-circle', to: '/profile' },
              { label: 'My Orders', icon: 'i-heroicons-shopping-bag', to: '/orders' },
              authStore.isAdmin ? { label: 'Admin Panel', icon: 'i-heroicons-shield-check', to: '/admin', activeClass: 'text-primary' } : null
            ].filter(Boolean) as any, [
              { label: 'Logout', icon: 'i-heroicons-arrow-left-on-rectangle', click: handleLogout }
            ]]" 
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton 
              color="gray" 
              variant="ghost" 
              class="font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <template #leading>
                <UAvatar 
                  :alt="authStore.user?.username" 
                  size="xs" 
                  class="bg-primary/10 text-primary font-bold"
                />
              </template>
              {{ authStore.user?.username }}
            </UButton>
          </UDropdown>
        </template>
        
        <template v-else>
          <div class="hidden sm:flex items-center gap-2">
            <UButton to="/login" variant="ghost" color="gray" class="font-bold">Login</UButton>
            <UButton to="/register" color="primary" class="font-bold rounded-xl shadow-lg shadow-primary/20">Sign Up</UButton>
          </div>
          <!-- Mobile Login Icon -->
          <UButton to="/login" variant="ghost" color="gray" icon="i-heroicons-user" class="sm:hidden" />
        </template>

        <div class="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>

        <!-- Cart Trigger -->
        <UChip :text="cartStore.itemCount" color="primary" size="md" :show="cartStore.itemCount > 0">
          <UButton 
            icon="i-heroicons-shopping-cart" 
            color="gray" 
            variant="ghost" 
            size="lg"
            class="rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            @click="isCartOpen = true"
          />
        </UChip>
      </div>
    </UContainer>
  </header>
</template>
