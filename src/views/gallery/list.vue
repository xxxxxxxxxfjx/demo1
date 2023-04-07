<template>
    <div class="gallery-list">
        <el-container class="container" :style="{ height: (h + 'px') }">
            <el-header>
                <el-button size="small" type="primary" @click="createImageCategory">新增图片分类</el-button>
                <el-button size="small" type="warning" @click="uploadImage">上传图片</el-button>
            </el-header>
            <el-container>
                <gallery-aside ref="asideRef"></gallery-aside>
                <gallery-main ref="mainRef"></gallery-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GalleryAside from './cpns/aside.vue'
import GalleryMain from './cpns/main.vue'

const height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
const h = height - 64 - 44 - 40;

// 新增图片分类
const asideRef = ref(null);
const createImageCategory = () => asideRef.value.open();

const mainRef = ref(null);
const uploadImage = () => mainRef.value.open();

</script>
<style lang='less' scoped>
.gallery-list {


    .el-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
    }

    .el-button {
        border: none;
    }

    .container {
        background-color: #fff;
    }
}
</style>
