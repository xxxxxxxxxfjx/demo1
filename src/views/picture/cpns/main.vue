<template>
    <el-main class="main" v-loading="loading">
        <div class="top" style="padding:5px 0px">
            <el-row>
                <template v-for="(item, index) in imageStore.images" :key="item.id">
                    <el-col :span="6">
                        <div class="card" style="padding:5px 10px">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <el-image style="width: 100%; height: 150px;cursor:pointer" :src="item.url" fit="cover"
                                    :preview-src-list="[item.url]" :initial-index="0" />
                                <div class="box">
                                    <span class="text truncate">{{ item.name }}</span>
                                    <div class="bottom">
                                        <el-button type="primary" size="small" text @click="rename(item)">重命名</el-button>
                                        <el-popconfirm title="是否要删除该图片？" @confirm="deleteImage(item)" width="200"
                                            confirm-button-text="确定" cancel-button-text="取消">
                                            <template #reference>
                                                <el-button type="primary" size="small" text>删除</el-button>
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </template>
            </el-row>
        </div>
        <div class="footer">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="getImages"
                :current-page="currentPage" :page-size="limit" />
        </div>
    </el-main>
    <el-drawer v-model="drawer" title="图片上传">
        <el-upload drag :action="uploadActionUrl" multiple :headers="{token}" :data="data" name="img" :on-success="uploadSuccesss" :on-error="uploadError">
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
</template>

<script setup>
import useImageStore from '@/stores/modules/image';
import { watch, ref,computed } from 'vue';
import { messageRename } from '@/hooks/messageBox';
import { notification } from '@/hooks/notice'
import FormDrawer from '@/components/formDrawer/formDrawer.vue';
import { uploadActionUrl } from '@/services/modules/image'
import { getToken } from '@/hooks/cookies';

const loading = ref(false);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10)

// 监听分类id的变换
const imageStore = useImageStore();
watch(() => imageStore.currentId, (cur) => {
    getImages()
})

// 在同一分类中请求数据
function getImages(p = null) {
    if (typeof p == 'number') {
        currentPage.value = p;
    }
    loading.value = true;
    imageStore.fetchImages(imageStore.currentId, currentPage.value).then(res => {
        total.value = res.totalCount;
    }).finally(() => {
        loading.value = false;
    })
}

// 重命名
const rename = (item) => {
    messageRename('重命名', item.name)
        .then(res => {
            loading.value = true;
            imageStore.fetchChangeImageName(item.id, res.value)
                .then(res => {
                    console.log(res);
                    notification('修改成功');
                    getImages()
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    loading.value = false;
                })
        })
        .catch(err => {
        })
}
// 删除图片
const deleteImage = (item) => {
    loading.value = true;
    imageStore.fetchDeleteImage(item.id)
        .then(res => {
            notification('删除成功');
            getImages()
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            loading.value = false;
        })
}

// 上传图片
const token = getToken();
const drawer = ref(false);
const data = computed(()=>({image_class_id:imageStore.currentId}))
const open = () => drawer.value = true;
const uploadSuccesss = (response, uploadFile, uploadFiles) => {
    notification('上传图片成功')
    getImages()
}
const uploadError = (error, uploadFile, uploadFiles) => {
    let msg = JSON.parse(error.message).msg || "上传失败"
    notification(msg,"error")
}
defineExpose({
    open
})


</script>

<style lang='less' scoped>
.main {
    position: relative;
    border-right: 1px solid #eee;

    .top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;

        .card {
            .box {
                position: relative;

                .text {
                    width: 100%;
                    height: 30px;
                    padding: 0 5px;
                    position: absolute;
                    top: -33px;
                    background-color: rgba(0, 0, 0, .5);
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    color: #fff;
                    font-size: 14px;
                }

                .bottom {
                    padding: 8px;
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
