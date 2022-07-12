import axios, { AxiosInstance } from "axios";

export class APIService {
  fetcher: AxiosInstance;
  constructor() {
    this.fetcher = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
    });
  }

  async get(url: string) {
    const token = localStorage.getItem("token");
    try {
      const raw = await this.fetcher.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });

      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async post(url: string, data: any, params?: object) {
    const token = localStorage.getItem("token");
    try {
      const raw = await this.fetcher.post(url, data, {
        params,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async put(url: string, data?: object, params?: object) {
    try {
      const raw = await this.fetcher.put(url, data, { params });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async deleteCall(url: string, data?: any) {
    try {
      const raw = await this.fetcher.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }

  async patch(url: string, data?: any) {
    try {
      const raw = await this.fetcher.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return raw.data;
    } catch (err) {
      throw err;
    }
  }
}

export default new APIService();
