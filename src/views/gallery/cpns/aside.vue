<template>
    <el-aside width="220px" class="asideContent" v-loading="loading">
        <div class="top">
            <template v-for="(item, index) in imgList" :key="index">
                <image-aside @edit="edit(item)" @delete="deleteItem(item.id)" :active="currentIndex == item.id"
                    @click="itemClick(item)">{{ item.name }}</image-aside>
            </template>
        </div>
        <div class="footer">
            <el-pagination background layout="prev, next" :total="totalCount" :page-size="limit"
                @current-change="getdata" />
        </div>
    </el-aside>
</template>

<script setup>
import ImageAside from '@/components/ImageAside.vue'
import useImageStore from '@/stores/modules/image';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { notification } from '@/hooks/notice';


// 分页设置
const currentPage = ref(1);
const limit = ref(10);

// 动画
const loading = ref(false)
const imageStore = useImageStore();

// 请求数据
function getdata(p = null) {
    if (typeof p == 'number') {
        currentPage.value = p;
    }
    loading.value = true;
    imageStore.fetchImageList(currentPage.value).finally(() => {
        loading.value = false;
    })
}
getdata();

const { imgList, totalCount } = storeToRefs(imageStore);
const currentIndex = ref(0);

// 一开始请求数据慢
watch(() => imgList, newValue => {
    currentIndex.value = newValue.value[0].id;
}, {
    deep: true
})

// 切换选中tab
const itemClick = (item) => {
    currentIndex.value = item.id;
}

const emit = defineEmits(['editAside']);


//TODO:这里使用了两次emit 代码效率不高 并且后期将抽屉组件移植到该组件中
// 编辑
const edit = (obj) => {
    emit('editAside', obj);
}

// 删除
const deleteItem = (id) => {
    imageStore.fetchDeleteImgCategory(id)
        .then(res => {
            notification('成功删除');
            getdata(currentPage.value);
        }).finally(() => {
            loading.value = false;
        })
}


// 暴露刷新方法给父组件
function refresh(p = null) {
    if (typeof p == 'number') {
        currentPage.value = p;
    }
    getdata(currentPage.value)
}

watch(() => currentIndex.value, (newValue) => {
    imageStore.getCurrentId(newValue);
})

defineExpose({
    refresh
})




</script>

<style lang='less' scoped>
.asideContent {
    position: relative;
    border-right: 1px solid #eee;

    .top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }

    .footer {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
