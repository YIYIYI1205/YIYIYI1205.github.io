<template>
    <div>{{message}}</div>
</template>
<script>
    export default{ 
        name: 'HomeC',
        data: function() {
            return {
                message: 1223323233123
            }
        },
        mounted() {
            console.log(this.$route)
        }
    }
</script>