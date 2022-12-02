<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)
</script>
<template>
    <div class="blue">
        <div class="red">{{count}}</div>
    </div>
</template>
<style >
    .blue{
        height: 600px;
        width: 500px;
        background: blue;

    }
</style>