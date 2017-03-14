<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" v-on:click="decreaseCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" v-on:click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    /* 引入Vue用来做Vue.set */
    import Vue from 'vue';

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                /* 这句的意思是PC端会有两次点击事件，过滤掉PC的其中一个点击事件，这个是better-scroll特有的，所以保留 */
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    /* 给数据添加一个本来没有的属性，用Vue.set(obj, key, value) */
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$emit('add', event.target);
            },
            decreaseCart() {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease,
        .cart-add
            display: inline-block
            line-height: 24px
            font-size: 24px
            padding: 6px
            color: rgb(0, 160, 220)
        .cart-decrease
            &.move-enter-active, &.move-leave-active
                transition: all .2s linear
            &.move-enter, &.move-leave-active
                opacity: 0
                transform: translate3d(24px, 0, 0) rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
</style>