// src/services/api/request.ts
import axios, { AxiosRequestConfig } from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api', // API 的基础路径
  timeout: 10000,  // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在这里可以添加认证信息等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 直接返回响应数据
    return response.data;
  },
  (error) => {
    // 处理错误响应
    if (error.response) {
      // 服务器返回错误状态码
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // 请求发送成功但没有收到响应
      console.error('Request error:', error.request);
    } else {
      // 请求配置出错
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// 通用请求函数
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await instance(config);
    return response as T;
  } catch (error) {
    throw error;
  }
};

export default request;