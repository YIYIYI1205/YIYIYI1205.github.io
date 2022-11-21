<template><div>
    <childVue />
    <child2Vue />
</div></template>
<script>
import childVue from "./child.vue";
import child2Vue from "./child2.vue";
export default {
  name: 'lifeIndex',
  components: {
    childVue, child2Vue
  },
  beforeCreate: function () {
    console.log("index的beforeCreate");
  },
  created: function () {
    console.log("index的created");
  },
  beforeMount() {
    console.log("index的beforeMount");
  },
  mounted() {
    console.log("index的mounted");
  },
  updated() {
    console.log("index的updated");
  },
  beforeUpdate() {
    console.log("index的beforeUpdate");
  },
};
</script>
