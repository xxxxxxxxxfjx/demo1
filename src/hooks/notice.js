// 封装成功登录/失败登录等提示框
export function notification(message='登录成功',type='success',dangerouslyUseHTMLString=true) {
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString
    })
}