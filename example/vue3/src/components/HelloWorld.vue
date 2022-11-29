<script>
import { ref, watchEffect } from 'vue'
// defineProps({
//   msg: String
// })

// const emits = defineEmits(['handleClick'])

// const clickMethod = function () {
//   emits('handleClick', 234)
// }


export default {
  props: {
    msg: String
  },
  setup(props, { emit }) {
    const count = ref(0)
    watchEffect(() => console.log(count.value))
    emit('handleClick', 3434)
    count.value++
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <!-- <button @click="clickMethod">点击</button>
  <input type="text" v-model="count">测试 -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
