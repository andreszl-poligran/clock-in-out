import axios, { AxiosRequestConfig } from 'axios';

interface RequestOptions {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  headers?: Record<string, string>;
  body?: any;
	host?: string;
}

export const request = async <T>(options: RequestOptions): Promise<T> => {
  const { path, method, headers: customHeaders, body, host } = options;
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: `${host || import.meta.env.VITE_CLOCK_IN_OUT_API || ''}/${path}`,
    headers: customHeaders ? { ...customHeaders } : {},
    data: body,
  };

  try {
    const response = await axios(axiosConfig);
    return response.data as T;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`HTTP request failed with status: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`HTTP request setup error: ${error.message}`);
    }
  }
};
