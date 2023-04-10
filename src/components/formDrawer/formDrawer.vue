<template>
    <div class="drawer">
        <el-drawer v-model="showDrawer" :title="title" :with-header="true" :close-on-click-modal="false" :size="size"
            :destroy-on-close="destroyOnClose" @close="closeDrawer">
            <div class="form">
                <div class="body">
                    <slot></slot>
                </div>
                <div class="button">
                    <el-button type="primary" @click="submit" :loading="loading">
                        提交
                    </el-button>
                    <el-button @click="reset">取消</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showDrawer = ref(false);
const loading = ref(false)
const props = defineProps({
    title: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: "45%"
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['submit', 'reset'])
const submit = () => emit('submit')

// 点击取消
const reset = () => emit('reset');

// 点击x关闭该窗口
const closeDrawer = () => {
    reset()
}

function open() {
    showDrawer.value = true;
}
function close() {
    showDrawer.value = false;
}
const showLoading = () => loading.value = true;
const hideLoading = () => loading.value = false;



defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})
</script>

<style lang='less' scoped>
.form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .body {
        flex: 1;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }

    .button {
        height: 50px;
        display: flex;
        align-items: center;
    }
}
</style>
