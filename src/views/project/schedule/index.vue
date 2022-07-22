<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleCreate"> 新增角色 </a-button> -->
      </template>
      <template #bodyCell="{ column , record }">
       <div v-if="column.key === 'step'" style="overflow:auto;">
          <Steps :current="record.step" size="small"  >
              <Step :title="record.step>=0?'采购':'准备采购'" />
              <Step title="免税" v-if="record.hase_ms"/>
              <Step title="商检" v-if="record.hase_sj"/>
              <Step title="保险" v-if="record.hase_bx"/>
              <Step title="SAT" v-if="record.hase_sat"/>
              <Step title="FAT" v-if="record.hase_fat"/>
              <Step title="供应商仓库"/>
              <Step title="到货签收" />
            <template v-if="record.cate==1">
              <Step title="开箱" />
              <Step title="安装" v-if="record.show_az"/>
              <Step title="检定" v-if="record.show_jd"/>
              <Step title="验证" v-if="record.show_yz"/>
              <Step title="验收" v-if="record.show_ys"/>
            </template>
          </Steps>
         </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { projectSchedule } from '/@/api/pro/schedule';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';
  import { Steps,Step } from 'ant-design-vue';
  export default defineComponent({
    name: 'projectSchedule',
    components: { BasicTable, RoleDrawer, TableAction ,Steps,Step},
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '进度列表',
        api: projectSchedule,
        columns,
        // scroll:{x:true},
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        // actionColumn: {
        //   width: 80,
        //   title: '操作',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        //   fixed: undefined,
        // },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
