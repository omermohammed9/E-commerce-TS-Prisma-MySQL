<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const api = useApi()
const toast = useToast()
const router = useRouter()
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be 0 or greater'),
  stockQuantity: z.number().int().min(0, 'Stock cannot be negative'),
  category: z.string().optional(),
  image: z.string().optional()
})

const form = reactive({
  name: '',
  description: '',
  price: 0,
  stockQuantity: 0,
  category: '',
  image: ''
})

const isSubmitting = ref(false)
const isUploading = ref(false)

const handleFileUpload = async (event: any) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  isUploading.value = true
  try {
    const response = await api('/products/upload', {
      method: 'POST',
      body: formData
    })
    form.image = response.imageUrl
    toast.add({ title: 'Image Uploaded', color: 'success' })
  } catch (error: any) {
    toast.add({ title: 'Upload Failed', description: error.data?.message, color: 'red' })
  } finally {
    isUploading.value = false
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await api('/products', {
      method: 'POST',
      body: form
    })
    toast.add({ title: 'Product Created', color: 'success' })
    router.push('/admin/products')
  } catch (error: any) {
    toast.add({ title: 'Creation Failed', description: error.data?.message, color: 'red' })
  } finally {
    isSubmitting.value = false
  }
}

const categories = ['Electronics', 'Clothing', 'Home', 'Accessories', 'Beauty', 'Sports']

useHead({
  title: 'Add New Product | Admin'
})
</script>

<template>
  <UContainer class="py-12 max-w-3xl">
    <div class="mb-10 flex items-center gap-4">
      <UButton to="/admin/products" color="gray" variant="ghost" icon="i-heroicons-arrow-left" />
      <div>
        <h1 class="text-4xl font-black text-gray-900 dark:text-white">Add Product</h1>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Create a new item in your store catalog.</p>
      </div>
    </div>

    <UCard class="p-8 rounded-3xl shadow-sm border-none bg-white dark:bg-gray-900">
      <UForm :schema="schema" :state="form" @submit="handleSubmit" class="space-y-8">
        <UFormGroup label="Product Name" name="name" required>
          <UInput v-model="form.name" size="xl" placeholder="Enter product name..." />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UTextarea v-model="form.description" size="xl" placeholder="Describe your product..." rows="4" />
        </UFormGroup>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <UFormGroup label="Price ($)" name="price" required>
            <UInput v-model.number="form.price" type="number" step="0.01" size="xl" icon="i-heroicons-banknotes" />
          </UFormGroup>
          <UFormGroup label="Stock Quantity" name="stockQuantity" required>
            <UInput v-model.number="form.stockQuantity" type="number" size="xl" icon="i-heroicons-circle-stack" />
          </UFormGroup>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <UFormGroup label="Category" name="category">
            <USelect v-model="form.category" :options="categories" size="xl" placeholder="Select category" />
          </UFormGroup>
          <UFormGroup label="Product Image" name="image">
            <div class="flex flex-col gap-4">
              <div v-if="form.image" class="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <img :src="form.image.startsWith('http') ? form.image : `http://localhost:5000${form.image}`" class="w-full h-full object-cover">
                <UButton 
                  color="red" 
                  variant="soft" 
                  icon="i-heroicons-trash" 
                  class="absolute top-2 right-2 rounded-full"
                  @click="form.image = ''"
                />
              </div>
              <UInput 
                type="file" 
                size="xl" 
                icon="i-heroicons-photo" 
                accept="image/*"
                :loading="isUploading"
                @change="handleFileUpload" 
              />
              <UInput v-model="form.image" size="sm" placeholder="Or enter manual URL..." />
            </div>
          </UFormGroup>
        </div>

        <div class="pt-6 flex justify-end gap-4">
          <UButton to="/admin/products" color="gray" size="xl" variant="ghost" class="px-8 font-bold">
            Cancel
          </UButton>
          <UButton 
            type="submit" 
            color="primary" 
            size="xl" 
            class="px-12 font-bold rounded-xl shadow-xl shadow-primary/20"
            :loading="isSubmitting"
          >
            Create Product
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
