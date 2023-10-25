<template>
    <div>
        <div class="add-button-parent">
            <Button @click="openModal">
                <img :src="plusSvg" alt="plus">
                <span class="ml-1">Добавить</span>
            </Button>
        </div>

        <Modal :visible="isModalVisible" @close="closeModal" title="Добавление пользователя">
            <div class="modal-body">
                <span class="modal-body-field-text">Имя</span>
                <input v-model="formValues.name" placeholder="Александр" class="modal-body-field-input" type="text">

                <span class="modal-body-field-text">Телефон</span>
                <input v-model="formValues.phone" placeholder="+7 (351) 240-04-40" @input="telephoneInput" class="modal-body-field-input" type="text">

                <span class="modal-body-field-text">Начальник</span>
                <select class="select" v-model="formValues.chief">
                    <option value="" selected>Отсутствует</option>
                    <option v-for="(item, index) in options" :key="index" :value="item">{{ item.name }}</option>
                </select>
            </div>

            <footer class="modal-footer">
                <Button :size="14" @click="saveUser">Сохранить</Button>
            </footer>
        </Modal>
    </div>
</template>
<script>
import { formattedTelephone } from "../filters/formatTelephone";
import plusSvg from "../images/plus.svg"

import Button from './shared/Button.vue';
import Modal from "./shared/Modal.vue";

export default {
    name: 'AddUser',
    components: {
        Modal,
        Button,
    },
    props: {
        treeData: { required: true, type: Array },
    },
    emits: ['updateData', 'pushInTree'],
    data() {
        return {
            options: this.flatTree(this.treeData),
            isModalVisible: false,
            formValues: { name: '', phone: '', chief: '', },
            plusSvg
        }
    },
    methods: {
        saveUser() {
            const { name, phone: telephone, chief } = this.formValues
            if (chief) {
                const newData = this.addNewDataToTree(this.treeData, chief.id, { name, telephone, level: chief.level + 1, children: [], id: this.$data.options.length + 1, expanded: true })
                this.$emit('updateData', newData)
            } else {
                this.$emit('pushInTree', { name, telephone, level: 0, children: [], id: this.$data.options.length + 1, expanded: true })
            }

            this.clearForm()
            this.closeModal()
        },
        telephoneInput(e) {
            this.formValues.phone = formattedTelephone(e)
        },
        flatTree(tree, level = 0) {
            let flattened = [];

            tree.forEach(({ children, name, id }) => {
                const newNode = { name, id, level };
                flattened.push(newNode);

                if (children && children.length > 0) {
                    flattened = flattened.concat(this.flatTree(children, level + 1));
                }
            });

            return flattened;
        },
        addNewDataToTree(nodeList, targetNodeId, newData) {
            function findNodeAndAddData(nodes) {
                return nodes.map((node) => {
                    if (node.id === targetNodeId && node.level === newData.level - 1) {
                        node.children.push(newData);
                    } else if (node.children.length > 0) {
                        node.children = findNodeAndAddData(node.children);
                    }
                    return node;
                });
            }
            return findNodeAndAddData(nodeList);
        },
        openModal() {
            this.isModalVisible = true
        },
        closeModal() {
            this.isModalVisible = false
        },
        clearForm() {
            this.formValues = { name: '', phone: '', chief: '', }
        }
    },
    watch: {
        'formValues.phone'(){
            console.log(32131231);
        },
        treeData: {
            handler() {
                const treeData = this.treeData
                this.options = this.flatTree(treeData)
                localStorage.setItem('treeData', JSON.stringify(treeData))
            }, deep: true
        }
    }
}
</script>
<style scoped>
.add-button-parent {
    margin-left: auto;
    width: fit-content;
    margin-bottom: 20px;
}

.select {
    border: 2px solid #979090;
    border-radius: 4px;
}

.modal {
    position: relative;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding: 20px 25px;
    border-radius: 12px;
}

.modal-footer {
    margin-top: 20px;
    font-weight: 500;
}

.modal-body {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
}

.modal-body-field {
    display: flex;
    justify-content: space-between;
    gap: 15px;
}

.modal-body-field-text {
    font-size: 18px;
}

.modal-body-field-input {
    border: 2px solid #979090;
    border-radius: 4px;
    caret-color: #979090;
    padding: 3px 5px;
}
</style>