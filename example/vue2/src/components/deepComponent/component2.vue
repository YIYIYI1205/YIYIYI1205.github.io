<template>
  <div>component2</div>
</template>
<script>

export default {
  name: "ComponentTwo",
  created() {
    console.log(this.$parent, this.$parent.parent)
  }
};
</script>
