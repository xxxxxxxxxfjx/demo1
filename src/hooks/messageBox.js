export function messageBox(content, type = 'warning', title = '') {
    return ElMessageBox.confirm(content, title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type,
    });
}
export function messageRename(tips, value = '') {
    return ElMessageBox.prompt(tips, '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value,
    });
}
