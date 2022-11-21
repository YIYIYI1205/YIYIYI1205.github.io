<template>
  <div style="display: flex">
    <div class="left">
      <button @click="select = 1">button1</button>
      <button @click="select = 2">button2</button>
      <button @click="select = 3">button3</button>
    </div>
    <div class="right">
      {{ content[select] }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ComponentOne",
  data: function () {
    return {
      select: 1,
      content: {
        1: "11111",
        2: "22222",
        3: "33333",
      },
    };
  },
};
</script>
