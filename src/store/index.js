import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spinning: false // 加载loading的状态
  },
  mutations: {
    // 突变配置加载loading的状态
    setSpinning: (state, payload) => {
      state.spinning = payload
    }
  },
  // 配置异步提交状态
  actions: {
  },
  // 配置store模块
  modules: {
  }
})
