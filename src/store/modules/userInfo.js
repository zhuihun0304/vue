import loginApi from '@/api/login'
import { Message } from 'element-ui';

const state = {
  isLogin: false,
  userData: {},
}

const getters = {

};


const actions = {

  /**
   * 登陆登出
   */
  async updateLogInfo(context, payload) {
    const { dispatch, commit, state } = context;
    const { isLogin, $router, params } = payload;
    const { history: { current: { fullPath, query } } } = $router;

    console.log(context)
    console.log(payload)
    if(isLogin) {
      try {
        commit('changeLoginStatus', true);
        await dispatch('getUserInfo');

      } catch(error) {

      }

    } else {
      try {
        commit('setUserInfo', {});
        commit('changeLoginStatus', false);
      } catch(error) {

      }
    }
  },
/**
 * 获取用户信息
 * @param {*} param0
 */
async getUserInfo({ commit }) {
  let rsp;
  try {
    rsp = await loginApi.getUserInfo();
    if (rsp.data) {
      commit('setUserInfo', rsp.data);
    }
  } catch (error) {
    Message({
      message: `获取用户信息失败，具体原因：${error}`,
      type: 'error',
    });
  }
},

}

// 同步的动作写到这里(userInfo)
const mutations = {
  changeLoginStatus(state, params) {
    state.isLogin = params;
  },
  setUserInfo(state, params) {
    state.userData = params;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
