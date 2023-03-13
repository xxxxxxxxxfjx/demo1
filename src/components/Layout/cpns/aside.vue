<template>
    <div class="aside" :style="{ width: mainStore.asideWidth }">
        <el-menu :default-active="defaultActive" unique-opened default-active="2" class="menu" @select="selectMenu"
            :collapse="isCollapse" :collapse-transition="false">
            <template v-for="(item1, index) in asideMenu" :key="index">
                <el-sub-menu :index="item1.name" v-if="item1.child && item1.child.length > 0">
                    <template #title>
                        <el-icon>
                            <component :is="item1.icon"></component>
                        </el-icon>
                        <span>{{ item1.name }}</span>
                    </template>
                    <template v-for="(item2, index) in item1.child" :key="index">
                        <el-menu-item :index="item2.frontpath">
                            <template #title>
                                <el-icon>
                                    <component :is="item2.icon"></component>
                                </el-icon>
                                <span>{{ item2.name }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-sub-menu>
                <el-sub-menu index="1" v-else :index="item1.frontpath">
                    <template #title>
                        <el-icon>
                            <component :is="item1.icon"></component>
                        </el-icon>
                        <span>{{ item1.name }}</span>
                    </template>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useMainStore from '@/stores/modules/main.js'
import useUserInfo from '@/stores/modules/userInfo';

const mainStore = useMainStore()
const userInfo = useUserInfo()
const router = useRouter();
const route = useRoute()
const asideMenu = computed(() => userInfo.menus);

const selectMenu = (e) => {
    router.push(e)
}
const isCollapse = computed(() => !(mainStore.asideWidth == '250px'))

const defaultActive = ref(route.path)

</script>

<style lang='less' scoped>
.aside {
    position: fixed;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 2px 0 5px rgba(0, 0, 0, .05);
    transition: all .1s;

    .menu {
        border: none;
    }
}
.aside::-webkit-scrollbar{
    display: none;
}
</style>
