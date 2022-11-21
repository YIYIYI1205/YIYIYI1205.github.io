<template>
 <div>
  <slot></slot>
 </div>
  <!-- <table border="1">
    <thead>
      <slot name="header"></slot>
    </thead>
    <tbody>
      <slot name="container"></slot>
    </tbody>
  </table> -->
</template>
<script>
export default {
  name: "slotTable",
  props: ["data"],
};
</script>
