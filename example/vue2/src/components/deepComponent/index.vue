<template>
  <div>
    <div>
      <button @click="currentTabComponent = component1Vue">
        component1Vue
      </button>
      <button @click="currentTabComponent = component2Vue">
        component2Vue
      </button>
      <button @click="currentTabComponent = component3Vue">
        component3Vue
      </button>
    </div>
    <Keep-alive>
        <component :is="currentTabComponent"></component>
    </Keep-alive>
    parent: {{parent}}
  </div>
</template>
<script>
import component1Vue from "./component1.vue";
import component2Vue from "./component2.vue";
import component3Vue from "./component3.vue";
export default {
  name: "IndexComponent",
  components: {
    component1Vue,
    component2Vue,
    component3Vue,
  },
  data: function () {
    return {
      parent: 'index',
      currentTabComponent: component1Vue,
      component1Vue: component1Vue,
      component2Vue: component2Vue,
      component3Vue: component3Vue,
    };
  },
  methods: {
    changeTab() {
        // console.log()
    }
  }
};
</script>
