import axios, { AxiosResponse } from 'axios';

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`GET request to ${url} failed`);
  }
};

export const post = async <T>(url: string, body: T): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(url, body);
    return response.data;
  } catch (error) {
    throw new Error(`POST request to ${url} failed`);
  }
};

export const put = async <T>(url: string, body: T): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.put(url, body);
    return response.data;
  } catch (error) {
    throw new Error(`PUT request to ${url} failed`);
  }
};


export const del = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(`DELETE request to ${url} failed`);
  }
};
