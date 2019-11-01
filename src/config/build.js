import base from './base';

const cfg = {
  upFileDomainName: 'http://file.caidanmao.com',
  downFileDomainName: 'http://res.caidanmao.com',
  // getPicToken() { return document.cookie.split(';').
  // find(idx => /admin_user_token/.test(idx)).replace('admin_user_token=', ''); },
  getPicToken() { return '123456'; },
  // ravenCfg: false,
  ravenCfg: 'http://fdbea79115744100bb3a28e593d29618@sentry.hualala.com/3',
  // 控制权限功能的开启与否
  // 为什么要此配置呢。因为权限涉及到功能的显示，为了不影响开发，在开发环境，可以通过此配置关闭权限过滤
  authSwitch: true,
};

export default Object.assign({}, base, cfg);
