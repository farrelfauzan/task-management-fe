/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginAuthDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role?: string;
}

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export interface UpdateUserDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: string;
  userId: string;
  /** @format date-time */
  dueDate: string;
}

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  /** @format date-time */
  dueDate: string;
};

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
  userId?: string;
  /** @format date-time */
  dueDate?: string;
}

export interface CreateCommentDto {
  content: string;
  userId: string;
  taskId: string;
}

export type Comment = {
  id: string;
  content: string;
  userId: string;
  taskId: string;
};

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API Documentation
 * @version 1.0
 * @contact
 *
 * Please report if there's issue
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   * @response `200` `void`
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     * @response `201` `void`
     */
    authControllerLogin: (data: LoginAuthDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @request POST:/auth/register
     * @response `201` `void`
     */
    authControllerRegister: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreate
     * @request POST:/users
     * @secure
     * @response `201` `void`
     */
    usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAll
     * @request GET:/users
     * @secure
     * @response `201` `(User)[]`
     */
    usersControllerFindAll: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetMe
     * @request GET:/users/me
     * @secure
     * @response `200` `void`
     */
    usersControllerGetMe: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindUserByEmail
     * @request GET:/users/{email}
     * @secure
     * @response `201` `User`
     */
    usersControllerFindUserByEmail: (
      email: string,
      params: RequestParams = {}
    ) =>
      this.request<User, any>({
        path: `/users/${email}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemove
     * @request DELETE:/users/{id}
     * @secure
     * @response `200` `void`
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdate
     * @request PATCH:/users/{id}
     * @secure
     * @response `200` `void`
     */
    usersControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  task = {
    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerCreate
     * @request POST:/task
     * @secure
     * @response `201` `void`
     */
    taskControllerCreate: (data: CreateTaskDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/task`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerFindAll
     * @request GET:/task
     * @secure
     * @response `201` `(Task)[]`
     */
    taskControllerFindAll: (params: RequestParams = {}) =>
      this.request<Task[], any>({
        path: `/task`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerFindOne
     * @request GET:/task/{id}
     * @secure
     * @response `201` `Task`
     */
    taskControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Task, any>({
        path: `/task/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerUpdate
     * @request PATCH:/task/{id}
     * @secure
     * @response `200` `void`
     */
    taskControllerUpdate: (
      id: string,
      data: UpdateTaskDto,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/task/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Task
     * @name TaskControllerRemove
     * @request DELETE:/task/{id}
     * @secure
     * @response `200` `void`
     */
    taskControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/task/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  comments = {
    /**
     * No description
     *
     * @tags Comments
     * @name CommentsControllerCreate
     * @request POST:/comments
     * @secure
     * @response `201` `void`
     */
    commentsControllerCreate: (
      data: CreateCommentDto,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsControllerFindAll
     * @request GET:/comments
     * @secure
     * @response `201` `(Comment)[]`
     */
    commentsControllerFindAll: (params: RequestParams = {}) =>
      this.request<Comment[], any>({
        path: `/comments`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsControllerFindOne
     * @request GET:/comments/{id}
     * @secure
     * @response `201` `Comment`
     */
    commentsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<Comment, any>({
        path: `/comments/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsControllerUpdate
     * @request PATCH:/comments/{id}
     * @secure
     * @response `201` `Comment`
     */
    commentsControllerUpdate: (
      id: string,
      data: CreateCommentDto,
      params: RequestParams = {}
    ) =>
      this.request<Comment, any>({
        path: `/comments/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsControllerRemove
     * @request DELETE:/comments/{id}
     * @secure
     * @response `200` `void`
     */
    commentsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comments/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
