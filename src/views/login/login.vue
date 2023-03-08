<template>
    <div class="login">
        <el-row class="content">
            <el-col :lg="16" :md="12" class="left">
                <div class="box">
                    <h1 class="title">欢迎光临</h1>
                    <p class="text">此站点是《vue3 + vite实战商城后台开发》课程视频的演示地址</p>
                </div>
            </el-col>
            <el-col :lg="8" :md="12" class="right">
                <h2 class="title">欢迎回来</h2>
                <div class="box">
                    <span class="line"></span>
                    <span class="text">账号密码登录</span>
                    <span class="line"></span>
                </div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="form">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="passward">
                        <el-input v-model="ruleForm.passward" placeholder="请输入密码" type="password">
                            <template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="box">
                        <el-button type="primary" @click="submitForm(ruleFormRef)" class="btn"
                            :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/services/modules/login.js'
import { getInfo } from '@/services/modules/userInfo.js'
import { useRouter } from 'vue-router';
// import { useCookies } from '@vueuse/integrations/useCookies'
import { setToken } from '@/hooks/cookies'
import { notification } from '@/hooks/notice'


const ruleFormRef = ref()
const ruleForm = reactive({
    username: '',
    passward: ''
})

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    passward: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const loading = ref(false)
const router = useRouter()
// const cookies = useCookies();
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (!valid) return false;
        loading.value = true;
        login(ruleForm.username, ruleForm.passward)
            .then(res => {
                console.log(res);
                // 登录成功提示
                // ElNotification({
                //     message: '登录成功',
                //     type: 'success',
                //     duration: 3000
                // })
                notification()

                // 保存token/cookies
                // const token = res.data.data.token;
                // localStorage.setItem('token', token)
                // cookies.set('token', res.token)
                setToken(res.token)

                // 获取用户相关信息
                getInfo().then(res => {
                    console.log(res);
                })

                // 页面跳转
                router.push('/')
            }).finally(() => {
                loading.value = false;
            })
    })
}

</script>

<style lang='less' scoped>
.content {
    min-height: 100vh;
    background: var(--color-purple);

    .left {
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 60px;
            font-weight: 800;
            color: var(--color-white);
            margin-bottom: 20px;
        }

        .text {
            font-size: 20px;
            color: var(--color-white);

        }
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: var(--color-white);

        .title {
            color: #000;
            font-size: 40px;
            font-weight: 800;
        }

        .box {
            display: flex;
            align-items: center;
            margin: 20px 0 30px;

            .line {
                display: block;
                height: 1px;
                width: 36px;
                background-color: #ddd;
            }

            .text {
                font-size: 20px;
                color: #ddd;
                margin: 0 10px;

            }
        }


        .form {
            width: 250px;

            .btn {
                width: 250px;
            }

        }
    }
}
</style>
