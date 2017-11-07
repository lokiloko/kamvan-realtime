import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const initialState = {
  tasks: []
}

export default new Vuex.Store({
  state: {
    ...initialState
  },
  mutations,
  actions
})
