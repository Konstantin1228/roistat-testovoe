<template>
    <transition name="modal-fade">
        <div v-if="visible" class="modal-backdrop">
            <div class="modal" role="dialog"  v-click-outside="close">
                <header class="modal-header">
                    <h1>{{ title }}</h1>
                    <button class="btn-close" @click="close">
                        <img :src="closeImage" alt="close">
                    </button>
                </header>

                <slot />
            </div>
        </div> 
    </transition>
</template>
<script>
import closeImage from '../../images/close.svg'
import Button from './Button.vue';


export default {
    name: 'Modal',
    components: {
        Button
    },
    props: {
        close: { type: Function },
        visible: { required: true, type: Boolean },
        title: { required: true, type: String }
    },
    data: () => {
        return { closeImage }
    }
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
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

.modal-header {
    padding: 10px;
    padding-left: 0px;
    margin-top: 4px;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 13px 10px 0;
    cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease;
}
</style>
