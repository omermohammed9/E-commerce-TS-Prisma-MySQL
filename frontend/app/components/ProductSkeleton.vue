<script setup lang="ts">
// Loading Skeleton for Product Cards
</script>

<template>
  <div class="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
    <USkeleton class="h-64 w-full rounded-none" />
    <div class="p-5 space-y-3">
      <USkeleton class="h-6 w-3/4" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-1/2" />
      <div class="flex justify-between items-center pt-2">
        <USkeleton class="h-8 w-20" />
        <USkeleton class="h-10 w-24 rounded-lg" />
      </div>
    </div>
  </div>
</template>
