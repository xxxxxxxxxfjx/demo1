<template>
    <el-card shadow="never" class="card">
        <el-row>
            <el-col :span="8" :offset="0">
                <el-form :model="form" label-width="80px" size="small">
                    <el-form-item label="关键词">
                        <el-input v-model="form.name" placeholder="管理员昵称"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" :offset="8" class="btn">
                <el-button type="primary" @click="search" size="small">搜索</el-button>
                <el-button size="small" @click="reset">重置</el-button>
            </el-col>
        </el-row>
        <div class="header">
            <el-button type="primary" size="small" @click="createManager">新增</el-button>
            <el-button style="border:none">
                <el-icon size="small">
                    <Refresh />
                </el-icon>
            </el-button>
        </div>
        <el-table :data="managerLists" style="width: 100%" v-loading="loading">
            <el-table-column label="管理员">
                <template #default="{ row }">
                    <div class="avatar">
                        <el-avatar :size="40" :src="row.avatar" @error="() => true">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                        <div class="text">
                            <span>{{ row.username }}</span>
                            <small>ID: &nbsp;{{ row.id }}</small>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="所属管理员" align="center" prop="role.name" />

            <el-table-column label="状态" align="center">
                <template #default="{ row }">
                    <el-switch :disabled="row.super === 1" :loading="row.isLoading" :modelValue="row.status"
                        :active-value="1" @change="stateChange($event, row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <small v-if="row.super === 1">暂无操作</small>
                    <div v-else>
                        <el-button type="primary" text size="default" @click="editNotice(row)">修改</el-button>
                        <el-popconfirm title="是否要删除该记录?" confirm-button-text="是" cancel-button-text="否"
                            @confirm="deleteNotice(row)">
                            <template #reference>
                                <el-button type="primary" text size="default">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-pagination background layout="prev, pager, next" :total="totalCount" :current-page="currentPage"
                @current-change="pageChange" />
        </div>
        <form-drawer :title="title" ref="formDrawerRef" @submit="submitForm(ruleFormRef)" @reset="resetForm(ruleFormRef)">
            <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="ruleForm.username" style="width:100%" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item label="头像">
                    <choose-img v-model="ruleForm.avatar"></choose-img>
                </el-form-item>
                <el-form-item label="所属管理员">
                    <el-select v-model="ruleForm.role_id" placeholder="请选择所属管理员">
                        <template v-for="item in roles" :key="item.id">
                            <el-option :label="item.name" :value="item.id" />
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </form-drawer>

    </el-card>
</template>

<!-- TODO: 8.1 此功能模块还没写完 -->
<script setup>
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { notification } from '@/hooks/notice'
import useManagerStore from '@/stores/modules/manager.js'
import formDrawer from '@/components/formDrawer/formDrawer.vue';
import ChooseImg from './cpns/choose-img.vue'

const form = reactive({
    name: ''
})
const _ = '';
const loading = ref(false)
const currentPage = ref(1)
const managerStore = useManagerStore();
const formDrawerRef = ref(null);
const ruleFormRef = ref(null);

const ruleForm = reactive({
    username: '',
    password: '',
    role_id: null,
    status: 1,
    avatar: ''
})

const { managerLists, totalCount, roles } = storeToRefs(managerStore);

const editId = ref(0);
const userId = ref(0)
const title = computed(() => editId.value ? '修改' : '新增')

const getData = (p = null, keyword = '', limit) => {
    if (typeof p == 'number') {
        currentPage.value = p;
    }
    loading.value = true;
    managerStore.fetchManagers(currentPage.value, limit, keyword)
        .then(res => {
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            loading.value = false;
        })
}
getData()

// 搜索重置
const search = () => {
    getData(_, form.name)
}

const reset = () => {
    form.name = ''
    getData()
}

// 状态改变
const stateChange = (e, row) => {
    e = Number(e)
    row.isLoading = true;
    managerStore.fetchUpdateState(row.id, e)
        .then(res => {
            row.status = e;
            notification('状态切换成功！')
        })
        .finally(() => {
            row.isLoading = false;
        })
}

// 页面跳转
const pageChange = (e) => {
    getData(e)
}

// 新增
const createManager = () => {
    editId.value = 0;
    formDrawerRef.value.open()
}

// 删除
const deleteNotice = (row) => {
    loading.value = true;
    managerStore.fetchDeleteManager(row.id)
        .then(res => {
            notification('删除成功')
            getData(currentPage.value)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            loading.value = false;
        })
}

// 修改
const editNotice = (row) => {
    console.log(row);
    userId.value = row.id;
    editId.value = 1;
    ruleForm.username = row.username;
    ruleForm.password = row.password;
    ruleForm.avatar = row.avatar;
    ruleForm.role_id = row.role_id;
    ruleForm.status = row.status;
    formDrawerRef.value.open()
}

// 清空默认值
const clearForm = () => {
    ruleForm.username = '';
    ruleForm.password = '';
    ruleForm.role_id = null;
    ruleForm.status = 1;
    ruleForm.avatar = '';
}

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            loading.value = true;
            const fun = editId.value ?  managerStore.fetchUpdateManager(userId.value, ruleForm) :managerStore.fetchCreateManager(ruleForm);
            fun.then(res => {
                notification(`${title}成功！`)
                formDrawerRef.value.close()
                getData(currentPage.value)
                clearForm()
            })
            .catch(err => {
                 console.log(err);
            })
            .finally(() => {
                 loading.value = false;
             })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formDrawerRef.value.close()
    clearForm()
    formEl.resetFields()
}
</script>

<style lang='less' scoped>
.card {
    border: none;

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

}


.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}


.avatar {
    display: flex;

    .text {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }
}

.btn {
    display: flex;
    justify-content: end;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
