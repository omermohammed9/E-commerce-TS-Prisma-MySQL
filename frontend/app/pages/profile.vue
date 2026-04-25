<script setup lang="ts">
const authStore = useAuthStore()
const api = useApi()
const toast = useToast()

definePageMeta({
  middleware: 'auth'
})

const user = computed(() => authStore.user)

const profileForm = reactive({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  email: user.value?.email || ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isUpdatingProfile = ref(false)
const isUpdatingPassword = ref(false)

const handleUpdateProfile = async () => {
  isUpdatingProfile.value = true
  try {
    const updatedUser = await api(`/users/${user.value?.id}`, {
      method: 'PUT',
      body: profileForm
    })
    authStore.user = updatedUser
    // Update cookie too
    const userCookie = useCookie('user')
    userCookie.value = JSON.stringify(updatedUser)
    
    toast.add({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
      color: 'success'
    })
  } catch (error: any) {
    toast.add({
      title: 'Update Failed',
      description: error.data?.message || 'Failed to update profile.',
      color: 'red'
    })
  } finally {
    isUpdatingProfile.value = false
  }
}

const handleChangePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    toast.add({
      title: 'Validation Error',
      description: 'New passwords do not match.',
      color: 'red'
    })
    return
  }

  isUpdatingPassword.value = true
  try {
    await api('/users/change-password', {
      method: 'POST',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }
    })
    
    toast.add({
      title: 'Password Changed',
      description: 'Your password has been successfully updated.',
      color: 'success'
    })
    
    // Clear form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (error: any) {
    toast.add({
      title: 'Update Failed',
      description: error.data?.message || 'Failed to change password.',
      color: 'red'
    })
  } finally {
    isUpdatingPassword.value = false
  }
}

useHead({
  title: 'My Profile | E-commerce'
})
</script>

<template>
  <UContainer class="py-12 max-w-4xl">
    <div class="mb-10">
      <h1 class="text-4xl font-black text-gray-900 dark:text-white">Account Settings</h1>
      <p class="mt-2 text-gray-500 dark:text-gray-400">Manage your profile and security preferences.</p>
    </div>

    <div class="grid grid-cols-1 gap-10">
      <!-- Profile Information -->
      <section class="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <UIcon name="i-heroicons-user" class="text-2xl text-primary" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
            <p class="text-sm text-gray-500">Update your name and email address.</p>
          </div>
        </div>

        <UForm :state="profileForm" @submit="handleUpdateProfile" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UFormGroup label="First Name" name="firstName">
              <UInput v-model="profileForm.firstName" size="lg" placeholder="John" />
            </UFormGroup>
            <UFormGroup label="Last Name" name="lastName">
              <UInput v-model="profileForm.lastName" size="lg" placeholder="Doe" />
            </UFormGroup>
          </div>

          <UFormGroup label="Email Address" name="email" help="You will use this email to log in.">
            <UInput v-model="profileForm.email" size="lg" icon="i-heroicons-envelope" />
          </UFormGroup>

          <div class="flex justify-end pt-4">
            <UButton 
              type="submit" 
              color="primary" 
              size="lg" 
              class="px-8 font-bold rounded-xl shadow-lg shadow-primary/20"
              :loading="isUpdatingProfile"
            >
              Save Changes
            </UButton>
          </div>
        </UForm>
      </section>

      <!-- Security / Password -->
      <section class="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <UIcon name="i-heroicons-lock-closed" class="text-2xl text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Security</h2>
            <p class="text-sm text-gray-500">Change your password to keep your account secure.</p>
          </div>
        </div>

        <UForm :state="passwordForm" @submit="handleChangePassword" class="space-y-6">
          <UFormGroup label="Current Password" name="currentPassword">
            <UInput v-model="passwordForm.currentPassword" type="password" size="lg" placeholder="••••••••" />
          </UFormGroup>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UFormGroup label="New Password" name="newPassword">
              <UInput v-model="passwordForm.newPassword" type="password" size="lg" placeholder="••••••••" />
            </UFormGroup>
            <UFormGroup label="Confirm New Password" name="confirmPassword">
              <UInput v-model="passwordForm.confirmPassword" type="password" size="lg" placeholder="••••••••" />
            </UFormGroup>
          </div>

          <div class="flex justify-end pt-4">
            <UButton 
              type="submit" 
              color="orange" 
              variant="soft"
              size="lg" 
              class="px-8 font-bold rounded-xl"
              :loading="isUpdatingPassword"
            >
              Update Password
            </UButton>
          </div>
        </UForm>
      </section>

      <!-- Danger Zone -->
      <section class="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/30">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 class="text-xl font-bold text-red-700 dark:text-red-400">Logout of all devices</h2>
            <p class="text-sm text-red-600/70 dark:text-red-400/70 mt-1">
              You will be signed out of your account on this and all other devices.
            </p>
          </div>
          <UButton 
            color="red" 
            variant="ghost" 
            size="lg" 
            class="font-bold whitespace-nowrap"
            icon="i-heroicons-arrow-left-on-rectangle"
            @click="authStore.logout()"
          >
            Sign Out
          </UButton>
        </div>
      </section>
    </div>
  </UContainer>
</template>
