<template>
    <div class="home">
        <h2>home</h2>
    </div>
</template>

<script setup>

import useUserInfo from '@/stores/modules/userInfo';
import { useRouter } from 'vue-router';


const userInfo = useUserInfo()

</script>

<style lang='less' scoped></style>
