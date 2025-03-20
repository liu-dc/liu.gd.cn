export interface Result<T> {
    success: boolean;
    code: number;
    message: string;
    timestamp: number;
    data: T;
  }
  export const response = async <T>(
    res: Response,
    errorFn?: (code: number, message: string) => void
  ): Promise<T | void> => {
    const { status, statusText, headers } = res;
    switch (status) {
      case 200: {
        break;
      }
      case 404: {
        const message = `找不到资源：${res.url}`;
        if (errorFn) {
          return errorFn(404, message);
        }
        alert(message);
        throw message;
      }
      case 401: {
        const message = headers.get("message") || statusText;
        if (errorFn) {
          return errorFn(401, message);
        }
        alert(message);
        throw message;
      }
      case 403: {
        const message = headers.get("message") || statusText;
        if (errorFn) {
          return errorFn(403, message);
        }
        alert(message);
        throw message;
      }
      case 500: {
        const message = headers.get("message") || statusText;
        if (errorFn) {
          alert(message);
          return errorFn(500, message);
        }
        throw message;
      }
      default: {
        const message = headers.get("message") || statusText;
        if (errorFn) {
          return errorFn(res.status, message);
        }
        alert(message);
        throw message;
      }
    }
    return res.json().then((json: Result<T>) => {
      if (json) return json.data;
    });
  };
  export const request = async <T>(
    url: string,
    init?: RequestInit,
    errorFn?: (code: number, message: string) => void
  ) => {
    return fetch(url.replaceAll("//", ""), init).then((res) =>
      response<T>(res, errorFn)
    );
  };
  export const get = <T>(
    url: string,
    errorFn?: (code: number, message: string) => void
  ) => request<T>(url, undefined, errorFn);
  export const del = <T>(
    url: string,
    errorFn?: (code: number, message: string) => void
  ) => request<T>(url, { method: "DELETE" }, errorFn);
  export const post = <T>(
    url: string,
    body?: unknown,
    errorFn?: (code: number, message: string) => void
  ) => {
    const init: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) init.body = JSON.stringify(body);
    return request<T>(url, init, errorFn);
  };
  export const put = <T>(
    url: string,
    body: unknown,
    errorFn?: (code: number, message: string) => void
  ) => {
    const init: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) init.body = JSON.stringify(body);
    return request<T>(url, init, errorFn);
  };
  
  export default { response, request, get, del, post, put };
  