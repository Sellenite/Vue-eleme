<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive"
                  v-bind:class="{'active':selectType===2}"
                  v-on:click="select(2,$event)">{{ desc.all }}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive"
                  v-bind:class="{'active':selectType===0}"
                  v-on:click="select(0,$event)">{{ desc.positive }}<span class="count">{{ positives.length }}}</span></span>
            <span class="block negative"
                  v-bind:class="{'active':selectType===1}"
                  v-on:click="select(1,$event)">{{ desc.negative }}<span class="count">{{ negatives.length }}</span></span>
        </div>
        <div class="switch"
             v-bind:class="{'on':onlyContent}"
             v-on:click="toggleContent">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    computed: {
        /* 从ratings里过滤好评 */
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            });
        },
        /* 从ratings里过滤差评 */
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
        }
    },
    methods: {
        /* 选择全部，好评，差评 */
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('selectedType', type);
        },
        /* 只看有内容的评价的切换 */
        toggleContent(event) {
            if (!event._constructed) {
                return;
            }
            let NewOnlyContent = !this.onlyContent;
            this.$emit('toggle', NewOnlyContent);
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .ratingselect
        .rating-type
            padding: 18px 0
            margin: 0 18px
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 0
            .block
                display: inline-block
                padding: 8px 12px
                margin-right: 8px
                border-radius: 1px
                color: rgb(77, 85, 93)
                font-size: 12px
                line-height: 16px
                &.active
                    color: #FFF
                .count
                    font-size: 8px
                    margin-left: 2px
                &.positive
                    background: rgba(0, 160, 220, 0.2)
                    &.active
                        background: rgb(0, 160, 220)
                &.negative
                    background: rgba(77, 85, 93, 0.2)
                    &.active
                        background: rgb(77, 85, 93)
        .switch
            padding: 12px 18px
            line-height: 24px
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            color: rgb(147, 153, 159)
            font-size: 0
            &.on
                .icon-check_circle
                    color: #00C850
            .icon-check_circle
                display: inline-block
                vertical-align: top
                margin-right: 4px
                font-size: 24px
            .text
                display: inline-block
                vertical-align: top
                font-size: 12px
</style>