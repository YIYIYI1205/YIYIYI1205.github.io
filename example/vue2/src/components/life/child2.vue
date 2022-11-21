<template><div>
    childVue2
    </div></template>
    <script>
    
    export default {
      name: 'lifeChildVue2',
      beforeCreate: function () {
        console.log("childVue2的beforeCreate");
      },
      created: function () {
        console.log("childVue2的created");
      },
      beforeMount() {
        console.log("childVue2的beforeMount");
      },
      mounted() {
        console.log("childVue2的mounted");
      },
      updated() {
        console.log("childVue2的updated");
      },
      beforeUpdate() {
        console.log("childVue2的beforeUpdate");
      },
    };
    </script>
    