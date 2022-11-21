<template>
  <div>
    <table border="1">
      <tr>
        <th>标题</th>
        <th>标题2</th>
      </tr>
      <tr v-for="(todo, index) in todos" :key="index">
        <td>{{ todo.text }}</td>
        <td>{{ todo.text2 }}</td>
      </tr>
    </table>
    <!-- <slotTableVue :data="todos"> -->
    <!-- <slotTableColumn label="标题" prop="text" />
      <slotTableColumn label="标题2" prop="text2" /> -->
    <!-- <template v-slot:header>
        <th>标题</th>
        <th>标题2</th>
      </template>
      <template v-slot:container>
        <tr v-for="(todo, index) in todos" :key="index">
          <td>{{ todo.text }}</td>
          <td>{{ todo.text2 }}</td>
        </tr>
      </template> -->
    <!-- </slotTableVue> -->
    <!-- <slotTableColumn label="标题2" prop="text2" /> -->
    <slotTableVue :data="todos">
      <slotTableColumn label="标题" prop="text" />
      <slotTableColumn label="标题2" prop="text2" />
    </slotTableVue>
  </div>
</template>
<script>
import slotTableVue from "./slotTable.vue";
import slotTableColumn from "./slotTableColumn.vue";

export default {
  name: "exampleSlotA",
  components: {
    slotTableVue,
    slotTableColumn,
  },
  data: function () {
    return {
      todos: [
        {
          text: 1,
          text2: 11,
        },
        {
          text: 2,
          text2: 22,
        },
        {
          text: 3,
          text2: 33,
        },
      ],
    };
  },
};
</script>
