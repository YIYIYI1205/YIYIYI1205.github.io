<template><div>
childVue
</div></template>
<script>

export default {
  name: 'lifeChildVue',
  beforeCreate: function () {
    console.log("childVue的beforeCreate");
  },
  created: function () {
    console.log("childVue的created");
  },
  beforeMount() {
    console.log("childVue的beforeMount");
  },
  mounted() {
    console.log("childVue的mounted");
  },
  updated() {
    console.log("childVue的updated");
  },
  beforeUpdate() {
    console.log("childVue的beforeUpdate");
  },
};
</script>
