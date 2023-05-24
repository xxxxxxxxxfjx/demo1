<template>
    <el-card shadow="never" class="access">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
    </el-card>
</template>

<script setup>
import useAccessStore from '@/stores/modules/access';

const accessStore = useAccessStore();
accessStore.fetchAccessList()
</script>

<style lang='less' scoped>
.access {
    border: none;
}
</style>
