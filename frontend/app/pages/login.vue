<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
const auth = useAuthStore()
const router = useRouter()
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const credentials = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(credentials)
    router.push('/')
  } catch (err: any) {
    error.value = err.data?.error || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
    <UCard class="max-w-md w-full space-y-8">
      <template #header>
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p class="mt-2 text-sm text-slate-400">
            Sign in to your account
          </p>
        </div>
      </template>

      <UForm :schema="schema" :state="credentials" class="space-y-6" @submit="handleLogin">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="credentials.email"
            type="email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
            required
            size="lg"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="credentials.password"
            type="password"
            placeholder="••••••••"
            icon="i-heroicons-lock-closed"
            required
            size="lg"
          />
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
          Sign In
        </UButton>
      </UForm>

      <template #footer>
        <div class="text-center">
          <p class="text-sm text-slate-400">
            Don't have an account?
            <NuxtLink to="/register" class="font-medium text-primary-500 hover:text-primary-400">
              Register now
            </NuxtLink>
          </p>
        </div>
      </template>
    </UCard>
  </div>
</template>
