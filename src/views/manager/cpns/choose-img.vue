<template>
    <div style="display: flex;">
        <div v-if="modelValue">
            <el-image :src="modelValue" fit="cover" class="img"></el-image>
        </div>
        <div class="choose-image" @click="open">
            <el-icon :size="25">
                <Plus />
            </el-icon>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="图片选择" width="80%" top="5vh">
        <el-container class="gallery-list" style="height:60vh">
            <gallery-aside ref="asideRef"></gallery-aside>
            <gallery-main ref="mainRef" @choose="handleChoose"></gallery-main>
        </el-container>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import GalleryAside from '@/views/gallery/cpns/aside.vue'
import GalleryMain from '@/views/gallery/cpns/main.vue'
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Array],
    }
})
const emit = defineEmits(['update:modelValue'])


const dialogVisible = ref(false)
const open = () => dialogVisible.value = true
const cancel = () => dialogVisible.value = false

let url = []
const handleChoose = (e) => {
    url = e.map(b => b.url)
}

const handleConfirm = () => {
    if (url.length) {
        emit('update:modelValue', url[0])
        cancel()
    }
}

</script>

<style lang='less' scoped>
.choose-image {
    width: 90px;
    height: 90px;
    border: 1px dotted #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s;

    &:hover {
        cursor: pointer;
        background-color: #efefef;
    }
}

.img {
    width: 90px;
    height: 90px;
    border: 1px dotted #ccc;
    border-radius: 5px;
    margin-right: 5px;
}
</style>
