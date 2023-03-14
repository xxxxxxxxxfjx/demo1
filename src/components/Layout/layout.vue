<template>
    <el-container>
        <el-header>
            <f-header></f-header>
        </el-header>
        <el-container>
            <el-aside :width="mainStore.asideWidth">
                <f-aside></f-aside>
            </el-aside>
            <el-main>
                <f-tag-list></f-tag-list>
                <router-view v-slot="{ Component, route }">
                    <transition name="fade">
                        <keep-alive :max="10">
                            <component :is="Component" :key="route.path ? route.path : undefined" />
                        </keep-alive>
                    </transition>
                </router-view>
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
.fade-enter-from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
.fade-enter-to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}


.fade-enter-active{
    transition: all .5s;
    transition-delay: 0.5s;

} 
.fade-leave-from {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}


.fade-leave-active{
    transition: all .5s;
}
</style>
