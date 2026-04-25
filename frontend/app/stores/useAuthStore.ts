import { defineStore } from 'pinia';

import type { User } from '~/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    isAdmin: (state) => state.user?.role === 'ADMIN',
  },

  actions: {
    async login(credentials: any) {
      const api = useApi();
      const toast = useToast();
      try {
        const data: any = await api('/users/login', {
          method: 'POST',
          body: credentials,
        });

        this.setAuth(data);
        toast.add({
          title: 'Welcome back!',
          description: `Logged in as ${data.user.username}`,
          color: 'green',
          icon: 'i-heroicons-check-circle'
        });
        return data;
      } catch (error: any) {
        toast.add({
          title: 'Login failed',
          description: error.data?.error || 'Invalid credentials',
          color: 'red',
          icon: 'i-heroicons-x-circle'
        });
        throw error;
      }
    },

    async register(formData: any) {
      const api = useApi();
      const toast = useToast();
      try {
        const data: any = await api('/users/signup', {
          method: 'POST',
          body: formData,
        });

        this.setAuth(data);
        toast.add({
          title: 'Success!',
          description: 'Your account has been created.',
          color: 'green',
          icon: 'i-heroicons-user-plus'
        });
        return data;
      } catch (error: any) {
        toast.add({
          title: 'Registration failed',
          description: error.data?.error || 'Could not create account',
          color: 'red',
          icon: 'i-heroicons-x-circle'
        });
        throw error;
      }
    },

    async logout() {
      const api = useApi();
      const toast = useToast();
      if (this.refreshToken) {
        try {
          await api('/users/logout', {
            method: 'POST',
            body: { refreshToken: this.refreshToken },
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      }
      this.clearAuth();
      toast.add({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
        color: 'blue',
        icon: 'i-heroicons-information-circle'
      });
      navigateTo('/login');
    },

    async refresh() {
      const api = useApi();
      const toast = useToast();
      if (!this.refreshToken) return;

      try {
        const data: any = await api('/users/refresh', {
          method: 'POST',
          body: { refreshToken: this.refreshToken },
        });

        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
      } catch (error) {
        this.clearAuth();
        toast.add({
          title: 'Session Expired',
          description: 'Please login again to continue.',
          color: 'orange',
          icon: 'i-heroicons-exclamation-triangle'
        });
        throw error;
      }
    },

    setAuth(data: { user: User; accessToken: string; refreshToken: string }) {
      this.user = data.user;
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
    },

    clearAuth() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
    },

    initAuth() {
      // No longer needed with pinia-plugin-persistedstate
    }
  },
  persist: true
});
