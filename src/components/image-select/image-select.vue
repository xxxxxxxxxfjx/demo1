<template>
    <div class="image-select">
        <el-select :modelValue="modelValue" placeholder="请选择图标" @change="handleChange" filterable >
            <el-option v-for="item in icons" :key="item" :label="item" :value="item">
                <div class="list">
                    <el-icon :size="20">
                        <component :is="item"></component>
                    </el-icon>
                    <span>{{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import * as iconList from '@element-plus/icons-vue';

const props = defineProps({
    modelValue: {
        type: String
    }
})
const emit = defineEmits(['update:modelValue'])
const icons = ref(Object.keys(iconList));
const handleChange = (e) => {
    emit('update:modelValue',e)
}
</script>

<style lang='less' scoped>
.list {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
