<template>
    <div>
        <AddUser :treeData="treeData" @updateData="updateTree" @pushInTree="pushInTree" />
        <Table :treeData="treeData" @updateData="updateTree"/>
    </div>
</template>
<script>
import AddUser from './AddUser.vue';
import Table from './Table.vue';

export default {
    name: 'Home',
    components: {
        AddUser,
        Table,
    },
    data() {
        const treeData = JSON.parse(localStorage.getItem('treeData') || '[]')
        return { treeData };
    },
    methods: {
        pushInTree(node) {
            this.treeData = [...this.treeData, node]
        },
        updateTree(treeData) {
            this.treeData = treeData
        }
    },
}
</script>