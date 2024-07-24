<template>
  <q-page class="flex">
    <div class="container">
      <ElectronicSection />
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import ElectronicSection from '../sections/ElectronicPage/ElectronicSection.vue'

export default defineComponent({
  name: 'SingersPage',
  components: {
    ElectronicSection
  }
})
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  padding: 30px 50px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
