import base from './base';

const cfg = {
  upFileDomainName: 'http://file.caidanmao.com',
  downFileDomainName: 'http://res.caidanmao.com',
  getPicToken() { return '123456'; },
  // ravenCfg: 'http://470b2b9d1856466bba417f8b4b3b42e7@172.16.32.216/2',
  // 去掉开发环境的sentry
  // ravenCfg: 'http://fdbea79115744100bb3a28e593d29618@sentry.hualala.com/3',
  // 控制权限功能的开启与否
  // 为什么要此配置呢。因为权限涉及到功能的显示，为了不影响开发，在开发环境，可以通过此配置关闭权限过滤
  authSwitch: true,
};

export default Object.assign({}, base, cfg);
