import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
//参数
export type ScheduleParams = BasicPageParams & {
  page?: number;
  pageSize?: number;
};

export interface AccountListItem {
    id: string;
    account: string;
    email: string;
    nickname: string;
    role: number;
    createTime: string;
    remark: string;
    status: number;
  }
  
/**
 * @description:请求返回数据
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

