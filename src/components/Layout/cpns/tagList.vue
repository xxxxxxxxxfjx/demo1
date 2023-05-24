<template>
    <!-- //TODO:tag的左右padding不一致 -->
    <div class="tag-list" :style="{ left: mainStore.asideWidth }">
        <el-tabs v-model="actionTab" type="card" class="demo-tabs" @tab-remove="removeTab" @tab-change="changTab"
            style="min-width: 100px;">
            <el-tab-pane :closable="item.path != '/'" v-for="item in tabLIst" :key="item.path" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>
        <span class="ml-auto">
            <el-dropdown @command="closeTabs">
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right dropMenu">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height:44px"></div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main.js';
import { useTabList } from '@/hooks/tabList'
const mainStore = useMainStore();
const { actionTab, tabLIst, changTab, removeTab, closeTabs } = useTabList();
</script>

<style lang='less' scoped>
.tag-list {
    display: flex;
    align-items: center;
    position: fixed;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 999;
    background-color: #f3f4f6;
    padding: 0 4px;

    .demo-tabs {
        height: 32px;
    }

    .el-dropdown-link {
        margin-left: auto;
        outline: none;

        .dropMenu {
            width: 38px;
            height: 32px;
            line-height: 32px;
            background: #fff;
            margin-right: 4px;
            border-radius: 4px;
        }
    }

}

:deep(.el-tabs__nav) {
    border: none !important;
}

:deep(.el-tabs__item) {
    border: none !important;
    background: #fff;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    margin: 0 4px;
    border-radius: 4px;
}

:deep(.el-tabs__header) {
    margin-bottom: 0px;
    border: none !important;

}

:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    line-height: 32px;
}

:deep(.el-tabs__nav-prev) {
    margin-left: 5px;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    background-color: #f1f5f9;
}
</style>
