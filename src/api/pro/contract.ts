import {
  getParams,
  }  from './model/contractModel';
  
  import { defHttp } from '/@/utils/http/axios';
  
  enum Api {
    AccountList = '/project.contract/index',
  }
  export const getlist = (params: getParams) =>
    defHttp.get({ url: Api.AccountList, params}, { errorMessageMode: 'none'});
  
  