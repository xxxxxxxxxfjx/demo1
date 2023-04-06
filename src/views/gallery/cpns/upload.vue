<template>
    <form-drawer ref="formDrawerRef" title="上传图片">

    </form-drawer>
</template>

<script setup>
import { ref } from 'vue'
import FormDrawer from '@/components/formDrawer/formDrawer.vue';
defineProps({
    isShow: {
        type: Boolean,
        default: false,
    }
})
const formDrawerRef = ref(null);
const open = () => {
    formDrawerRef.value?.open()
}

defineExpose({
    open
})
</script>

<style lang='less' scoped></style>
