import { defineStore } from 'pinia'

import type { Order, OrderItem } from '~/types';

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as Order[],
    currentOrder: null as Order | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchMyOrders() {
      const api = useApi()
      this.loading = true
      this.error = null
      try {
        const data = await api<Order[]>('/orders/myorders')
        this.orders = data
      } catch (err: any) {
        this.error = err.data?.message || 'Failed to fetch orders'
      } finally {
        this.loading = false
      }
    },

    async fetchOrderDetails(id: string | number) {
      const api = useApi()
      this.loading = true
      this.error = null
      try {
        const data = await api<Order>(`/orders/${id}`)
        this.currentOrder = data
        return data
      } catch (err: any) {
        this.error = err.data?.message || 'Failed to fetch order details'
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
