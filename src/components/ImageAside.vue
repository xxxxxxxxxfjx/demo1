<template>
    <div class="list" :class="{ 'active': active }">
        <span class=" truncate">
            <slot></slot>
        </span>
        <el-button text class="ml-auto btn" @click="$emit('edit')">
            <el-icon color="skyblue">
                <Edit />
            </el-icon>
        </el-button>
        <el-popconfirm width="220" confirm-button-text="确认" cancel-button-text="取消" title="确认删除该分类?" @confirm="deleteCategory">
            <template #reference>
                <el-button text class="btn" >
                    <el-icon color="skyblue">
                        <Close />
                    </el-icon>
                </el-button>
            </template>
        </el-popconfirm>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['edit', 'delete', 'itemClick'])

const deleteCategory = () => {
    emit('delete');
}



</script>

<style lang='less' scoped>
.list {

    &:hover {
        background-color: #eaf3fe;
    }

    cursor: pointer;
    padding: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #555;

    .btn {

        padding: 5px 11px;
    }

    .text {
        margin-bottom: 10px !important;
    }
}

.active {
    background-color: #eaf3fe;
}

:deep(.el-popper) .text {
    margin-bottom: 20px;
}
</style>
