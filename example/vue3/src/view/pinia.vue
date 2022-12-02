<script setup>
import { useCounterStore } from '../piniaStore/index'
import { storeToRefs } from 'pinia';
const store = useCounterStore()
// const { count } = store
const { count } = storeToRefs(store)
console.log(store, 'pinia')
console.log(store.count, 'pinia')
console.log(count.value, 'count')
console.log(store.double, 'double')
// console.log(count1, 'count1')
// console.log(store.double, 'pinia')
</script>
<template>
    <div>
        pinia123 
    </div>
</template>
<style>
</style>