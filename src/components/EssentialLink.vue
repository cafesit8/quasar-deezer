<template>
  <q-item clickable v-ripple @click="handleClick">
    <q-item-section>
      <q-item-label>
        <span class="item">{{ title }}</span>
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
      router.push({ name: props.link })
    }
    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
.item {
  font-size: 15px;
  font-weight: 300;
  margin-left: 5px;
}
</style>
