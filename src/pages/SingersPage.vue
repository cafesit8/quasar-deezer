<template>
  <q-page class="flex">
    <div class="container">
      <PopSection />
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue'
import PopSection from '../sections/SingersPage/PopSection.vue'

export default defineComponent({
  name: 'SingersPage',
  components: {
    PopSection
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
