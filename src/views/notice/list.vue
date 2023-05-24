<template>
    <el-card shadow="never" class="card" v-loading="loading">
        <div class="header">
            <el-button type="primary" size="small" @click="createNotice">新增</el-button>
            <el-button @click="getData">
                <el-icon :size="20">
                    <Refresh />
                </el-icon>
            </el-button>
        </div>
        <el-table :data="notices" style="width: 100%">
            <el-table-column prop="title" label="公告标题" width="180" />
            <el-table-column prop="create_time" label="发布时间" width="600" />
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" text size="default" @click="editNotice(scope.row)">修改</el-button>
                    <el-button type="primary" text size="default" @click="deleteNotice(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-pagination background layout="prev, pager, next" @current-change="getData" :current-page="currentPage"
                :total="noticeCount" />
        </div>
        <form-drawer :title="title" ref="formDrawerRef" @submit="submitForm(ruleFormRef)" @reset="resetForm(ruleFormRef)">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" status-icon>
                <el-form-item label="公告标题" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="ruleForm.content" type="textarea" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </el-card>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import useNoticeStore from '@/stores/modules/notice';
import { storeToRefs } from 'pinia';
import FormDrawer from '@/components/formDrawer/formDrawer.vue';
import { notification } from '@/hooks/notice'

//TODO:公告模块中的高度存在bug，设置一个定死的高度
const noticeStore = useNoticeStore();
const { notices, noticeCount } = storeToRefs(noticeStore);
const editId = ref(0);
const title = computed(() => editId.value ? '修改公告' : '新增公告');
const loading = ref(false);
const currentPage = ref(1);
const formDrawerRef = ref(null);
const ruleFormRef = ref(null);
const ruleForm = reactive({
    name: '',
    content: '',
})
const rules = ({
    name: [
        { required: true, message: '请输入公告标题', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入公告内容', trigger: 'blur' },
    ]
})

// 获取公告列表数据
const getData = (p = null) => {
    if (typeof p == 'number') {
        currentPage.value = p;
    }
    loading.value = true;
    noticeStore.fetchNotices(currentPage.value)
        .then(res => {
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            loading.value = false;
        })
}
getData();

// 新增公告
const createNotice = () => {
    ruleForm.name = "";
    ruleForm.content = "";
    formDrawerRef.value.open();
}
// 关闭并清空新增窗口
const resetForm = async (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
    formDrawerRef.value.close();
}
// 清空
const clear = () => {
    ruleForm.name = "";
    ruleForm.content = "";
    editId.value = 0;
}
// 修改公告
const editNotice = (item) => {
    editId.value = item.id;
    ruleForm.name = item.title;
    ruleForm.content = item.content;
    formDrawerRef.value.open();
}

// 删除公告
const deleteNotice = (item) => {
    console.log(item);
    noticeStore.fetchDeleteNotice(item.id)
        .then(res => {
            notification(`删除成功`);
            getData()
        })
        .catch(err => {
            console.log(err);
        }).finally(() => {

        })
}

// 提交公告
const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            formDrawerRef.value.showLoading();
            const fun = editId.value ? noticeStore.fetchModifyNotice(editId.value, ruleForm.name, ruleForm.content) :
                noticeStore.fetchCreateNotice(ruleForm.name, ruleForm.content);
            fun.then(res => {
                notification(`${title.value}成功`);
                getData()
                clear()
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                formDrawerRef.value.hideLoading();
                formDrawerRef.value.close();
            })
        } else {
            console.log('error submit!', fields)
        }
    })
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

.el-button {
    border: none;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}
</style>
