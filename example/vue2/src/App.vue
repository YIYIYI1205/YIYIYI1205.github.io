<template>
  <div>
    {{message}}
    <router-view></router-view>
    <router-link to="/index">Go to Bar</router-link>
    <router-link to="/home">Go to Home</router-link>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import componentA from "./components/componentA.vue";
// import slotAVue from "./components/slotA.vue";
// import exampleSlotAVue from "./components/exampleSlotA.vue";
// import deepComponent from "./components/deepComponent/index.vue";
// import lifeComponent from './components/life/index.vue'

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  //   componentA,
  //   slotAVue,
  //   exampleSlotAVue,
  //   deepComponent,
  //   lifeComponent
  // },
  data: function () {
    return {
      message: 1,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
