const BASE_URL = "/store";

export interface Result {
  success: boolean;
  code: number;
  message: string;
  timestamp: number;
  data: unknown | void;
}

export interface Restful {
  enable: boolean;
  key: string;
  name: string;
  author: string;
  supervisor: string;
  kind: string;
  size: number;
  flag?: string;
  lang: string;
  type?: string;
  context: string;
  source: string;
  desc?: string;
  mtime: number;
}

export interface TableData {
  total: number;
  mtime: number;
  columns: Array<string>;
  rows: Array<{ [key: string]: string|number|boolean }>;
}

export const responseData = async <T>(
  res: Response,
  callback?: (code: number, message: string) => void
): Promise<T | unknown> => {
  const { status, statusText, headers } = res;
  switch (status) {
    case 200: {
      break;
    }
    case 404: {
      if (callback) {
        return callback(404, `找不到资源：${res.url}`);
      }
      throw `找不到资源：${res.url}`;
    }
    case 401: {
      const message401 = headers.get("message") || statusText;
      if (callback) {
        return callback(401, message401);
      }
      throw message401;
    }
    case 403: {
      const message403 = headers.get("message") || statusText;
      if (callback) {
        return callback(403, message403);
      }
      throw message403;
    }
    case 500: {
      const message500 = headers.get("message") || statusText;
      if (callback) {
        return callback(500, message500);
      }
      throw message500;
    }
    default: {
      const messageDefault = headers.get("message") || statusText;
      if (callback) {
        return callback(res.status, messageDefault);
      }
      throw messageDefault;
    }
  }
  const result = (await res.json()) as Result;
  if (result.success) {
    return result.data;
  }
  const { code, message } = result;
  switch (code) {
    case 1234:
      break;
    default:
      if (callback) {
        return callback(code, message);
      }
      throw message;
  }
};
const request = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url.replaceAll("//", ""), init);
  return await responseData<T>(res);
};
export const getData = <T>(url: string) => request<T>(url);
export const deleteData = <T>(url: string) =>
  request<T>(url, { method: "DELETE" });
export const postData = <T>(url: string, jsonBody?: unknown) =>
  request<T>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });
export const putData = <T>(url: string, jsonBody: unknown) =>
  request<T>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  });

export class Config<T> {
  root: string;

  constructor(root: string = "") {
    this.root = root;
  }

  list() {
    return getData<Array<T>>(`${BASE_URL}/${this.root}/`);
  }

  queryList() {
    return getData<Array<T>>(`${BASE_URL}/data/query/`);
  }

  save(body: T) {
    //保存配置
    return putData<T>(`${BASE_URL}/${this.root}/`, body);
  }

  get(key: string) {
    return getData(`${BASE_URL}/${this.root}/${key}`);
  }

  test(body: unknown | string) {
    if (body instanceof String) {
      return getData(`${BASE_URL}/${this.root}/test/${body}`);
    } else {
      return postData(`${BASE_URL}/${this.root}/test`, body);
    }
  }

  delete(key: string) {
    return deleteData(`${BASE_URL}/${this.root}/${key}`);
  }
}

export class StepTable {
  constructor() {}
  query(key: string, step?: unknown) {
    return postData<TableData>(`${BASE_URL}/data/step/${key}`, step);
  }
}
