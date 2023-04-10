<template>
    <el-aside width="220px" v-loading="loading">
        <div class="top">
            <template v-for="(item, index) in imageCategoryList" :key="item.id">
                <div class="list" :class="{ active: item.id == currentId }" @click="listClick(item)">
                    <span class="text">{{ item.name }}</span>
                    <el-button color="none" class="left" @click="editList(item)">
                        <el-icon color="skyblue">
                            <Edit />
                        </el-icon>
                    </el-button>
                    <!-- span里面的点击事件是用来阻止冒泡事件的发生的 -->
                    <span @click.stop="() => ({})">
                        <el-popconfirm title="是否要删除该分类？" @confirm="deleteList(item)" confirm-button-text="确认"
                            cancel-button-text="取消" width="180">
                            <template #reference>
                                <el-button color="transparent">
                                    <el-icon color="skyblue">
                                        <Close />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </span>
                </div>
            </template>
        </div>
        <div class="footer">
            <el-pagination background layout="prev, next" :total="categoryTotalCount" :page-size="limit"
                :current-page="currentPage" @current-change="getData" />
        </div>
        <form-drawer ref="formDrawerRef" :title="title" @reset="resetForm(formRef)" @submit="formSubmit(formRef)">
            <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
                <el-form-item label="相册名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="form.order" :min="1" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </el-aside>
</template>

<script setup>
import useImageStore from "@/stores/modules/image";
import { storeToRefs } from "pinia";
import { computed, reactive, ref, watch } from "vue";
import FormDrawer from '@/components/formDrawer/formDrawer.vue'
import { notification } from "@/hooks/notice"

const formDrawerRef = ref(null);
const loading = ref(false);

// 表单
const formRef = ref(null);
const form = reactive({
    name: '',
    order: 50,
});
const rules = reactive({
    name: [
        { required: true, message: '相册名称不能为空', trigger: 'blur' },
    ],
})


// 侧边aside
const currentPage = ref(1);
const limit = ref(10)
const currentId = ref(0);
const imageStore = useImageStore();
const { imageCategoryList, categoryTotalCount } = storeToRefs(imageStore);
const editId = ref(0);
const title = computed(() => editId.value ? '修改' : '新增');

// 监听currentId的变化存入store中
watch(() => currentId.value, newValue => {
    imageStore.currentId = newValue;
})

// 保持组件中不存数据的思路 
// 获取图片分类列表数据
const getData = (page) => {
    if (typeof page == 'number') {
        currentPage.value = page;
    }
    loading.value = true;
    imageStore.fetchImageCategoryList(currentPage.value).then(res => {
        currentId.value = res.id;
    }).finally(() => {
        loading.value = false;
    })
}
getData()

const listClick = (item) => {
    currentId.value = item.id;

}

// 新增图片分类
const open = () => {
    formDrawerRef.value.open()
}

// 修改分类列表数据
const editList = (item) => {
    editId.value = item.id;
    form.name = item.name;
    form.order = item.order;
    formDrawerRef.value.open();
}

// 删除图片分类
const deleteList = (item) => {
    // console.log(item);
    loading.value = true;
    imageStore.fetchDeleteImgCategory(item.id)
        .then(res => {
            notification('图片分类删除成功')
            getData();
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            loading.value = false;
        })
}

// 表单关闭和取消并重置内容
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    formDrawerRef.value.close()
    editId.value = 0;
}

// 在成功提交之后要恢复默认值，并关闭窗口
const successSubmit = () => {
    form.name = '';
    form.order = 50;
    editId.value = 0;
    formDrawerRef.value.close()
}
// 提交表单
const formSubmit = async (formEl) => {
    if (!formEl) return;
    formEl.validate((valid, fields) => {
        if (valid) {
            formDrawerRef.value.showLoading()
            const fun = editId.value ? imageStore.fetchEditImgCategory(editId.value, form.name, form.order) :
                imageStore.fetchAddImgCategory(form.name, form.order);
            fun
                .then(res => {
                    notification(`${title.value}图片分类成功`);
                    successSubmit();
                    getData();
                })
                .catch(err => {
                    console.log(err);
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
        } else {
            return false;
        }
    })
}

defineExpose({
    open
})
</script>

<style lang='less' scoped>
.el-aside {
    position: relative;
    border-right: 1px solid #f4f4f4;

    .top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;

        .list {
            display: flex;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #f4f4f4;
            font-size: 14px;
            cursor: pointer;

            &:hover {
                background-color: rgb(239, 246, 255);
            }

            .left {
                margin-left: auto;
            }

            .text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.el-button {
    border: none;
    --el-button-hover-bg-color: none !important;
    --el-button-active-bg-color: none !important;
}

.active {
    background-color: rgb(239, 246, 255);
}
</style>
