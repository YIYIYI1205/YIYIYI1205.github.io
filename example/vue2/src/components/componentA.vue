<template>
  <div>
    componentA age: {{ age }} {{ obj.age }}
    <componentB :obj="obj" :age="age" />
    <table>
      <thead>
        <tr>
          <th colspan="2">The table header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <componentTdVue text="The table body" />
          <componentTdVue text="with two columns" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import componentB from "./componentB.vue";
import componentTdVue from "./componentTd.vue";
export default {
  name: "componentA",
  components: {
    componentB,
    componentTdVue,
  },
  data: function () {
    return {
      age: 1,
      obj: {
        age: 1,
      },
    };
  },
};
</script>
