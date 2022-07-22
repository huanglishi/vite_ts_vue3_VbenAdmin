import {
  AccountParams,
  AccountListGetResultModel,
  MenuParams,
  MenuListGetResultModel,
  DeptListItem,
  DeptListGetResultModel,
  RolePageParams,
  RolePageListGetResultModel,
  RoleParams,
  RoleListGetResultModel,
  rebackData,
}  from './model/systemModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system.account/getAccountList',
  MenuList = '/system.menu/getMenuList',
  Menuselect = '/system.menu/getMenuselect',
  DeptList = '/system.deptmanagement/DeptList',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
  setRoleStatus = '/system/setRoleStatus',
  IsAccountExist = '/auth.user/accountExist',
  getAccount = '/auth.user/getAccount',
  saveMenuUrl = '/system.menu/savemenu',
  delMenuUrl = '/system.menu/delmenu',
}
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });
//2菜单
//2.2获取数据
export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
//选择父级数据
export const getMenuSelect = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.Menuselect, params });
//2.2添加
export const saveMenu = (params?: MenuParams) =>
defHttp.post({ url: Api.saveMenuUrl, params:params}, { errorMessageMode: 'showmsg' });
//2.3删除
export const delMenu = (id: number) =>
defHttp.delete<rebackData>({ url: Api.delMenuUrl, params:{id:id}}, { errorMessageMode: 'showmsg' });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

//检查账号是否存在
export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none',returnData:"data" });
//获取账号信息
export const getAccount = () =>
  defHttp.get({ url: Api.getAccount}, { errorMessageMode: 'none',returnData:"data" });
