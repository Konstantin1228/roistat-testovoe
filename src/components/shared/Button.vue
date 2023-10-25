<template>
    <button class="button" @click="$emit('click')" :style="{ fontSize: size }">
        <slot />
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        size: { type: Number, default: 20 },
    },
    emits: ['click'],
}
</script>
<style scoped>
.button {
    display: flex;
    width: fit-content;
    align-items: center;
    padding: 10px 20px;
    color: white;
    background-color: #4CAF50;
    border-radius: 6px;
}
</style>