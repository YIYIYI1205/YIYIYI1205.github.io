<template>
  <div> componentB
    newAge: {{newAge}}
    <button @click="newAge++">更改newAge</button>
    {{newObj.age}}
    <button @click="newObj.age++">更改newObj</button>
</div>
</template>
<script>
    export default {
        name: 'componentB',
        props: ['age', 'obj'],
        data: function() {
            return {
                newAge: this.age,
                newObj: this.obj
            }
        }
    }
</script>