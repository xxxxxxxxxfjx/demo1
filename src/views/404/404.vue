<template>
    <div class="not-found">
        <el-col :sm="12" :lg="6">
            <el-result icon="warning" title="404提示" sub-title="你找的页面走丢了~">
                <template #extra>
                    <el-button type="primary" @click="btnClick">返回首页</el-button>
                </template>
            </el-result>
        </el-col>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const btnClick = () => {
    router.push('/')
}
</script>

<style lang='less' scoped></style>
