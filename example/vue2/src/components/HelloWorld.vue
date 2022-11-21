<template>
  <div class="hello">
    <button v-on:click="show = !show">Toggle</button>
    <transition appear name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      show: false,
      loginType: "username",
      message: "123123",
    };
  },
  computed: {
    computedMessage() {
      return this.message + "xxxx";
    },
  },
  methods: {
    handleExact() {
      console.log(123);
    },
    showVc() {
      console.log(this);
    },
    checkLoginType() {
      this.loginType = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
