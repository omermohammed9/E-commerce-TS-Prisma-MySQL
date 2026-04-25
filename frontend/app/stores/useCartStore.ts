import { defineStore } from 'pinia'

interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    }
  },
  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const toast = useToast()
      const existingItem = this.items.find(item => item.productId === product.productId)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      toast.add({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
        color: 'green',
        icon: 'i-heroicons-shopping-cart',
        timeout: 2000
      })
      this.saveToStorage()
    },
    incrementQuantity(productId: number) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        item.quantity++
        this.saveToStorage()
      }
    },
    decrementQuantity(productId: number) {
      const item = this.items.find(item => item.productId === productId)
      if (item && item.quantity > 1) {
        item.quantity--
        this.saveToStorage()
      } else if (item && item.quantity === 1) {
        this.removeFromCart(productId)
      }
    },
    removeFromCart(productId: number) {
      const toast = useToast()
      const index = this.items.findIndex(item => item.productId === productId)
      if (index !== -1) {
        const itemName = this.items[index].name
        this.items.splice(index, 1)
        toast.add({
          title: 'Removed from cart',
          description: `${itemName} has been removed.`,
          color: 'gray',
          icon: 'i-heroicons-trash',
          timeout: 2000
        })
        this.saveToStorage()
      }
    },
    clearCart() {
      const toast = useToast()
      this.items = []
      toast.add({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart.',
        color: 'blue',
        icon: 'i-heroicons-archive-box-x-mark',
        timeout: 2000
      })
      this.saveToStorage()
    },
    saveToStorage() {
      if (import.meta.client) {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },
    loadFromStorage() {
      if (import.meta.client) {
        const saved = localStorage.getItem('cart')
        if (saved) {
          this.items = JSON.parse(saved)
        }
      }
    }
  }
})

