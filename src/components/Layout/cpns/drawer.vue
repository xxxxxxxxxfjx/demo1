<template>
    <div class="drawer-form">
        <div class="form">
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
                <div class="box">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">
                            {{
                                loading ? '提交 ...' : '提交'
                            }}
                        </el-button>
                        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>

    
</template>

<script setup>
import { ref, reactive } from 'vue'
import useUserInfo from '@/stores/modules/userInfo';
import { useRouter } from 'vue-router';
import { notification } from '@/hooks/notice'

const emits = defineEmits(['closeDrawer'])
const loading = ref(false)
const userInfo = useUserInfo()

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    oldPassword: '',
    password: '',
    rePassword: '',
})

const rules = reactive({
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    rePassword: [
        { required: true, message: '确认密码必填', trigger: 'blur' },
    ],
})

const router = useRouter()

// 提交功能实现
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            loading.value = true;
            userInfo.changePassword(ruleForm).then(res => {
                // 退出登录
                userInfo.logout()
                // 跳转登录页面
                router.push('/login')
                // 提示退出登录成功
                notification('修改密码成功！', 'success')
            }).finally(() => {
                loading.value = false;
            })
        } else {
            return false;
        }
    })
}

// 取消修改密码
const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    emits('closeDrawer')
}

</script>

<style lang='less' scoped>
.drawer-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
