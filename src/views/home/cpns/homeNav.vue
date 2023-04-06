<template>
    <div class="home-nav">
        <el-row :gutter="20">
            <template v-for="(item, index) in navs" :key="index">
                <el-col :span="3">
                    <el-card shadow="hover" style="cursor:pointer" @click="pageChange(item.path)">
                        <div class="content">
                            <el-icon :size="25">
                                <component :is="item.icon" :class="item.color"></component>
                            </el-icon>
                            <span class="text">{{ item.title }}</span>
                        </div>
                    </el-card>
                </el-col>
            </template>

        </el-row>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const navs = [
    {
        icon: "user",
        color: "text-light-blue-500",
        title: "用户",
        path: "/user/list"
    },
    {
        icon: "shopping-cart",
        color: "text-violet-500",
        title: "商品",
        path: "/goods/list"
    },
    {
        icon: "tickets",
        color: "text-fuchsia-500",
        title: "订单",
        path: "/order/list"
    },
    {
        icon: "chat-dot-square",
        color: "text-teal-500",
        title: "评价",
        path: "/comment/list"
    },
    {
        icon: "picture",
        color: "text-rose-500",
        title: "图库",
        path: "/image/list"
    },
    {
        icon: "bell",
        color: "text-green-500",
        title: "公告",
        path: "/notice/list"
    },
    {
        icon: "set-up",
        color: "text-grey-500",
        title: "配置",
        path: "/setting/base"
    },
    {
        icon: "files",
        color: "text-yellow-500",
        title: "优惠券",
        path: "/coupon/list"
    }
]

const pageChange = (path) => {
    router.push(path)
}
</script>

<style lang='less' scoped>
.home-nav {
    margin-top: 25px;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .text {
            margin-top: 10px;
            font-size: 14px;
        }
    }
}
</style>
