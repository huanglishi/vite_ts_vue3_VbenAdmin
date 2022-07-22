<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
import { getAccount } from '/@/api/sys/system';
  export default defineComponent({
    name: 'accountInfo',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields,updateSchema }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
        baseColProps: { lg: 12, md: 24 },
      });
      getAccount().then((res)=>{
        if(res.code==0){
          console.log("账号信息：",res)
          updateSchema(
            [{
              field: 'account',
              defaultValue:res.account,
            },
            {
              field: 'passwordOld',
              ifShow: res.account?true:false,
            },
            {
              field: 'passwordNew',
              label:res.account?'新密码':'密码',
              componentProps: {
                placeholder: res.account?'新密码':'密码',
              },
              rules: [
                {
                  required: true,
                  message: '请输入'+(res.account?'新密码':'密码'),
                },
              ],
            },
            ]);
        }
      })
      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;

          // TODO custom api
          console.log(passwordOld, passwordNew);
          // const { router } = useRouter();
          // router.push(pageEnum.BASE_LOGIN);
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
