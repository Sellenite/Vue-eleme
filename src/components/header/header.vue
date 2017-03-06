<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" v-bind:src="seller.avatar" alt="商家头像">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime | minFromat}}送达
                </div>
                <!--防止一开始取不到supports，报undefined-->
                <div v-if="seller.supports" class="support">
                    <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" v-on:click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img v-bind:src="seller.avatar" width="100%" height="auto">
        </div>
        <div class="detail" v-show="detailShow" v-on:click="showDetail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <star v-bind:size="48" v-bind:score="seller.score"></star>
                </div>
            </div>
            <div class="detail-close">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '../star/star';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false
            };
        },
        filters: {
            minFromat: function (value) {
                return value + '分钟';
            }
        },
        methods: {
            showDetail() {
            this.detailShow = !this.detailShow;
          }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            star
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'

    .header
        position : relative
        color : #FFF
        background : rgba(7, 17, 27, 0.5)
        .content-wrapper
            position : relative
            padding : 24px 12px 28px 24px
            font-size : 0
            .avatar
                display : inline-block
                font-size : 14px
                img
                    border-radius : 2px
            .content
                display : inline-block
                vertical-align : top
                margin-left : 16px
                .title
                    margin : 2px 0 8px 0
                    .brand
                        display : inline-block
                        vertical-align : top
                        width : 30px
                        height : 18px
                        bg-image('brand')
                        background-size : 30px 18px
                        background-repeat : no-repeat
                    .name
                        margin-left : 6px
                        font-size : 16px
                        line-height : 18px
                        font-weight : bold
                .description
                    margin-bottom : 10px
                    line-height : 12px
                    font-size : 12px
                .support
                    .icon
                        display : inline-block
                        vertical-align : top
                        width : 12px
                        height : 12px
                        margin-right : 4px
                        background-size : 12px 12px
                        background-repeat : no-repeat
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                    .text
                        font-size : 10px
                        line-height : 12px
            .support-count
                position : absolute
                right : 12px
                bottom : 26px
                padding : 0 8px
                height : 24px
                line-height : 24px
                border-radius : 14px
                background : rgba(0,0,0,0.2)
                font-size : 10px
                text-align : center
                .icon-keyboard_arrow_right
                    vertical-align : middle
                    line-height : 24px
                    margin-left : 2px
        .bulletin-wrapper
            position : relative
            height : 28px
            line-height : 28px
            padding : 0 22px 0 12px
            white-space : nowrap
            overflow : hidden
            text-overflow : ellipsis
            background : rgba(7,17,27.0.2)
            .bulletin-title
                display : inline-block
                vertical-align : middle
                width : 22px
                height : 12px
                bg-image('bulletin')
                background-size : 22px 12px
                background-repeat : no-repeat
            .bulletin-text
                margin : 0 4px 0 2px
                font-size : 10px
            .icon-keyboard_arrow_right
                position : absolute
                font-size : 10px
                right : 12px
                top : 10px
        .background
            position : absolute
            top : 0
            left : 0
            width : 100%
            height : 100%
            z-index : -1
            overflow : hidden
            img
                filter : blur(10px)
                position : relative
                top : -85%
        .detail
            position : fixed
            top : 0
            left : 0
            z-index : 100
            width : 100%
            height : 100%
            overflow : auto
            background : rgba(7, 17, 27, 0.8)
            .detail-wrapper
                min-height : 100%
                width : 100%
                .detail-main
                    margin-top : 64px
                    padding-bottom : 64px
                    .name
                        line-height : 16px
                        text-align : center
                        font-size : 16px
                        font-weight : 700
            .detail-close
                position : relative
                width : 32px
                height : 32px
                margin : -64px auto 0 auto
                clear : both
                font-size : 32px
</style>