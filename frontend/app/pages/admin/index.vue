<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const authStore = useAuthStore()

// Redirect if not admin (though middleware should handle it, let's be safe)
onMounted(() => {
  if (!authStore.isAdmin) {
    navigateTo('/')
  }
})

const stats = [
  { label: 'Total Products', value: '42', icon: 'i-heroicons-shopping-bag', color: 'primary' },
  { label: 'Total Orders', value: '156', icon: 'i-heroicons-banknotes', color: 'green' },
  { label: 'Total Users', value: '1,204', icon: 'i-heroicons-users', color: 'blue' },
  { label: 'Low Stock Items', value: '5', icon: 'i-heroicons-exclamation-triangle', color: 'orange' }
]

const adminLinks = [
  { label: 'Manage Products', to: '/admin/products', icon: 'i-heroicons-shopping-cart', description: 'Add, edit, or remove products from your catalog.' },
  { label: 'Manage Orders', to: '/admin/orders', icon: 'i-heroicons-clipboard-document-list', description: 'View and update order statuses.' },
  { label: 'User Directory', to: '/admin/users', icon: 'i-heroicons-user-group', description: 'View and manage registered users.' },
  { label: 'Store Settings', to: '/admin/settings', icon: 'i-heroicons-cog-6-tooth', description: 'Configure global store preferences.' }
]

useHead({
  title: 'Admin Dashboard | TSC Shop'
})
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
      <p class="mt-2 text-gray-500 dark:text-gray-400">Welcome back, {{ authStore.user?.firstName }}. Here's what's happening today.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <UCard 
        v-for="stat in stats" 
        :key="stat.label"
        class="border-none shadow-sm bg-white dark:bg-gray-900 overflow-hidden"
        :ui="{ body: { padding: 'p-6' } }"
      >
        <div class="flex items-center gap-4">
          <div :class="[`bg-${stat.color}-100 dark:bg-${stat.color}-900/30 p-3 rounded-2xl`]">
            <UIcon :name="stat.icon" :class="[`text-2xl text-${stat.color}-600 dark:text-${stat.color}-400`]" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ stat.label }}</p>
            <p class="text-3xl font-black text-gray-900 dark:text-white mt-1">{{ stat.value }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Quick Links -->
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Management</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink 
        v-for="link in adminLinks" 
        :key="link.to"
        :to="link.to"
        class="group p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
      >
        <div class="flex items-start gap-6">
          <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <UIcon :name="link.icon" class="text-3xl" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{{ link.label }}</h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400 leading-relaxed">{{ link.description }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </UContainer>
</template>
