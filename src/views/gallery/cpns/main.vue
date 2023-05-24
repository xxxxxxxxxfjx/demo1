<template>
    <el-main v-loading="loading">
        <div class="top">
            <el-row>
                <template v-for="(item, index) in images" :key="item.id">
                    <el-col :span="6" style="padding:10px 10px">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover" :class="{choose:item.checked}">
                            <el-image style="width: 100%; height: 150px;cursor:pointer" :src="item.url" fit="cover"
                                :preview-src-list="[item.url]" :initial-index="0" />
                            <div class="box">
                                <span class="text">{{ item.name }}</span>
                                <div class="bottom">
                                    <el-checkbox v-if="route.path == '/manager/list'" v-model="item.checked"
                                        @change="handleChange(item)"></el-checkbox>
                                    <el-button text class="button" type="primary" @click="rename(item)">重命名</el-button>
                                    <el-popconfirm title="是否要删除该图片?" confirm-button-text="确认" cancel-button-text="取消"
                                        width="180" @confirm="deleteImage(item)">
                                        <template #reference>
                                            <el-button text class="button" type="primary">删除</el-button>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </template>
            </el-row>
        </div>
        <div class="footer">
            <el-pagination background layout="prev, pager, next" :total="imagesTotalCount" :current-page="currentPage"
                @current-change="currentChange" />
        </div>
        <el-drawer v-model="show" title="上传图片">
            <el-upload class="upload-demo" drag :action="uploadActionUrl" multiple :headers="{ token }" :data="data"
                name="img" :on-success="uploadSuccesss" :on-error="uploadError">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                    </div>
                </template>
            </el-upload>
        </el-drawer>
    </el-main>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import useImageStore from '@/stores/modules/image';
import { storeToRefs } from 'pinia';
import { getToken } from '@/hooks/cookies';
import { uploadActionUrl } from '@/services/modules/image'
import { notification } from '@/hooks/notice'
import { messageRename } from '@/hooks/messageBox';
import { useRoute } from 'vue-router'

const emit = defineEmits(['choose'])
const route = useRoute()
const currentPage = ref(1)
const imageStore = useImageStore();
const loading = ref(false);
const { currentId, images, imagesTotalCount } = storeToRefs(imageStore);
const show = ref(false);
const token = getToken();
const data = computed(() => ({ image_class_id: imageStore.currentId }))

// 监听currentId的变化进行数据请求
watch(() => currentId.value, newValue => {
    currentChange()
})



// 监听页面切换
const currentChange = (p) => {
    if (typeof p == 'number') {
        currentPage.value = p;
    }
    loading.value = true;
    imageStore.fetchImages(currentId.value, currentPage.value)
        .finally(() => {
            loading.value = false;
        })

}
// 上传图片
const uploadSuccesss = (response, uploadFile, uploadFiles) => {
    notification('上传图片成功')
    currentChange()
}
const uploadError = (error, uploadFile, uploadFiles) => {
    let msg = JSON.parse(error.message).msg || "上传失败"
    notification(msg, "error")
}

// 删除图片
const deleteImage = (item) => {
    loading.value = true;
    imageStore.fetchDeleteImage(item.id)
        .then(res => {
            notification('图片删除成功');
            currentChange()
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            loading.value = false;
        })
}
// 重民命图片
const rename = (item) => {
    messageRename('重命名', item.name)
        .then(res => {
            loading.value = true;
            imageStore.fetchChangeImageName(item.id, res.value)
                .then(res => {
                    notification('修改成功');
                    currentChange()
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    loading.value = false;
                })
        }).catch(err => {
            console.log(err);
        })
}

const open = () => show.value = true;

const chooseImg = computed(() => images.value.filter(d => d.checked))
const handleChange = (item) => {
    if (item.checked && chooseImg.value.length > 1) {
        notification('只能选择一张图片', 'error')
        item.checked = false;
        return
    }
    emit('choose',chooseImg.value)
}

defineExpose({
    open
})
</script>

<style lang='less' scoped>
.el-main {
    position: relative;

    .top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        padding: 10px;
        overflow-y: auto;
    }

    .box {
        position: relative;

        .text {
            position: absolute;
            width: 100%;
            height: 30px;
            padding: 0 10px;
            line-height: 30px;
            top: -33px;
            color: #fff;
            background-color: rgba(0, 0, 0, .5);
            font-size: 14px;
        }

        .bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px;
        }
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
    }
}

.el-button {
    border: none;
    --el-button-hover-bg-color: none !important;
    --el-button-active-bg-color: none !important;
}
.choose{
    border: 1px solid #000;
}
</style>
