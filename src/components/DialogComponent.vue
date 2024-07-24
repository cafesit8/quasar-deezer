<template>
  <q-dialog v-model="isOpen" persistent>
    <slot></slot>
  </q-dialog>
</template>
<script>
import { useDialog } from 'src/composables/useDialog'
export default {
  name: 'DialogComponent',
  setup () {
    const { isOpen } = useDialog()

    return {
      isOpen
    }
  }
}
</script>
