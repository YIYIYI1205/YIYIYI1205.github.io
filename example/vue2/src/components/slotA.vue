<template>
  <!-- 插槽父组件 -->
  <slotB #default="value">
    asdasd {{value}}
  </slotB>
</template>
<script>
import slotB from "./slotB.vue";
export default {
  name: "slotA",
  components: {
    slotB,
  },
};
</script>
