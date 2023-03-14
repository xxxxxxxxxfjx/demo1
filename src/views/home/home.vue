<template>
    <div class="home">
        <el-row :gutter="20">
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
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useUserInfo from '@/stores/modules/userInfo';
import useHomeStore from '@/stores/modules/home'
import Gsap from '@/components/gsap/gsap.vue'

const homeStore = useHomeStore()
const userInfo = useUserInfo()
homeStore.fetchStatistics1()

</script>

<style lang='less' scoped>
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
