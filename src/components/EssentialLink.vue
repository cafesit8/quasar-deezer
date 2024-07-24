<template>
  <q-item clickable v-ripple @click="handleClick">
    <q-item-section>
      <q-item-label>
        <RouterLink :to="props.link" exactActiveClass="active" class="item">
          {{ title }}
        </RouterLink>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const router = useRouter()
    function handleClick () {
      router.push({ path: props.link })
    }
    return {
      handleClick,
      props
    }
  }
})
</script>

<style scoped lang="scss">
@use '../css/quasar.variables.scss' as *;

.item {
  font-size: 15px;
  font-weight: 300;
  margin-left: 5px;
}

.active {
  color: $red_principal !important;
  font-weight: 600;
  font-size: 16px;
}

.item {
  color: white;
  text-decoration: none;
  font-size: 16px;
}
</style>
