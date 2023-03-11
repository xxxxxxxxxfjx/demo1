import useUserInfo from '@/stores/modules/userInfo';
import { useRouter } from 'vue-router';
import { notification } from '@/hooks/notice';
import { ref, reactive} from 'vue';

export function useForm() {
    const userInfo = useUserInfo();
    const router = useRouter();

    const formDrawerRef = ref();
    const formSize = ref('default');
    const ruleFormRef = ref();
    const ruleForm = reactive({
        oldPassword: '',
        password: '',
        rePassword: '',
    });

    const rules = reactive({
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        rePassword: [{ required: true, message: '确认密码必填', trigger: 'blur' }],
    });

    // 提交功能实现
    const submitForm = async formEl => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                formDrawerRef.value.showLoading();
                userInfo
                    .changePassword(ruleForm)
                    .then(res => {
                        // 退出登录
                        userInfo.logout();
                        // 跳转登录页面
                        router.push('/login');
                        // 提示退出登录成功
                        notification('修改密码成功！', 'success');
                    })
                    .finally(() => {
                        formDrawerRef.value.hideLoading();
                    });
            } else {
                return false;
            }
        });
    };

    const openDrawer = () => {
        formDrawerRef.value.open()
    }

    return {
        formDrawerRef,formSize,ruleFormRef,ruleForm,rules,submitForm,openDrawer
    }
}
