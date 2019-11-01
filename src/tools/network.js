import axios from 'axios';
import store from '@/store';
import cfg from 'cfg';
import socket from 'socket.io-client';
import { Message } from 'element-ui';
import router from '../router';
// import { resolveNaptr } from 'dns';

// // import qs from 'qs';


// axios 配置
// axios.defaults.timeout = 5000;

// 创建axios实例
const axiosInstanceNormal = axios.create();// 用于一般请求
const axiosInstanceFile = axios.create();// 用于上传文件
const axiosInstanceDownload = axios.create();// 用于下载文件

// 拦截器
// POST传参序列化
/* eslint-disable */
axiosInstanceNormal.interceptors.request.use((config) => {
  const tempConfig = config;
  // 所有请求头加上 X-TRACE-ID
  let traceId = '22' + new Date().getTime() + generate64bitRandomNumber();
  function generate64bitRandomNumber() {
    let s = "";
    for (let i = 0; i < 2; i++) {
      s += generate8bitRandomNumber();
    }
    return s;
  }
  function generate8bitRandomNumber() {
    return  Math.floor(((Math.random() * 9 + 1) * 10000000)).toString();
  }
  tempConfig.headers['X-Trace-ID'] = traceId;
  return tempConfig;
}, (error) => {
  console.error('错误的传参');
  return Promise.reject(error);
});

// 其他的网络工具函数也可以在这里export出去
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axiosInstanceNormal.post(url, params)
      .then(res => {
        networkErrorHandler(res, resolve, reject)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axiosInstanceNormal.get(url, {params: params})
      .then(res => {
        networkErrorHandler(res, resolve, reject)
      })
      .catch((err) => { reject(err)});
  })
}

// socket.io 通讯模块
export class connectSocketIo {
  constructor (objParam = {}) {

    this.io = socket.connect('http://172.16.32.7:9092/orderSpeech', {
      path: '/webpush',
    });

    if (JSON.stringify(Object.isEmpty) === "{}") return;

    this.objPrama = objParam;

    Object.keys(this.objPrama).forEach((key) => {
      if (typeof (this.objPrama[key]) === "function") {
        console.log(key);
        this.onEvent(key, this.objPrama[key])
      }
    })
  }

  onEvent (key,cbf = () => {}) {
    this.io.on(key,function (data) {
      cbf(this.io, data);
    })
  }
  // return
}

// 网络请求错误集中处理
function networkErrorHandler(res, resolve, reject) {
  // 登录失效的集中处理
  const {data:{code}} = res;
  if (code === '2211000005' || code==='2211000004' || code==='2211000003') {
    store.dispatch('userInfo/loginInfoTimeout', {$router:router});
  }
  if(res.data.code!=='000'){
    reject(res.data.msg)
  }else{
    resolve(res.data);
  }
}

/**
 * 上传文件列表到文件服务器，并返回url的列表
 * @param {Object} params 文件列表在其中，举例 {files:[file1,file2]}
 *
 * 使用方法举例：
 * uploadFiles.then(urls=>{
 *    console.log(urls)
 * })
 */
export async function uploadFiles(params){
  const {files=[]} = params;

  let promises = files.map(file=>{
    const formData = new FormData();
    formData.append('upload', file);

    const token = cfg.getPicToken();
    const url = `${cfg.upFileDomainName}/upload?tokenType=admin&token=${window.encodeURIComponent(token)}`;

    // const url = 'http://file.caidanmao.com/upload?tokenType=admin&token=123456'
    return axiosInstanceFile({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
  })
  let  results = [];
  try {
    for (let promise of promises) {
      results.push(await promise);
    }
    // const downFileDomainName = 'downFileDomainName'
    return results.map(rs => `${cfg.downFileDomainName}/${rs.data}`);
    // return results.map(rs => `${downFileDomainName}/${rs.data}`);
  } catch (error) {
    Message({
      message: `文件上传失败:${error}`,
      type: 'error',
    });
    throw new Error(`文件上传失败:${error}`);
  }
}

// 下载文件
export function downloadFile(url, params) {
  return new Promise((resolve, reject) => {
    axiosInstanceDownload.get(url, { responseType: 'blob', params: params })
      .then(res => {
        if (res.headers['content-type'].match(/application\/x-download/i)) {
          downloadHandler(res);// 下载请求成功后的handler函数
          resolve('success');
          return;
        }
        // 如果content-type 不是x-download,进行错误异常处理
        let reader = new FileReader();
        let data = {};
        reader.readAsText(res.data);
        reader.onload = (e) => {
          data = JSON.parse(e.target.result);
          const RES = Object.assign({}, res, { data });
          networkErrorHandler(RES, resolve, reject);
        }

      })
      .catch((err) => { reject(err) });
  })

}
// 下载请求成功后的handler函数
function downloadHandler(res) {
  const content = res;
  const blob = new Blob([content.data]);
  const filename = res.headers['content-disposition'].split('=')[1];
  const fileName = decodeURIComponent(filename);
  // return;
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
}

/* eslint-enable */
