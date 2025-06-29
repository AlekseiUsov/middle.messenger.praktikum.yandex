import { queryStringify } from "./queryStringify";

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type TData = Record<string, string>;

type TOptions = {
  headers?: TData;
  method: METHOD;
  data?: unknown;
  timeout?: number;
};

type TMethod = (
  url: string,
  options: TOptionsWithoutMethod
) => Promise<XMLHttpRequest>;

type TOptionsWithoutMethod = Omit<TOptions, "method">;

export class HTTPTransport {
  private endpoint;
  constructor(endpoint: string) {
    this.endpoint = `https://ya-praktikum.tech/api/v2${endpoint}`;
  }
  get: TMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, {
      ...options,
      method: METHOD.GET,
    });
  };

  post: TMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, {
      ...options,
      method: METHOD.POST,
    });
  };

  put: TMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, {
      ...options,
      method: METHOD.PUT,
    });
  };

  delete: TMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, {
      ...options,
      method: METHOD.DELETE,
    });
  };

  private request(url: string, options: TOptions): Promise<XMLHttpRequest> {
    const { headers = {}, method, data, timeout = 5000 } = options;
    return new Promise((resolve, reject) => {
      const isGet = method === METHOD.GET;
      if (!method) {
        reject("no method");
        return;
      }
      const xhr = new XMLHttpRequest();

      xhr.open(
        method,
        isGet && !!data ? `${url}?${queryStringify(data as TData)}` : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
