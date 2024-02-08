import request from "@/service/request";

/** 搜索 GET /user/currentUser */
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

/** 获取帖子列表 POST /post/list/page/vo */
export async function listPost(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.PageObj<any>>>("/post/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /user/register 返回用户id*/
export async function register(
  body: API.LoginParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<number>>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /user/login 返回用户信息*/
export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<API.CurrentUser>>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>("/user/currentUser", {
    method: "GET",
    ...(options || {}),
  });
}

/** 退出登录接口 POST /user/logout */
// export async function outLogin(options?: { [key: string]: any }) {
//   return request<API.BaseResponse<Boolean>>("/user/logout", {
//     method: "POST",
//     ...(options || {}),
//   });
// }

// ====================== CURD =================

/** 添加用户 POST /user/add */
export async function addUser(
  body: API.CurrentUser,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<number>>("/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 GET /user/delete */
export async function deleteUser(
  params: {
    /** 用户id */
    id?: number;
  },
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<boolean>>("/user/delete", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改用户 POST /user/list/page/vo */

/*export async function updateUser(
  body: API.CurrentUser,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<Boolean>>("/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}*/

/** 查询所有用户 POST /user/list/page/vo */
export async function listUserVOByPage(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponse<API.PageObj<API.CurrentUser>>>(
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

//================ 待修改接口 =================
