import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // 是否显示SettingButton
  showSettingButton: true,

  // 是否显示主题切换按钮
  showDarkModeToggle: true,

  //设置按钮位置 可选项
  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  // 权限模式,默认前端角色权限模式ROUTE_MAPPING 
  permissionMode: PermissionModeEnum.BACK,

  //权限缓存存放位置。默认存放于localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 会话超时处理方案
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 项目主题色
  themeColor: primaryColor,

  //  网站灰色模式，用于可能悼念的日期开启
  grayMode: false,

  // 色弱模式
  colorWeak: false,

  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: false,

  // 主题内容宽度
  contentMode: ContentEnum.FULL,

  //是否显示logo
  showLogo: true,

  // 是否显示底部信息 copyright
  showFooter: false,

  // 头部配置
  headerSetting: {
    //  背景色
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    //固定头部
    fixed: true,
    // 是否显示顶部
    show: true,
    // 主题
    theme: ThemeEnum.LIGHT,
     // 开启锁屏功能
    useLockPage: true,
   // 显示全屏按钮
    showFullScreen: true,
     // 显示文档按钮
    showDoc: true,
   // 显示消息中心按钮
    showNotice: true,
    // 显示菜单搜索按钮
    showSearch: true,
  },

  // 菜单配置
  menuSetting: {
    // 背景色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 是否固定住菜单
    fixed: true,
    // 菜单折叠
    collapsed: false,
     // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: false,
    // 是否可拖拽
    // Only limited to the opening of the left menu, the mouse has a drag bar on the right side of the menu
    canDrag: false,
     // 是否显示
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
   // 菜单模式
    mode: MenuModeEnum.HORIZONTAL,
    // 菜单类型
    type: MenuTypeEnum.TOP_MENU,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    //顶部菜单布局
    topMenuAlign: 'start',
    //  折叠触发器的位置
    trigger: TriggerEnum.HEADER,
    // 手风琴模式，只展示一个菜单
    accordion: true,
    // 在路由切换的时候关闭左侧混合菜单展开菜单
    closeMixSidebarOnChange: false,
    // 左侧混合菜单模块切换触发方式
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    //是否固定左侧混合菜单
    mixSideFixed: false,
  },

  //  多标签
  multiTabsSetting: {
    // 刷新后是否保留已经打开的标签页
    cache: false,
    // 开启
    show: true,
    // 开启快速操作
    canDrag: true,
    //  是否可以拖拽
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    //是否显示折叠按钮
    showFold: true,
  },

  // 动画配置
  transitionSetting: {
    // 是否开启切换动画
    // The disabled state will also disable pageLoading
    enable: true,

    // 动画名
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // 是否打开页面切换loading
    // Only open when enable=true
    openPageLoading: true,

    // 是否打开页面切换顶部进度条
    openNProgress: false,
  },

  // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: true,

  // 自动锁屏时间，为0不锁屏。 单位分钟 默认1个小时
  lockTime: 0,

  // 显示面包屑
  showBreadCrumb: true,

  // 显示面包屑图标
  showBreadCrumbIcon: false,

  // 是否使用全局错误捕获
  useErrorHandle: false,

  // 是否开启回到顶部
  useOpenBackTop: true,

  //  是否可以嵌入iframe页面
  canEmbedIFramePage: true,

  //切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,

  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: false,
};

export default setting;
