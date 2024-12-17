import axiosInstance from '../interceptors/axiosInstance';
import { EndPointApi } from '../types';

const client = () => {
    const get = async (endPoint: EndPointApi, signal?: AbortSignal) => {
        return axiosInstance.get(endPoint, { signal, timeout: 10000 });
    };

    const post = async (endPoint: EndPointApi, body?: FormData, signal?: AbortSignal) => {
        return axiosInstance.post(endPoint, body, { signal });
    };

    const put = async (endPoint: EndPointApi, body?: FormData, signal?: AbortSignal) => {
        return axiosInstance.put(endPoint, body, { signal });
    };

    const patch = async (endPoint: EndPointApi, body?: FormData, signal?: AbortSignal) => {
        return axiosInstance.patch(endPoint, body, { signal });
    };

    const del = async (endPoint: EndPointApi, signal?: AbortSignal) => {
        return axiosInstance.delete(endPoint, { signal });
    };

    return { get, post, put, del, patch };
};

export default client;