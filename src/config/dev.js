import base from './base';

const cfg = {
  upFileDomainName: 'http://file.caidanmao.com',
  downFileDomainName: 'http://res.caidanmao.com',
  getPicToken() { return '123456'; },
  // 控制权限功能的开启与否，
  // 为什么要此配置呢。因为权限涉及到功能的显示，为了不影响开发，在开发环境，可以通过此配置关闭权限过滤
  // authSwitch: true,
};

export default Object.assign({}, base, cfg);
