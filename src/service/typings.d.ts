declare namespace API {
  /**
   * 响应对象
   */
  type BaseResponse<T> = {
    code?: number;
    data?: T;
    message?: string;
  };

  type Post = {
    code?: number;
    data?: T;
    message?: string;
  };

  /**
   * 分页响应对象
   */
  type PageObj<T> = {
    records?: T[];
    total?: number;
    size?: number;
    current?: number;
    orders?: [];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    countId?: null;
    maxLimit?: null;
    pages?: number;
  };

  type RegisterParams = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type CurrentUser = {
    id?: number;
    userAccount?: string;
    username?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    createTime?: string;
    updateTime?: string;
  };

  /**
   * 分页响应对象
   */
  type PageObj<T> = {
    records?: T[];
    total?: number;
    size?: number;
    current?: number;
    orders?: [];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    countId?: null;
    maxLimit?: null;
    pages?: number;
  };

  /**
   * 分页相关参数
   */
  type PageRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };
  /**
   * 查询用户对象
   */
  type UserQueryRequest = {
    id?: number;
    userAccount?: string;
    username?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    createTime?: string;
  } & PageRequest;
  //type 通过&进行类型扩展,interface 通过extends进行类型扩展

  //================ 未使用类型 =================

  type LoginResult = {
    code?: number;
    message?: string;
    data?: undefined;
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = "notification" | "message" | "event";

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
