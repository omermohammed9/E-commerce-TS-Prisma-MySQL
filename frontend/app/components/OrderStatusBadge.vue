<script setup lang="ts">
const props = defineProps<{
  status: string
  type?: 'order' | 'payment'
}>()

const getOrderColor = (status: string) => {
  switch (status) {
    case 'DELIVERED': return 'green'
    case 'SHIPPED': return 'blue'
    case 'PROCESSING': return 'orange'
    case 'CANCELLED': return 'red'
    case 'PENDING': return 'gray'
    default: return 'gray'
  }
}

const getPaymentColor = (status: string) => {
  switch (status) {
    case 'PAID': return 'green'
    case 'UNPAID': return 'orange'
    case 'FAILED': return 'red'
    case 'REFUNDED': return 'blue'
    default: return 'gray'
  }
}

const color = computed(() => {
  if (props.type === 'payment') {
    return getPaymentColor(props.status)
  }
  return getOrderColor(props.status)
})
</script>

<template>
  <UBadge :color="color" variant="subtle" class="font-medium uppercase tracking-wider text-[10px]">
    {{ status }}
  </UBadge>
</template>
