import request from "@/service/request";

/** 获取帖子列表 POST /post/list/page/vo */
export async function listPost(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PageObj<API.Post>>>(
    "/post/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取图片列表 POST /picture/list/page/vo */
export async function listPicture(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PageObj<API.Picture>>>(
    "/picture/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取用户列表 POST /user/list/page/vo */
export async function listUser(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PageObj<API.Picture>>>(
    "/user/list/page/vo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 聚合搜索 POST /search/all */
export async function searchAll(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.SearchVO>>("/search/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

//========================= 暂未使用 ==================================、

/** GET /post/get/vo */
export async function search(
  params: {
    /** 帖子id */
    id?: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<any>>("/post/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
