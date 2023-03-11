<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside :style="{ width: mainStore.asideWidth }">
                <f-aside></f-aside>
            </el-aside>
            <el-main>
                <f-tag-list></f-tag-list>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FHeader from './cpns/header.vue'
import FAside from './cpns/aside.vue'
import FTagList from './cpns/tagList.vue'
import useMainStore from '@/stores/modules/main.js'
const mainStore = useMainStore()

</script>

<style lang='less' scoped>
.el-aside {
    transition: all .2s;
}
</style>
