import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, count) {
      state.count += count 
    }
  },
  actions: {
    increment({commit}, count) {
        commit('increment', count)
    }
  }
})
export default store