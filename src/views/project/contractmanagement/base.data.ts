import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '合同编号',
    dataIndex: 'symno',
    width: 180,
  },
  {
    title: '系统编号',
    dataIndex: 'contractno',
    width: 180,
  },
  {
    title: '合同金额',
    dataIndex: 'contractamount',
    width: 180,
  },
  {
    title: '项目名称',
    dataIndex: 'client_name',
    width: 250,
  },
  {
    title: '合同状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      const status = record.status;
      const color =  status == "进行中" ? 'green' : 'red';
      return h(Tag, { color: color,style:"user-select: none;" }, () => status);
    },
  },
  {
    title: '项目经理',
    dataIndex: 'user_name',
    width: '120px',
  },
  {
    title: '联系电话',
    dataIndex: 'user_mobile',
    width: '120px',
  },
  {
    title: '创建时间',
    dataIndex: 'projectcreatetime',
    width: '120px',
    customRender: ({ record }) => {
      const projectcreatetime = record.projectcreatetime;
      return  timestampTodataTime(projectcreatetime);
    },
  },
];
export const timestampTodataTime = (timestamp: number) => {
  if(!timestamp){
      return "---";
  }
  // 计算年月日时分的函数
  var date = new Date(timestamp*1000)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  return Y + M + D   
};
//搜索
export const searchFormSchema: FormSchema[] = [
  {
    field: 'brand',
    label: '合同编号',
    component: 'Input',
    colProps: { span:6 },
  },
  {
    field: 'device_name',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '合同状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '进行中', value: '进行中' },
        { label: '已完成', value: '已完成' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
