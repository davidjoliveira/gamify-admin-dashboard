import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
Axios.defaults.baseURL = API_URL;

export type OnAxiosFulfilledRequestFunctionType = ((value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>) | null | undefined;
export type OnAxiosFulfilledResponseFunctionType = ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | null | undefined;
export type OnRejectionFunctionType = ((error: any) => any);

export class HttpService {
  _axios: AxiosInstance = Axios.create();

  addRequestInterceptor = (onFulfilled: OnAxiosFulfilledRequestFunctionType, onRejected: OnRejectionFunctionType) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled: OnAxiosFulfilledResponseFunctionType, onRejected: OnRejectionFunctionType) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  get = async (url: string) => await this.request(this.getOptionsConfig("get", url));

  post = async (url: string, data: any) => await this.request(this.getOptionsConfig("post", url, data));

  put = async (url: string, data: any) => await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url: string, data: any) => await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url: string) => await this.request(this.getOptionsConfig("delete", url));

  getOptionsConfig = (method: string, url: string, data?: any) => {
    return {
      method,
      url,
      data,
      headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Credentials': true },
    };
  };

  request(options: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => resolve(res.data))
        .catch((ex) => reject(ex.response.data));
    });
  }
}

export default new HttpService();