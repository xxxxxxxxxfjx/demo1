<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <span>{{ title }}</span>
                <el-tag type="danger" color="transparent">{{ tip }}</el-tag>
            </div>
        </template>
        <el-row :gutter="20">
            <template v-for="(item, index) in values" :key="index">
                <el-col :span="6">
                    <el-card class="subCard" shadow="hover">
                        <div class="content">
                            <span class="text">{{ item?.value }}</span>
                            <span class="label">{{ item?.label }}</span>
                        </div>
                    </el-card>
                </el-col>
            </template>
        </el-row>
    </el-card>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    tip: {
        type: String,
        default: ''
    },
    values: {
        type: Array,
        default: () => ([])
    }
})
</script>

<style lang='less' scoped>
.box-card {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.subCard {
    cursor: pointer;
    border: none;
    background-color: rgb(246, 246, 246);

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .text {
            color: #1f1d1d;
            margin-bottom: 10px;
            font-size: 20px;
        }

        .label {
            color: #9ca3af;
            font-size: 14px;

        }
    }
}
</style>
