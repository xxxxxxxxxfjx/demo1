<template>
    <div class="header">
        <el-button type="primary" size="small" @click="$emit('create')">新增</el-button>
        <el-button style="border:none" @click="$emit('refresh')">
            <el-icon size="small">
                <Refresh />
            </el-icon>
        </el-button>
    </div>
</template>
<script setup>
defineEmits(['create','refresh'])
</script>

<style lang="less">
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>