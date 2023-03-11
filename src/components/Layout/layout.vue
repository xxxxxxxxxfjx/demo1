<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside>
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
</script>

<style lang='less' scoped></style>
