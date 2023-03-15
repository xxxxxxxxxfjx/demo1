<template>
    <div class="head">
        <div class="header">
            <span class="logo">
                <el-icon class="logo1">
                    <ElemeFilled />
                </el-icon>
                帝莎编程
            </span>
            <el-icon class="icon-btn" @click="asideClick">
                <Fold v-if="mainStore.asideWidth == '250px'" />
                <Expand v-else/>
            </el-icon>
            <el-tooltip effect="dark" content="刷新" placement="bottom">
                <el-icon class="icon-btn" @click="handleRefresh">
                    <Refresh />
                </el-icon>
            </el-tooltip>

            <div class="box">
                <el-tooltip effect="dark" content="全屏" placement="bottom">
                    <el-icon class="icon-btn" v-if="!isFullscreen" @click="toggle">
                        <FullScreen />
                    </el-icon>
                    <el-icon class="icon-btn" v-if="isFullscreen" @click="toggle">
                        <Aim />
                    </el-icon>
                </el-tooltip>
                <div class="avatar">
                    <el-avatar :size="25" :src="userInfo.user.avatar" class="pig" />
                    <el-dropdown @command="btnClick">
                        <span class="el-dropdown-link">
                            {{ userInfo.user.username }}
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <!-- TODO: 将上面代码进行抽离出去（组件化） -->

        <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="submitForm(ruleFormRef)">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" :size="formSize" label-width="80px"
                label-position="right">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="ruleForm.oldPassword" />
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" show-password />
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input v-model="ruleForm.rePassword" type="password" show-password />
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { Fold,Expand, ElemeFilled, Refresh, FullScreen, ArrowDown, Aim } from '@element-plus/icons-vue'
import useUserInfo from '@/stores/modules/userInfo';
import { messageBox } from '@/hooks/messageBox'
import { useRouter } from 'vue-router';
import { notification } from '@/hooks/notice'
import { useFullscreen } from '@vueuse/core'
import formDrawer from '@/components/formDrawer/formDrawer.vue';
import { useForm } from '@/hooks/submitForm';
import useMainStore from '@/stores/modules/main.js'

const userInfo = useUserInfo()
const router = useRouter()
const mainStore = useMainStore()
// 全屏切换
const { isFullscreen, toggle } = useFullscreen()

const { formDrawerRef,formSize, ruleFormRef, ruleForm, rules, submitForm, openDrawer } = useForm()

// TODO:退出登录函数,抽离出去
function Logout() {
    messageBox('退出登录吗?').then(() => {
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
            notification('退出登录成功！', 'success')
        })
    }).catch((err) => {

    })
}

// 退出登录和修改密码
const btnClick = (e) => {
    switch (e) {
        case 'logout':
            Logout()
            break;
        case 'rePassword':
            openDrawer()
            break;
    }
}

// 刷新
const handleRefresh = () => {
    location.reload()
}

const asideClick = () => {
    mainStore.changeAsideWidth()
}


// const formSize = ref('default')
// const ruleFormRef = ref()
// const ruleForm = reactive({
//     oldPassword: '',
//     password: '',
//     rePassword: '',
// })

// const rules = reactive({
//     oldPassword: [
//         { required: true, message: '请输入旧密码', trigger: 'blur' },
//     ],
//     password: [
//         { required: true, message: '请输入新密码', trigger: 'blur' },
//     ],
//     rePassword: [
//         { required: true, message: '确认密码必填', trigger: 'blur' },
//     ],
// })


// // 提交功能实现
// const submitForm = async (formEl) => {
//     if (!formEl) return
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             console.log(1);
//             formDrawerRef.value.showLoading()
//             userInfo.changePassword(ruleForm).then(res => {
//                 // 退出登录
//                 userInfo.logout()
//                 // 跳转登录页面
//                 router.push('/login')
//                 // 提示退出登录成功
//                 notification('修改密码成功！', 'success')
//             }).finally(() => {
//                 formDrawerRef.value.hideLoading()
//             })
//         } else {
//             return false;
//         }
//     })
// }

// 取消修改密码
// const resetForm = (formEl) => {
//     if (!formEl) return
//     formEl.resetFields()
//     close()
// }

</script>

<style lang='less' scoped>
.header {
    display: flex;
    align-items: center;
    height: 64px;
    background-color: var(--color-purple);
    color: var(--color-white);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    .logo {
        width: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 300;

        .logo1 {
            margin-right: 10px;
        }
    }

    .box {
        margin-left: auto;
        display: flex;
        align-items: center;

        .avatar {
            display: flex;
            align-items: center;
            height: 64px;
            margin: 0 20px;
            cursor: pointer;

            .pig {
                margin-right: 0.5rem;
            }

            .el-dropdown-link {
                color: var(--color-white);
                outline: none;
            }

            .el-dropdown-link:hover {
                outline: none;

            }
        }
    }
}

.icon-btn {
    width: 42px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.icon-btn:hover {
    background-color: #7c3aed;
}
</style>
