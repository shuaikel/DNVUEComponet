import axios from 'axios'
import {HOST} from '@/common/js/config'

var Request = '/api';

if (process.env.NODE_ENV === 'development') {
  //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
  Request = "/api"
} else {
  //生产环境下的地址
  Request = "http://120.79.162.149:3000";
}

axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export function getBanner(){
    const url = Request + '/banner'
    return axios.get(url)
}

export function getRecommendList () {
  const url = Request + '/personalized'
  return axios.get(url)
}

export function getRecommendSong(){
  const url = Request + '/personalized/newsong'
  return axios.get(url)
}

export function getSingers() {
  const url = Request + '/top/artists?limit=100'
  return axios.get(url)
}