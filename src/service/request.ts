/**
 * axios实例创建，以及拦截器配置
 */
import axios from "axios";
import { message } from "ant-design-vue";

const request = axios.create({
  baseURL: "http://localhost:8101/api",
  timeout: 10000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("response====>" + JSON.stringify(response));
    const res = response.data;
    if (res.code !== 0) {
      console.log("error====>" + JSON.stringify(res));
      message.error(res.message);
      return Promise.reject(res);
    }
    //可以直接返回res.data数据，注意axios请求方法的响应数据类型要对应
    return res.data;
    // return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default request;
