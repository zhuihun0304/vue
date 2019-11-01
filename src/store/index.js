import Vue from 'vue';
import Vuex from 'vuex';
import text from './modules/text';
import userInfo from './modules/userInfo';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    text,
    userInfo,
  },
});
