<template>
    <Teleport to="body">
        <div
            class="l-modal"
            :class="{ 'is-open': isReady }"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-describedby="modalDescription"
        >
            <component :is="modalComponent" :data="modalData" @close="close" />
        </div>
    </Teleport>
</template>

<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";

import ProjectModal from "@/templates/components/Modals/ProjectModal.vue";

export default defineComponent({
    name: "TheModal",
    components: {
        ProjectModal,
    },
    props: {},
    setup(props) {
        const store = useStore();

        const isOpen = ref(false);

        const close = () => {
            isOpen.value = false;
            setTimeout(() => {
                store.dispatch("modal/close");
            }, 600);
        };

        const currentScroll = ref(0);

        const isReady = computed(() => {
            return store.getters["modal/hasModal"] && isOpen.value;
        });
        const hasModal = computed(() => {
            return store.getters["modal/hasModal"];
        });

        const modalData = computed(() => {
            return store.state.modal.data;
        });

        const modalComponent = computed(() => {
            return store.state.modal.component;
        });

        watch(hasModal, (open) => {
            if (open) {
                isOpen.value = true;
                currentScroll.value = window.scrollY;
                store.dispatch("scroll/toggleDisabledScroll", true);
            } else {
                window.scrollTo(0, currentScroll.value);
                store.dispatch("scroll/toggleDisabledScroll", false);
            }
        });

        return {
            isReady,
            currentScroll,
            isOpen,
            modalData,
            modalComponent,
            close,
            hasModal,
        };
    },
});
</script>

<style lang="scss">
.l-modal {
    @include full-screen-dom();
    z-index: 102;
    background: var(--color-green);
    //opacity: 0;
    pointer-events: none;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    overflow-y: auto;
    overflow-x: hidden;
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 2s $custom-ease;

    width: 100%;
    height: 100%;

    &.is-open {
        //opacity: 1;
        clip-path: circle(100% at 50% 50%);
        pointer-events: auto;
    }
}

.backdrop {
    background-color: var(--color-black);

    height: 100%;
    width: 100%;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0.4s, opacity 0.4s linear;
    z-index: 99;

    &.is-open {
        visibility: visible;
        opacity: 0.4;
    }
}
</style>
