<template>
    <div class="home">
        <el-row :gutter="20" class="one">
            <!-- 骨架屏 -->
            <template v-if="homeStore.panels.length == 0">
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width:100%" animated loading>
                        <template #template>
                            <el-card class="box-card" shadow="hover">
                                <template #header>
                                    <div class="card-header">
                                        <el-skeleton-item variant="text" style="width: 30%" />
                                        <el-skeleton-item variant="text" style="width: 15%" />
                                    </div>
                                </template>
                                <el-skeleton-item variant="h3" style="width: 80%" />
                                <el-divider />
                                <div class="footer">
                                    <el-skeleton-item variant="text" style="width: 60%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>

            <el-col :span="6" v-for="(item, index) in homeStore.panels" :key="index">
                <el-card class="box-card" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.title }}</span>
                            <el-tag :type="item.unitColor" color="transparent">{{ item.unit }}</el-tag>
                        </div>
                    </template>
                    <span class="value">
                        <Gsap :value="item.value" />
                    </span>
                    <el-divider />
                    <div class="footer">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <home-nav></home-nav>
        <el-row :gutter="20">
            <el-col :span="12">
                <home-bar-chart></home-bar-chart>
            </el-col>
            <el-col :span="12">
                <home-goods-order class=" mb-5" :title="'店铺及商品提示'" :tip="'店铺及商品提示'" :values="goods"></home-goods-order>
                <home-goods-order :title="'交易提示'" :tip="'需要立即处理的交易订单'" :values="order"></home-goods-order>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useUserInfo from '@/stores/modules/userInfo';
import useHomeStore from '@/stores/modules/home'
import Gsap from '@/components/gsap/gsap.vue'
import HomeNav from './cpns/homeNav.vue'
import HomeBarChart from "./cpns/homeBarChart.vue"
import HomeGoodsOrder from './cpns/homeGoodsOrder.vue'
import { storeToRefs } from 'pinia';
const homeStore = useHomeStore();
const { goods, order } = storeToRefs(homeStore);

const userInfo = useUserInfo();
homeStore.fetchStatistics1();
homeStore.fetchStatistics2();

</script>

<style lang='less' scoped>
.home>.el-row:not(.one) {
    margin-top: 25px;
}

.box-card {
    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }

    .value {
        font-size: 30px;
        font-weight: 800;
        color: #6b7280;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #6b7280;
    }
}
</style>
