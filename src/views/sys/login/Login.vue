<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <AppLocalePicker
      class="absolute text-white top-4 right-4 enter-x xl:text-gray-600"
      :showText="false"
      v-if="!sessionTimeout && showLocale"
    />
    <AppDarkModeToggle class="absolute top-3 right-7 enter-x" v-if="!sessionTimeout" />

    <span class="-enter-x xl:hidden">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex h-full">
        <div class="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          <AppLogo class="-enter-x" />
          <div class="my-auto">
            <img
              :alt="title"
              src="../../../assets/svg/login-box-bg.svg"
              class="w-1/2 -mt-16 -enter-x"
            />
            <div class="mt-10 font-medium text-white -enter-x">
              <span class="inline-block mt-4 text-3xl"> {{ t('sys.login.signInTitle') }}</span>
            </div>
            <div class="mt-5 font-normal text-white text-md dark:text-gray-500 -enter-x">
              {{ t('sys.login.signInDesc') }}
            </div>
          </div>
        </div>
        <div class="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            :class="`${prefixCls}-form`"
            class="relative heightbox w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <Tabs v-model:activeKey="activeKey">
                <TabPane key="1" tab="扫码登录">
                    <div class="enter-x min-w-64 min-h-64">
                      <div class="qrcodebox">
                        <QrCode
                          :value="qrCodeUrl"
                          class="enter-x flex justify-center xl:justify-start"
                          :width="280"
                        />
                        <div class="cash" v-show="Qr_timeout==0" @click="getwxqrinit">
                           <div class="ctext">
                              <div class="icon"><Icon icon="ant-design:sync-outlined" :size="32" /></div>
                             <div class="title">二维码已失效</div>
                             <a class="btn" >点击刷新</a>
                           </div>
                        </div>
                      </div>
                      <Divider class="enter-x">微信扫一扫即可登录</Divider>
                    </div>
                </TabPane>
                <TabPane key="2" tab="账号登录" force-render>
                  <div style=" min-height: 290px;">
                      <Form
                          class="p-4 enter-x"
                          :model="formData"
                          :rules="getFormRules"
                          ref="formRef"
                          @keypress.enter="handleLogin"
                        >
                          <FormItem name="account" class="enter-x">
                            <Input
                              size="large"
                              v-model:value="formData.account"
                              :placeholder="t('sys.login.userName')"
                              class="fix-auto-fill"
                            />
                          </FormItem>
                          <FormItem name="password" class="enter-x">
                            <InputPassword
                              size="large"
                              visibilityToggle
                              v-model:value="formData.password"
                              :placeholder="t('sys.login.password')"
                            />
                          </FormItem>

                          <FormItem class="enter-x">
                            <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
                              {{ t('sys.login.loginButton') }}
                            </Button>
                          </FormItem>

                        </Form>
                  </div>
                </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed,  ref,reactive ,onUnmounted} from 'vue';
  import { AppLogo } from '/@/components/Application';
  import { AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';
  import { QrCode } from '/@/components/Qrcode/index';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { Tabs, TabPane,Divider,Form, Input,Button} from 'ant-design-vue';
  import {   useFormRules, useFormValid } from './useLogin';

  import { buildShortUUID } from '/@/utils/uuid';
   import { Icon } from '/@/components/Icon/index';
  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });
  const formRef = ref();
  const loading = ref(false);
  const Qr_timeout_NUM = 60;
  var Qr_timeout =ref();
  //初始
  const userStore = useUserStore();
  let activeKey=ref('1');
  let qrCodeUrl=ref('');
   const myuuid = buildShortUUID();
   getwxqrinit()
  async function getwxqrinit() {
       Qr_timeout.value=Qr_timeout_NUM
       funtimer()
       const data = await userStore.getwxqrcode({
          uuid: myuuid,
          timeout:Qr_timeout.value
        });
        if(data){
           qrCodeUrl.value=data.url
           qrback()
        }
   }
var timer
function funtimer(){
     timer = setInterval(() => {
          if (Qr_timeout.value > 0 && Qr_timeout.value <= 60) {
             Qr_timeout.value--;
             if (Qr_timeout.value !== 0) {
             } else {
               clearInterval(timer);
             }
          }
    }, 1000);
}
  onUnmounted(() => {
     clearInterval(timer);
  });
 //监听扫码成功返回
  async function qrback() {
        try {
         const userInfo = await userStore.getqrback({
          uuid: myuuid,
          mode: 'none', //不要默认的错误提示
        });
        if(userInfo){
            notification.success({
              message: t('sys.login.loginSuccessTitle'),
              description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
              duration: 3,
            });
        }
         } catch (error) {
          //监听超时重新监听
          qrback()
      } finally {
        
      }
   }
  //获取登录二维码
  const FormItem = Form.Item;
  const { getFormRules } = useFormRules();
  const formData = reactive({
    account: '',
    password: '',
  });
 const { validForm } = useFormValid(formRef);
  const globSetting = useGlobSetting();
  const { prefixCls } = useDesign('login');
  const { t } = useI18n();
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
  const title = computed(() => globSetting?.title ?? '');
  const { notification, createErrorModal } = useMessage();
  //登录
  const InputPassword = Input.Password;
  
  //账号密码登录
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        console.log("用户：",userInfo)
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-login';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @dark-bg: #293146;
  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      &::before {
        background-image: url(/@/assets/svg/login-bg-dark.svg);
      }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link):not(.ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;
    @media (max-width: @screen-xl) {
      background-color: #293146;

      .@{prefix-cls}-form {
        background-color: #fff;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url(/@/assets/svg/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
      @media (max-width: @screen-xl) {
        display: none;
      }
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        font-size: 16px;
        color: #fff;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          font-size: 24px;
          color: #fff;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        font-size: 22px;
        color: #888;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      font-size: 12px;
      color: @text-color-secondary;
    }
  }
  .qrcodebox{
    position: relative;
    width: 280px;
    height: 280px;
    border: 1px solid #ddd;
    margin: 25px auto 0;
    overflow: hidden;
    .cash{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(255,255,255,.89);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .ctext{
            width: 100%;
            text-align: center;
            .icon{
              margin-bottom: 12px;
            }
            .title{
                  display: block;
                  text-align: center;
                  font-size: 14px;
                  color: #333;
                  line-height: 20px;
                  cursor: pointer;
            }
            .btn{
                  font-weight: 700;
                  cursor: pointer;
                  text-decoration: none;
                  color: #00a4ff;
            }
      }
    }
  }
</style>
