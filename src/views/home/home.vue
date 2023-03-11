<template>
    <div class="home">
        {{ userInfo.user }}
    </div>
</template>

<script setup>

import useUserInfo from '@/stores/modules/userInfo';
import { useRouter } from 'vue-router';


const userInfo = useUserInfo()

</script>

<style lang='less' scoped></style>
