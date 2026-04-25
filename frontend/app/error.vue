<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })

useHead({
  title: `${props.error?.statusCode || 'Error'} | TSC Shop`
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
    <div class="max-w-xl w-full text-center">
      <div class="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 text-primary">
        <UIcon 
          :name="error?.statusCode === 404 ? 'i-heroicons-magnifying-glass' : 'i-heroicons-exclamation-triangle'" 
          class="text-5xl" 
        />
      </div>

      <h1 class="text-6xl font-black text-gray-900 dark:text-white mb-4">
        {{ error?.statusCode }}
      </h1>
      
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {{ error?.statusCode === 404 ? "Oops! Page not found." : "Something went wrong." }}
      </h2>

      <p class="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
        {{ error?.message || "We couldn't find the page you're looking for. It might have been moved or deleted." }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <UButton 
          color="primary" 
          size="xl" 
          class="px-10 font-bold rounded-xl shadow-xl shadow-primary/20"
          @click="handleError"
        >
          Go Back Home
        </UButton>
        <UButton 
          color="gray" 
          variant="ghost" 
          size="xl" 
          class="px-10 font-bold"
          @click="$router.back()"
        >
          Go Back
        </UButton>
      </div>

      <div v-if="process.env.NODE_ENV === 'development'" class="mt-12 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl text-left overflow-auto max-h-64 border border-red-100 dark:border-red-900/30">
        <p class="text-red-600 dark:text-red-400 font-mono text-sm">
          {{ error?.stack }}
        </p>
      </div>
    </div>
  </div>
</template>
