<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <slot :todo="todo">
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</template>
<script>
export default {
  name: "exampleSlotB",
  props: ["todos"],
};
</script>
