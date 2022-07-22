import {
  ScheduleParams,
    AccountListGetResultModel,
  }  from './model/scheduleModel';
  
  import { defHttp } from '/@/utils/http/axios';
  
  enum Api {
    AccountList = '/project.schedule/index',
  }
  export const projectSchedule = (params: ScheduleParams) =>
    defHttp.get({ url: Api.AccountList, params}, { errorMessageMode: 'none'});
  
  