export function messageBox(content,type='warning',title='') {
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type,
    })
}
