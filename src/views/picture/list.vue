<template>
    <div class="gallery-list">
        <el-container class="bg-white" :style="{ height: (h + 'px') }">
            <el-header class="header">
                <el-button type="primary" size="small" @click="add">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="upload">上传图片</el-button>
            </el-header>
            <el-container>
                <gallery-aside ref='asideRef' @editAside="edit"></gallery-aside>
                <gallery-main ref="mainRef"></gallery-main>
            </el-container>
        </el-container>
        <form-drawer ref="formDrawerRef" :title="title" @submit="submitForm(ruleFormRef)" destroy-on-close
            @reset="resetForm(ruleFormRef)">
            <el-form :model="form" label-width="80px" ref="ruleFormRef" :rules="rules">
                <el-form-item label="相册名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="form.order" :min="1" :max="100" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import GalleryAside from './cpns/aside.vue'
import GalleryMain from './cpns/main.vue'
import FormDrawer from '@/components/formDrawer/formDrawer.vue';
import useImageStore from '@/stores/modules/image';
import { notification } from '@/hooks/notice';

const imageStore = useImageStore();
// 计算main的高度
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;

const asideRef = ref(null);
const ruleFormRef = ref(null);
const form = reactive({
    name: '',
    order: 50,
})

const editId = ref(0);
const title = computed(() => editId.value ? '修改' : '新增');


// 新增图片分类
const formDrawerRef = ref(null)
const rules = reactive({
    name: [{ required: true, message: '新增图库分类名称', trigger: 'blur' }],
});
function add() {
    editId.value = 0;
    form.name = '';
    form.order = 50;
    formDrawerRef.value.open()
}
const mainRef = ref(null);
const upload = () => {
    mainRef.value.open()
}

const edit = (obj) => {
    editId.value = obj.id;
    form.name = obj.name;
    form.order = obj.order;
    formDrawerRef.value.open()
}

//为了方便学习后端规定： 自己新增的分类是可以删除的，但是默认自己就有的是无法删除的
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            formDrawerRef.value.showLoading();
            const fun = editId.value ? imageStore.fetchEditImgCategory(editId.value, form.name, form.order) :
                imageStore.fetchAddImgCategory(form.name, form.order);

            fun.then(res => {
                notification(`${title.value}图片分类成功`, 'success');
                asideRef.value.refresh(editId.value ? '' : 1);
                formDrawerRef.value.close();
            }).finally(() => {
                formDrawerRef.value.hideLoading();
                form.order = 50;
                editId.value = 0;
            })
        } else {
            return false;
        }
    })
}
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    formDrawerRef.value.close()
    form.order = 50;
    editId.value = 0;
}
//TODO:为了方便学习后端规定： 自己新增的分类是可以删除的，但是默认自己就有的是无法删除的
</script>

<style lang='less' scoped>
.gallery-list {
    .header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
    }
}
</style>
