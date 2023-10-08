<template>
    <div v-if="treeData.length > 0" class="table">
        <div class="grid">
            <!-- @click="changeSortMethod"  -->
            <span class="pointer"> Имя </span>
            <span>Телефон</span>
            <TreeNode :nodes="treeData" />
        </div>
    </div>
    <h1 v-else>Добавьте данные!</h1>
</template>
<script>
import TreeNode from './shared/TreeNode.vue';

export default {
    name: 'Table',
    components: {
        TreeNode
    },
    props: {
        treeData: { type: Array, required: true, default: [] }
    },
    emits: ['updateData'],
    data() {
        return { aToZ: true }
    },
    methods: {
        changeSortMethod() {
            this.aToZ = !this.aToZ
            const data = this.sortData(this.treeData, this.aToZ)

            this.$emit('updateData', data)
        },
        sortData(data, fromAToZ) {
            const sortedData = JSON.parse(JSON.stringify(data))

            sortedData.forEach((node) => {
                if (node.children.length > 0) node.children = this.sortData(node.children, fromAToZ);
            });

            sortedData.sort((a, b) => {
                const [nameA, nameB] = [a.name.toLowerCase(), b.name.toLowerCase()]
                return fromAToZ ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
            });

            return sortedData; 
        },
    }
}
</script>
<style >
.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 0.2fr));
}

.grid span {
    border-collapse: collapse;
    border: 1px solid #000;
    padding: 12px 8px;
}
</style>