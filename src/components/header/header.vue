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
                    <span class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        filters: {
            minFromat: function (value) {
                return value + '分钟';
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'

    .header
        color : #FFF
        background : #000
        .content-wrapper
            padding : 24px 12px 28px 24px
            font-size : 0
            .avatar
                display : inline-block
                font-size : 14px
            .content
                display : inline-block
                font-size : 14px
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
</style>