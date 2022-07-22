import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '合同编号',
    dataIndex: 'contract_no',
    width: 180,
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    width: 180,
  },
  {
    title: '名称',
    dataIndex: 'device_name',
    width: 180,
  },
  {
    title: '型号',
    dataIndex: 'device_model',
    width: 250,
  },
  {
    title: '数量',
    dataIndex: 'number',
    width:'50px',
  },
  {
    title: '单位',
    dataIndex: 'unit',
    width: '50px',
  },
  {
    title: '进度',
    dataIndex: 'step',
    width: 1100,
  },
];
//搜索
export const searchFormSchema: FormSchema[] = [
  {
    field: 'brand',
    label: '品牌',
    component: 'Input',
    colProps: { span:6 },
  },
  {
    field: 'device_name',
    label: '名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'device_model',
    label: '型号',
    component: 'Input',
    colProps: { span: 6 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '停用', value: '1' },
  //     ],
  //   },
  //   colProps: { span: 6 },
  // },
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
