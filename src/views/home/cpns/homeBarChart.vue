<template>
    <el-card class="box-card" shadow="never" v-permission="['getStatistics3,GET']">
        <template #header>
            <div class="card-header">
                <span>订单统计</span>
                <div>
                    <template v-for="(item, index) in tags" :key="index">
                        <el-check-tag class="tag" :checked="currentTag == item.type" @change="handleChoose(item.type)">{{
                            item.title
                        }}</el-check-tag>
                    </template>
                </div>
            </div>
        </template>
        <div ref="el" id="barChart" style="width: 100%;height: 300px;"></div>
    </el-card>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useResizeObserver } from '@vueuse/core'
import * as echarts from 'echarts';

const el = ref();
const homeStore = useHomeStore();
const currentTag = ref('week')
const tags = [{
    title: '近1个月',
    type: 'month'
}, {
    title: '近1周',
    type: 'week'
}, {
    title: '近24个小时',
    type: 'hour'
}];

const handleChoose = (type) => {
    currentTag.value = type;
    getData()
};
let myChart = null;
let chartDom = null;
onMounted(() => {
    chartDom = document.getElementById('barChart');
    if (chartDom) {
        myChart = echarts.init(chartDom);
        getData();
    }
})
onBeforeUnmount(() => {
    myChart.dispose()
})
function getData() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    myChart.showLoading();
    homeStore.fetchStatistics3(currentTag.value).then(res => {
        option.xAxis.data = res.x
        option.series[0].data = res.y
        myChart.setOption(option);

    }).finally(() => {
        myChart.hideLoading();
    });
}

useResizeObserver(el, (entries) => {
    if (chartDom) {
        myChart.resize()
    }
})



</script>

<style lang='less' scoped>
.box-card {

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .tag {
            margin: 0 4px;
        }
    }
}
</style>
