import { post } from '../tools/network'

export default {
/**
 * 用户登陆
 */
login({ phone, password }) {
    return post('/api/admin/login', { phone, password });
  },
  /**
   * 获取用户信息
   */

getUserInfo() {
  return post('/api/admin/getUserInfo')
}
}

