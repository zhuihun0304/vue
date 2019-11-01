//从state改变的数据存在这里
const getters = {
  textParams(state) {
    return state.textParams;
  },
};
const state = {
  textParams: {
    name: ''
  }
}
//异步操作写到这里

const actions = {
  setTextParams({ commit }, params) {
    commit('SETTEXTPARAMS', params);
  }
}

const mutations = {
  SETTEXTPARAMS (state, params) {
    state.textParams = params;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
