/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}
/**
 * @description: 请求登录二维码
 */
export interface Qrcode {
  uuid: string;
  timeout: number;
}
/**
 * @description: 请求登录是否成功
 */
export interface Qrback {
  uuid: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
/**
 * @description:登录二维码
 */
export interface QrcodeData {
  // 超时
  expireSeconds:  number;
  // ticket
  ticket: string;
  // 斗争
  url: string;
}
/**
 * @description:判断扫码登录是否成功
 */
export interface QrbackData {
  // 返回token
  token:  string;
}
