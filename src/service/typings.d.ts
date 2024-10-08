declare namespace API {
  /**
   * 响应对象
   */
  type BaseResponse<T> = {
    code?: number;
    data?: T;
    message?: string;
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
   * 查询参数
   */
  type QueryRequest = {
    searchText?: string;
  } & PageRequest;
  //type 通过&进行类型扩展,interface 通过extends进行类型扩展

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
   * 帖子对象
   */
  type Post = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string;
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };
  /**
   * 图片对象
   */
  type Picture = {
    title?: string;
    url?: string;
  };

  type User = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };
  type SearchVO<T> = {
    postVOList?: Post[];
    pictureList?: Picture[];
    userVOList?: User[];
    dataList?: T[];
  };
  //=================未使用=====================
}
