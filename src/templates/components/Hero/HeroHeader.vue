<template>
    <section class="c-hero-header" v-view.progress>
        <div class="c-hero-header__content">
            <div class="c-hero-header__blur"></div>
            <div class="c-hero-header__top">
                <div class="c-hero-header__top-left">
                    <div class="c-hero-header__top-left-txt">
                        <h1 class="c-hero-header__top-left-txt-title">
                            Léo —
                            <br />
                            Genot.
                        </h1>
                    </div>
                </div>
            </div>
            <div class="c-hero-header__bottom">
                <div class="c-hero-header__bottom-right">
                    <div class="c-hero-header__bottom-right-block">
                        <div class="c-hero-header__bottom-right-txt">
                            <h1 class="c-hero-header__bottom-right-txt-title">
                                Creative <br />
                                Developer.
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-hero-header__more">
            <div class="c-hero-header__more-toprow">
                <div class="c-hero-header__more-toprow-left">
                    <h2 class="c-hero-header__more-toprow-left-txt">
                        My latest works
                        <br />
                        @2022
                    </h2>
                </div>
                <div class="c-hero-header__more-toprow-right">
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        Web developer based in Paris, France. Dynamic and open
                        minded to create impact and help brands achieve their
                        goals. With a focus on digital development and design
                        direction.
                    </p>
                </div>
            </div>
            <div class="c-hero-header__more-bottomrow"><list-btn /></div>
        </div>
    </section>
</template>
<script>
import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";
import { gsap, ScrollTrigger, ScrollSmoother } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import TagItem from "@/templates/components/_shared/TagItem.vue";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";
import ListBtn from "@/templates/components/ListBtn.vue";

export default defineComponent({
    components: {
        TagItem,
        ButtonPrimary,
        ListBtn,
    },
    setup() {
        onMounted(() => {
            ScrollTrigger.refresh();
        });
    },
});
</script>

<style lang="scss">
.c-hero-header {
    width: 100%;
    height: fit-content;
    padding: 0px 5% 40px;
    @include min(md) {
        padding: 100px 5% 40px;
    }
    overflow-x: hidden;

    &__blur {
        position: absolute;
        width: 50vh;
        height: 50vh;
        @include min(md) {
            width: 30vh;
            height: 30vh;
        }
        border-radius: 100%;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%)
            scale(calc(2 * calc(var(--view-progress) * 2)));
        background-color: var(--color-orange);
        overflow: hidden;
        will-change: filter;
        @include blur(calc(var(--view-progress) * 50px));
    }
    &__content {
        position: relative;
        display: flex;
        width: 100%;
        height: 100vh;
        @include min(md) {
            height: 80vh;
        }

        justify-content: center;
        z-index: 1;
        font-size: var(--fs-large);
        font-family: var(--ff-heading);
        color: var(--color-pistachio);
        @include min(md) {
            font-size: var(--fs-2xl);
        }
    }
    &__top {
        position: absolute;
        left: 0%;
        top: 0%;
        right: auto;
        bottom: auto;
        width: -webkit-fill-available;
        &-left {
            width: 70%;
            position: relative;
            flex-direction: column;
            &-txt {
                overflow: hidden;
                padding-top: 1em;

                text-transform: uppercase;
                &-title {
                }
            }
        }
    }
    &__bottom {
        text-align: right;
        position: absolute;
        left: 0%;
        top: auto;
        right: 0%;
        bottom: 0%;
        display: flex;
        width: -webkit-fill-available;
        justify-content: space-between;

        justify-content: flex-end;
        &-right {
            position: relative;
            display: flex;
            width: 100%;
            padding-left: 0%;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;

            &-txt {
                width: 100%;
                overflow: hidden;
                padding-top: 1em;
                padding-bottom: 1em;

                text-transform: uppercase;
                &-title {
                }
            }
            &-block {
                width: 100%;
                flex-direction: column;
            }
        }
    }

    &__more {
        display: flex;
        flex-direction: column;
        gap: 5rem;
        --border-color: var(--color-pistachio);
        @include border(top);
        margin-top: 5rem;
        z-index: 3;
        @include min(md) {
            gap: 10rem;
            margin-top: 15rem;
        }
        &-toprow {
            margin-top: 5rem;
            display: flex;
            flex-flow: row wrap;
            color: var(--color-pistachio);
            font-size: var(--fs-small);
            @include min(md) {
                font-size: var(--fs-regular);
            }
            @include min(md) {
                flex-flow: row nowrap;
            }
            &-left {
                width: -webkit-fill-available;

                &-txt {
                }
            }
            &-right {
            }
        }
    }
}
</style>
