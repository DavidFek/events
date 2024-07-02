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

export interface CreateEventDto {
  name: string;
  /** @format date-time */
  dateFrom: string;
  /** @format date-time */
  dateTo: string;
  description: string;
  createdBy: string;
}

export interface UpdateEventDto {
  name?: string;
  /** @format date-time */
  dateFrom?: string;
  /** @format date-time */
  dateTo?: string;
  description?: string;
  createdBy?: string;
}

export interface CreateAuthorDto {
  firstName: string;
  lastName: string;
  description: string;
  /** @format date-time */
  bornDate: string;
  specializations: string;
}

export interface UpdateAuthorDto {
  firstName?: string;
  lastName?: string;
  description?: string;
  /** @format date-time */
  bornDate?: string;
  specializations?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  role?: "ADMIN" | "USER";
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Events API
 * @version 1.0
 * @contact
 *
 * API for events catalog
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  events = {
    /**
     * No description
     *
     * @tags events
     * @name EventsControllerCreate
     * @summary Create an event
     * @request POST:/events
     */
    eventsControllerCreate: (data: CreateEventDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerFindAll
     * @summary Find all the events
     * @request GET:/events
     */
    eventsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerFindOne
     * @summary Find an event based on ID number
     * @request GET:/events/{id}
     */
    eventsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerUpdate
     * @summary Update an event
     * @request PATCH:/events/{id}
     */
    eventsControllerUpdate: (id: string, data: UpdateEventDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerRemove
     * @summary Remove an event
     * @request DELETE:/events/{id}
     */
    eventsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerAddAuthor
     * @summary Add an author to an event
     * @request PUT:/events/{eventId}/author/{authorId}
     */
    eventsControllerAddAuthor: (eventId: string, authorId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${eventId}/author/${authorId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerRemoveAuthor
     * @summary Remove an author to an event
     * @request DELETE:/events/{eventId}/author/{authorId}
     */
    eventsControllerRemoveAuthor: (eventId: string, authorId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${eventId}/author/${authorId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerIncrementLikes
     * @summary Increment likes for an event
     * @request PATCH:/events/{id}/like
     */
    eventsControllerIncrementLikes: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}/like`,
        method: "PATCH",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsControllerIncrementDislikes
     * @summary Increment dislikes for an event
     * @request PATCH:/events/{id}/dislike
     */
    eventsControllerIncrementDislikes: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/events/${id}/dislike`,
        method: "PATCH",
        ...params,
      }),
  };
  authors = {
    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerCreate
     * @summary Create an author
     * @request POST:/authors
     */
    authorsControllerCreate: (data: CreateAuthorDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerFindAll
     * @summary Find all the authors
     * @request GET:/authors
     */
    authorsControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerFindOne
     * @summary Find an author based on ID number
     * @request GET:/authors/{id}
     */
    authorsControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerUpdate
     * @summary Update an author
     * @request PATCH:/authors/{id}
     */
    authorsControllerUpdate: (id: string, data: UpdateAuthorDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerRemove
     * @summary Remove an author
     * @request DELETE:/authors/{id}
     */
    authorsControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerAddEvent
     * @summary Add an event to an author
     * @request PUT:/authors/{authorId}/event/{eventId}
     */
    authorsControllerAddEvent: (authorId: string, eventId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors/${authorId}/event/${eventId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * No description
     *
     * @tags authors
     * @name AuthorsControllerRemoveEvent
     * @summary Remove an event to an author
     * @request DELETE:/authors/{authorId}/event/{eventId}
     */
    authorsControllerRemoveEvent: (authorId: string, eventId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/authors/${authorId}/event/${eventId}`,
        method: "DELETE",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersControllerCreate
     * @summary Create a user
     * @request POST:/users
     */
    usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerFindAll
     * @summary Find all the users
     * @request GET:/users
     */
    usersControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerFindOne
     * @summary Find a user based on ID number
     * @request GET:/users/{id}
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerUpdate
     * @summary Update a user
     * @request PATCH:/users/{id}
     */
    usersControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerRemove
     * @summary Remove a user
     * @request DELETE:/users/{id}
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthControllerStatus
     * @request GET:/auth/status
     */
    authControllerStatus: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/status`,
        method: "GET",
        ...params,
      }),
  };
}
