<template>
    {{ count.num.toFixed(0) }}
</template>

<script setup>
import { reactive, watch } from 'vue';
import gsap from 'gsap'

const props = defineProps({
    value: {
        default: 0,
        type: Number
    }
})
const count = reactive({
    num: 0
})

function animate() {
    gsap.to(count, {
        num: props.value,
        duration: 0.5
    })
}
animate()
watch(() => props.value, () => animate())
</script>

<style lang='less' scoped></style>
