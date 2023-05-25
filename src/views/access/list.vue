<template>
    <el-card shadow="never" class="access">
        <new-update @create="createAccess" @refresh="getData"></new-update>
        <el-tree :data="list" node-key="id" :props="{ children: 'child' }" v-loading="isLoading"
            :default-expanded-keys="firstLevel" :expand-on-click-node="false">
            <template #default="{ node, data }">
                <div class="list">
                    <div class="left">
                        <el-tag size="small" class="tag" :type="data.menu ? '' : 'info'">菜单</el-tag>
                        <el-icon v-if="data.icon">
                            <component :is="data.icon"></component>
                        </el-icon>
                        <span class="text">{{ data.name }}</span>
                    </div>
                    <div class="right">
                        <el-switch v-model="data.status" :active-value="1" :inactive-value="0" class="switch" @change="handleMenuState(data)" :loading="data.isLoading">
                        </el-switch>
                        <button @click="handleUpdate(data)">修改</button>
                        <button v-if="data.menu == 1" @click="createAccess(1, data)">增加</button>
                        <el-popconfirm title="是否删除该权限?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleConfirm(data.id)">
                            <template #reference>
                                <button>删除</button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
        </el-tree>
        <form-drawer :title="title" ref="formDrawerRef" @submit="submitForm(ruleFormRef)" @reset="resetForm">
            <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px">
                <el-form-item label="上级菜单">
                    <el-cascader v-model="ruleForm.rule_id" :options="rules" :props="props" placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单/规则">
                    <el-radio-group v-model="ruleForm.menu">
                        <el-radio :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="ruleForm.name" placeholder="名称" />
                </el-form-item>
                <el-form-item label="菜单图标" v-if="ruleForm.menu">
                    <image-select v-model="ruleForm.icon" />
                    <el-icon :size="20" v-if="ruleForm.icon" style="margin: 0 10px;color: #000;">
                        <component :is="ruleForm.icon"></component>
                    </el-icon>
                </el-form-item>
                <el-form-item label="前端路由" v-if="ruleForm.menu == 1 && ruleForm.rule_id >= 0">
                    <el-input v-model="ruleForm.frontpath" placeholder="前端路由路径" />
                </el-form-item>
                <el-form-item label="后端规则" v-if="ruleForm.menu == 0">
                    <el-input v-model="ruleForm.condition" placeholder="后端规则" />
                </el-form-item>
                <el-form-item label="请求方式" v-if="ruleForm.menu == 0">
                    <el-select v-model="ruleForm.method" placeholder="请选择请求方式">
                        <el-option v-for="(item, index) in ['GET', 'POST', 'PUT', 'DELETE']" :key="index" :label="item"
                            :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="ruleForm.order" :min="0" :max="1000" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </el-card>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { notification } from '@/hooks/notice';
import useAccessStore from '@/stores/modules/access';
import NewUpdate from '@/components/new-update/new-update.vue'
import formDrawer from '@/components/formDrawer/formDrawer.vue';
import ImageSelect from '@/components/image-select/image-select.vue'

const isLoading = ref(false);
const editId = ref(0);
const title = computed(() => editId.value ? '修改' : '新增');
const formDrawerRef = ref(null);
const ruleFormRef = ref(null);
const ruleForm = reactive({
    rule_id: -1,
    menu: 0,
    name: '',
    condition: '',
    method: '',
    status: 1,
    order: 50,
    icon: '',
    frontpath: ''
})
const accessStore = useAccessStore();
const getData = () => {
    isLoading.value = true
    accessStore.fetchAccessList().then(res => {
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        isLoading.value = false
    })
}
getData()
const { list, rules, totalCount } = storeToRefs(accessStore);
const firstLevel = computed(() => list.value.map(b => b.id));
const props = { label: 'name', children: 'child', value: 'rule_id', checkStrictly: true, emitPath: false }

const createAccess = (add = null, data = null) => {
    if (add && data) {
        ruleForm.rule_id = data.rule_id
    }
    editId.value = 0;
    formDrawerRef.value.open();
}
const handleUpdate = (data) => {
    editId.value = 1;
    ruleForm.rule_id = data.rule_id;
    ruleForm.menu = data.menu;
    ruleForm.name = data.name;
    ruleForm.condition = data.condition;
    ruleForm.method = data.method;
    ruleForm.status = data.status;
    ruleForm.order = data.order;
    ruleForm.icon = data.icon;
    ruleForm.frontpath = data.frontpath;
    formDrawerRef.value.open()
}

const handleConfirm = (id) => {
    isLoading.value = true;
    accessStore.fetchDeleteMenuAccess(id)
        .then(res => {
            getData()
            notification(`删除成功！`);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            isLoading.value = false;
        })
}

const handleMenuState = (data) => {
    // console.log(data);
    data.isLoading = true;
    accessStore.fetchUpdateMenuState(data.id, data.status)
        .then(res => {
            notification('修改状态成功！')
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            data.isLoading = false;
        })
}

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            isLoading.value = true;
            const fun = editId.value ? accessStore.fetchUpdateMenuAccess(ruleForm) : accessStore.fetchCreateMenuAccess(ruleForm)
            fun.then(res => {
                notification(`权限管理${title}成功！`);
                resetForm()
                getData()
            })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    isLoading.value = false;
                })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = () => {
    ruleForm.rule_id = -1;
    ruleForm.menu = 0;
    ruleForm.name = '';
    ruleForm.condition = '';
    ruleForm.method = '';
    ruleForm.status = 1;
    ruleForm.order = 50;
    ruleForm.icon = '';
    ruleForm.frontpath = '';
    formDrawerRef.value.close()
}
</script>

<style lang='less' scoped>
.access {
    border: none;

    .list {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            .tag {
                margin-right: 7px;
            }

            .text {
                margin-left: 7px;
            }
        }

        .right {
            .switch {
                margin: 0 10px;
            }

            button {
                margin: 0 10px;
                color: #409EFF;
            }
        }
    }
}

:deep(.el-tree-node__content) {
    height: 40px !important;
}
</style>
