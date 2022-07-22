import { FormSchema } from '/@/components/Form';
import { isAccountExist } from '/@/api/sys/system';
export const formSchema: FormSchema[] = [
  {
    field: 'account',
    label: '登录账号',
    component: 'Input',
    dynamicRules: () => {
      return [
        {
          validator: (_, value) => {
            if (value) {
              isAccountExist(value).then((res)=>{
                if(res.code==1){
                  return Promise.reject(res.message);
                }else{
                  return Promise.resolve();
                }
              })
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'passwordOld',
    label: '当前密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'passwordNew',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
