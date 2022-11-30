<script setup>
import { useStore } from 'vuex';
const store = useStore()
const add = () => {
    store.commit('increment', 123)
}
</script>
<template>
    <div class="red">
        {{store.state.count}}
        <button @click="add">add</button>
    </div>
</template>
<style>
    .red{
        height: 400px;
        width: 500px;
        background: red;
    }
</style>