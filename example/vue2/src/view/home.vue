<template>
    <div>{{message}}
    <div>{{$store.state.count}}</div>
        
    </div>
    
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
            console.log(this.$route, 123)
            console.log(this.$store)
            this.$store.dispatch('increment', 10)
        }
    }
</script>