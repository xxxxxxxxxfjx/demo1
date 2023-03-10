import nprogress from "nprogress";

// 显示全屏loading
export function openLoading(){
    nprogress.start()
}

// 关闭全屏loading
export function closeLoading() {
    nprogress.done()
}