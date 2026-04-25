<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
const auth = useAuthStore()
const router = useRouter()
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(10, 'Phone number is invalid'),
  address: z.string().min(5, 'Address is too short')
})

const form = reactive({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: ''
})

const loading = ref(false)
const error = ref('')

async function handleRegister() {
  loading.value = true
  error.value = ''
  try {
    await auth.register(form)
    router.push('/')
  } catch (err: any) {
    error.value = err.data?.error || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
    <UCard class="max-w-2xl w-full space-y-8">
      <template #header>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white">
            Create Account
          </h2>
          <p class="mt-2 text-sm text-slate-400">
            Join our premium e-commerce platform
          </p>
        </div>
      </template>

      <UForm :schema="schema" :state="form" class="space-y-6" @submit="handleRegister">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="Username" name="username">
            <UInput v-model="form.username" placeholder="johndoe" icon="i-heroicons-user" required />
          </UFormGroup>

          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email" type="email" placeholder="john@example.com" icon="i-heroicons-envelope" required />
          </UFormGroup>

          <UFormGroup label="First Name" name="firstName">
            <UInput v-model="form.firstName" placeholder="John" required />
          </UFormGroup>

          <UFormGroup label="Last Name" name="lastName">
            <UInput v-model="form.lastName" placeholder="Doe" required />
          </UFormGroup>

          <UFormGroup label="Phone Number" name="phoneNumber">
            <UInput v-model="form.phoneNumber" placeholder="+1234567890" icon="i-heroicons-phone" required />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="form.password" type="password" placeholder="••••••••" icon="i-heroicons-lock-closed" required />
          </UFormGroup>
        </div>

        <UFormGroup label="Address" name="address">
          <UTextarea v-model="form.address" placeholder="123 Street, City, Country" required />
        </UFormGroup>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="loading"
          color="primary"
          variant="solid"
        >
          Create Account
        </UButton>
      </UForm>

      <template #footer>
        <div class="text-center">
          <p class="text-sm text-slate-400">
            Already have an account?
            <NuxtLink to="/login" class="font-medium text-primary-500 hover:text-primary-400">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </template>
    </UCard>
  </div>
</template>
