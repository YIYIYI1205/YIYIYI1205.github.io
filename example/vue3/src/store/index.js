import { createStore } from 'vuex'
const store = createStore({
    state: {
        count: 1
    },
    mutations: {
        increment(state, count){
            state.count += count
        }
    }
})
export default store