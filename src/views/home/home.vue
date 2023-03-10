<template>
    <div class="home">
        <el-button @click="logout">退出</el-button>
    </div>
</template>

<script setup>
import { messageBox } from '@/hooks/messageBox'
import useUserInfo from '@/stores/modules/userInfo';
import { useRouter } from 'vue-router';
import {notification} from '@/hooks/notice'

const userInfo = useUserInfo()
const router= useRouter()
function logout() {
    messageBox('退出登录吗?').then(() => {
        console.log('确认退出');

        // 请求登录退出api
        userInfo.fetchLogout().finally(() => {
            // 在状态管理库中进行以下两个操作
            // // 移除token
            // removeToken()
            // // 删除用户信息
            // userInfo.user = {}
            userInfo.logout()

            // 跳转登录页面
            router.push('/login')

            // 提示退出登录成功
            notification('退出登录成功！','success')
        })
    }).catch((err) => {

    })
}
</script>

<style lang='less' scoped></style>
