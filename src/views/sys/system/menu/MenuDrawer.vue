<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuSelect,saveMenu } from '/@/api/sys/system';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      let Id = ref(0);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 120,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
         const treeData = await getMenuSelect();
        updateSchema({
          field: 'parentMenu',
          componentProps: { treeData },
        });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          Id.value=data.record.id
        }else{
           Id.value=0
           updateSchema(
            [{
              field: 'type',
              defaultValue:0,
            },
            {
              field: 'status',
              defaultValue:0,
            },
            {
              field: 'isExt',
              defaultValue:0,
            },
            {
              field: 'keepalive',
              defaultValue:0,
            },
            {
              field: 'hideChildrenInMenu',
              defaultValue:0,
            },
            {
              field: 'hideMenu',
              defaultValue:2,
            },
            {
              field: 'hideBreadcrumb',
              defaultValue:0,
            }
            ]);
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));
      //提交数据
      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          //提交到数据库
           if(Id.value>0){
             values.id=Id.value
           }
           if(values.type==0){
             values.component="LAYOUT"
           }else if(values.type==1){
             values.redirect=""
             values.hideChildrenInMenu=0
           }
           const resultdata = await saveMenu(values);
           console.log("提交：",resultdata); 
          closeDrawer();
          resetFields();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
