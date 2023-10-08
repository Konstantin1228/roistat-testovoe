<template>
    <fragment>

        <template v-for="(node, index) in nodes">
            <span class="pointer" :key="node.id" @click="toggleNode(node)" v-if="node.children.length > 0" :style="{ marginLeft: `${node.level * 20}px` }">+{{ node.name }}</span>
            <span v-else :style="{ marginLeft: `${node.level * 20}px` }">{{ node.name }}</span>
            <span>{{ node.telephone }}</span>
            <TreeNode v-if="node.expanded && node.children" :nodes="node.children"  />
        </template>

    </fragment>
</template>
  
<script>
export default {
    name: 'TreeNode',
    props: {
        nodes: Array
    },
    methods: {
        toggleNode(node) {
            node.expanded = !node.expanded;
        }
    },
};
</script>